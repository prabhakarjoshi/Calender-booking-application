const mongoose= require('mongoose')
const bookingSchema= new mongoose.Schema({
    startTime:{
        type: Number,
        Range: {
            min: { type: Number, min: 0 },
            max: { type: Number, min: 23 }
        },
        required: true
    },
    bookingDate:{
        type: Number,
        Range: {
            min: { type: Number, min: 1 },
            max: { type: Number, min: 30 }
        },
        required: true
    },
    bookedBy:{
        type: String, 
    }
});

const booking= mongoose.model('Booking',bookingSchema);
module.exports= booking;