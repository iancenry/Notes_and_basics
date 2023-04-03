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