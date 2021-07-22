import logo from './logo.svg';
import './App.css';
import Form from './Form.js'
import axios from 'axios'
import React, {useState,useEffect} from 'react';
import {reach} from 'yup'
import schema from './formSchema'
//Initial state for form
const iniFormValues ={
//Text Inputs//
username: '',
email:'',
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
//initial state for Users
const iniUsers = []

const iniDisabled = true
function App() {

  const [users, setUsers] = useState(iniUsers)
  const [formValues,setFormValues] = useState(iniFormValues)
  const [formErrors, setFormErrors] = useState(iniFormErrors)
  const [disabled, setDisabled] = useState(iniDisabled)

const getUsers = () => {
axios.get('https://reqres.in/api/users')
.then(res => {
  setUsers(res.data)
  console.log(res.data)
},)
  .catch(err => {
    console.log(err)
  })
}

const postNewUser = newUser => {
  axios.post('https://reqres.in/api/users', newUser)
  .then(res => {
    setUsers([res.data,...users])
    console.log(res.data)
  },)
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
  password:formValues.password.trim()

}
postNewUser(newUser)
}

useEffect(() => {
  getUsers()
},[])



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
