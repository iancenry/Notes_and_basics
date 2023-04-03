import React from 'react'
import axios from 'axios'


const CreateUser = () => {
  const[user, setUser] = React.useState({
    username:'',
})


function handleChange(event){
  const {name, value} = event.target;
  setUser({[name]:value})
}

function handleSubmit(e){
    e.preventDefault();
    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res =>  console.log(res.data))

    setUser({username:''})
}


  return (
    <div>
      <h3>Create New User</h3>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Username: </label>
          <input type="text"
              name = 'username'
              required
              className='form-control'
              value={user.username}
              onChange={handleChange}
            />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className='btn btn-primary' />
        </div>
      </form>
    </div>
  )
}

export default CreateUser