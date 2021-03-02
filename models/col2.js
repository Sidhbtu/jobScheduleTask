const mongoose = require('mongoose')
const route = require('../routes')

const Col2Schema = new mongoose.Schema({
    id:{
        type:Number,
        
    },
    message:{
        type:String,
        trim:true
    },
    day:{
        type:String,
        trim:true
    },
    time:{
        type:String,
        
    }
    
})



const Col2 = mongoose.model('Col2',Col2Schema)
module.exports = Col2