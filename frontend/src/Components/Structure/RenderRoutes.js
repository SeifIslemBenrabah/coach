import React from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
import { AuthData } from '../../Auth/AuthWrapper'
import Login from '../Login'
import Home from '../Home'
import List from '../List'
import UserDetail from '../UserDetail'
import NotFound from '../NotFound'
import Userpage from '../Userpage'
import YourDetail from '../YourDetail'
const RenderRoutes = () => {
    const {user}= AuthData();
    
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    {user.isAuthenticated && user.role === "Coach"&&(
      <>
      <Route path="/list" element={<List />} />
      <Route path="/:id" element={<UserDetail />} />
    </>
    )}
    {user.isAuthenticated && user.role=== "User"&&(
      <>
      <Route path="/User" element={<Userpage />} />
      <Route path="/:id" element={<YourDetail />} />
    </>
    )}
    <Route path='*' element={<NotFound/>}/>
   </Routes>
  )
}

export default RenderRoutes
