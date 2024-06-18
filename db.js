const mongoose= require('mongoose');
const mongoUrl= 'mongodb://localhost:27017/Calender'

mongoose.connect(mongoUrl)

const db= mongoose.connection;

db.on("connected",()=>{
    console.log('Colnnected to mongodb')
});

db.on("error",()=>{
    console.log('error connecting to mongodb')
});

db.on("disconnection",()=>{
    console.log('disconnected to mongodb')
});

module.exports=db;