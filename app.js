const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const Alumn = require('./models/alumn');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let califications = [];
let id = 0;

//Obtain all the alumns
app.get('/califications', (req, res) => {

    res.json({
        califications
    });
});

//Obtain a single alumn
app.get('/califications/:id', (req, res) => {
    let id = req.params.id;
    //Si está vacío
    califications.forEach((i) => {
        if (i.id == id) {
            return res.status(201).json(i);
        }
    });
    return res.status(404).json({
        ok: false,
        msg: "Alumn not found"
    });

});

//Create an alumn
app.post('/califications', (req, res) => {
    var { name, calification } = req.body;
    var alumn = new Alumn(id, name, calification);
    console.log(alumn);
    califications.push(alumn);
    id++;
    res.sendStatus(200);
});

//Update an alumn
app.put('/califications/:id', (req, res) => {

    let id = req.params.id;
    var { name, calification } = req.body;

    var alumn = new Alumn(id, name, calification);

    //If is it empty
    califications.forEach((i) => {
        if (i.id == id) {
            if (name)
                i.name = name;
            if (calification)
                i.calification = calification;
            return res.status(200).json({
                ok: true,
                message: "Alumn updated",
                alumn: i
            });
        }
    });
    return res.status(404).json({
        ok: false,
        message: `There is no alumn with the id ${id}`
    })
});

//Delete an alumn
app.delete('/califications:id', (req, res) => {

    let id = req.params.id;

});

app.listen(3000)
console.log("Server online on port 3000");