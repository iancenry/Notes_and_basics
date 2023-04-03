# Async Javascript
- Javascript is single threaded i.e, only one thing can happen at a time on a single main thread and everything else is blocked until an operation is complete since code is run sequentially.
**NB** Many computers now have multiple cores, so they can do multiple things at once. Programming languages that can support multiple threads can use multiple cores to complete multiple tasks simultaneously.
- Async JS technologies help us ensure that some code run in parallel with others

## Async-Await, Callbacks, and Promises 
- These are ways to deal with asynchronous data. Asynchronous is when processes are happening in parallel.
- Promises replaced callbacks which where then replaced by async-await syntax.

### Callbacks
- Callback functions are functions passed as arguments within other function and called within that function to complete a routine/action e.g the function called within the addEventListener function
**NB** A callback function doesn't have paranthesis since it will be called immeadiately:
```js
    //callback
    function toggle(){}
    button.addEventListener('click', toggle)

    button.addEventListener('click', ()=>{})

    button.addEventListener('click', function(){})

    setTimeout(firstAction, 5000)

    setTimeout(()=> firstAction(secondAction), 5000)


    //not callback - event listener callbacks have paranthesis opened
    function toggle(color){}
    button.addEventListener('click', toggle('green'))

    button.addEventListener('click', myfunc())

    setTimeout(firstAction(secondAction), 5000)
 
```
- Mimicing a blog post on a server - this could take some seconds that's why we are using setTimeout

```jsx
    const posts = [
        {title:'Post One', body:'This is post one'},
        {title:'Post Two', body:'This is post two'}
    ];

    function getPosts(){
        setTimeout(()=>{
            let output = '';
            posts.forEach((post)=>{
                output+=`<li>${post.title}</li>`;
            })
            document.body.innerHTML = output;
        }, 1000);

    };

    function createPost(post){
        setTimeout(()=>{
            posts.push(post);
        },2000);

    };

    getPosts();
    createPost({title: 'Post Three', body: 'This is post three'});
```
-  We won't see the create post since it took longer than the getPost so by the time we move to createPost the DOM was already painted. This where async programming and callback comes in which is one way to handle it
-  we make the createPost take in a function and  we want that function called right after the post is pushed

```js
    const posts = [
        {title:'Post One', body:'This is post one'},
        {title:'Post Two', body:'This is post two'}
    ];

    function getPosts(){
        setTimeout(()=>{
            let output = '';
            posts.forEach((post)=>{
                output+=`<li>${post.title}</li>`;
            })
            document.body.innerHTML = output;
        }, 1000);

    };

    function createPost(post, callback){
        setTimeout(()=>{
            posts.push(post);
            callback();
        },2000);

    };

    createPost({title: 'Post Three', body: 'This is post three'}, getPosts);
```


### Promises
- A JavaScript Promise object contains both the producing code and calls to the consuming code(code that must wait for the result)
- Can be done with with XMLHttprequest object, fetch API or creating a function that returns a promise
- Fetch needs two .then()s which all receive callbacks beacuse you first need to format it to JSON then the next one will actually give you the data
- Promises are put in an event queue

```js
const posts = [
    {title:'Post One', body:'This is post one'},
    {title:'Post Two', body:'This is post two'}
];

function getPosts(){
    setTimeout(()=>{
        let output = '';
        posts.forEach((post)=>{
            output+=`<li>${post.title}</li>`;
        })
        document.body.innerHTML = output;
    }, 1000);

};

function createPost(post){
    //return a promise, then a promise takes in 2 - a callback which takes in 2 parameters - resolve and reject
    // when you want to resolve a promise successfully you call resolve and when there is an error we call reject
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            posts.push(post);

            //normally you do some error checking
            const error = false;

            if(!error){ 
                resolve();
            }else{
                reject('Error: Something went wrong')
            }


        },2000);        
    });  

};

createPost({title:'Post Three',body:'This is post three'})
    .then(getPosts)
    .catch(err=>console.log(err));
```

- Using **promise.all** - alternatively if you have several promises, you dont want to keep having to use .then everytime so we can use promise.all() which takes an array of promises; will take however long the longest promise is to show us the values
```js
    const promise1 = Promise.resolve('Hello World');
    const promise2 = 10;
    const promise3 = new Promise((resolve, reject)=>{
        setTimeout(resolve ,2000, 'Goodbye')
    });
    const promise4 = fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());

    Promise.all([promise1, promise2, promise3, promise4]).then((values)=>{
        console.log(values);
    }); 

```


### Async and Await
-  async and await make promises easier to write. async(makes a function return a Promise) and await(makes a function wait for a Promise). They can be seen as synctatic sugar that make promises look more readable like old school synchronous code
-  async/await is a way to handle responses, it's not a different way to write them
-  cleaner than callbacks and promises

```js

 const posts = [
    {title:'Post One', body:'This is post one'},
    {title:'Post Two', body:'This is post two'}
];


function getPosts(){
    setTimeout(()=>{
        let output = '';
        posts.forEach((post)=>{
            output+=`<li>${post.title}</li>`;
        })
        document.body.innerHTML = output;
    }, 1000);

};


function createPost(post){

    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            posts.push(post);

            const error = false;

            if(!error){ 
                resolve();
            }else{
                reject('Error: Something went wrong')
            }


        },2000);        
    });  

}


async function init(){
    await createPost({title:'Post Three',body:'This is post three'});
    getPosts();
}

init();


//async/await with fetch
async function fetchUsers(){
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data
}
//since fetchUsers is an async function it will return a promise; we chain with .then and catch
fetchUsers().then(data => console.log(data)).catch(err => console.log(err.message));
```



