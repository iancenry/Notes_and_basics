//demonstrating custom modules
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

module.exports = People