const mongoose = require('mongoose');
const Item = require('../models/Item');
const connectDB = require('./db');

const initItems = async()=>{
    await connectDB();
    const items =[
        {name:'Cricket Bat',totalQuantity:10},
        {name:'Cricket Ball',totalQuantity:15},
        {name:'Football',totalQuantity:8},
        {name:'Basket Ball',totalQuantity:5},
        {name:'Volly Ball',totalQuantity:9},
        {name:'Badminton Racket',totalQuantity:6},
        {name:'Shuttlecock',totalQuantity:12}
    ];
    try{
        await Item.deleteMany();
        await Item.insertMany(items);
        console.log('Items initialized');
        mongoose.connection.close();
    }catch(error){
        console.error(`Error: ${error.message}`);
    }
};
initItems();