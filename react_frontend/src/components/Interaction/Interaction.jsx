import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Login from '../Login/Login'

function Interaction() {

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
   

  const [interactions_data, setInteraction] = useState([])

  function destroyInteraction(e, id){
    e.preventDefault()
    customer = axios({method: 'delete', url: `http://localhost:3000/interactions/${id}`, headers: {
        Authorization: getToken() //the token is a variable which holds the token
      }})
    .then((response) => {
        getInteractions()
    })
    console.log(customer)
  }

  const getInteractions = () => {
    axios({method: 'get', url: "http://localhost:3000/interactions", headers: {
        Authorization: getToken() //the token is a variable which holds the token
      }})
    .then((response) => {
        return response
    }).then(data => {
        console.log('data1',data)
        setInteraction(data.data.data)
    })
  }

  useEffect(()=> {
    getInteractions()
  }, [])

  useEffect(()=>{
    console.log('interactions_data',interactions_data)
  },[interactions_data])
  let navigate = useNavigate();
  return (
    <>
            <div className='bg-gray-700 text-3xl text-white p-4 text-center'> All Interactions
            </div>
            <div className="text-3xl text-white p-4 flex items-center text-center">
									
                    <NavLink
                            to="/addInteractions"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                    >
                            Add Interaction
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
                                Interaction_type
                            </th>
                            <th scope="col" className="px-6 py-3">
                               Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                           
                            <th scope="col" className="px-6 py-3">
                                Destroy Contact
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {interactions_data.map(interaction => (
                                <>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{interaction.id}</th>
                                        <td className="px-6 py-4">{interaction.attributes.name}</td>
                                        <td className="px-6 py-4">{interaction.attributes.interaction_type}</td>
                                        <td className="px-6 py-4">{interaction.attributes.status}</td>
                                        <td className="px-6 py-4">{interaction.attributes.date}</td>
                                        
                                        <td className='px-6 py-4'>
                                            <Link to="#" onClick={(e) =>destroyInteraction(e, interaction.id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                                            Destroy Interaction </Link>
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

export default Interaction