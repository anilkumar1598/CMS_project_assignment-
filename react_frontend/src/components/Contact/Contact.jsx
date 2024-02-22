import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Login from '../Login/Login'

function Contact() {

    function getToken() {
		const tokenString = sessionStorage.getItem('token')
		const userToken = JSON.parse(tokenString)
		return userToken
	}

	const [token, setToken] = useState("");
    useEffect(()=> {
        setToken(getToken())
        console.log(getToken())
        if(!getToken()){
          navigate('/login')
        }
    },[])
   

  const [contacts_data, setContacts] = useState([])

  function destroyContact(e, id){
    e.preventDefault()
    customer = axios({method: 'delete', url: `http://localhost:3000/contacts/${id}`, headers: {
        Authorization: getToken() //the token is a variable which holds the token
      }})
    .then((response) => {
      getContacts()
    })
    console.log(customer)
  }

  const getContacts = () => {
    axios({method: 'get', url: "http://localhost:3000/contacts", headers: {
        Authorization: getToken() //the token is a variable which holds the token
      }})
    .then((response) => {
        return response
    }).then(data => {
        setContacts(data.data.data)
    })
  }

  useEffect(()=> {
    getContacts()
  }, [])

  
  let navigate = useNavigate();
  return (
    <>
            <div className='bg-gray-700 text-3xl text-white p-4 text-center'> All Contacts
            </div>
            <div className="text-3xl text-white p-4 flex items-center text-center">
									
                    <NavLink
                            to="/addContact"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                    >
                            Add Contact
                    </NavLink>
            </div>
            <div className="relative mx-auto px-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mobile Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit Contact
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Destroy Contact
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {contacts_data.map(contact => (
                                <>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{contact.id}</th>
                                        <td className="px-6 py-4">{contact.attributes.name}</td>
                                        <td className="px-6 py-4">{contact.attributes.email}</td>
                                        <td className="px-6 py-4">{contact.attributes.phone}</td>
                                        <td className="px-6 py-4">{contact.attributes.address}</td>
                                        <td className='px-6 py-4'>
                                            <NavLink to={`/editContact/${contact.id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                                            Edit Contact </NavLink>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <Link to="#" onClick={(e) =>destroyContact(e, contact.id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                                            Destroy Contact </Link>
                                        </td>
                                    </tr>
                                </>
                            ))}
                    
                    </tbody>
                </table>
            </div>

        </>
    
  )
}

export default Contact