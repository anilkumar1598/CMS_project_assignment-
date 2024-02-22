import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useToken from '../../useToken'
// import { useHistory } from 'react-router-dom';
import axios from 'axios'


function Login() {
	function setToken(userToken) {
		sessionStorage.setItem('token', JSON.stringify(userToken))
	}

	function getToken() {
		const tokenString = sessionStorage.getItem('token')
		const userToken = JSON.parse(tokenString)
		return userToken
	} 

  function createContact(e){
    e.preventDefault()
    axios({method: 'post', url: "http://localhost:3000/login",data:{user: {email: email, password: password}}})
    .then((response) => {
			console.log(response.headers.get('authorization'));
      setToken(response.headers.get('authorization'));
			console.log(getToken());
      navigate('/customer')
    }).catch(error => {
      setEmailError(error["response"]["data"]["errors"]["email"]?.join(", "))
      setPasswordError(error["response"]["data"]["errors"]["password"]?.join(", "))
    })
    // console.log(customer)
  }

  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <>
      <div className='bg-gray-700 text-3xl text-white p-4 text-center'> Login  </div>
      <form class="m-8 w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
              Email
            </label>
          </div>
          <div class="md:w-2/3">
            <input onChange={(e) => {setEmail(e.target.value)}} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="email" id="inline-password" type="text" placeholder="email" />
            {
              emailError ? <p> {emailError} </p> : emailError
            }
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
              Password
            </label>
          </div>
          <div class="md:w-2/3">
            <input onChange={(e) => {setPassword(e.target.value)}} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="password" id="" type="password" placeholder="password"  />
            {
              passwordError ? <p> {passwordError} </p> : passwordError
            }
          </div>
        </div>
    
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button onClick={(e) => {createContact(e)}} class="shadow bg-purple-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login