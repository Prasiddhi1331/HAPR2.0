const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get(`/`,(req,res)=>{
    res.sendFile(__dirname+'/html/index.html');
});

app.get(`/prediction.html`,(req,res)=>{
    res.sendFile(__dirname+'/html/prediction.html');
});

app.listen(8000,()=>{
    console.log(`Server Started at port : ${8000}`);
});