const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const PicsSchema = new Schema({
    filepath:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})
module.exports = mongoose.model('PICs',PicsSchema)