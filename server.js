const express= require('express');
const app=express();
const db=require('./db');
const Booking=require('./Models/Booking');
const bodyParser = require("body-parser")


app.use(bodyParser.json({extended: true}));

app.get('/', (req,res)=>{
    res.send('Hello')
})

app.post("/login",
    function (req, res) {
 
        const name = String(req.body.name);
        const password = String(req.body.password);
        const [myUser, id]= checkUser(name,password);
        //validate id password from user collection in mongodb
        if(myUser==="invalid")
            res.send('sahi sahi dal, maar khani hai kya');
        else {
            res.send({'category': myUser,'id':id})
        }
        
    });

//only for admin

app.post('/createSlot', async (req,res)=>{
    const date = Number(req.body.date);
    const time = Number(req.body.time);
    const booking =new Booking();
    try{
        booking.startTime=time;
        booking.bookingDate=date;
        const resp= await booking.save()
        console.log('saved');
        res.status(200).json(booking);
    }
    catch(err){
            console.log('errror saving');
            res.status(500).json({error: "internal server error"});
        }
    })


app.get('giveList',(req,res)=>{
    const data ={}
    //data = fetch data of all slot (Booking collection) 
    res.send(data);
})

//only for student

app.post('/book',(req,res)=>{
    const date = Number(req.body.date);
    const time = Number(req.body.time);
    const id= String(req.body.id)
    
    // update slot of mentioned date and time with id.name in Booking collection in BookedBy column
    res.send("Done");
})

app.get('/givefilteredlist',(req,res)=>{
    const id= String(req.body.id)
    data={}
    //fetch all booking data where bookedby is id.name OR bookedby is empty
    return data;
})

app.listen(3000,()=>{console.log('Listening on 3000')});

function checkUser(name, password){
    //search user 
    //if found return [user.category,_id]
    //if not return ["invalid",'']
    // return ['student',1253]
    return ["invalid",'']
}

