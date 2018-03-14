const express = require('express');     // npm install express --save
const bodyParser = require('body-parser')   // npm install body-parser --save
const mongoClient = require('mongodb').MongoClient      // npm install mongodb --save
const app = express();

var db

app.use(bodyParser.urlencoded({extended: true}))    // important to do this before starting the listner
app.set('view engine', 'ejs')       // set the view engine

// Questioning the order in which we establish a connection to the MongoDB, maybe this should be at the point 
// the handler picks up a request in which we need the database.  
mongoClient.connect('mongodb://nodejs:nodejs3000!@ds257858.mlab.com:57858/spik01', (err, client) => {
    if (err) return console.log(err)
    db = client.db('spik01')
    app.listen(3000, function() {
        console.log('listening on 3000')
    })
})

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('index.ejs', {quotes: result})
    })
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('Saved to database')
        res.redirect('/')
    })
})