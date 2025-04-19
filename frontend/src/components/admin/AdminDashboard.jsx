import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

    const navigate = useNavigate();
      useEffect(() => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (!token) {
          navigate("/");
      }
      else if(role === 'worker')
      {
      navigate('/worker');
      }
      else if(role === 'student')
      {
        navigate('/student');
      }
      }, []);

    const [details,setDetails] = useState([]);


    useEffect(() => {

        const fetchsummary = async() =>{

        const token = localStorage.getItem("token");
        try {
        const response = await axios.get("http://localhost:5000/api/dashboard/summary",
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        const det = Object.values(response.data)
        setDetails(det);
        } catch (error) {
            console.log(error);
        }
    }
    fetchsummary();
    },[])


  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray-400 border border-gray-300">
          <h3 className="text-lg font-semibold">Total Complaints</h3>
          <p className="text-xl">{details[0]}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray-400 border border-gray-300">
          <h3 className="text-lg font-semibold">Pending Complaints</h3>
          <p className="text-xl">{details[1]}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray-400 border border-gray-300">
          <h3 className="text-lg font-semibold">Resolved Complaints</h3>
          <p className="text-xl">{details[2]}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray-400 border border-gray-300">
          <h3 className="text-lg font-semibold">Pending Stale Complaints</h3>
          <p className="text-xl">{details[3]}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray-400 border border-gray-300">
          <h3 className="text-lg font-semibold">Total Students Registered</h3>
          <p className="text-xl">{details[5]}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray-400 border border-gray-300">
          <h3 className="text-lg font-semibold">Total Workers</h3>
          <p className="text-xl">{details[4]}</p>
        </div>
      </div>

      {/* Other Admin Content Here */}
    </div>
  );
};

export default AdminDashboard;
