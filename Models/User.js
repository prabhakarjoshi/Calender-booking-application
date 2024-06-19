const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Admin", "Students"],
        required: true
    },
    password: {
        type: String,
        maxlength: 15,
        minLength: 8, 
        required: true
    }
});

const user=mongoose.model('User', userSchema);
module.exports= user;
