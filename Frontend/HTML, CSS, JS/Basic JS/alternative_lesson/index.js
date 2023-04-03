{   
     
    function User(){
        this.active = false;
    }
    User.prototype.sayHello = function(){
        return this.name + " says hi"            
    }

    function Student(name, major){
        this.name = name;
        this.major = major;
    }
    // its prototype is a new user object
    Student.prototype = new User()

    function Teacher(name, teaching){
        this.name = name;
        this.teaching = teaching;

    }
    Teacher.prototype = new User()
    Teacher.prototype.sayHello = function(){
        // since this prototype is one layer closer to the teacher object it will be executed instead of the other
        return 'Teacher says hi'
    }

    let student =  new Student("Ian", "English");
    let teacher =  new Teacher("Tom", ["math", "science"]);
    console.log(student, teacher) 
    
    // instance of operator - helps check if an object is of a particular type
    console.log(teacher instanceof Teacher)
    console.log(teacher instanceof User)

}

// Caleb Curry Javascript programming All-In-One Tutorial Series
/**               Javascript Engine and Runtime
 *  Engine is what takes our code and executes it; makes it possible to make human readable code that works on a pc 
 *  JS has numeroues engines e.g, V8, chakra, nitro. Due to their differences they use a standard called ECMA Script(ES). Javascript is an implementation of that standard.
 *  Runtime environment(location where code is being executed; can be a browser or server) while the engine prrocesses that code.
 *  Can either be compiled (Just In Time(JIT) compilation) or intepreted depending on the engine.
 * 
 *                Scope
 * the Window object is the global scope. let global variable isn't a property of window object unlike a global var. Var in a block can still be accessed outside the block scope i.e., in the window object  e.g.,  {var say = "hi"}  console.log(say)
 *  (()=>{console.log("hi")})();  - IIFE(Immediately Invoked Function Expression)
 * 
 *                Data Types(Primitives and Objects)
 * JS is a dynamically types language so you dont specify types unlike statically typed language.
 * Primitives - string, number, boolean, null, undefined,symbol. Primitives are immutable, they just return a new value when trying to change them
 * Objects - arrays, functions(method is a function in an object), object. Anything that isn't a primitive is an object
 * Check if a # ia too big to be rep - let x = 9007199254740991;  console.log(Number.isSafeInteger(x))
 * Check highest number that can be rep  console.log(Number.MAX_SAFE_INTEGER)
 * Create string as an object - let myName = new String("Claire")
 *                 Increment and Decrement
 * ++variable - increase then assign,  variable++ - assign then increase
 * {
    let slicesOfPizza = 10;
    let newPizza = slicesOfPizza++;
    //let newPizza2 = ++slicesOfPizza;

    console.log('slicesOfPizza', slicesOfPizza)
    console.log('newPizza', newPizza)
    //console.log('newPizza2', newPizza2)
}
 *                 parseInt and parseFloat
 * Number.parseInt("10.932")  - everything after decimal is truncated
 * Number.parseFloat("10.932 is great")  - everything after float is truncated
 *  prototypes are how we do ineritance in javascript
 * 
 *                  String methods
 * x.includes("world"),  x.indexOf(searchc1), charAt, concat, lastindexOf, substring, substr, slice, trim(remove whitespace), repeat, split, search, replace
 * 
 *                  Loops
 * ICU(Initialization; condition; update)
 * use do while when you want to ask for something atleast once e.g guessing game where you want to only ask again if the input is wrong
 * break - get out of the loop.    continue - skip the currrent iteration and go to next iteration
 */    

// Code Samples
/**                ask for name atleast once then keep asking if wrong
 * {
    let yourName;
    do{
        yourName  = prompt("enter name")
        console.log(yourName)
        
    }while(yourName.toLowerCase() != "ian")
}
 */


/**              making a triangle
 * {
    let d = document.getElementById("destination");
    
    for(let i = 0; i < 10; i++){
        for(let j = i; j >= 0; j--){
            d.append(j + " ")
        }
        let br = document.createElement('br');
        d.appendChild(br)
    }
}

 */


/**              Largest Number
 * {
    const nums = [5,6,12,4,8,9,10, 68]
    let largest = nums[0];

    for(let i = 0 ; i < nums.length; i++){
        if(nums[i] > largest){
            largest = nums[i]
        }
       
        
    }
     console.log(largest)
    
}
 *  */ 

// Arrays and array methods
/*              add numbers to array
{
    const nums = []
    let val;
    while(nums.length < 5){
        val = prompt("Enter a number")
        nums.push(Number(val))
    }
    console.log(nums);
}
*/

/*               splice
{
    const nums = [1,2,3,4,5,6]
      deleting with splice -  deletes 3 items from index 2 and returns them
    nums.splice(2, 3)
      add with splice - adds 11-13 from index 2 and returns deleted elements which is nothing
    nums.splice(2, 0, 11,12,13)
      replace with splice - delete 4 elements from index 2 and replace with zeros
    nums.splice(2,4, 0,0,0,0)
    console.log(nums)
    
}
- other array methods - reverse, fill, .copyWithin(), .concat(), .includes(), .indexOf(), .join("can be empty or take a delimitor") - take an array & produce a string, .slice()
*/

/*               split individual words to an array
    let words = "I am a coder"
    console.log(words.split(" "))
*/

/*              sort largest to smallest
{
    const nums = [6,25,36,45,85,2]
       if return is -ve the numbers are flipped
    console.log(nums.sort((a, b)=> a-b))
    
}

*/

//Loops
/*              forEach method   - check forIn and forOf
{
    const nums = [6,25,36,45,85,2]
    
    nums.forEach(num => {
        console.log("number is: ", num )         
    });

    nums.forEach((num, i, arr) => {
        console.log("number is: ", num, "index is ", i, "from array", arr)         
    });

    
    
}

   
{
    const nums = [
        [6,25,36,45,85,2],
        [68, 55, 41,56, 98, 78],
        [58, 56,65, 86, 54 ,85]]
    
     for(let i = 0; i < nums.length; i++){
         for(let j = 0; j < nums[i].length; j++){
             console.log(nums[i][j])
         }
     }

    //each row
    let count = 0;
        
     nums.forEach(num => {        
         console.log(`row ${++count}  ${num} `)         
     });

     //each element
     nums.forEach(row =>{
        row.forEach(col =>{
            console.log(col)
        })
        console.log("~~~~~~~~~~~~")
     })
   
    
}
*/

/*               Break and Continue
{
    const nums = [
        [6,25,36,45,85,2],
        [68, 55, 41,56, 98, 78, 12, 13, 58, 98],
        [58, 56,65, 86, 54 ,84]]

    for(let i = 0; i < nums.length; i++){
        for(let j = 0; j < nums[i].length; j++){
            console.log(nums[i][j])
            if(nums[i][j] === 78){
                console.log("You found the value")
                //will go the next iteration of the inner for loop
                continue;
                // will go the next iteration of the outer for loop
                //break;
            }
            console.log("will be skipped if continue is used")
        }
    }  
    
}
                LABELS
* A label allows us to label an outer for loop and use a break or continue to got to the outer for loop instead of the one we are currently in
{
    const nums = [
        [6,25,36,45,85,2],
        [68, 55, 41,56, 98, 78, 12, 13, 58, 98],
        [58, 56,65, 86, 54 ,84]]

    outerLoop: for(let i = 0; i < nums.length; i++){
        for(let j = 0; j < nums[i].length; j++){
            console.log(nums[i][j])
            if(nums[i][j] === 78){
                console.log("You found the value")
                //similar to using break; will go to the next iteration of the outer for loop
                // switch with break and check difference in terminal
                continue outerLoop;        
                //will go out of the loop completely
                //break outerLoop;        
            }
            console.log("will be skipped if continue is used")
        }
        console.log("Ignored with continue outerLoop but not with break")
    }  
    
}

*/

/**              Dates and UNIX Timestamps
 * Constructor - speacial function that will return an instance of something e.g., Date()
 * for Date() months are zero based so go from 1-11 so new Date(1990, 11) will return Dec 1990; new Date(1919, 11, 31)
 * Unix epoch(Jan 1 1970) - sometimes we'll work with milliseconds from a particular date. new Date(0) will return 1st Jan 1970; 
       new Date(1000) will be 1000ms from the unix epoch; new Date(Date.now()) will be ms from the unix epoch ,give same answer as just new Date()
       Date.now() will give the ms figure from the unix epoch

{
    //number of days between days
    let before = new Date(2022, 11, 5)
    let after = new Date(2022, 11, 10)
    
    const ONEDAY = 1000 * 60 * 60 * 24;
    let days = (after - before)/ ONEDAY
    console.log(days + " days")
    
}
 * Date Methods - check documentation; check both setters and getters
 * 

 */

//Function definition the invocation(call)
/*                Functions
  * function overloading doesn't exist in JS but we can mimic it
  * functions are known as first class citizens meaning that functions are objects. SO functions have same capabilities as objects e.g, being assigned to a variable,  we can create an array of methods, 
    we can pass an object to an object just like we can pass a function to a function(callback function; the function that takes the callback is a higher order function), we can return functions just like objects etc
    
           Passing Arguments By Value vs By Reference
  * when we pass an argument(primitive data type) to a parameter, the value gets copied to that parameter - function square(parame){};  let argu = 5;   square(x); - so any changes to parame var do not persist outsede the function.
  * when working with objects/complex types its different since what will be stored in the var is a refernce to where the object is stored. SO when we pass the variabe as an argument to a function, the parameter will also point to the memory instead of copying it.
        so if we change that object in the function it will be visible outside the function since they both point to the same area of memory 
  * In JS everything is passed by value (the value is copied from argument to parameter); it just happens that sometimes that value is a reference so we can modify that object from a function as long as we don't reassign the paramter to a new object since the connection will be serverd
  * function declaration - function myFunc(){}   vs function expression let myFunc = function(){}


             hoisting 
{
    
    //for primitives - first our code is scanned and any vaiable declaration such as 'var x' happens first then the second step the code is executed line by line so the log is hit and gives undefined since x has already been declared
    console.log(x)
    var x = 10;
    // for functions, their  declarations are hoisted including their body so we can call the function at the top of the declaration; this is because the declaration happens on the first sweep then the call
    //for a function expression 'var doStuff=function(){}' this won't work since it works like a variable
    doStuff()
    function doStuff(){
        console.log("hey")
    }   
    
}



{ 
    //functions as first class citizens/objects i.e are treated as objects
    //1. Can assign a function to a variable
    let pow = function(x, y){
        let total = 1;
        for(let i = 0; i < y; i++){
            total *= x
        }
        return total
    }
    //2. Can add a function to an array
    let coolFunctions  = [pow];
    console.log(coolFunctions[0](2, 3))

    //3. can add a function to an object as a property i.e., a method 
    let mathFunctions = {
        power: pow
    }
    console.log(mathFunctions.power(3,3));

    //4. we can add properties to a function just like objects
    pow.description = "Will raise numbers"
    console.log(pow.description)

    //5. Can pass a function to a parameter - callback functions
    function callbackExample(callback){
        return callback(3,5);
    }
    console.log(callbackExample(pow))

    //6. Can return a function
    function returnAFunction(){
        return pow;
    }
    console.log(returnAFunction()(2, 2));

}


 */

/*                 Memoization and Algorithm Optimization
{     
    // we can attach a property to a function to keep a memory of all computed values - can be used in algorihtms that are computationally
      expensive and you don't want to repeat calculating the same thing you can use memoization by storing the record of what the result will be e.g., factorial
    // helps to maintain/persist state through numerous function calls
    pow.calculated = [];

    function pow(x, y){
        
        let total = 1;
        for(let i = 0; i < y; i++){
            total *= x
        }
        pow.calculated.push(total)
        console.log(pow.calculated)
        return total
    }
    pow(3,3)
    pow(3,3)
    pow(10,4)
}

{ 
    //using memoization to optimize an algorithm by storing key value pairs of inputs and outputs and refrencing them to see if we have already done that operation
    //checking if the # was previously calculated to avoid recaclculation - helpful for bigger projects
    //only calculates if it doesn't exist under the object assigned to the calculated property
     pow.calculated = {}
     function pow(x, y){
        //will act as the key
        let stringVersion = x + "^" + y
        console.log("string version: " + stringVersion)

        if(stringVersion in pow.calculated){
            console.log("found!")
            return pow.calculated[stringVersion]
        }

        let total = 1;
        for(let i = 0; i < y; i++){
            total *= x
        }
        //create a new key value pair
        pow.calculated[stringVersion] = total;
        console.log(pow.calculated)
        return total
    }
    pow(3,3) 
    pow(3,3)
    pow(10,4)
    pow(2,2)
    pow(10,4)  
    

}



{ 
    //Dealing with extra arguments
    function largestNum(x, ...extra){
        console.log(this)
        console.log(arguments) // another way to access the extra arguments in legacy code
        let largest = x;
        for(let i = 0; i< extra.length; i++){
            if(extra[i] > largest){
                largest = extra[i]
            }
        }
        return largest;
    }
    console.log(largestNum(4,54,34,32,234,23))
}

*/

/*                 This(Function Context) Keyword
    //This - 1)The value of this changes depending on how we call the function   2) Most of the time 'this' will refer to an object a method is attached to 
    //2 types of arguments -  explicit arguments which are typed out e.g., 5 in myFunc(5) and implicit arguments which are invisible like 'this' which can be visualized as myFunc(x, this)
{ 

    let me = {
        name: "Ian", 
        outputMe: function(){
            console.log(this)
        }
    }
    me.outputMe(); // attached to an object - invoking a function as a method

    function outputMe(){
        console.log(this)
    }
    outputMe()// attached to the window object - invoking a function as a function

    function outputMeStrict(){
        'use strict';
        console.log(this)
    }
    outputMeStrict()// strict helps to prevent common flaws - invoking a function in strict mode shows undefined

    function Person(){
        console.log(this)
    }
    let person = new Person(); //attached to a 'class object'- invoking function as a constructor

}



{ 
    //Call and Apply - call and apply allows us to change the value of this when we are invoking the function
    function doStuff(input1, input2){
        console.log(input1, input2);
        console.log(this);
    }
    doStuff.call("hello", 5, 10) //(value of this, input 1, input 2)
    doStuff.apply("hello", [5, 10])// apply is similar to call but the argumemnts are put in an array

    // Bind - also changes the value of this but gives a new function where value of this is permanently changed

    function doStuff2(input1, input2){
        console.log(input1, input2)
        console.log(this)
    }

    let newFunction = doStuff2.bind("newThis", 6, 13)
    newFunction()
    // can't use bind on arrow functions since it won't change the value of this

}


{ 
    //For arrow function 'this' depends on where the function is created rather than how it's called
    let arrow = () => this
    function normal(){
        return this;
    }
    console.log(arrow()) 
    console.log(normal())

    let functions = {
        arrow, // arrow:arrow
        normal,
        arrowTest: () => this
    }
    console.log(functions.arrow()) // this for arrow funcs will always point to the window object unlike normal funcs which depend on how they're called
    console.log(functions.normal())
    console.log(functions.arrowTest()) // even when created within an object it still points to the window object
}

*/

/*                 Debugging and Error Handling
{ 
    // debugging - go under sources in browser, set breakpoint and reload
    function factorial(x){
        let total = 1;
        for(let i = x; i > 1; i--){
            total *=i
        }
        return total
    }
    console.log(factorial(5))

    //Error handling - try{}catch(e){}finally{executed no matter what}. Control flow(ie.if else, switch etc) is preferred over error handling
    //throwing our own error
    function doSomething(){
        throw{error: "Tis broke", code: -1}
    }

    try{
        doSomething()
    }catch(e){
        console.log(e)
    }finally{
        console.log("wrapping things up")
    }    
}
*/

// Object Oriented Programming - constructors(classes), prototypes(inheritance), polymorphism
/*                 Constructos And Factory Functions
{ 
    //Object Oriented Programming  - a consturctor(similar to class in other languages) function takes info and gives a new object as output
    //'this' keyword in the constructor function will refer to the new object we're creating
    function User(name, interests){
        this.name = name
        this.interests = interests
    }
    let me = new User("Ian", ["reading", "coding", "cooking"])
    me.membership = "Gold"    
    console.log(me)

    //Factory Functions - almost similar to constructor(preferred)
    function newUser(name, interests){
        let person = {
            name: name, 
            interests: interests
        }
        return person
    }

    let you = newUser("Caleb", ["eating", "youtube"])
    console.log(you)

}
*/

/*                  Prototypes
In inheritance - an object can have access to properties on a prototype 
    //Prototypes - can be thought of as inheritance; it will be the parent object of a constructor. The greet method is inherited by all objects
    //mostly all methods of an object are put in a prototype, helps to prevent duplication since all objects will share the prototype
    //constructors transfer the prototype of a function to each object that is created  - so each object will share the single prototype object which saves memory
    
{ 
    
    function User(name, interests){
        this.name = name
        this.interests = interests
    }

    User.prototype.greet = function(){
        console.log('my name is ' + this.name, this.interests)
    }
    let me = new User("Ian", ["reading", "coding", "cooking"])
    console.log(me)
    me.greet()

}


{ 
    //setting prototypes manually for object literals
    //main reason to create a prototype object is when you have several objects that are similar in nature buut might have some minor differences. The common functionalities are put ina prototype
    let user = {
        active: true
    }

    let teacher = {
        teaching: ["math", "science"]
    }
    //setting prototype of teacher to be user
    Object.setPrototypeOf(teacher, user)
    console.log(teacher.active)

}


{ 
    //override a value(prototype property) in the prototype of an object
    // name is first searched in the object if not found the next prototype then the next prototye until it gets undefied
    let user = {
        active: true,
        sayHello: function(){
            return this.name + " says hi"            
        }
    }

    let teacher = {
        name: "Tom",
        teaching: ["math", "science"]
    }

    let student = {
        name: "Ian",
        major: "English"
    }

    Object.setPrototypeOf(teacher, user)
    Object.setPrototypeOf(student, user)

    student.active = false; // the false is set directly on the object not its prototype

    console.log(teacher.active)
    console.log(student.active)

    console.log("teacher", teacher.sayHello())
    console.log("student", student.sayHello())

}
*/

/*                  Polymorphism
Polymorphism - can treat numerous types as one type e.g student and teacher are users(parent)

{ 
    
    let user = {
        active: true,
        sayHello: function(){
            return this.name + " says hi"            
        }
    }

    let teacher = {
        name: "Tom",
        teaching: ["math", "science"],
        sayHello: function(){
            let message = this.name + " teaches ";
            this.teaching.forEach((e)=>{
                message += e + " "
            })
            return message
        }
    }

    let student = {
        name: "Ian",
        major: "English"
    }

    Object.setPrototypeOf(teacher, user)
    Object.setPrototypeOf(student, user)

    student.active = false; 

    console.log(teacher.active)
    console.log(student.active)

    // polymorphism 
    let newMembers = [teacher, student]; //a collection 

    newMembers.forEach(function(e){
        console.log(e.sayHello())
    })

}

*/


/*                  checking if property exists in an object
{ 
    let teacher = {
        name: "Tom",
        teaching: ["math", "science"],
        sayHello: function(){
            let message = this.name + " teaches ";
            this.teaching.forEach((e)=>{
                message += e + " "
            })
            return message
        }
    }

    //check if a property exist in an object
    console.log("Name in teacher? ", "name" in teacher )
    //or
    console.log("Name in teacher? ", teacher.name !== undefined ) 
    //or - difference is this method won't check the prototypes only the direct object itself
    console.log("Name in teacher? ", teacher.hasOwnProperty("name") ) 


    //lists properties both directly on the object and its prototypes
    let allProperties = []    
    for(let prop in teacher){
        allProperties.push(prop)
    }
    console.log(allProperties)

    //lists properties only directly on the object
    let directProperties = []
    for(let prop in teacher){
        if(teacher.hasOwnProperty(prop)){
            directProperties.push(prop)
        }
    }
    console.log(directProperties)

}
*/

/*                  Converting object Literals to Constructor 
The first code sample is use of object literals and the second is the same code as a constructor
{ 
// user, teacher,student are object literals
    let user = {
        active: true,
        sayHello: function(){
            return this.name + " says hi"            
        }
    }

    let teacher = {
        name: "Tom",
        teaching: ["math", "science"],
        sayHello: function(){
            let message = this.name + " teaches ";
            this.teaching.forEach((e)=>{
                message += e + " "
            })
            return message
        }
    }

    let student = {
        name: "Ian",
        major: "English"
    }

    Object.setPrototypeOf(teacher, user)
    Object.setPrototypeOf(student, user)

    student.active = false; 

    console.log(teacher.active)
    console.log(student.active)

   
    let newMembers = [teacher, student];

    newMembers.forEach(function(e){
        console.log(e.sayHello())
    })


}



{ 
    // can easily use a loop to create new students so constructors are much more scalable
    
    function User(){
        this.active = false;
    }
    User.prototype.sayHello = function(){
        return this.name + " says hi"            
    }

    function Student(name, major){
        this.name = name;
        this.major = major;
    }

    function Teacher(name, teaching){
        this.name = name;
        this.teaching = teaching;

    }

    let student =  new Student("Ian", "English");
    let teacher =  new Teacher("Tom", ["math", "science"]);
    console.log(student, teacher)   

}

*/

/*
final code of constructor
{   
     
    function User(){
        this.active = false;
    }
    User.prototype.sayHello = function(){
        return this.name + " says hi"            
    }

    function Student(name, major){
        this.name = name;
        this.major = major;
    }
    // its prototype is a new user object
    Student.prototype = new User()

    function Teacher(name, teaching){
        this.name = name;
        this.teaching = teaching;

    }
    Teacher.prototype = new User()
    Teacher.prototype.sayHello = function(){
        // since this prototype is one layer closer to the teacher object it will be executed instead of the other
        return 'Teacher says hi'
    }

    let student =  new Student("Ian", "English");
    let teacher =  new Teacher("Tom", ["math", "science"]);
    console.log(student, teacher) 
    
    // instance of operator - helps check if an object is of a particular type
    console.log(teacher instanceof Teacher)
    console.log(teacher instanceof User)

}

extras
{
    // create a dynamic list almost like a shopping list
    let button = document.getElementById("btn")

    button.addEventListener('click', ()=>{
        let node = document.createElement('li')
        console.log(node)

        node.appendChild(document.createTextNode(document.getElementById("input").value))
        let list = document.getElementById("items")
        list.appendChild(node)
    })

     //traversing structure using children
     console.log("accessing child nodes", document.childNodes)
     let list = document.childNodes[1].childNodes[2].childNodes[3]
     console.log("the unordered list element", list)
     console.log("the parent element", list.parentElement)
     // innerhtml, getElementByTagName
}

*/