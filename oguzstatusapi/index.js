const express = require('express');
const app = express();

const requestRoutes = require('./routers/request');

app.use(express.json());

app.use(requestRoutes);

app.listen(3000);