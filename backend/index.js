
//security packages
const cors = require('cors');

//routes
const express = require('express');
const app = express();


const connectDb = require('./db/connect');

//routers
const bookRoute = require('./routes/book');
const orderRoute = require('./routes/order');
const adminAuthRoute = require('./routes/admin');

//error Handler
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')

app.use(express.json())
app.use(cors());
//routes
app.get("/", (req, res) => {
  res.send("Your book store App")
}) 
      
app.use('/books', bookRoute);
app.use('/orders', orderRoute);
app.use('/auth', adminAuthRoute);
      
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 4000
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