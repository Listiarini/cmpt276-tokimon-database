const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000
var app = express();

const { Pool } = require('pg');
var pool;
pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req,res) => {res.render('pages/index')});

app.get('/displayall', (req,res) => {
    var getUserQuery = `SELECT * FROM tokimon;`;
    pool.query(getUserQuery, (error, result) => {
        if (error)
            res.end(error);
        var results = { 'rows': result.rows };
        res.render('pages/displayall', results);
    })
});

app.post('/tokimon-add', (req,res) => {
    var name = req.body.name;
    var trainername = req.body.trainername;
    var weight = req.body.weight;
    var height = req.body.height;
    var fly = req.body.fly;
    var fight = req.body.fight;
    var fire = req.body.fire;
    var water = req.body.water;
    var electric = req.body.electric;
    var ice = req.body.ice;
    var total = req.body.total;
    var getUserQuery = `INSERT INTO tokimon VALUES(DEFAULT,'${name}','${trainername}','${weight}','${height}','${fly}','${fight}','${fire}','${water}','${electric}','${ice}','${total}');`;
    pool.query(getUserQuery, (error, result) => {
        if (error)
            res.end(error);
        res.render('pages/successmessage');
    });
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
