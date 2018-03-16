const express = require('express');                 // npm install express --save
const bodyParser = require('body-parser')           // npm install body-parser --save
const mongoClient = require('mongodb').MongoClient  // npm install mongodb --save
const app = express();

app.use(bodyParser.urlencoded({extended: true}))    // important to do this before starting the listner
app.set('view engine', 'ejs')                       // npm install ejs --save

var db
var dbConfig = 'mongodb://nodejs:nodejs3000!@ds257858.mlab.com:57858/spik01'
var ObjectId = require('mongodb').ObjectId

app.listen(3000, function() {
    console.log('listening on 3000')
})

app.get('/', (req, res) => {                        // Display the home page (READ)
    mongoClient.connect(dbConfig, (err, client) => {
        client.db('spik01').collection('tasks').find().toArray((err, result) => {
            if (err) return console.log(err)
            res.render('index.ejs', {tasks: result})
        })
    })
})

app.post('/task/add', (req, res) => {                 // Create a new item (CREATE)
    mongoClient.connect(dbConfig, (err, client) => {
        client.db('spik01').collection('tasks').save(req.body, (err, result) => {
            if (err) return console.log(err)
            console.log('Item saved to database')
            res.redirect('/')
        })
    })
})

// This is called by the editTask() script on the index.ejs page.  It will send the record back 
// for the task ID that is sent in as the request.  
app.get('/task/edit/(:id)', (req, res) => {          // Get the record that is being modified to display
    console.log('Task Edit %s', req.params.id)
    var o_id = new ObjectId(req.params.id)
    mongoClient.connect(dbConfig, (err, client) => {
        client.db('spik01').collection('tasks').find({"_id": o_id}).toArray((err, result) => {
            if (err) return console.log(err)
            if (!result) {
                // No result, the task was not found - send back an error.
                res.send({
                    rec: result,
                    errcode: 'Task not found'
                })
            }
            else {
                res.send({
                    rec: result,
                    errcode: ''
                })
            }
        })
    })
})

app.post('/task_update', (req, res) => {                 // Updates existing item (UPDATE)
    console.log('Task Update %s', req.body.task._id)
    var o_id = new ObjectId(req.body.task._id)
    // Could we just pass req.body.task into Mongo instead of rebuilding it?  
    var task = {
        name: req.body.task.name,
        status: req.body.task.status
    }
    mongoClient.connect(dbConfig, (err, client) => {
        client.db('spik01').collection('tasks').update({"_id": o_id}, task, (err, result) => {
            if (err) return console.log(err)
            res.redirect('/')
        })
    })
})

app.get('/task_delete/(:id)', (req, res) => {
    console.log('Delete record')
    var o_id = new ObjectId(req.params.id)
    mongoClient.connect(dbConfig, (err, client) => {
        client.db('spik01').collection('tasks').remove({"_id": o_id}, (err, result) => {
            if (err) return console.log(err)
            // When removing an item in MongoDb result.n will specify the number of records 
            // that were removed from the database.
            res.send({
                rec: result,
                errcode: ''
            })
        })
    })
})

app.get('/myip', (req, res) => {
    var os = require('os');
    res.send({
        ip: req.connection.remoteAddress,
        ua: req.headers['user-agent'],
        ost: os.type(),
        osr: os.release(),
        osp: os.platform()
    })
})

// For updates and deletes refer to programmerblog.net/nodejs-mongodb-tutorial