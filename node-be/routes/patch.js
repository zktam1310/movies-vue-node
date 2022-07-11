const express = require('express');
const router = express.Router();
const data = require('../utils/data.json');

const { Movie } = require('../model')

router.get('/', async (req,res) => {

    var hasError = 0;
    var isPatched = 0;
    var errorMsg = [];

    //Check is initial data patched.
    await Movie.find()
    .exec(function (err, movies) {
        if (err) return console.error(err)
        if (movies.length>0) {
            isPatched = 1;
            res.json({
                status: 'ok',
                msg: 'Data has been initialized.'
            })
        }
    })

    if (isPatched) return;

    for (let i = 0; i < data.movies.length; i++) {
        var movie = new Movie({
            code: 1000 + i,
            title:  data.movies[i].title,
            sypnosis: data.movies[i].sypnosis,
            genre: data.movies[i].genre,
            year: data.movies[i].year
        })

        try{
            const newMovie = await movie.save(movie)
            const return_data = {
                newMovie
            }
            console.log({ status: 'ok', data: return_data})
        } catch(err) {
            hasError = 1;
            errorMsg.push(err);
            if (err.code == 11000) {
                return console.log({ status: 'error', msg: 'Title is taken.' })
            }
            console.log({ status: 'error', msg: err })
        }

    }

    if (hasError) {
        res.json({
            status: 'error',
            msg: errorMsg
        })

        return;
    }

    res.json({
        status: 'ok',
        msg: "Successfully patched db."
    })


})

module.exports = router;