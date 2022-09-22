const express = require('express');
const fs = require('fs');
const path = require('path');
var cors = require('cors');
const spawn = require('child_process').spawn;


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

app.get(`/prediction.html`,(req,res)=>{
    res.sendFile(__dirname+'/html/prediction.html');
});

app.get(`/result.html`,(req,res)=>{
    res.sendFile(__dirname+'/html/result.html');
});

app.get(`/chat.html`,(req,res)=>{
    res.sendFile(__dirname+'/html/chat.html');
});

app.get(`/test.html`,(req,res)=>{
    res.sendFile(__dirname+'/html/test.html');
});

app.post(`/test.html/pred`,(req,res)=>{

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': "OPTIONS,POST,GET",
        'Access-Control-Allow-Origin': "*"
    });

    // const data = {
    //     "text": `Ex Wife Threatening SuicideRecently I left my wife for good because she has cheated on me twice and lied to me so much that I have decided to refuse to go back to her. As of a few days ago, she began threatening suicide. I have tirelessly spent these paat few days talking her out of it and she keeps hesitating because she wants to believe I'll come back. I know a lot of people will threaten this in order to get their way, but what happens if she really does? What do I do and how am I supposed to handle her death on my hands? I still love my wife but I cannot deal with getting cheated on again and constantly feeling insecure. I'm worried today may be the day she does it and I hope so much it doesn't happen.`
    // }

    const data = req.body

    let stringifiedData = JSON.stringify(data);

    const py = spawn('python', ['Python/suicide.py', stringifiedData]);

    resultString = '';
    py.stdout.on('data', function (stdData) {
        resultString += stdData.toString();
    });

    py.stdout.on('end', function () {
        console.log(resultString.trim().slice(-1));
        return res.send(JSON.stringify({"Result":resultString.trim().slice(-1)}));
    });
});

app.post(`/prediction.html/pred`,(req,res)=>{
    var data = req.body;
    console.log(data);
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': "OPTIONS,POST,GET",
        'Access-Control-Allow-Origin': "*"
    });
    return res.send(JSON.stringify({"Posted":"Hello"}));
});

app.listen(8000,()=>{
    console.log(`Server Started at port : ${8000}`);
});