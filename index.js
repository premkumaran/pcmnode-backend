const express = require('express');
const app = express();
const port = 3000

app.use(express.static("public"))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencod 

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P@s5w0rd',
    database: 'assessment'
})
connection.connect();
app.post('/users', function (req, res) {

    if (req.body.username && req.body.password) {

        connection.query('SELECT * FROM assessment.pcmuser WHERE username=? and password=?', [req.body.username, req.body.password], function (err, result) {
            if (err)
                throw err;
                console.log(result);
            if (result.length>0) {
                res.send({ data:result, status: "success" })
                // console.log(res);
            } else {
                res.send({ status: "failed" })
            }
          
        })
    }
})
app.post('/insert', function (req, res) {

    connection.query('INSERT INTO assessment.pcmuser (username,password,email,phone) VALUE(?,?,?,?)', [req.body.username, req.body.password,req.body.email,req.body.phone], function (err, result) {
        if (err)
            throw err;
            console.log(result);
            res.send({ status: "insert" })
    })
})
app.post('/create', function (req, res) {
console.log(req.body.id);
    connection.query('INSERT INTO assessment.pcmcategory (name,userid) VALUE(?,?)', [req.body.name,req.body.id], function (err, result) {
        if (err)
            throw err;
            console.log(result);
            res.send({ status: "insert" })
    })
})
app.post('/added', function (req, res) {

    connection.query('INSERT INTO assessment.pcmproduct (pname,price,catid) VALUE(?,?)', [req.body.name,req.body.price], function (err, result) {
        if (err)
            throw err;
            console.log(result);
            res.send({ status: "insert" })
    })
})
app.get('/detail', function (req, res) {

    connection.query('SELECT * FROM assessment.pcmcategory', [req.body.name], function (err, result) {
        if (err)
            throw err;
            console.log(result);
            res.send( result )
    })
})
app.get('/productdetail', function (req, res) {

    connection.query('SELECT * FROM assessment.pcmproduct a  inner join assessment.pcmcategory b on a.catid=b.id', function (err, result) {
        if (err)
            throw err;
            console.log(result);
            res.send( result )
    })
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})