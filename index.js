const express = require('express');
const app = express();
const cors = require('cors');
const getData = require('./workers/index');
require('dotenv').config();
app.use(cors());

getData();

app.use('/',require('./api/routes/news'));

app.get('*',(req,res)=>{
    res.status(404).json({
        success : false,
        message : "404 Page not found"
    })
})

let port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})