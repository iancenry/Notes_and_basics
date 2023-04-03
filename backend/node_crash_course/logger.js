const EventEmitter = require('events')
const uuid = require('uuid') 

// create emitter class
class Logger extends EventEmitter{
    log(msg){
        //call event
        this.emit('message', {id: uuid.v4(),  msg})
    }
}

const logger = new Logger()

logger.on('message', (data) => console.log("Called listener", data))
// emitting an event
logger.log('hello world')
logger.log('hi')
logger.log('hola')

