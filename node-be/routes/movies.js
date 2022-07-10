const express = require('express');
const router = express.Router();

const { Movie } = require('../model')

router.get('/', async (req,res) => {
    try {
        const movies = await Movie.find()
        .exec(function (err, movies) {
            if (err) return handleError(err)
            res.json({
                status: 'ok',
                data: {
                    movies
                }
            })

        })

    } catch(err) {
        res.json({
            status: 'error',
            msg: err
        })
    }
})


router.get('/:title', async (req,res) => {

    try{
        await Movie.findOne({ title: req.params.title })
        .exec(function (err, movie) {
            if (err) return console.log(err)
            res.json({
                status: 'ok',
                data: {
                    movie
                }
            })
        })

    } catch(err) {
        res.json({msg: err })
    }

})

router.post('/', async (req,res) => {

    if (!req.body.title)
        return res.json({status: 'error', msg: 'Please fill in title.'})

    if (!req.body.sypnosis)
        return res.json({status: 'error', msg: 'Please fill in sypnosis.'})

    if (!req.body.genre)
        return res.json({status: 'error', msg: 'Please fill in genre.'})

    if (!req.body.year)
        return res.json({status: 'error', msg: 'Please fill in year.'})


    try{

        const movie = new Movie({
            title: req.body.title,
            sypnosis: req.body.sypnosis,
            genre: req.body.genre,
            year: req.body.year
        })

        const newMovie = await movie.save(movie)

        console.log(movie)

        res.json({ status: 'ok', data: movie})

    } catch(err) {

        console.log(err)
        res.json({ status: 'error', msg: err })
    }

})


module.exports = router;