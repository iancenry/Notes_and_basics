//Array iteration
//for each - does something for each item - doesn't return anything
[1, 2, 3].forEach((item, index) => { console.log(item, index) });
[1, 2, 3].forEach(num => { console.log(num + " again") });

//map  - do something to each element in the array - returns new array
const doubled = [1, 2, 3].map(item => item * 2);
console.log(doubled)

//filter - check each item against some condition, if true item is put in array if false it isn't put in the array
const evenNums = [1, 2, 3, 4].filter(item => item % 2 === 0);
console.log(evenNums)

//reduce-  do something then pass the result to the next iteration along with the next item on the array
// the 0 at the end is what the initial result will be , if left out the the first element will be the initial result
const sum = [1, 2, 3].reduce((result, item) => result + item, 0)
console.log(sum)

//some -  check if any item meets the condition
const hasNegativeNumbers = [1, 2, 3, -1, 4].some((item) => item < 0)
console.log(hasNegativeNumbers)

//every - check if every item meets the conndition
const allPositiveNumbers = [1, 2, 3].every((item) => item > 0)
console.log(allPositiveNumbers)

//find -  goes through every item and checks it against a condition, if true it returns that item, searches for a specific item
const objects = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
const found = objects.find(item => item.id === 'b')
console.log(found)

//find index
const objects2 = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
const foundIndex = objects2.findIndex(item => item.id === 'b')
console.log(foundIndex)



//---Learn JavaScript - Full Course for Beginners ----FCC
// Edit array - .push(), .pop(), .shift(), .unshift(),.splice(startIndex, numOfElements), NB: .filter() will create new array
//string to array - .split(""), loop though array index - for(let num in nums){}, loop though array index - for(const num of nums){} 
//array tostring that can eaily be printed out - console.log(JSON.stringify(array))
//typeof 5,   local var takes precednce over global var, check map, reduce, forEach etc
// Math - .round(), .sqrt(), (.random()*10) + 1,.pow(num,power), .floor(), .ceil()
// random num within a range - Math.floor(Math.random()*(max-min+1)) + min;
//make copy of object / let objectCopy = JSON.parse(JSON.stringify(objectName));
//string to num -parseInt(someString),adding radix allows different bases
// let doesn't let you declare a varibale twice unlike var , const creates read only variables but doesn't stop mutation of an array or object
//use Object.freeze(objectName) to prevent object mutation
// "use strict;"  -  captures common coding mistakes and unsafe actions
// anonymous function - let func = function(){}   ||  let func = () =>{}   i.e- let myConcat = (arr1, arr2) => arr1.concat(arr2);
// higher order functions - map,filter, reduce - they take functions as arguments for processing data
//console.log(Number.isInteger(6))  ----true
// default parameters - (number, value=1)=>{}
// rest operator - allows creation of a function that takes variable number of arguments-  functions sum(...args){}
// spread operator allows us spread out an array to its individual parts(can only be used as a function argument or in an array)
// spread operator- copying one array to another - let arr2 = [...arr1]; 
// template literals(use back ticks) - `I am a man` - allow us to add variables and also create multi line strings
// supplements these notes with the screenshots

/**************************************************************************/
/*let num = 5;
switch (num) {
    case 1:
    case 2:
    case 3:
    case 4:  
    case 5:
        console.log("num is 5 or less")
        break;
    case 6:
        console.log("num is 6")

    default:
        console.log("none")
        break;
}*/

/**************************************************************************/
/*let dog = {
    "name": "Quincy",
    "total legs": 4,
    "friends": ["Leo", "Ruby"]
}
dog['name'] = "Max";
dog.tails= 1;
delete dog.tails;
console.log(dog.hasOwnProperty("friends"))
*/
/**************************************************************************/

// profile lookup
/*const contacts = [{
        firstName: "Akira",
        lastName: "Laine",
        number: "0543236543",
        likes: ["Pizza", "Coding", "Brownie Points"],
    },
    {
        firstName: "Harry",
        lastName: "Potter",
        number: "0994372684",
        likes: ["Hogwarts", "Magic", "Hagrid"],
    },
    {
        firstName: "Sherlock",
        lastName: "Holmes",
        number: "0487345643",
        likes: ["Intriguing Cases", "Violin"],
    },
    {
        firstName: "Kristian",
        lastName: "Vos",
        number: "unknown",
        likes: ["JavaScript", "Gaming", "Foxes"],
    },
];


function lookUpProfile(name, prop) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].firstName == name) {
            return contacts[i][prop] || "No such property";

        } else {
            return "Name does not exist"
        }

    }


}
console.log(lookUpProfile("Akira", "likess"));
*/
/**************************************************************************/

// interger numbers more than zero then square
/*const realNumberArray = [4, 5.6, -9.8, 3.14, 42, 6, 8.34, -2]
const squareList = (arr) => {
    const squaredIntegers = arr.filter(num => Number.isInteger(num) && num > 0).map(x => x * x)
    return squaredIntegers
}
console.log(squareList(realNumberArray))*/


/**************************************************************************/
/*
// destructuring assignemt - neatly assign bit values taken from an object to a variable
let vox = { x: 3.6, y: 7.4, z: 6.54 }
let { x: a, y: b, z: c } = vox
console.log(a);
//destructuring can also be used to pass objects as arguments - normally used with API calls
const stats = {
    max: 56.78,
    standard_deviation: 4.34,
    median: 34.54,
    mode: 23.87,
    min: -0.75
};
const half = (function() {
    return function half({ max, min }) {
        return (max + min) / 2.0;
    };
})();

console.log(half(stats)) */


/**************************************************************************/
/*// convert both index.js and other.js to index.mjs and other.mjs
import { capitalizeString } from "./other.mjs";


const cap = capitalizeString("hello");
console.log(cap);*/





/*****************************************************/
//Capitalize name
name[0].toUpperCase()+name.slice(1)


