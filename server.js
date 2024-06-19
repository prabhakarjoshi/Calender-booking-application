const express= require('express');
const app=express();
const db=require('./db');
const Booking=require('./Models/Booking');
const User=require('./Models/User');
const bodyParser = require("body-parser")


app.use(bodyParser.json({extended: true}));

app.get('/', (req,res)=>{
    res.send('Chal login/ signup kar')
})
app.get("/login",async (req, res)=> {
        const name = String(req.body.name);
        const password = String(req.body.password);
    
        const user= await User.find({'name': name, 'password': password});
        
        if(user.length===0)
            res.send('Invalid Id or password');
        else {
            res.send({'category': user[0]['category'],'id':user[0]['_id']})
        }
});
app.post('/signup',async (req,res)=>{
    const name = String(req.body.name);
    const password = String(req.body.password);
    const category = String(req.body.category);
    try {
        const user= new User();
        user.name=name;
        user.password=password;
        user.category=category;
        const resp=await user.save();
        // console.log(resp)
        res.status(200).json(user);
    } catch (err) {
        // console.log(err)
        res.status(500).json({error: 'unable to create user'});
    }
})

//only for admin

app.post('/createSlot', async (req,res)=>{
    const date = Number(req.body.date);
    const time = Number(req.body.time);
    const bookedBy = String(req.body.bookedBy);
    const booking =new Booking();
    try{
        booking.startTime=time;
        booking.bookingDate=date;
        booking.bookedBy=bookedBy;
        const resp= await booking.save()
        console.log('saved'); 
        res.status(200).json(resp);
    }
    catch(err){
            console.log('errror saving');
            res.status(500).json({error: "internal server error"});
        }
})

app.get('/giveList',async(req,res)=>{
    const data =await Booking.find() 
    res.send(data);
})

//only for student

app.post('/book',async (req,res)=>{
    try {
        const date = Number(req.body.date);
        const time = Number(req.body.time);
        const id= String(req.body.id)
        const name=await User.find({'_id':id});
        const pastBooking= await Booking.find({$and: [{"bookedBy": name[0]['name']},{"bookingDate":date}]})
        if(pastBooking.length!=0){
            res.status(500).json({"error": "cant book 2 in a day"});
        }
        else{
        const resp=await Booking.findOneAndUpdate(
            {$and: [{"startTime": time},{"bookingDate":date}]}, 
            {"bookedBy": name[0]['name']},
            {new:true, runValidators: true}
        );
        res.status(200).json(resp)
        }

    } catch (err) {
        // console.log('err')
        res.send(err)
    }
    
    // update slot of mentioned date and time with id.name in Booking collection in BookedBy column
    
})

app.get('/givefilteredlist',async (req,res)=>{
    const user= await User.find({_id: String(req.body.id) })
    console.log('found ',user[0]['name'])
    const data= await Booking.find({$or: [{bookedBy: ""},{bookedBy: user[0]['name']}]})
    //fetch all booking data where bookedby is id.name OR bookedby is empty
    res.status(200).json(data);
})

app.listen(3000,()=>{console.log('Listening on 3000')});



