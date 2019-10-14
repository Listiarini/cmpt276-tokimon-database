const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express();

const { Pool } = require('pg');
var pool;
pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))


/*
app.post('/add', (req,res) => {
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
    var getUserQuery = `INSERT INTO tokimon VALUES('${name}','${trainername}','${weight}','${height}','${fly}','${fight}','${fire}','${water}','${electric}','${ice}','${total}')`;
    
    console.log(getUserQuery);
    
    pool.query(getUserQuery, (error, result) => {
        if (error)
            res.end(error);
        res.send('Adding successfull!');
    });
})
*/

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
