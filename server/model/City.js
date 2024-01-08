const mongoose = require('mongoose')
const Schema = mongoose.Schema
const citySchema = new Schema({
    name: {
        type: String,
        unique: true 
    },
    condition: String,
    temperature: Number,
    conditionPic: String,
    date: Date
})
const City = mongoose.model('city', citySchema)
module.exports = City