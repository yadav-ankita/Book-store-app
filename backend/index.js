//security packages
require('dotenv').config()
const cors = require('cors');

//routes
const express = require('express');
const app = express();


const connectDb = require('./db/connect');

//routers
const AuthRoute = require('./routes/user');
const bookRoute = require('./routes/book');
const orderRoute = require('./routes/order');

//error Handler
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const authenticationMiddleware = require('./middleware/authUser')

app.use(express.json())
app.use(cors());
//routes
app.get("/", (req, res) => {
  res.send("Your book store App")
})     

app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/books', authenticationMiddleware, bookRoute);
app.use('/api/v1/orders', authenticationMiddleware, orderRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;
const url = 'mongodb://localhost:27017/BookStore'
const start = async () => {
  try {
    await connectDb(url)
    app.listen(port, () => {
      console.log(`app is listeing on port ${port}`)
    })

  } catch (error) {
    console.log("error in app.js", error)
  }
}
start()