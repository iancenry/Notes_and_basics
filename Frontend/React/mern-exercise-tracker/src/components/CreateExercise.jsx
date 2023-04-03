import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'

const CreateExercise = () => {
  
const[exercise, setExercise] = React.useState({
    username:'',
    description: '',
    duration: 0,
    date: new Date(),
    users: []
})

React.useEffect(()=>{
  axios.get('http://localhost:5000/users')
    .then(res => {
      if(res.data.length > 0){
        setExercise(prevExercise => ({...prevExercise, users:res.data.map(user => user.username)}))
      }
    })
  
})


function handleChange(event){
  const {name, value} = event.target;
  setExercise(prevExercise => ({...prevExercise, [name]:value}))
}

function handleSubmit(e){
    e.preventDefault();

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
    .then(res =>  console.log(res.data))
    window.location = '/';
}

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Username</label>
          <select 
            name="username"
            id=""
            className='form-control'
            value={exercise.username}
            onChange ={handleChange}
            required>
            {
              exercise.users.map(user =>{
                return <option key={user} value ={user}>{user}</option>
              })              
            }
            </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Description</label>
          <input 
            type="text" 
            placeholder="Description"
            className="form-control"
            name="description"
            value = {exercise.description}
            onChange = {handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Duration (in minutes): </label>
          <input 
            type="text" 
            placeholder="Duration"
            className="form-control"
            name="duration"
            value = {exercise.duration}
            onChange = {handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Date</label>
          <div>
            <DatePicker
              selected = {exercise.date} 
              onChange={(date)=> {
                  setExercise(prevExercise => ({...prevExercise, date:date}))
                  console.log(date)
                }
              }/>
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className='btn btn-primary' />
        </div>

      </form>
    </div>
  )
}

export default CreateExercise
