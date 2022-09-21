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

app.get(`/contact.html`,(req,res)=>{
    res.sendFile(__dirname+'/html/contact.html');
});

app.get(`/about.html`,(req,res)=>{
    res.sendFile(__dirname+'/html/about.html');
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

app.get(`/about.html`,(req,res)=>{
    res.sendFile(__dirname+'/html/about.html');
});

app.get(`/prediction.html`,(req,res)=>{
    res.sendFile(__dirname+'/html/prediction.html');
});

app.post(`/test.html/pred`,(req,res)=>{
    const spawn = require('child_process').spawn;

    const data = {
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }

    let stringifiedData = JSON.stringify(data);

    const py = spawn('python', ['Python/test.py', stringifiedData]);

    resultString = '';
    console.log("here1");
    py.stdout.on('data', function (stdData) {
        console.log(resultString);
        resultString += stdData.toString();
    });

    console.log("here2");
    py.stdout.on('end', function () {

        console.log(resultString);
        let resultData = JSON.parse(resultString);

        let sum = resultData['sum'];
        console.log('Sum of array from Python process =', sum);
    });

    return res.send(JSON.stringify({"Posted":"Check Terminal"}));
});


app.listen(8000,()=>{
    console.log(`Server Started at port : ${8000}`);
});