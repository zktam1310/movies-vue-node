const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    code: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
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

const genreSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});


const Movie = mongoose.model('Movie', movieSchema)
const Genre = mongoose.model('Genre', genreSchema)

module.exports = { Movie, Genre }