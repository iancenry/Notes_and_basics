# Express Crash Course
- it is a fast, unopinionated (basic and doesnt assume how you will build your app and api so you have full control) and minimalist web fremework for node.js.
- Express is a server side or backend framework. Used in combination with frontend frameworks  to build powerful fullstack apps.

### Why Use Express
- makes building web apps with node.js much easier
- used for both server rendered apps as well as API/microservices
- light, fast and free
- full control of request and response
- ypu can render views with express using either plain html or a template engine such as handlebars

### Basic Server Syntax
    ```js
        //bring in express using common js module syntax
        const express = require('express')

        //init express
        const app = express();
        //create endpoints/route handlers
        //accepting a gegt request from the index route(/) and a callback function that takes in a request and a response
        app.get('/', (req, res) => res.send('Hello world'));

        //listen on a port
        app.listen(5000)
    ```

### Basic Route Handling
- Handling request/routes is simple
- The request and response objects are important:
    * the request object reps the http request property for things like url parameters, query strings, any data sent within the body, http headers; all these stuff are included in the request. You can also create *middleware*  where you can change or add things to this object.
    * the response object reps the http response and you can use it to send json data, render a template, redirect etc
- We can parse incoming data with the body parser
- we dont have to put all of our routes in one file, express has a router so we can store routes in separate files and export

    ```js
        //app.get(), .post(), .put(), .delete() etc
        app.get('/', (req, res) =>{
            //within your route you can do:
                //Fetch from a DB
                //Load pages
                //return JSON
                //full access to request and response
        })
    ```

### Express middleware
- Middleware functions are functions that have access to the *request* and *response* object. Express has built in middleware but middleware also come from 3rd part packages as well as custom middleware.
- Capabilities: 
    * execute any code
    * make changes to the request/repsonse objects
    * end response cycle
    * you have to call next middleware in the stack
- Think of middleware as a stack of functions that execute whenever a request is made to the server and you can do different things within that function.


## Codes
 - To start:
   1. Ensure that you have installed node and npm: node --version, npm --version
   1. Run npm init to create a package.json file, answer the questions the entry file can be index.js, app.js or server.js; to skip the questions add -y flag.
   1. Install express and any needed packages => **npm i express**
   1. Create your entry point file such as index.js
   1. Run the server *node index.js or node index*; will run the JS file from the terminal since we dont run it in the browser.
   **NB** To avoid the need of constantly restarting server on every change install nodemon as a dev dependency, a dev dependency is only for development and isn't use in production. *npm i -D nodemon* 
    - To use nodemon, we need to add scripts to our package.json: 
        1. "start" : "node index"    - used in deployed version 
        1. "dev" : "nodemon index"    - used in deployed version 
        * to start server - *npm run dev* pr *npm start*



### Basic Syntax of server and loading a html file

    ```js
        const express = require('express');
        const path = require('path') //node.js module deals with file paths

        const app = express();

        //a route handler for /
        app.get('/',  (req,res) => {
            // from current directory go to a folder called public and load index.html
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });

        //during deployement, most likey the server will have the port number in an env var so we check that first
        const PORT = process.env.PORT || 5000;

        // the callback in the second param will let us know when the server is running
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    ```
    
**NB** Starting the server and visiting lovalhost:5000 without the app.get part in the code above will display the message **Cannot GET /** on the page meaning that it cannot not get a route handler for /
- Can do res.send(<h1>Hello World</h1>) not used too much, res.json() to send json, res.render() if you have a template engine.
- Above code not ideal since you will have to add a route manually for every page


### Serving Static Pages, Improvement on above

```js
    const express = require('express');
    const path = require('path')

    const app = express();

    //set static folder - wil automatically run index.html without routing
    //use is used when you want to include middleware
    app.use(express.static(path.join(__dirname, 'public')));

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

- We can have as many html pages as we want and directly typing localhost:5000/about.html on the search bar it will access it without needing a route for it since using express.static handles it all.
- From this you notice that unlike node js, in express we dont have to handle content type, loading html, css etc by ourself. 
- **NB** This isn't what node is used for mostly, mostly we use it to create JSON APIs so that you can connect from a frontend like react or render templates so that you can insert dynamic data and have a dynamic app.


### Middlewares and API (one route)
```js
    const express = require('express');
    const path = require('path') 
    const moment = require('moment') /*moment deals with date formating - npm i moment*/
    const members = require('./Members')

    const app = express();

    //middlware functions - they take in a request, response and next
    //calling next moves to the next middleware function in the stack
    //simple logging middleware function - logs the url thats hit and date
    const logger = (req, res, next) =>{
        console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()} `); 
        next();
    }

    // anytime we make a request the middleware will run e.g.,with postman
    // initialize the middleware - we use app.use() for middlewares
    app.use(logger);

    // simple rest API to return some JSON(This route gets all members), no need for stringify since .json() will take care of it
    app.get('/api/members',  (req, res) => res.json(members))

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```


### API With Multiple Routes
```js
const express = require('express'); 
const path = require('path') 
const members = require('./Members')
const logger = require('./middleware/logger')


const app = express();

// init middleware - logger moved to its own folder 
app.use(logger);

//get all memberss
app.get('/api/members',  (req, res) =>{
    res.json(members);
})

//Get  Single Member ---- :id is a url parameter
app.get('/api/members/:id', (req,res) =>{
    // res.send(req.params.id)   - we want the id parameter, use postman to make request
    const found  = members.some(member => member.id === parseInt(req.params.id))

    found ? res.json(members.filter(member => member.id === parseInt(req.params.id))) : res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

```


### APIs with multiple routes - Using express' router to put all similar routes in a single file
- we put our api routes in a folder called api under routes folder since not all routes are APIs where we are serving json, some routes can serve templates. So its better to have an api folder

```js
    //under routes/api/members.js
    //CRUD API,  simple rest API to return some JSON  
    const express = require('express')
    const router = express.Router();
    const members = require('../../Members')
    const uuid = require('uuid')//generates randomg ids since we arent using a DB
    

    //Read Members - This route gets all members
    router.get('/',  (req, res) =>{
        res.json(members);
    })

    // Read Member - Get  Single Member ---- :id is a url parameter
    router.get('/:id', (req,res) =>{
        // res.send(req.params.id)    we want the id parameter
        const found  = members.some(member => member.id ===parseInt(req.params.id))

        found ? res.json(members.filter(member => member.id === parseInt(req.params.id))) : res.status(400).json({msg: `No member with the id of ${req.params.id}`})
        
    });

    //create Member
    router.post('/', (req, res) => {
        // res.send(req.body)  - ignore just testing how it works on postman
        const newMember = {
            id: uuid.v4(),
            name: req.body.name,
            email: req.body.email,
            status: 'active'
        }

        if(!newMember.name || !newMember.email){
            //without the return keyword, if we dont do an else we will get an error 'headers already sent'
            return res.status(400).json({msg: 'Please include a name and email'})
        }

        members.push(newMember); // while using DB we'll use members.save(newMember)
        res.json(members)
        // for handlebars form when submitted - toredirect to root(localhost:5000/)
        // res.redirect('/')
    })


    //Update Member
    router.put('/:id', (req,res) =>{
        // check if there is an id similar to the one passed in :id
        const found  = members.some(member => member.id ===parseInt(req.params.id))

        if(found){
            const updatedMember = req.body;
            members.forEach(member =>{
                if(member.id === parseInt(req.params.id)){
                    member.name = updatedMember.name ?  updatedMember.name : member.name
                    member.email = updatedMember.email ?  updatedMember.email : member.email

                    res.json({msg: 'Member updated', member})
                }
            })
        }

        found ? res.json(members.filter(member => member.id === parseInt(req.params.id))) : res.status(400).json({msg: `No member with the id of ${req.params.id}`})
        
    });

    //Delete Member 
    router.delete('/:id', (req,res) =>{
        const found  = members.some(member => member.id ===parseInt(req.params.id))

        //the filter returns all the members except the one that was deleted
        found ? res.json({
            msg: 'Member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))}) 
            : res.status(400).json({msg: `No member with the id of ${req.params.id}`})
        
    });

    module.exports = router;

    //NB: the slash replaces (/api/members) since it has already been written in index.js as parent route

    ----------------------------------------------------------------------------

    //in index.js
    const express = require('express');

    const app = express();

    //init express body parser middleware  -  will allow us to handle raw json from postman or user input e.g when making a post request
    app.use(express.json());
    //handle form submission; url encoded data
    app.use(express.urlencoded({extended: false}))


    //members api routes
    //Parameters - parent route, the file with all the routes
    app.use('/api/members', require('./routes/api/members'));


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

```


### Rendering Server Side Templates Using A Template Engine + A simple CRUD REST API

- Usually you won't have a json API and a server rendered template(e.g handlebars). Usually, you'll either build an API so that you can have react or vue at the frontend and you are just serving json or you'll have a complete server side app where you use templates
- Express handlebars- is a template engine (search express-handlebars and check the github)

```js
const express = require('express');
const exphbs  = require('express-handlebars')
const members = require('./Members')


const app = express();

//Handlebars Middleware -- adding a middleware to ensure that it knows to use handlebars
// setting the template engine to handlebars then we set the default layout to a file called main.handlebars
app.engine('handlebars', exphbs.engine({defaultLayout : 'main'}))
app.set('view engine', 'handlebars')

//rendering templates using a template engine
//Homepage Route
// app.get('/',(req, res) => res.render('index')) 
//render the index view
app.get('/',(req, res) => res.render('index', {  //passing data
    title: 'Member App',
    members
}))

//init express body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Members API routes
//first parameter- parent route, second parameter - requiring the member.js file with routes
app.use('/api/members', require('./routes/api/members'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

> For authentication you will have some db such a mongodb and create a users model with a login and register. If building a fullstack app like you have react on the frontend, you wull deal with json web tokens where you pass a token back and forth to authenticate. and hwn using a template engine you can use passport.js (can also be used with fullstack)




