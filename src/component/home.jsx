import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const HomePage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ username: "", password: "" });
    const [Loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = { username: "", password: "" };

        if (!username.trim()) {
            newErrors.username = "Username is required";
        }
        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        if (newErrors.username || newErrors.password) {
            setErrors(newErrors);
        } else {
            setErrors({ username: "", password: "" });
          
            setLoading(true)
            try
            {
                 const response = await axios.post(`${import.meta.env.VITE_API_BASE}/user/login`,{username,password}, {withCredentials:true})
                 if(response.status === 201 || response.status === 200)
                  {
                    setLoading(false)
                    toast.success("Login Successful");
                    navigate("/dashboard")
                  }
                  else
                  {
                    toast.error("Login Failed")
                    navigate("/")
                  }
            }
        catch (error) {
        setLoading(false);
        const errMsg = error.response?.data?.error || "Login failed";
        toast.error("Login Failed: " + errMsg);
      }

    
    };

}

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200 flex flex-col ">
            {/* Header */}
            <header className=" bg-white/10 backdrop-blur-md shadow-md py-4 sticky top-0 z-10 mx-4 rounded-xl mt-1">
                <div className="flex justify-between">

                    <div className="flex items-center space-x-2 px-2">
                        <i className="bi bi-check2-square text-black text-2xl"></i>
                        <h1 className="text-2xl font-bold text-black">TaskMaster</h1>
                    </div>

                    <div className="p-2">
                       <Link to='/register'>
                        <button
                            id="btn-signin"
                            className="bi bi-person-fill-add absolute right-4 top-1/2 -translate-y-1/2 text-white font-semibold py-1 px-3 rounded-md 
                            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition"
                        >
                        </button>
                       </Link>
                    </div>
                </div>


            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center px-4 py-8">
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-md w-full transform transition-all duration-500 hover:scale-105">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
                        Welcome to TaskMaster
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                        Organize your life, boost productivity, and conquer your tasks with ease.
                    </p>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Input */}
                        <div className="relative">
                            <i className="bi bi-person-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                id="login-username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                aria-label="Username"
                            />
                            {errors.username && <div className="text-red-600 text-sm mt-1">{errors.username}</div>}
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <i className="bi bi-lock-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                id="login-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-label="Password"
                            />
                            {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                            id="btn-login"
                            disabled={Loading}
                            onClick={handleSubmit}

                        >
                            Sign In
                        </button>

                        {/* Registration Link btn */}
                        <div className="text-center">
                           <Link to='/register'>
                           <button
                                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                                id="btn-new-register"
                                type="button"
                            >
                                Already have an account?
                            </button>
                           </Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default HomePage;