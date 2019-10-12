require('dotenv/config');
require('./database');

const express = require('express');
const app = express();
const cors = require('cors');
const postsRoute = require('./routes/posts');

// Middleware
app.use(express.json());
app.use(cors);
app.use(postsRoute);

app.listen(process.env.PORT)