const mongoose =require('mongoose')
const moment = require('moment');
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
        age:{
            type:Number,
            default:0
        },
        length:{
            type:Number,
            min:0,
        },
        weight:{
            type:String,
            min:0
        },
        sexe:{
            type:String,
            enum:['Homme','Famme','Non rempli'],
            default:'Non rempli'
        },
        role:{
            type:String,
            enum:['User'],
            default:'User'
        },
        Abonnement:{
            type:String,
            enum:['1 Moi','2 Moi','3 Moi','4 Moi','5 Moi','6 Moi','7 Moi','8 Moi','9 Moi','10 Moi','11 Moi','12 Moi'],
            default:'1 Moi',
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
        ],
        createdAt: { 
            type: String,
            default: () => moment().format('DD-MM-YYYY')
          }
    }
)
module.exports = mongoose.model('User',userSchema)