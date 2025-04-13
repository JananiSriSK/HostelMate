import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cegImage from "../../assets/ceg.jpg";
import Navbar from "../common/Navbar";
import axios from "axios";

const Signup = () => {

  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = async(e) =>{
      e.preventDefault();
      await axios.post("http://localhost:5000/api/auth/signin",{
        email:email,
        password:password
      })
      .then(res => {
        let token = res.data.token;

        localStorage.setItem("token",token);
        localStorage.setItem("user",JSON.stringify(res.data));

        console.log("token stored",token);
        navigate('/student');
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <>
      <Navbar/>
      <div className="flex h-screen pt-16">
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url(${cegImage})`,
          }}
        />

        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Anna_University_Logo.svg/640px-Anna_University_Logo.svg.png"
                alt="University Logo"
                className="h-16"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Login to your account
            </h2>

            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-40 bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 "
                  onClick={handleSignin}
                >
                  Login
                </button>
              </div>
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
              New user?{" "}
              <Link to="/register" className="text-red-600 hover:underline ">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
