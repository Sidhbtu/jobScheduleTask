const mongoose = require('mongoose')
const route = require('../routes')

const Col1Schema = new mongoose.Schema({
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



const Col1 = mongoose.model('Col1',Col1Schema)
module.exports = Col1