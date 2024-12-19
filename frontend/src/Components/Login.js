import React, { useState, useReducer } from 'react';
import Gym from '../assets/Gym.png'

import { AuthData } from "../Auth/AuthWrapper";

const Login = () => {
  
  const { login } = AuthData();
  const [formData, setFormData] = useReducer(
    (formData, newItem) => ({ ...formData, ...newItem }),
    { email: "", password: "" }
  );
  const [errorMessage, setErrorMessage] = useState(null);

  const doLogin = async (e) => {
    e.preventDefault(); 
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during login.");
    }
  };

  return (
    <div className='relative bg-primary top-0'>
      <div className='fixed right-0 top-0 w-2/6 bg-primary h-screen shadow-2xl'></div>
      <div className='fixed right-28 top-24'>
        <img src={Gym} alt='Gym' className='w-[550px] h-[550px]'/>
      </div>
      <div className='fixed w-full -right-28 top-20'>
        <h1 className='font-montserrat text-primary text-8xl font-medium mb-9'>Welcome Back!</h1>
        <div className='w-2/5'>
          <form className="flex flex-col gap-2 w-11/12" onSubmit={doLogin}>
            <label htmlFor="name" className="font-montserrat text-primary font-semibold">User Name:</label>
            <input 
              type="text" 
              id="email" 
              name="email" 
              className="border border-primary p-1" 
              value={formData.email}
              onChange={(e) => setFormData({ email: e.target.value })}
            />
            <label htmlFor="password" className="font-montserrat text-primary font-semibold mt-2">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="border border-primary p-1" 
              value={formData.password}
              onChange={(e) => setFormData({ password: e.target.value })} 
            />
            {errorMessage && (
              <div className="text-red-700">{errorMessage}</div>
            )}
            <input 
              type="submit" 
              value="Login" 
              className=" bg-primary flex justify-center p-1 font-montserrat text-white mt-5" 
            />
          </form>
        </div>
        <h1 className='font-montserrat text- mt-5 font-medium'>
          Don’t have an account? <a className='font-semibold text-primary' href='/Signup'>Register</a>
        </h1>
      </div>
    </div>
  );
};

export default Login;
