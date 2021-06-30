const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/lewis_socialNetwork_API', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});


// Use this to log mongo when the queries are being executed!
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));