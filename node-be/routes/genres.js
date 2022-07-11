const express = require('express');
const router = express.Router();

const { Genre } = require('../model')

router.get('/', async (req,res) => {
    try {
        const genres = await Genre.find()
        .select('title')
        .exec(function (err, genres) {
            if (err) return handleError(err)
            res.json({
                status: 'ok',
                data: {
                    genres
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


module.exports = router;