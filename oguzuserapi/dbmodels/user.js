const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }

});

module.exports = mongoose.model('users',userSchema);