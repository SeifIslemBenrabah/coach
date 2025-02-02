import React, { useState, useReducer } from "react";
import { AuthData } from "../Auth/AuthWrapper";
import Bg from '../assets/banner.png'
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
    <div className="flex flex-col justify-center items-center md:items-start bg-OffWhite min-h-screen">
      <img src={Bg} className="fixed hidden md:block h-[600px] right-0 bottom-0"/>
      <a href="/" className="bg-primary p-2 rounded-full fixed top-6 left-6 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
      </a>
      <h1 className="font-montserrat text-primary text-4xl md:text-7xl font-bold mb-8 z-10 ml-20">
        Welcome Back!
      </h1>
      <div className="w-11/12 sm:w-96 bg-white/30 backdrop-blur-xl rounded-lg shadow-lg p-6 md:ml-20">
        <form className="flex flex-col gap-4" onSubmit={doLogin}>
          <label
            htmlFor="email"
            className="font-montserrat text-primary font-semibold"
          >
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="border-0 rounded-md p-2 focus:outline-none"
            value={formData.email}
            onChange={(e) => setFormData({ email: e.target.value })}
          />

          <label
            htmlFor="password"
            className="font-montserrat text-primary font-semibold"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-0 rounded-md p-2 focus:outline-none mb-4"
            value={formData.password}
            onChange={(e) => setFormData({ password: e.target.value })}
          />

          {errorMessage && (
            <div className="text-red-600 text-sm">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="bg-primary text-white font-montserrat font-medium py-2 rounded-md hover:bg-primary-dark transition"
          >
            Login
          </button>
        </form>

        <p className="font-montserrat text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a
            className="font-semibold text-primary hover:underline"
          href="mailto:seifislem@gmail.com?subject=Create Account Reset&body=Hi, I want to create account"
          >
            Send mail
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
