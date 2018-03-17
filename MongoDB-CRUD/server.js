const express = require('express');                 // npm install express --save
const bodyParser = require('body-parser')           // npm install body-parser --save
const app = express();

app.use(bodyParser.urlencoded({extended: true}))    // important to do this before starting the listner
app.set('view engine', 'ejs')                       // npm install ejs --save

app.listen(3500, function() {
    console.log('listening on 3000')
})

var taskRoute = require('./routes/taskroute')
app.get('/', (req, res) => { taskRoute.getTasks(req, res) })
app.post('/task/add', (req, res) => { taskRoute.createTask(req, res) })
app.get('/task/edit/(:id)', (req, res) => { taskRoute.loadTask(req, res) })
app.post('/task_update', (req, res) => { taskRoute.updateTask(req, res) }) 
app.get('/task_delete/(:id)', (req, res) => { taskRoute.deleteTask(req, res) })

app.get('/tabs', (req, res) => {
    res.render('tabbed.ejs', {
        data: "Tabs"
    })
})