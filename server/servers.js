
const express = require('express');
const app = express();
const uploadRoute=require('./routes/upload')
const cors = require('cors');

const bodyParser = require('body-parser');
app.use(cors());
// Bodyparser Middleware
app.use(bodyParser.json());
app.use('/api',uploadRoute)
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
