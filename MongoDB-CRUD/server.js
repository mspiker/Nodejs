const express = require('express');                 // npm install express --save
const bodyParser = require('body-parser')           // npm install body-parser --save
const mongoClient = require('mongodb').MongoClient  // npm install mongodb --save
const app = express();

app.use(bodyParser.urlencoded({extended: true}))    // important to do this before starting the listner
app.set('view engine', 'ejs')                       // npm install ejs --save

var db
var dbConfig = 'mongodb://nodejs:nodejs3000!@ds257858.mlab.com:57858/spik01'

// Questioning the order in which we establish a connection to the MongoDB, maybe this should be at the point 
// the handler picks up a request in which we need the database, otherwise this gets stale and when we need it
// after it has been waiting we no longer have an established connection.  
mongoClient.connect(dbConfig, (err, client) => {
    if (err) return console.log(err)
    db = client.db('spik01')
    app.listen(3000, function() {
        console.log('listening on 3000')
    })
})

app.get('/', (req, res) => {                        // Display the home page (READ)
    db.collection('tasks').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('index.ejs', {tasks: result})
    })
})

app.post('/tasks', (req, res) => {                 // Create a new item (CREATE)
    db.collection('tasks').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('Item saved to database')
        res.redirect('/')
    })
})