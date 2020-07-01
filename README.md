# Nodejs
Learn to code a web application in NodeJS using routes and controllers to follow the MVC design pattern connecting to SQL, MySQL and MongoDB data sources.

## Creating a NodeJS App
You should have already installed the following:
- [ ] Visual Studio Code (or another IDE)
- [ ] NodeJS
- [ ] Windows Terminal 

Create a directory on your drive for all NodeJS source code.  Then create a project directory for your latest project.  Make this your current directory. 

```powershell
mkdir myApp
cd myApp
```

Next we will execute the following command to initialize the Node.js project with default settings.

```powershell
npm init -y
```

This will create package.json file in the project directory.  Under the project directory we will create a new file named index.js. 

- [ ] Create new file - index.js

Nodemon is used to monitor source code and automatically restart Node.js server whenever code changes.  

```powershell
npm i -D nodemon
```

- [ ] In package.json, around line 6 replace test script with the following.

```json
"scripts": {
    "dev": "nodemon ./index.js"
  },
```

At this point the basic structure is in place.  You could write a small application to test if everything is working. 

```js
console.log('Server is running.');
```

To start the application

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
We will start by installing Express as a project dependency.  

```powerscript
npm i express
```
Copy the following template in index.js
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

## Installing a Template Engine
To install EJS (Extended Java Script) we will add the dependency as follows.

```powershell
npm i ejs
```

Once this is installed we have a few modifications to make to our index.js file.  

- [ ] In the Required External Modules section add
```js
const ejs = require("ejs";
```

- [ ] Create a sub directory off the project directory to hold the view templates.
```powershell
mkdir views
```

- [ ] In the App Variables section add
```js
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
```

