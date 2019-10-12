require('dotenv/config');
require('./database');

const express = require('express');
const app = express();
const cors = require('cors');
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

// Middlewares
app.use(express.json());
// app.use(cors);

// Route Middlewares
app.use(postsRoute);
app.use(authRoute);

app.listen(process.env.PORT, () => console.log("Listening on 3000"))