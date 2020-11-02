const mongoose = require('mongoose')

const pbSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        unique: true
    },
    value: {
        type: Number,
        trim: true,
        required: true
    },
    backgroundcolor: {
        type: String,
        trim: true,
        required: true 
    }
}, {collection: 'justWork'})

module.exports = mongoose.model('justWork', pbSchema)