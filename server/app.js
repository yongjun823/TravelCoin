const request = require("request");
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const BASE_URL = 'http://ec2-52-79-89-184.ap-northeast-2.compute.amazonaws.com:3000'


app.listen(3001, () => {
    console.log('server start');
});