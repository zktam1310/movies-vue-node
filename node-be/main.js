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
const patchRoute = require('./routes/patch')
app.use('/movies', movieRoute)
app.use('/patch', patchRoute)


//Connect DB
// mongoose.connect(
//   process.env.MONGO_URI,
//   {useNewUrlParser: true},
//   function (err) {
//     if (err) return console.log(err);
//     console.log("Connected to Mongo DB.")
//   }
// )



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
