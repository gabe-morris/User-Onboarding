
import './App.css';
import Form from './Form'
import User from './User'
import axios from 'axios'
import React, {useState,useEffect} from 'react';
import {reach} from 'yup'
import schema from './formSchema'
//Initial state for form
const iniFormValues ={
//Text Inputs//
username: '',
email:'',
password: '',
//Dropdown Menu//
role: '',
//Terms of Service Check//
tos:false,
}
//Initial state for errors
const iniFormErrors ={
username:'',
email:'',
password: '',
role:'',

}
const iniUsers = []
const iniDisabled = true

function App() {

  const [users, setUsers] = useState(iniUsers)
  const [formValues,setFormValues] = useState(iniFormValues)
  const [formErrors, setFormErrors] = useState(iniFormErrors)
  const [disabled, setDisabled] = useState(iniDisabled)


const postNewUser = newUser => {
  axios.post('https://reqres.in/api/users', newUser)
  .then(res => {
    setUsers([res.data])
    console.log(users)
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() =>{
    setFormValues(iniFormValues)
  })
}

const validate = (name, value) => {
reach(schema,name)
.validate(value)
.then(() => setFormErrors({...formErrors, [name]: ''}))
.catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
}

const inputChange = (name,value) => {
  validate(name,value)
  setFormValues({
    ...formValues,
    [name]:value
  })
}

const formSubmit = () => {
const newUser = {
  username:formValues.username.trim(),
  email: formValues.email.trim(),
}
postNewUser(newUser)
}



useEffect(() => {
schema.isValid(formValues).then(valid => setDisabled(!valid))
},[formValues])


  return (
    <div className ='container'>
      <header><h1>User Onboarding</h1></header>
      <Form
      values={formValues}
      change={inputChange}
      submit={formSubmit}
      disabled ={disabled}
      errors={formErrors}
      />

{users.map(user => {
        return(
          <User key={user.id} details={user}/>
        )
      })
      }
      </div>
  );
}

export default App;
