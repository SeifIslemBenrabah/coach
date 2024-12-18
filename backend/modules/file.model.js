const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const fileSchema = new Schema({
    filepath:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['Régime','Entraînement']
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})
module.exports = mongoose.model('Files',fileSchema)