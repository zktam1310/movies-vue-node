const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    sypnosis: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
}, {timestamps: true});


const Movie = mongoose.model('Movie', movieSchema)

module.exports = { Movie }