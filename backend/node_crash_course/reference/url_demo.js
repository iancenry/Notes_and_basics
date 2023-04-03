const url = require('url')

const myUrl = new URL('http://mywebsite.com/hello.html?id=100&status=active')

//serialized url
console.log(myUrl.href)
console.log(myUrl.toString())

// Host (root domain)
console.log(myUrl.host)

// Hostname -  hostname doesn't include the port, if there
console.log(myUrl.hostname)

// Path name
console.log(myUrl.pasthname)

// serialized query
console.log(myUrl.search)

// Params object
console.log(myUrl.searchParams)

// add param
myUrl.searchParams.append('darkMode', 'yes')
console.log(myUrl.searchParams)

// Loop through params
myUrl.searchParams.forEach((value, name) => console.log(`${name}, ${value} `))




