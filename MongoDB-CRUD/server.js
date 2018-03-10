const express = require('express');     // npm install express --save
const bodyParser = require('body-parser')   // npm install body-parser --save
const app = express();
const mongoClient = require('mongodb').MongoClient      // npm install mongodb --save

var db

app.use(bodyParser.urlencoded({extended: true}))    // important to do this before starting the listner

// Questioning the order in which we establish a connection to the MongoDB, maybe this should be at the point 
// the handler picks up a request in which we need the database.  
mongoClient.connect('', (err, client) => {
    if (err) return console.log(err)
    db = client.db('spik01')
    app.listen(3000, function() {
        console.log('listening on 3000')
    })
})


// All your handlers here...
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('Saved to database')
        res.redirect('/')
    })
})