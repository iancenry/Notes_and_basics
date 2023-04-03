# Fetch and JSON Basics

## Using Fetch
- Fetch is an easy way to make HTTP requests for retrieving data
- Fetch is defined as part of the window object not a feature of the javascript language
- Fetch return a promise and we use that promise to access a response from the website and in that response is the data we are trying to see.

```js
    /**
     * rewatch - https://www.youtube.com/playlist?list=PLTo9PCskHpbEgADkuuzvbQmHp9Ij4wU0n   YT -  All Things JavaScript, LLC
     * fetch API only runs in a server
     * @param  {} "./data.json" -  path or url to the file
     * @param  {} .then(response=>response.json() - handling the promise with .then() method, then we receive a response which i return the response after converting from json format to an object
     * @param  {} .then(data=>console.log(data) - after conversation we can now use the data
     */

    'use strict';
    fetch("./data.json")    
        .then(response => response.json())  
        .then(data => console.log(data))  
```

### Using Fetch with Request
- using request allows us to pass init object which define the request
```json
    //data.json
    {
    "name": "SpongeBob", 
    "favNumber": 4,
    "isProgrammer": true,
    "hobbies": ["making krabby patties", "snail walking"],
    "bestFriends":["squidward", "patrick"]
    }
```

```js
    'use strict'
    let myInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode:'cors',
        cache: 'default'
    };
    let myRequest = new Request("./data.json", myInit);
    fetch(myRequest)    
        .then(response => response.json())  
        .then(data => console.log(data))  
```


### Accessing JSON data
```js
    let theName, theFavNumebr, theIsProgrammer, 
        theHobbies = [], theBestFriends = [], 
        mainObj = {};
    let showObj = ()=>{
        for(let prop in mainObj){  // wont work because fetch is asynchronous that's why i put it in a function and call the function in the fetch API
            console.log(prop + " = " + mainObj[prop]);
        }    

    }

    fetch("./data.json")    
        .then(response => response.json())  
        .then(data => {
            theName = data.name;
            theFavNumebr = data.theFavNumebr;
            theIsProgrammer = data.isProgrammer;
            theHobbies = data.hobbies;
            theBestFriends = data.bestFriends;
            mainObj = data;
            showObj();
        
        })  

```


### Working with an image in fetch API
```html
    <body>
        <img src="" id="nai" alt="">
        <script src="theImage.js" async defer></script>
    </body>
```

```js
    fetch('.images/nai.jpg')
        .then(response=> response.blob())
        .then(blob=>{
            console.log(blob)
            document.getElementById('nai').src=URL.createObjectURL(blob);
        });
```
###  Using Fetch to Retrieve Cryptocurrency Data
```js
    const APIKEY =  {
        key: '61e3f8b6-8d68-49e1-898a-13cec5ce0c9a'
    }
    let url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', 
        queryString= '?CMC_PRO_API_KEY=' + APIKEY.key+'&start=1&limit=5&convert=USD';
                
    let urlTwo = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/info', 
        queryStringTwo= '?CMC_PRO_API_KEY=' + APIKEY.key+'&symbol=BTC';
    let urlThree = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', 
        queryStringThree= '?CMC_PRO_API_KEY=' + APIKEY.key+'&symbol= BTC, ETH, LTC';



            
    fetch(url + queryString)
        .then(response => response.json())
        .then(data=> console.log(data))
```

### Handing failed HTTP request with fetch
- the function checkFetch will always be called whenever there is a http request - purpose is to check if http request is successful; also takes a response object and is reusable
```js
let checkFetch = (response)=> {
    if(!response.ok){
        throw Error(response.statusText + " _ " + response.url);        
    }return response; 
}

fetch("./data.jsonsssssssssssssssssssssssssss")    
    .then(checkFetch)
    .then(response => response.json())
    .then(data => console.log(data.name))
    .catch(err => {
        console.log("Error", err)
})
``` 

### Displaying JSON data in html
```json
    //users.json
    {
        "users":[
            {
            "name":"Ian Cenry", 
            "age":21, 
            "skills": ["Javascript", "React", "Python"]
            }, 
            {
            "name":"Tom Cruise", 
            "age":29, 
            "skills": ["SQL", "Django", "Mongo"]

            }
        ]
        
    }
```

```html
    <body>      
        <h1>JSON USER LIST</h1>
        <ul></ul>

        <h2>TODO list</h2>
        <ol id="todos"></ol>

        <script >
            let list = "";
            fetch("./users.json")
                .then(response => response.json())
                .then(data=>{
                    data.users.forEach(user => {
                        list += `<li>${user.name} </li>`                        
                    });
                    document.querySelector("ul").innerHTML = list;
                });

            //list of all TODOs
            let todos = ""
            fetch("https://jsonplaceholder.typicode.com/todos")
                .then(response => response.json())
                .then(data=>{
                    data.forEach(todo =>{
                        todos += `<li>${todo.title} </li><br>` 
                        document.getElementById('todos').innerHTML = todos
                    })
                });

        </script>
    </body>
```

## JSON (JavaScript Object Notation)
- It's a data representation format. It's structured like a JS object literal.
- Commonly used for APIs and configs. Also used to store and exchange data between client and server in the form of APIs.
- It's lightweight and easy to read and write.
- JSON types => Strings, Numbers, Booleans, null, arrays, objects.
**NB** An array/object is included as a top level of the file and in it we have other values.
- Comes with two methods:
    * parse() - convert JSON string to JS object.
    * stringify() - reverse parse()
- JSON syntax rules:
    * uses key/value pairs.
    * must use specified data types.
    * uses double quotes to surround both key and values.
    * MIME type - is 'application/json'

```json
{
  "users": [
    {
      "id": "1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@gmail.com",
      "age": 34
    },
    {
      "id": "2",
      "firstName": "Mark",
      "lastName": "Williams",
      "email": "mark@gmail.com",
      "age": 33
    },
    {
      "id": "3",
      "firstName": "Sara",
      "lastName": "Smith",
      "email": "sara@gmail.com",
      "age": 23
    },
    {
      "firstName": "Tom",
      "lastName": "Cruise",
      "age": 35,
      "email": "tomt@gmail.com",
      "id": "B1Ww3BIS-"
    }
  ]
}
```