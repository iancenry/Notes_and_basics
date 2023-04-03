# Ajax Crash Course
- AJAX (Asynchronous JavaScript and XML) is a set of webdev techniques that uses various technologies on the client-side to send and receive data in various formats or create asynchronous web apps. It is just a web development technique.
- It's all done behind the scenes without needing to reload the webpage ie., can send and receive data without interfering with the display and behaviour of th existing pages.
- JSON replaced XML.
- How JSON works : 

![20230307_212246](https://user-images.githubusercontent.com/77986239/229630876-c6294271-410a-4119-b508-8edef4bc11a7.jpg)

![xhrcode](https://user-images.githubusercontent.com/77986239/229630949-30791fdf-6b62-4b0e-b4bd-c96890df5f85.PNG)


# Ajax XMLHttpRequest(XHR) Object
- XHR is an API in the form of an object, has properties and methods.  It is provided by the browser's JS environment.
- Its methods transfer data between client and server. It can be used with other protocols than HTTP and can work with data otehr than XML such as JSON and plaintext.
- AJAX requests need a server.

- Sample HTTP Status Codes
 1. 200 = 'OK'
 1. 403: "Forbidden"
 1. 404: "Not Found"
    
- readyState Values
 1. 0: request not initialized 
 1. 1: server connection established
 1. 2: request receievd
 1. 3: processing request 
 1. 4: request finished and response is ready  -- we need to make sure wer'e here


## Fetch Text File Asynchronously with Ajax call
```html
<body>
    <button id="button">Get Text File</button>
    <br><br><br>
    <div id="text"></div>
    <script>
        document.getElementById("button").addEventListener('click', loadText);
        
        function loadText(){
            //create XHR object
            let xhr =  new XMLHttpRequest();
            // function to make the request, the type of request and what file or URL we're making it to
            //OPEN function; initializes request - parameters: request type, path of the data, async(true/false)
            //sample.txt is a file with some sentence text
            xhr.open('GET', 'sample.txt', true);

            //OPTIONAL - used when you have a loaders(when you have a gif when it's loading)
            xhr.onprogress = ()=>{
                console.log("READYSTATE: ", xhr.readyState) 
            }
            //handling the response, assigned a callback function
            xhr.onload = ()=>{
                //check status of the response
                if(xhr.status == 200){ 
                    // console.log('success', xhr.responseText)
                    document.getElementById('text').innerHTML = xhr.responseText;
                }else if(xhr.status==404){
                    document.getElementById('text').innerHTML = 'file not found';
                }
            }
            //handle error
            xhr.onerror = ()=>{
                console.log('Request error')
            }
            //sends request
            xhr.send();
        }


        
        /*
         //old way used onreadystatechange instead of onload - difference is this will only work when readystate is 4
        function loadText(){
            let xhr =  new XMLHttpRequest();
            xhr.open('GET', 'sample.txt', true);

            console.log("READYSTATE: ", xhr.readyState)
           
            xhr.onreadystatechange = ()=>{
            console.log("READYSTATE: ", xhr.readyState)

            //will need both HTTP status and ready state
                if(xhr.readyState ==4 && xhr.status ===200){
                    console.log(xhr.responseText)

                }
            }
            xhr.send();
        }
        */

    </script>
    
</body>
```

### Fetching local json
```json
    //user.json
    {
        "id":1, 
        "name": "Rick", 
        "email":"rick@gmail.com"
    }

```

```json
    //users.json
    [
        {
        "id":1, 
        "name": "Rick", 
        "email":"rick@gmail.com"
        }, 
        {
        "id":2, 
        "name": "Glenn", 
        "email":"glenn@gmail.com"

        }, 
        {
        "id":3, 
        "name": "Negan", 
        "email":"negan@gmail.com"

        }
    ]
```


```html
<body>
    <main>
        <button id="button1">Get User</button>
        <button id="button2">Get Users</button>
        <br><br>
        <h1>User</h1>
        <div id="user"></div>
        <h1>Users</h1>
        <div id="users"></div>
    </main>
    

    <script>
        document.getElementById("button1").addEventListener('click', loadUser);
        document.getElementById("button2").addEventListener('click', loadUsers);
        function loadUser(){
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'user.json', true);
            xhr.onload = function(){
                if(xhr.status==200){
                    let user = JSON.parse(xhr.responseText)
                    
                    let output = '';
                    output +=`<ul>
                            <li> ID: ${user.id}</li>
                            <li> Name: ${user.name}</li>
                            <li> Email: ${user.email}</li>
                            </ul>`;
                    document.getElementById('user').innerHTML = output;
                }
            }
            xhr.send(); 
        }


        function loadUsers(){
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'users.json', true);
            xhr.onload = function(){
                if(xhr.status==200){
                    let users = JSON.parse(xhr.responseText)
                    let output = '';

                    users.forEach(user  => {
                        output +=`<ul>
                            <li> ID: ${user.id}</li>
                            <li> Name: ${user.name}</li>
                            <li> Email: ${user.email}</li>
                            </ul>`;
                        
                    });                    
                   
                    document.getElementById('users').innerHTML = output;
                }
            }
            xhr.send(); 
        }
    /**
     *  We have fetched data behind the scenes asynchrnously and outputing it without loading the page
     * **/
    </script>    

  
</body>
```

### Fetching from external API

```html
<head>
    <style>
        .user{
            display: flex;
            background: #f4f4f4;
            padding: 10px;
            margin-bottom: 10px;
            
        }
        .user ul{
            list-style: none;
        }
    </style>
</head>
<body>
    <button id="button">Load GitHub Users</button>
    <br><br>
    <h1>GitHub Users</h1>
    <div id="users"></div>

    <script>
        document.getElementById('button').addEventListener('click', loadUsers)
        function loadUsers(){
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.github.com/users', true);
            xhr.onload = function(){
                if(xhr.status == 200){
                    // || if json data => let users = this.response
                    let users = JSON.parse(xhr.responseText); 
                    let output = '';
                    for(let user in users){
                        output+=`<div class="user">
                                    <img src="${users[user].avatar_url}" alt="" width = "70" height="70">
                                    <ul>
                                        <li>ID: ${users[user].id}</li>
                                        <li>Login: ${users[user].login}</li>                                        
                                    </ul>
                                </div>`
                    }
                    document.getElementById('users').innerHTML = output;
                }
            }
            xhr.send();
        }
    </script>
    
</body>
```

### AJAX & PHP Forms
- process.php
```php
    <?php
        //connect to a database
        $localhost ="localhost:3307";
        $username ="root";
        $password =getenv("");
        $dbname= "ajaxtest";
        $con = mysqli_connect($localhost, $username, $password, $dbname);


        //check for a POST variable
        if(isset($_POST['name'])){
            $name = mysqli_real_escape_string($con, $_POST['name']);
            //echo 'POST: Your name is '.$_POST['name'];
            $query = "INSERT INTO users(name) VALUES('$name')";

            if(mysqli_query($con, $query)){
                echo 'User Added';
            }else{
                echo 'Error: '.mysqli_error($con);

            }

        }

        //check for a get variable
        if(isset($_GET['name'])){
            echo 'GET: Your name is '.$_GET['name'];

        }
    ?>
```

```html
<body>
    <h1>NORMAL GET FORM</h1>
    <form method="GET" action="process.php">
        <input type="text" name="name">
        <input type="submit" value="Submit">
    </form>

    <h1>AJAX GET FORM</h1>
    <form id="getForm">
        <input type="text" name="name" id="name1">
        <input type="submit" value="Submit">
    </form>
    <hr>
    <hr>

    <h1>NORMAL POST FORM</h1>
    <form method="POST" action="process.php">
        <input type="text" name="name">
        <input type="submit" value="Submit">
    </form>

    <h1>AJAX POST FORM</h1>
    <form id="postForm">
        <input type="text" name="name" id="name2">
        <input type="submit" value="Submit">
    </form>

    <script>
        document.getElementById('getForm').addEventListener('submit', getName);
        document.getElementById('postForm').addEventListener('submit', postName);
        function getName(event){
            event.preventDefault(); //prevent from reloading or opening new page

            let name = document.getElementById('name1').value;

            let xhr = new XMLHttpRequest();
            xhr.open('GET', `process.php?name=${name}`, true);
            xhr.onload = ()=>{
                console.log(xhr.responseText);
            }
            xhr.send();
        }


        function postName(event){
            event.preventDefault(); 

            let name = document.getElementById('name2').value;
            let params = `name=${name}`

            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'process.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = ()=>{
                console.log(xhr.responseText);
            }
            xhr.send(params);
        }
       
        /**
         * AJAX allows us to submit behind the scenes without redirecting to a php page
         **/
        
    </script>
    
</body>
```


###  Fetch users from the DB through AJAX 
- users.php
```php
    <?php
    //connect to a database
    $con = mysqli_connect("localhost:3307", "root", getenv(""), "ajaxtest");
    $query = "SELECT * FROM users";

    //get result
    $result = mysqli_query($con, $query);

    //fecth data
    $users = mysqli_fetch_all($result, MYSQLI_ASSOC);

    //take our result that's as an associative array and put it into json format and echo
    echo json_encode($users);
```

```html
<body>
    <main>
        <button id="button">Get Users</button>
        <br><br>
           <h1>Users</h1>
        <div id="users"></div>
    </main>
    

    <script>
        document.getElementById("button").addEventListener('click', loadUsers);
  
        function loadUsers(){
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'users.php', true);
            xhr.onload = function(){
                if(xhr.status==200){
                    let users = JSON.parse(xhr.responseText)
                    let output = '';

                    users.forEach(user  => {
                        output +=`<ul>
                            <li> ID: ${user.id}</li>
                            <li> Name: ${user.name}</li>
                            </ul>`;
                        
                    });                    
                   
                    document.getElementById('users').innerHTML = output;
                }
            }
            xhr.send(); 
        }
    /**
     * Read more on AJAX libraries such as Axios and JQuery when done
     * **/
    </script>    

    
</body>
```

> Check htdocs to run the php codes on XAMPP server
> There are different ways to make AJAX calls with libraries and methods such as: jQuery, Superagent, Prototype, Axios, Fetch API, Node HTTP.
