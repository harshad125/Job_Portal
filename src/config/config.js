import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' })

const connectDB = async () => {
    try {
        // console.log(process.env.DATABASE_URL)
        const connectionInstance = await mongoose.connect(process.env.DATABASE_URL)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB