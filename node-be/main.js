const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser  = require('body-parser')

dotenv.config({path: '.env'})
const port = process.env.PORT || 3000;

const app = express()
app.use(cors())
app.use(bodyParser.json())

//Handle home route
app.get('/', (req,res ) => {
  res.json({
      status: 'ok',
      data: {
          type: 'Invalid route.'
      }
  })
})

//Other routes
const movieRoute = require('./routes/movies')
const genreRoute = require('./routes/genres')
const patchRoute = require('./routes/patch')
app.use('/api/movies', movieRoute)
app.use('/api/genres', genreRoute)
app.use('/api/patch', patchRoute)



//Connect Mongo DB
async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
  } catch (error) {
    console.error(error);
  }

  console.log(`Connected Mongo DB (${process.env.MONGO_URI})`);
}

connectMongo();


//Start app
app.listen(port, () => {
  console.log(`Express backend running on localhost:${port}`)
})
