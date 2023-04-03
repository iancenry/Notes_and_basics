# Node.js Crash Course
- It's a JavaScript Runtime, not a language or framework, and is built on the V8 JavaScript engine (same as google chrome).
- Written in C++ and essentially allows us to run JavaScript code on the server instead of in a browser environment.
- Can be used for REDT API and microservices which mostly serve JSON
- Prerequisites: HTTP (status codes, headers etc), JSON, Promises, MVC pattern

## HTTP Crash Course - Hypertext Transfer Protocol
- It's the protocol of the web an dhelps with communication between web servers and clients. It's used when loading pages, form submission, AJAX calls; this is termed as the request-response cycle - the response has headers and a body.
- HTTP is stateless i.e., every request is completely independent and the implication is that it doesn't remember anything about previous transactions.
> We can use local storage, cookies, and sessions to create enhanced UX.
- HTTPS (Hypertext Transfer Protocol Secure) - more secure since data is sent while encrypted with SSL (Secure Socket Layer) / TLS (Transport Security Layer). You have to install certificates on the web host.
- HTTP Methods
 * GET - retrieves data from server
 * POST - submit data to the server
 * PUT - update data already on the server
 * DELETE - delete data from the server

- HTTP header fields - with each request and response uding HTTP you have a header and a body, the body is usually the HTML page you're trying to load or JSON data, in short whatever is being sent by the server. When you send a request you can also send a request body e.g a form submission. The header also has response headers and request headers and a general header.
- Typical/General header, notice they are key/value pairs:
Method   URL                        Protocol
Get      /tutorials/other/coding/ HTTP/1.1
Host: net.tutorials.com
User-Agent: Mozilla/ SO.O (Winows:.......)
Accept: text/html, application/html...
.
.
.Cookie: PHPSESSIONID=jbakjmsf......

- headers and their content:
  * General: request URL, remote address, request method, referrer policy,status code 
  * Response: server(apache etc; mostly hidden from hackers), set-cookie, content-type, date. 
  * Request: cookies, set-cookie, Accept-xxx (Accept field), Authorization, Content-type, user-agent, referrer

- HTTP status code/messages:
 * 1XX (100 range) - Information; request received/processing 
    * 100 - Continue
    * 101 - Switching
    * 103 - Checkpoint
 * 2XX (200 range) - Success; successfully received, understood and accepted
    * 200 - OK
    * 201 - Created
    * 202 - Accepted
 * 3XX (300 range) - Redirection; Further action must be taken
    * 302 - Found
    * 303 - See Other
    * 304 - Not Modified
 * 4XX (400 range) - Client Error; request doesn't have what it needs
    * 401 - Unauthorized
    * 402 - Payment Req
    * 403 - Forbidden
    * 404 - Not Found
    * 406 - Not Acceptable
    * 410 - Gone
 * 5XX (500 range) - Server Error; Server failed to fulfill an apparent valid request
    * 500 - Server Error
    * 502 - Bad Gateway
    * 504 - Timeout


## Why Use Node
- Fast. efficient, and highlt scalable
- Event driven, runs on a single loop and is non blocking I/O model
- Same language on frontend and backend. - MEAN and MERN stack.

### Non-Blocking I/O
- works on a single thread using non-blocking I/O calls; asynchronous which is good for the memory since the single thread can handle tens of thousands of concurrent connections which are held in an event loop. 
- This feature above optimizes throughput and scalabiltiy in apps with many I/O operations.
- Fast and efficient. 
**NB** Don't use node with CPU intensive apps like long running operations

## Node's Event Loop
- Single threaded and events are run asynchronously.
- Supports concurrency via events and callbacks - When an event is triggered a callback fires so this way a system doesn't have to run a process then sit and wait for it to end and then run the next like in synchronous langauges. It simply fires an event/process and moves on and once that event is fullfilled it runs in the loop.

- EventEmitter class is used to bind events and listener.

![event loop](https://user-images.githubusercontent.com/77986239/229631195-d1d1b222-0f41-4225-9705-b37a6cff502d.PNG)


## Best Types of Projects For Node
- Anything that isn't CPU intensive:
   * REST API and Microservices
   * Real time services (chat, live updates)
   * CRUD apps - blogs, shopping carts, social networks
   * Tools and utilities

## NPM - Node Package Manager
- When you download and install node you get npm which helps to install 3rd party packages (frameworks, libraries, tools etc)
- Packages get stored in the **node_modules** folder
- All dependencies are listed in a **package.json** file
- NPM scripts can be created to run certain tasks such as run a server
- Common commands:
   1. npm init - generates a package.json file
   1. npm install express - installs a package locally; express is a popular web framework
   1. npm install -g nodemon - installs a package globally

## Node Modules
- Core modules that node comes with - path, fs, http etc
- some modules/packages, 3rd party, are installed via npm
- Can create own modules - files that have an export so that you can include code from one file in another
- Syntax - create a variable and set it to require the module:
   1. const path = require('path')
   1. const myFile = require('/myFile')

*Side note - You can run JS in node's rebel which we acces by typing node*

![running JS in node](https://user-images.githubusercontent.com/77986239/229631273-d1fe823e-df0c-40dc-bca4-d45eb8bee8f8.PNG)

## Codes
 - To start:
   1. Ensure that you have installed node and npm: node --version, npm --version
   1. Run npm init, answer the questions the entry file can be index.js, app.js or server.js; to skip the questions add -y flag.
      * The package.json file records all installed dependecies so that when you move to another computer/server you just run **npm install** and all packages will be installed. Is is like a manifest file for node.js app, it has app name, versions etc.
      * package-lock.json just tracks the dependencies with their versions.
      * there can also be dev dependencies such nodemon, to install a dev dependency we write:
         ```js
            npm install --save-dev nodemon 
            //shorter way 
            npm install -D nodemon
         ```

   1. Install needed packages - everything that is installed comes from the npmjs.org repository
   1. Create your entry file such as index.js
   1. To run the file execute *node index.js or node index*; will run the JS file from the terminal since we dont run it in the browser - check later notes for alternative after editing package.json

### Dealing with modules
- You might have multiple files and these other files are modules, you will create a function/class/object which you will export  to bring into another file
```js
   //demonstrating custom modules - person.js
   const person = {
      name:"Ian",
      age:30,
   }

   class People{
      constructor(name, age= person.age){
         this.name = name
         this.age = age        
      }
      greeting(){
         console.log(`My name is ${this.name} and I am ${this.age} years old.`)
      }
   }
   //exporting one thing
   module.exports = person

   //exporting multiple
   module.exports.person = person
   module.exports.People = People

   //in index.js - since it is custom we have to include the path
   const person = require('./person')
   console.log(person)
   console.log(person.name)

   const Person = require('./person')
   const person1 = new Person('John Doe', 30)
   person1.greeting()
   //check importing multiples
```
- when you include a module, the file isn't run directly but it is wrapped in a module wrapper function that gives us access to exports, require, module,  __filename, __dirname; everything created in a file lives in that file unlike normal js where everything lives on the window object e.g:
```js
   //Everything in the file is behind the scenes wrapped with
   (function (exports, require, module, __filename, __dirname){
      //module code actually lives here

   })
```
- We can't use import **Person from './person'** like in react since node hasn't implemented that functionality. To use that syntax you have to implement babel to compile to ES6; using require is called common js and with import it's ES6

### Nodes Core Modules 
- We dont have to install them or include a path since they are included with node
1. Path module
   ```js
      const path = require('path')
      //__filename includes the path and filename of the file
      console.log(__filename, __dirname)

      const fileLocation = path.join(__dirname, 'index.js')
      console.log(fileLocation)

      //Gets Base name of file   - path_demo.js
      console.log(path.basename(__filename))

      //Directory name   - ......./refernce
      console.log(path.dirname(__filename))

      //File extension   - .js 
      console.log(path.extname(__filename))

      // create path object - {root: '/', dir : '....node_crash_course/refernce', base : 'path_demo.js', ext: 'js', name : 'path_demo'}
      console.log(path.parse(__filename))
      console.log(path.parse(__filename).base)

      // concatenate paths - great since it will put the correct delimitor, either front or back slash
      console.log(path.join(__dirname, 'test', 'hello.html'))
   ```
2. FS (file system) module

   ```js
      const fs = require('fs')
      const path = require('path')


      //1. create a folder - by default it is asynchronous so it takes a callback; paramters - the folder, options, callback function
      fs.mkdir(path.join(__dirname, '/test'), {}, err => {
         if(err) throw err; 
         console.log('Folder created...')
      })

      //2.  Create and write to file - by default it is asynchronous so it takes a callback; parameter - the file, content to write, callback function      
      fs.writeFile(path.join(__dirname, '/test', 'hello.txt'), "Hello world", err [[[]]]=> {
         if(err) throw err; 
         console.log('File create and  written to..')

         //append to existing file without overwrite; we can put appendFile in writeFile since it's async
         fs.appendFile(path.join(__dirname, '/test', 'hello.txt'), "\nI love node", (err)=>{
            if(err) throw err; 
            console.log('File written to..')
         })
      })  
      
      //4. read file' parameters - the file, character en coding and callback    
      fs.readFile(path.join(__dirname, '/test', 'hello.txt'),'utf8', (err, data)=> {
         if(err) throw err; 
         console.log(data)
      })
      

      //5. rename file; paramter - from file, to file, callback
      fs.rename(path.join(__dirname, '/test', 'hello.txt'), path.join(__dirname, '/test', 'helloworld.txt'), (err)=> {
         if(err) throw err;
         console.log("File renamed")
      })


   ```
3. OS module
   ```js
      const os = require('os')

      //platform
      console.log(os.platform())

      //CPU architecture
      console.log(os.arch())

      //CPU core info - displays info of each core
      console.log(os.cpus())

      //Free memory
      console.log(os.freemem())

      //Total memory
      console.log(os.totalmem())

      //Home dir
      console.log(os.homedir())

      //uptime  - amount of time system has been up
      console.log(os.uptime())
   ```
4. URL module
   ```js
      const url = require('url')

      //instantiate new url object
      const myUrl = new URL('http://somewebsite.com/hello.html?id=100&status=active')
      //or
      const parsedUrl = url.parse('http://localhost:8080/hello.html?id=100&status=active')

      //serialized url
      console.log(myUrl.href)
      console.log(myUrl.toString())

      // Host (root domain) - includs the port
      console.log(myUrl.host)

      // Hostname -  hostname doesn't include the port, if there
      console.log(myUrl.hostname)

      // Path name - returns actual file
      console.log(myUrl.pasthname)

      // serialized query - shows query/url parameters
      console.log(myUrl.search)

      // Params object - create an object of query parameters
      console.log(myUrl.searchParams)

      // add param - add an extra parameter
      myUrl.searchParams.append('darkMode', 'yes')
      console.log(myUrl.searchParams)

      // Loop through params
      myUrl.searchParams.forEach((value, name) => console.log(`${name}, ${value} `))
   ```

5. Event emitter module
   ```js
      const EventEmitter = require('events')

      // create emitter class
      class MyEmitter extends EventEmitter{}

      //init object
      const myEmitter = new MyEmitter()

      // event listener
      myEmitter.on('event',() => console.log('event fired'))

      //init event
      myEmitter.emit('event')
      myEmitter.emit('event')
   ```

- Practical example of event emitter
   ```js
      //in logger.js 
      const EventEmitter = require('events')
      const uuid = require('uuid') //create unique id

      // create emitter class
      class Logger extends EventEmitter{
         log(msg){
            //call event
            this.emit('message', {id: uuid.v4(),  msg})
         }
      }

      module.exports = Logger;

      //in index.js
      const Logger = require('./logger')

      const logger = new Logger()

      logger.on('message', (data) => console.log("Called listener", data))
      // emitting an event - you can emot an event and log the results to a file
      logger.log('hello world')
      logger.log('hi')

   ```

6. HTTP module - setting up a bare minimum server
   ```js
      const http = require('http')
      const { Http2ServerRequest } = require('http2')

      // create a server object
      http.createServer((req, res) =>{
         //when we get a request we want to write a response
         res.write("<h1>Hello world</h1>"); //outputs to the browser
         res.end()
      }).listen(5000,  () => console.log("server running"))

      //run -  node http_demo then go to localhost:5000 ; ctrl + c to stop server 
   ```


### Creating actual server
- Using a framework like express makes this easier

   ```js
      //in index.js
      const http  = require('http')
      const path  = require('path')
      const fs  = require('fs')
      
      //1. create server object and store it in a variable
      const server = http.createServer((req, res) =>{
         /*serving html files*/
         if(req.url === '/'){  // the url being called,  and '/' is the index.js
            fs.readFile(path.join(__dirname, 'public', 'index.html')), (err, content) => {
                  if(err) throw err
                  //write to the headers - 200 response code and content type
                  res.writeHead(200, {'Content-Type': 'text/html'})
                  //load/output content of index.html
                  res.end(content)             
            }    
         }


         /*a REST API so we are serving JSON instead of html-- normally you'll use express*/
         if(req.url === '/api/users'){  
            // hard coded but we should fetch data from a database
            const users = [
                  {name: "Bob smith",age: 40}, 
                  {name: "John Doe",age: 20}
            ]
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(users))  //JS object to JSON   
         }

      })


      //2. more effiecient way - to make filepath dynamic
      const server = http.createServer((req, res) =>{
         //build file path
         //if req.url is equal to '/' load index.html else i want whatever req.url is
         let filePath = path.join(__dirname, 'public', req.url === '/'? 'index.html' : req.url)  
         //get extension of file that is being loaded/sent
         let extname = path.extname(filePath)

         //initial content type
         let contentType = 'text/html'
         //check ext and set content type
         switch(extname){
            case '.js':
                  contentType = 'text/javascript'
                  break;
            case '.css':
                  contentType = 'text/css'
                  break;
            case '.json':
                  contentType = 'application/json'
                  break;
            case '.png':
                  contentType = 'image/png'
                  break;
            case '.jpg':
                  contentType = 'image/jpg'
                  break;
            
         }
         // load a file; read file
         fs.readFile(filePath, (err, content) => {
            if(err){
                  if(err.code === 'ENOENT'){ // page not found
                     fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(content, 'utf8')
                     })
                  }else{
                     //different error; some server error - most likey a 500
                     res.writeHead(500);
                     res.end(`Server Error: ${err.code}`)
                  }
            }else{
                  //success; no error
                  res.writeHead(200, {'Content-Type': contentType})
                  res.end(content, 'utf8')

            }
         });

      });

      const PORT = process.env.PORT || 5000
      server.listen(PORT, ()=> console.log(`server running on port ${PORT}`));
      //since we have edited the package.json we can just run - npm run dev but in deployemt  we run npm start
      
   ```

### Deploying
- Deploy to heroku using terminal, steps:
   * Check version - heroku --version
   * Login - heroku login
   * create git ignore and add everything (node_modules, reference, logger.js, person.js) except the server ie., index.js and public and package files
   * Push with git - git init, git add ., fit commit -m "initial commit"
   * Create new app on heroku, check heroku dashboard - heroku create
   * on herolu click on the newly created app, click deploy tab and grab the commands under create a new repository e.g
      * heroku git:remote -a herokuDefaultAppName   - add it as our remote repo
      * git  heroku master  - push to heroku master branch and sets any envionment vars it needs
   * open in browser - heroku open





> Check refernce folder to reference how the methods work; Run *node filename(e.g., path_demo.js)* for each file.
> Go to nodejs.org for their documentation




