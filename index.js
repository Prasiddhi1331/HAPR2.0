const express = require('express');
const fs = require('fs');
const path = require('path');
var cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));
// app.use(cors({
//     origin: '*'
// }));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get(`/`,(req,res)=>{
    res.sendFile(__dirname+'/html/index.html');
});

app.get(`/index.html`,(req,res)=>{
    res.sendFile(__dirname+'/html/index.html');
});

app.get(`/prediction.html`,(req,res)=>{
    res.sendFile(__dirname+'/html/prediction.html');
});

app.post(`/prediction.html/pred`,(req,res)=>{
    var data = req.body;
    console.log(data);
    res.set({
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded', 
        'Access-Control-Allow-Methods': "OPTIONS,POST,GET",
        'Access-Control-Allow-Origin': "*"
    });
    return res.send(JSON.stringify({"Posted":"Hello"}));
});

app.get(`/contact.html`,(req,res)=>{
    res.sendFile(__dirname+'/html/contact.html');
});

app.listen(8000,()=>{
    console.log(`Server Started at port : ${8000}`);
});