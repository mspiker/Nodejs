const mongoClient = require('mongodb').MongoClient  // npm install mongodb --save
var dbConfig = 'mongodb://nodejs:nodejs3000!@ds257858.mlab.com:57858/spik01'
var ObjectId = require('mongodb').ObjectId

// Gets a list of tasks from MongoDb and renders it on the index.ejs page.
module.exports.getTasks = function(req, res) {
    mongoClient.connect(dbConfig, (err, client) => {
        client.db('spik01').collection('tasks').find().toArray((err, result) => {
            if (err) return console.log(err)
            res.render('index.ejs', {tasks: result})
        })
    })
}

// Creates a new task in MongoDb and redirects back to index.
module.exports.createTask = function(req, res) { 
    mongoClient.connect(dbConfig, (err, client) => {
        client.db('spik01').collection('tasks').save(req.body, (err, result) => {
            if (err) return console.log(err)
            res.redirect('/')
        })
    })
}

// Loads a single task and sends it to the calling page.
module.exports.loadTask = function(req, res) {
    var o_id = new ObjectId(req.params.id)
    mongoClient.connect(dbConfig, (err, client) => {
        client.db('spik01').collection('tasks').find({"_id": o_id}).toArray((err, result) => {
            if (err) return console.log(err)
            if (!result) {
                // No result, the task was not found - send back an error.
                res.send({ rec: result, errcode: 'Task not found' })
            } 
            else {
                res.send({ rec: result, errcode: '' })
            }
        })
    })
}

// Updates a task in MongoDb and redirects to index.
module.exports.updateTask = function(req, res) {
    var o_id = new ObjectId(req.body.task._id)
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
}

// Removes a task from MongoDb and sends the result to the calling page.
module.exports.deleteTask = function(req, res) {
    var o_id = new ObjectId(req.params.id)
    mongoClient.connect(dbConfig, (err, client) => {
        client.db('spik01').collection('tasks').remove({"_id": o_id}, (err, result) => {
            if (err) return console.log(err)
            res.send({ rec: result, errcode: '' }) // result.n = # of records removed
        })
    })
}
