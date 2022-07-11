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


router.get('/:code', async (req,res) => {

    try{
        await Movie.findOne({ code: req.params.code })
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

    if (req.body.filter_options) {
        var filters = {}
        var activeFilters = ["genre", "year"]
        for (const [key, value] of Object.entries(req.body.filter_options)) {
            if (value && activeFilters.includes(key)) filters[key] = value
        }
    }
    var sorting = req.body.sort_options || null


    try{
        await Movie.find(filters)
        .sort(sorting)
        .exec(function (err, movies) {
            if (err) {
                res.json({
                    status: 'error',
                    msg: err
                })
            } else {
                res.json({
                    status: 'ok',
                    data: movies
                })
            }

        })

    } catch(err) {

        res.json({
            status: 'error',
            msg: err
        })

    }

})




module.exports = router;