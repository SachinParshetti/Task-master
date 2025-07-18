import express from 'express';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try
   {
    const existingUser = await User.find({username});
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash });
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
    if( !username || !password)
    {
        return res.status(400).json({ error: 'Username and password are required' });
    }
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id,username:user.username }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true, // true in production
        sameSite: 'lax',
        path:"/"
      })
      .json({ message: 'Logged in', user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax',
    path:"/"
  });
  res.status(200).json({ message: 'Logged out' });
});

// Get current user info
router.get('/me', authenticate, (req, res) => {
  res.json({ id: req.userId, username: req.username });
});

// delete user

router.delete("/:id", async (req,res)=>{
    try
    {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user)
        {
            return res.status(404).json({error:"User not found"});

        }
        res.status(200).json({messange:"User deleted successfully"})
    }
    catch(error)
    {
        res.status(500).json({error:"Failed to delete user"})
    }
})

export default router;
