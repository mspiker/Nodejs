const mongoClient = require('mongodb').MongoClient  // npm install mongodb --save
var dbConfig = 'mongodb://nodejs:nodejs3000!@ds257858.mlab.com:57858/spik01'
var ObjectId = require('mongodb').ObjectId

module.exports.getTasks = function(req, res) {
    mongoClient.connect(dbConfig, (err, client) => {
        client.db('spik01').collection('tasks').find().toArray((err, result) => {
            if (err) return console.log(err)
            res.render('index.ejs', {tasks: result})
        })
    })
}

module.exports.createTask = function(req, res) { 
    mongoClient.connect(dbConfig, (err, client) => {
        client.db('spik01').collection('tasks').save(req.body, (err, result) => {
            if (err) return console.log(err)
            console.log('Item saved to database')
            res.redirect('/')
        })
    })
}

module.exports.loadTask = function(req, res) {
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
}

module.exports.updateTask = function(req, res) {
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
}

module.exports.deleteTask = function(req, res) {
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
}
