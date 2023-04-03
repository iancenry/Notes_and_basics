const express = require('express');
const logger = require('./middleware/logger');
const exphbs  = require('express-handlebars')
const members = require('./Members')

const app = express();

// init custom logger middleware
app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs.engine({defaultLayout : 'main'}))
app.set('view engine', 'handlebars')


//rendering templates using a template engine; homepage route
app.get('/',(req, res) => res.render('index', { 
    //passing data
    title: 'Member App',
    members
}))


//init express body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))//handle form submission -the one in handlebars


// Members API routes
app.use('/api/members', require('./routes/api/members'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

