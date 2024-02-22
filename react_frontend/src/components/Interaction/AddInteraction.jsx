import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';
import axios from 'axios'
import Login from '../Login/Login'

function AddInteraction() {
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
        axios({method: 'get', url: "http://localhost:3000/interactions/get_status_interaction_types", headers: {
          Authorization: getToken() //the token is a variable which holds the token
        }})
        .then((response) => {
            return response
        }).then(data => {
            console.log(data)
            setInteractionTypes(data["data"]["interaction_types"])
            setStatuses(data["data"]["statuses"])
        })
        setToken(getToken())
        if(!getToken()){
          navigate('/login')
        }
    },[])

  function createInteraction(e){
    e.preventDefault()
    axios({method: 'post', url: "http://localhost:3000/interactions",data:{interaction: {customer_id: customer_id, interaction_type: interaction_type, status: status, date: date}}, headers: {
      Authorization: getToken() //the token is a variable which holds the token
    }})
    .then((response) => {
      navigate('/interactions')
    }).catch(error => {
      setcustomerIdError(error["response"]["data"]["errors"]["customer"]?.join(", "))
      setStatusError(error["response"]["data"]["errors"]["status"]?.join(", "))
      setInteractionTypeError(error["response"]["data"]["errors"]["interaction_type"]?.join(", "))
      setDateError(error["response"]["data"]["errors"]["date"]?.join(", "))
    })
    // console.log(customer)
  }

  let navigate = useNavigate();
  const [customer_id, setCustomerId] = useState("");
  const [status, setStatus] = useState("");
  const [interaction_type, setInteractionType] = useState();
  const [date, setDate] = useState("");
  const [statusError, setStatusError] = useState("");
  const [customerIdError, setcustomerIdError] = useState("");
  const [interactionTypeError, setInteractionTypeError] = useState("");
  const [dateError, setDateError] = useState("");
  const [interaction_types, setInteractionTypes] = useState([]);
  const [statuses, setStatuses] = useState([])

	const [customers_data, setCustomers] = useState([])

  return (
    <>
      <div className='bg-gray-700 text-3xl text-white p-4 text-center'> Add Interaction</div>
      <form class="m-8 w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Customer
            </label>
          </div>
          <div class="md:w-2/3">
           <select name="customers" onChange={(e) => {setCustomerId(e.target.value)}} id="customer" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" >
            <option value="">Select Customer</option>
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
              Status
            </label>
          </div>
          <div class="md:w-2/3">
            <select name="statuses" onChange={(e) => {setStatus(e.target.value)}} id="status" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" >
            <option value="">Select Status</option>
            {statuses.map(status => (
              <>
                <option value={status}>{status}</option>
              </>
            )) }
           </select>
            {
              statusError ? <p> {statusError} </p> : statusError
            }
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
              Interaction Type
            </label>
          </div>
          <div class="md:w-2/3">
           <select name="interaction_type" onChange={(e) => {setInteractionType(e.target.value)}} id="status" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" >
            <option value="">Select Interaction Type</option>
            {interaction_types.map( interaction_type => (
              <>
                <option value={interaction_type}>{interaction_type}</option>
              </>
            )) }
            </select>
            {
              interactionTypeError ? <p> {interactionTypeError} </p> : interactionTypeError
            }
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
              Date
            </label>
          </div>
          <div class="md:w-2/3">
            <input onChange={(e) => {setDate(e.target.value)}} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="mobile" id="" type="datetime-local" placeholder="address" />
            {
              dateError ? <p> {dateError} </p> : dateError
            }
          </div>
        </div>
    
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button onClick={(e) => {createInteraction(e)}} class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Create Interaction
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddInteraction