const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pbModel = require('./models/pb_schema');

const app = express();
const port = 3000;
let url = 'mongodb://localhost:27017/personalBudget';

app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static('public'));
app.use(express.json());

app.get('/hello', (req, res)=>{
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            pbModel.find({})
            .then((data) => {
                res.json(data);
                mongoose.connection.close();
            })
            .catch((connectionError) => {
                console.log(connectionError);
            });
        })
        .catch((connectionError) => {
            console.log(connectionError);
        });
});

app.post('/addBudget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            var justWork = new pbModel({
                name: req.body.name,
                value: req.body.value,
                backgroundcolor: req.body.backgroundcolor
            });

            pbModel.insertMany(justWork)
            .then((data) =>{
                res.json(data);
                mongoose.connection.close();
            })
            .catch((connectionError) => {
                console.log(connectionError);
            });
        })
        .catch((connectionError) => {
            console.log(connectionError);
        });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
