# Nodejs
Learn to code a web application in NodeJS using routes and controllers to follow the MVC design pattern connecting to SQL, MySQL and MongoDB data sources.

## Creating a NodeJS App
You should have already installed the following:
- [ ] Visual Studio Code (or another IDE)
- [ ] NodeJS
- [ ] Windows Terminal 

### Setting up the environment
- [ ] Create the project directory in your code repository.
```powershell
mkdir myApp
cd myApp
```

- [ ] Initialize the project with default settings, make sure the currect directory is the project directory.
```powershell
npm init -y
```
- [ ] Create index.js, this will become our server and main entry point.  Can be empty for now. 
- [ ] Install Nodemon, to monitor source code and automatically restart Node.js server whenever code changes.  
```powershell
npm i -D nodemon
```
- [ ] Modify package.json (around line 6); replace test script with the following.
```json
"scripts": {
    "dev": "nodemon ./index.js"
  },
```
---
At this point the basic structure is in place.  You could write a small application to test if everything is working. 
```js
// index.js
console.log('Server is running.');
```

To start the server
```powershell
npm run dev
```

## Preparing for Git
Create a .gitignore file under the project directory.  Below is a good starting point for this file.

```
node_modules/
*.cert
*.key 
```

## Integrating the Express Web Framework
- [ ] Install Express as a project dependency.
```powerscript
npm i express
```
If you run into permission issues see this link showing how to exclude the node_modules directory from Virus protection.  https://stackoverflow.com/questions/56829352/error-the-operation-was-rejected-by-your-operating-system-when-trying-to-crea.

Copy the code below into index.js, we will modify later.  
```js
/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    res.status(200).send("myApp");
  });

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
```
---
At this point a basic server should start and serve up the text "myApp" by navigating your browser to http://localhost:8000.

## Installing a Template Engine
- [ ] Install EJS (Extended Java Script) we will add the dependency as follows.
```powershell
npm i ejs
```
### Modifications to index.js and folder structure
Once installed we have a few modifications to make to our index.js file.  

- [ ] In the Required External Modules section add
```js
const ejs = require("ejs";
```

- [ ] Create sub directories off the project directory to hold the view templates.
```powershell
projectFolder
|
|-- views
    |
    |-- pages
```

- [ ] In the App Configuration section add
```js
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("./public"));
```

- [ ] Modify the Routes Definitions section to be as follows
```js
app.get("/", (req, res) => {
    res.render('pages/home');
  });
```

## Creating the basic framework 

- [ ] Create head.ejs under views/template
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="ie-edge" />
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        <!-- Markdown Support -->
        <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2/webcomponents-loader.min.js"></script>
        <script type="module" src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@1/src/zero-md.min.js"></script>
        <title>My App Title</title>
    </head>
```

- [ ] Create home.js under views/pages
```js
<%- include('../template/head')-%>

<body>
    <nav class="navbar navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="#">My Application</a>
        <div>
            <button class="btn btn-outline-success my-2 my-sm-0">Login</button>
        </div>
    </nav>

    <div class="container-fluid" style="margin-top: 100px;">
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>This is a prototype application. </strong> Some features may not work properly, it is meant to provide an idea on the design of the production ready application.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</body>
</html>

<%- include('../template/scripts')-%>
```

---
https://auth0.com/blog/create-a-simple-and-stylish-node-express-app/#Serving-Static-Assets-with-Express
https://medium.com/swlh/master-ejs-template-engine-with-node-js-and-expressjs-979cc22b69be
