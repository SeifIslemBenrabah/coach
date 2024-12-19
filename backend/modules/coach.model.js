const mongoose =require('mongoose')
const Schema = mongoose.Schema;
const coachSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:['Coach'],
            default:'Coach'
        }
    }
)
module.exports = mongoose.model('Coach',coachSchema)