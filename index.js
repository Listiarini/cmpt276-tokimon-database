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
    var getQuery = `INSERT INTO tokimon VALUES(DEFAULT,'${name}','${trainername}','${weight}','${height}','${fly}','${fight}','${fire}','${water}','${electric}','${ice}','${total}');`;
    
    pool.query(getQuery, (error, result) => {
        if (error) {
            res.render('pages/failmessage');
        } 
        res.render('pages/successmessage');
    });
})

app.post('/tokimon-delete', (req,res) => {
    var tokimonid = req.body.id;
    var getQuery = `DELETE FROM tokimon WHERE id = ${tokimonid};`;
    
    pool.query(getQuery, (error, result) => {
        if (error) {
            res.end(error);
        }
        if (result.rowCount == 0) {
            res.render('pages/failmessage');
        }
        else {
            res.render('pages/successmessage');    
        }
    });
})

app.post('/tokimon-view', (req,res) => {
    var tokimonid = req.body.id;
    var getQuery = `SELECT * FROM tokimon WHERE id = ${tokimonid};`;
    
    pool.query(getQuery, (error, result) => {
        if (error) {
            res.end(error);
        }
        if (result.rowCount == 0) {
            res.render('pages/failmessage');
        }
        else {
            var id = tokimonid;
            var results = { 'rows': result.rows };
            res.render('pages/displayspecific', results); 
        }
        
    });
})

app.post('/tokimon-change', (req,res) => {
    var tokimonid = req.body.id;
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
    var change = 0;
    var changeability = false;
    var listQuery = `UPDATE tokimon SET`;
    
    if (name != '') {
        listQuery += ` name = '${name}',`;
        change += 1;
    }    
    if (trainername != '') {
        listQuery += ` trainername = '${trainername}',`;
        change += 1;
    }
    if (weight != '') {
        listQuery += ` weight = '${weight}',`;
        change += 1;
    }
    if (height != '') {
        listQuery += ` height = '${height}',`;
        change += 1;
    }
    if (fly != '') {
        listQuery += ` fly = '${fly}',`;
        change += 1;
        changeability = true;
    }
    if (fight != '') {
        listQuery += ` fight = '${fight}',`;
        change += 1;
        changeability = true;
    }
    if (fire != '') {
        listQuery += ` fire = '${fire}',`;
        change += 1;
        changeability = true;
    }
    if (water != '') {
        listQuery += ` water = '${water}',`;
        change += 1;
        changeability = true;
    }
    if (electric != '') {
        listQuery += ` electric = '${electric}',`;
        change += 1;
        changeability = true;
    }
    if (ice != '') {
        listQuery += ` ice = '${ice}',`;
        change += 1;
        changeability = true;
    }
    
    var getQuery = listQuery.substring(0, listQuery.length-1);
    getQuery += ` WHERE id = ${tokimonid};`;
    
    if (change > 0) {
        pool.query(getQuery, (error, result) => {
            if (error) {
                res.end(error);
            }
            if (result.rowCount == 0) {
                res.render('pages/failmessage');
            }
            else {
                res.render('pages/successmessage'); 
                
                // update total too
                if (changeability) {
                    var getAbility = `SELECT fly, fight, fire, water, electric, ice FROM tokimon WHERE id = ${tokimonid};`;
                    pool.query(getAbility, (error, result) => {
                        if (error) {
                            res.end(error);
                        }
                        
                        var t = parseInt(result.rows[0].fly,10) + parseInt(result.rows[0].fight,10) + parseInt(result.rows[0].fire,10) + parseInt(result.rows[0].water,10) + parseInt(result.rows[0].electric,10) + parseInt(result.rows[0].ice,10);
                       
                        var updateTotal = `UPDATE tokimon SET total = '${t}' WHERE id = ${tokimonid};`;
                        pool.query(updateTotal, (error, result) => {
                            if (error) {
                                res.end(error);
                            }
                        });

                    });
                }
            }
        });    
    }
    else {
        res.render('pages/failmessage');
    }
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
