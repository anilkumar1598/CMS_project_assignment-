import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';
import axios from 'axios'
import Login from '../Login/Login'

function AddCustomer() {
  function getToken() {
		const tokenString = sessionStorage.getItem('token')
		const userToken = JSON.parse(tokenString)
		return userToken
	}

	const [token, setToken] = useState("");
    useEffect(()=> {
        setToken(getToken())
        if(!getToken()){
          navigate('/login')
        }
    },[])

  function createContact(e){
    e.preventDefault()
    axios({method: 'post', url: "http://localhost:3000/customers",data:{customer: {name:name, email: email, age: age, mobile_number: mobileNumber}}, headers: {
      Authorization: getToken() //the token is a variable which holds the token
    }})
    .then((response) => {
      navigate('/customer')
    }).catch(error => {
      setNameError(error["response"]["data"]["errors"]["name"]?.join(", "))
      setEmailError(error["response"]["data"]["errors"]["email"]?.join(", "))
      setAgeError(error["response"]["data"]["errors"]["age"]?.join(", "))
      setMobileError(error["response"]["data"]["errors"]["mobile_number"]?.join(", "))
    })
    // console.log(customer)
  }

  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [mobileError, setMobileError] = useState("");

  return (
    <>
      <div className='bg-gray-700 text-3xl text-white p-4 text-center'> Add Customer</div>
      <form class="m-8 w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Full Name
            </label>
          </div>
          <div class="md:w-2/3">
            <input onChange={(e) => {setName(e.target.value)}} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="name" id="inline-full-name" type="text" placeholder='name'  />
            {
              nameError ? <p> {nameError} </p> : nameError
            }
          </div>
        </div>
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
              Mobile Number
            </label>
          </div>
          <div class="md:w-2/3">
            <input onChange={(e) => {setMobileNumber(e.target.value)}} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="mobile" id="" type="number" placeholder="mobile number"  />
            {
              mobileError ? <p> {mobileError} </p> : mobileError
            }
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
              Age
            </label>
          </div>
          <div class="md:w-2/3">
            <input onChange={(e) => {setAge(Number.parseInt(e.target.value))}} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="mobile" id="" type="number" placeholder="age" />
            {
              ageError ? <p> {ageError} </p> : ageError
            }
          </div>
        </div>
    
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button onClick={(e) => {createContact(e)}} class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Create Customer
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddCustomer