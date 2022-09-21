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

app.get(`/about.html`,(req,res)=>{
    res.sendFile(__dirname+'/html/about.html');
});

app.post(`/test.html/pred`,(req,res)=>{
    const spawn = require('child_process').spawn;

    // Initialise the data
    const data = {
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }

    // We need to stringify the data as
    // python cannot directly read JSON
    // as command line argument.
    let stringifiedData = JSON.stringify(data);

    // Call the python process and pass the
    // data as command line argument.
    const py = spawn('python', ['arraysum.py', stringifiedData]);

    resultString = '';

    // As the stdout data stream is chunked,
    // we need to concat all the chunks.
    py.stdout.on('data', function (stdData) {
        resultString += stdData.toString();
    });

    py.stdout.on('end', function () {
        // Parse the string as JSON when stdout
        // data stream ends
        let resultData = JSON.parse(resultString);

        let sum = resultData['sum'];
        console.log('Sum of array from Python process =', sum);
    });
});


app.listen(8000,()=>{
    console.log(`Server Started at port : ${8000}`);
});