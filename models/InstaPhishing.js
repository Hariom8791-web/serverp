import mongoose from 'mongoose'
const instaSchema= mongoose.Schema({
    username:{type:String},
    Password:{type:String}
})
const instaModel = mongoose.model("instadb",instaSchema)
export {instaModel as instadb}