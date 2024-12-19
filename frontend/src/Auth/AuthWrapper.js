import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import RenderRoutes from "../Components/Structure/RenderRoutes";
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to access the AuthContext
export const AuthData = () => useContext(AuthContext);

const AuthWrapper = () => {
  const navigate = useNavigate();

  // Initialize user state from localStorage or set default values
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser
      ? JSON.parse(savedUser)
      : { email: '', isAuthenticated: false, token: null, role: null ,id:null };
  });

  // Sync user state with localStorage whenever it changes
  useEffect(() => {
    if (user && user.isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Login function
  const login = async (email, password) => {
    if (email && password) {
      try {
        const response = await axios.post('http://localhost:8080/login', { email, password });
        console.log("API Response Data:", response.data);

        const { id,role, accessToken } = response.data;

        // Handle role-based navigation
        if (role === "Coach") {
          console.log("Navigating to /list");
          navigate("/list");
        } else if (role === "User") {
          console.log("Navigating to /User");
          navigate("/User");
        } else {
          console.error("Unhandled role:", role);
          throw new Error("Unknown role received from API");
        }

        // Update user state
        setUser({
          email,
          isAuthenticated: true,
          token: accessToken,
          role,
          id
        });
      } catch (error) {
        console.error("Login error:", error.response?.data?.msg || error.message);
        throw new Error(error.response?.data?.msg || "An error occurred during login");
      }
    } else {
      throw new Error("Please fill in both fields");
    }
  };

  // Logout function
  const logout = () => {
    setUser({ email: '', isAuthenticated: false, token: null, role: null });
    localStorage.removeItem('user'); // Remove user from localStorage on logout
  };

  // Provide user, login, and logout functions via context
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <RenderRoutes />
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
