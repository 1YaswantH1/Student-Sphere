const express = require('express');
const router = express.Router();
const Booking = require('../models/Bookings');
const Item= require('../models/Item');
router.post('/',async (req,res)=>{
    const {itemId,timeSlot,quantity}= req.body;
    try{
        const item = await Item.findById(itemId);
        const existingBookings = await Booking.find({ item: itemId, timeSlot: new Date(timeSlot) });

        const bookedQuantity = existingBookings.reduce((sum,booking)=> sum+booking.quantity , 0);
        const availableQuantity = item.totalQuantity-bookedQuantity;
        if(quantity<= availableQuantity){
            const booking = new Booking({
                item:itemId,
                timeSlot: new Date(timeSlot),
                quantity,
            });
            await booking.save();
            res.redirect('/');
        }else{
            res.status(400).send(`only ${availableQuantity} items available..`)
        }
    }catch(err){
        res.status(500).send(error.message);
    }
});

router.get('/',async (req,res)=>{
    try{
        const bookings = await Booking.find().populate('item');
        res.render('index',{bookings});
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.post('/delete/:id',async(req,res)=>{
    try{
        await Booking.findByIdAndDelete(req.params.id);
        res.redirect('/');
    }catch(err){
        res.status(500).send(err.message);
    }
});
module.exports = router;