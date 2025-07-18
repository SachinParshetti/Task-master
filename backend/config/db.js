import mongoose from "mongoose"
import donenv from "dotenv"

 

export const ConnectDB =  async () => 
{
    try
    {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("Database Connected successfully");
    }
    catch(error)
    {
        console.log("Failed to connect database:",error)
        process.exit(1)
    }
}
