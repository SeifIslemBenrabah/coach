import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import RenderRoutes from "../Components/Structure/RenderRoutes";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

const AuthWrapper = () => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { email: '', isAuthenticated: false };
  });

  useEffect(() => {
  
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = async (email, password) => {
    if (email && password) {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          email: email,
          password: password,
        });
        console.log(response);
        console.log('Login successful');
        setUser({ email: email, isAuthenticated: true ,token:response.data.accessToken});
      } catch (error) {
        throw new Error(error.response?.data?.msg || "An error occurred during login");
      }
    } else {
      throw new Error('Please fill in both fields');
    }
  };

  const logout = () => {
    setUser({ email: '', isAuthenticated: false });
    localStorage.removeItem('user'); // Remove user from localStorage on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <RenderRoutes />
    </AuthContext.Provider>
  );
};

  export default AuthWrapper;
