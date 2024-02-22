import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';
import axios from 'axios'
import Login from '../Login/Login'

function AddContact() {
  function getToken() {
		const tokenString = sessionStorage.getItem('token')
		const userToken = JSON.parse(tokenString)
		return userToken
	}

	const getCustomers = () => {
    axios({method: 'get', url: "http://localhost:3000/customers", headers: {
      Authorization: getToken() //the token is a variable which holds the token
      }})
    .then((response) => {
        return response
    }).then(data => {
        setCustomers(data.data.data)
    })
  }

	const [token, setToken] = useState("");
    useEffect(()=> {
			  getCustomers()
        setToken(getToken())
        if(!getToken()){
          navigate('/login')
        }
    },[])

  function createContact(e){
    e.preventDefault()
    axios({method: 'post', url: "http://localhost:3000/contacts",data:{contact: {customer_id: customer_id, email: email, address: address, phone: phone}}, headers: {
      Authorization: getToken() //the token is a variable which holds the token
    }})
    .then((response) => {
      navigate('/contacts')
    }).catch(error => {
      setcustomerIdError(error["response"]["data"]["errors"]["customer"]?.join(", "))
      setEmailError(error["response"]["data"]["errors"]["email"]?.join(", "))
      setAddressError(error["response"]["data"]["errors"]["address"]?.join(", "))
      setPhoneError(error["response"]["data"]["errors"]["phone"]?.join(", "))
    })
    // console.log(customer)
  }

  let navigate = useNavigate();
  const [customer_id, setCustomerId] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [customerIdError, setcustomerIdError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");

	const [customers_data, setCustomers] = useState([])

  return (
    <>
      <div className='bg-gray-700 text-3xl text-white p-4 text-center'> Add Contact</div>
      <form class="m-8 w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Customer
            </label>
          </div>
          <div class="md:w-2/3">
           <select name="customers" onChange={(e) => {setCustomerId(e.target.value)}} id="customer" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" >
            <option value="">select customer</option>
            {customers_data.map(customer => (
              <>
                <option value={customer.id}>{customer.attributes.name}</option>
              </>
            )) }
           </select>
            {
              customerIdError ? <p> {customerIdError} </p> : customerIdError
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
              phone
            </label>
          </div>
          <div class="md:w-2/3">
            <input onChange={(e) => {setPhone(e.target.value)}} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="mobile" id="" type="number" placeholder="phone"  />
            {
              phoneError ? <p> {phoneError} </p> : phoneError
            }
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
              Address
            </label>
          </div>
          <div class="md:w-2/3">
            <input onChange={(e) => {setAddress(e.target.value)}} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="mobile" id="" type="type" placeholder="address" />
            {
              addressError ? <p> {addressError} </p> : addressError
            }
          </div>
        </div>
    
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button onClick={(e) => {createContact(e)}} class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Create Contact
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddContact