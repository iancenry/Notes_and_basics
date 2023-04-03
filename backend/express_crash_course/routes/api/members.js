const express = require('express')
const router = express.Router();
const members = require('../../Members')
const uuid = require('uuid')

//Read Members - This route gets all members
router.get('/',  (req, res) =>{
    res.json(members);
})

// Read Member - Get  Single Member ---- :id is a url parameter
router.get('/:id', (req,res) =>{
    const found  = members.some(member => member.id ===parseInt(req.params.id))

    found ? res.json(members.filter(member => member.id === parseInt(req.params.id))) : res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    
});

//create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg: 'Please include a name and email'})
    }

    members.push(newMember);
    res.json(members)
    // for handlebars form when submitted
    // res.redirect('/')
})


//Update Member
router.put('/:id', (req,res) =>{
    const found  = members.some(member => member.id ===parseInt(req.params.id))

    if(found){
        const updatedMember = req.body;
        members.forEach(member =>{
            if(member.id === parseInt(req.params.id)){
                member.name = updatedMember.name ?  updatedMember.name : member.name
                member.email = updatedMember.email ?  updatedMember.email : member.email

                res.json({msg: 'Member updated', member})
            }
        })
    }

    found ? res.json(members.filter(member => member.id === parseInt(req.params.id))) : res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    
});

//Delete Member 
router.delete('/:id', (req,res) =>{
    const found  = members.some(member => member.id ===parseInt(req.params.id))

    found ? res.json({
        msg: 'Member deleted',
        members: members.filter(member => member.id !== parseInt(req.params.id))}) 
        : res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    
});

module.exports = router;

// placing all routes in one folder
//the slash replaces (/api/members) since it has already been written in index.js as parent route
