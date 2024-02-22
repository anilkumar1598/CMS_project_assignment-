import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import Customer from './components/Customer/Customer.jsx'
import User from './components/User/User.jsx'
import EditCustomer from './components/Customer/EditCustomer.jsx'
import AddCustomer from './components/Customer/AddCustomer.jsx'
import Contact from './components/Contact/Contact.jsx'
import Login from './components/Login/Login.jsx'
import AddContact from './components/Contact/AddContact.jsx'
import EditContact from './components/Contact/EditContact.jsx'
import Interaction from './components/Interaction/Interaction.jsx'
import AddInteraction from './components/Interaction/AddInteraction.jsx'

const router = new createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'customer',
        element: <Customer />
      },
      {
        path: 'user/:userId',
        element: <User />
      },
      {
        path: 'contacts',
        element: <Contact />
      },
      {
        path: 'interactions',
        element: <Interaction />
      },
      {
        path: 'addInteractions',
        element: <AddInteraction />
      },
      {
        path: 'editCustomer/:userId',
        element: <EditCustomer />
      },
      {
        path: 'editContact/:contactId',
        element: <EditContact />
      },
      {
        path: 'AddContact',
        element: <AddContact />
      },
      ,
      {
        path: 'addCustomer',
        element: <AddCustomer />
      },
      {
        path: 'login',
        element: <Login />
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
