
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { UserRouter } from './Phishing.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//     origin: ["https://front-auth-mu.vercel.app"],
//     methods: ["POST", "GET"],
//     credentials: true,
//     optionSuccessStatus:200
// }));
// app.use(cors(corsOptions));
const corsOrigin ={
    origin:'*',
     //or whatever port your frontend is using
    // credentials:true,
    methods: ["*"],     
    // allowedHeaders: ['Content-Type', 'Authorization'],       
    // optionSuccessStatus:200,
}

app.use(cors(corsOrigin));
app.get('/', (req, res) => {
    res.json('hello');
});

app.use('/Service', UserRouter);

app.listen(process.env.PORT, () => {
    console.log("server is running");
});

// mongoose.connect('mongodb://localhost:27017/Base');
mongoose.connect('mongodb+srv://hariomsingh4274:FJFZiGBqhAZRv3SR@cluster0.vlrs0o5.mongodb.net/Phisphing?retryWrites=true&w=majority&appName=Cluster0')
