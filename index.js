require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const items = require('./routes/item');

// Your other code here


const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

const mongoURI =process.env.MONGODB_URI ;
console.log(mongoURI);
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
// const semRoute=require('./routes/sem');
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/items',items);

// app.use('/api/assignemnt',assignemntRoute);
// app.use('/api/paper',paperRoute);

// app.use('/api/books',booksRoute);
// app.use('/api/subjects',subjectRoute);

// app.use('/api/seatno',seatnoRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
