import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cegImage from "../../assets/ceg.jpg";
import Navbar from "../common/Navbar";
import axios from "axios";
import { toast } from 'react-hot-toast';

const Signup = () => {

  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignin = async(e) =>{
      e.preventDefault();
      await axios.post("http://localhost:5000/api/auth/signin",{
        email:email,
        password:password
      })
      .then(res => {
      
        let token = res.data.token;
        const role = res.data.user.role;
        localStorage.setItem("token",token);
        localStorage.setItem("role",role);
        localStorage.setItem("user",res.data.user);
        localStorage.setItem("user",JSON.stringify(res.data));
        toast.success('  Welcome...!  ', {duration: 4000,
          position: 'top-right', style: {
            marginTop: '50px',
          }
        });  
        if(role === 'student')
        {
          navigate('/student');
        }
        else if(role === 'worker')
        {
          navigate('/worker');
        }
        else if(role === 'admin'){
          navigate('/admin');
        }
      })
      .catch(err => {
        toast.error('Invalid credentials!', {duration: 4000,
          position: 'top-right', style: {
            marginTop: '50px',
          }
        });        console.log(err);
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
          <div className="bg-white shadow-md rounded-xl p-8 border border-gray-200">

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
  
              <form className="space-y-4" onSubmit={handleSignin}>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
  
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="absolute right-3 top-2.5 cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
  
                <div className="text-right text-sm text-red-600 hover:underline cursor-pointer">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
  
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-40 bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700"
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
      </div>
    </>
  );
};

export default Signup;
