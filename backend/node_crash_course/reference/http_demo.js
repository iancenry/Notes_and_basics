const http = require('http')
const { Http2ServerRequest } = require('http2')

// create a server object
http.createServer((req, res) =>{
    res.write("Hello world"); 
    res.end()
}).listen(5000,  () => console.log("server running"))
