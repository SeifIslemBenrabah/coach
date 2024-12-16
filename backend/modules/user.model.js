const mongoose =require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema(
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
        file:[
            {type:Schema.Types.ObjectId,
                ref:'Files'
            }
        ],
        picsofusers:[
            {type:Schema.Types.ObjectId,
                ref:'PICs'
            }
        ]
    }
)
module.exports = mongoose.model('User',userSchema)