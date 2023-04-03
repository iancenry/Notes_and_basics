const router = require('express').Router();
let User = require('../models/user.model');

//Our first endpoint is '/'. The find() method is a mongoose method that will get all users in the db as a promise
router.route('/').get((_req, res)=>{
    User.find()
        .then( users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res)=>{ 
    const username = req.body.username;     
      

    const newUser = new User({username});   

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

//this is one of the API endpoint routes that help the server perform CRUD the other is exercises.js
// const newUser = new User({
//     username: req.body.name
// })
// console.log(newUser);
//add other crud abilities