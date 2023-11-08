import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Access environment variables
console.log(process.env.MY_SECRET);
