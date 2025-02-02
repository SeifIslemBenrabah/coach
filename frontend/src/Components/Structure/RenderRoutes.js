import React from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
import { AuthData } from '../../Auth/AuthWrapper'
import Login from '../Login'
import Signup from '../Signup'
import Home from '../Home'
import List from '../List'
import UserDetail from '../UserDetail'
import NotFound from '../NotFound'
const RenderRoutes = () => {
    const {user}= AuthData();
    
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    {user.isAuthenticated &&(
      
      <>
      <Route path="/list" element={<List />} />
      <Route path="/:id" element={<UserDetail />} />
    </>
    )
    }
    <Route path='*' element={<NotFound/>}/>
   </Routes>
  )
}

export default RenderRoutes
