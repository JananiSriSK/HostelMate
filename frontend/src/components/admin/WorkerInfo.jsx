import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const WorkerInfo = () => {
  const [activeTab, setActiveTab] = useState("workerList");
  const [workers, setWorkers] = useState([]);
  const [newWorker, setNewWorker] = useState({
    name: "",
    email: "",
    mobile: "",
    field: "",
    employeeNumber: "",
  });
  const [on, setOn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      navigate("/");
    }
    else if (role === 'worker') {
      navigate('/worker');
    }
    else if (role === 'student') {
      navigate('/student');
    }
  }, []);


  useEffect(() => {

    const fetchsummary = async () => {

      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/api/admin/workers",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        const det = Object.values(response.data)
        console.log(response.data);

        setWorkers(det);
      } catch (error) {
        console.log(error);
      }
    }
    fetchsummary();
  }, [on])



  // Handle input changes for new worker form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new worker
  const handleAddWorker = async() => {
    try {
      const token = localStorage.getItem("token");
          
      const response = await axios.post("http://localhost:5000/api/admin/workers/add",
      {
        name:newWorker.name,
        email:newWorker.email,
        password:'password123',
        mobile:newWorker.mobile,
        employeeNumber:newWorker.employeeNumber,
        field:newWorker.field
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    console.log(response.data);
    toast.success('Added successfully!', {duration: 4000,
      position: 'top-right', style: {
        marginTop: '50px',
      }
    }); 
    setOn(!on);
    setNewWorker({
      name: "",
      email: "",
      mobile: "",
      field: "",
      employeeNumber: "",
    });
    setActiveTab("workerList");
    } catch (error) {
      console.log(error);
    }
  };

  // Remove worker
  const handleRemoveWorker = (id) => {
    // setWorkers(workers.filter((worker) => worker.id !== id));
    const deleteWorker = async () => {
      console.log(id);
      
      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(`http://localhost:5000/api/admin/workers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        const det = Object.values(response.data)
        console.log(response.data);
        setOn(!on);
        toast.success('Deleted successfully!', {duration: 4000,
          position: 'top-right', style: {
            marginTop: '50px',
          }
        }); 

      } catch (error) {
        console.log(error);
      }
    }
    deleteWorker();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("workerList")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "workerList"
              ? "bg-[#a80000] text-white"
              : "bg-gray-100 text-gray-800"
            }`}
        >
          Workers List
        </button>
        <button
          onClick={() => setActiveTab("addWorker")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "addWorker"
              ? "bg-[#a80000] text-white"
              : "bg-gray-100 text-gray-800"
            }`}
        >
          Add New Worker
        </button>
      </div>

      {/* Workers List */}
      {activeTab === "workerList" && (
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-semibold">Workers List</h3>
          {workers.length === 0 ? (
            <p className="text-center text-gray-500">No workers found.</p>
          ) : (
            workers.map((worker) => (
              <div
                key={worker.id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow "
              >
                <div>
                  <p>
                    <span className="font-semibold">Name:</span> {worker.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {worker.email}
                  </p>
                  <p>
                    <span className="font-semibold">Mobile:</span>{" "}
                    {worker.mobile}
                  </p>
                  <p>
                    <span className="font-semibold">Field:</span> {worker.field}
                  </p>
                  <p>
                    <span className="font-semibold">Employee Number:</span>{" "}
                    {worker.employeeNumber}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveWorker(worker._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add New Worker Form */}
      {activeTab === "addWorker" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Add New Worker</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newWorker.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-400 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newWorker.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-400 rounded-md"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={newWorker.mobile}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-400 rounded-md"
          />
          <input
            type="text"
            name="field"
            placeholder="Field"
            value={newWorker.field}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-400 rounded-md"
          />
          <input
            type="text"
            name="employeeNumber"
            placeholder="Employee Number"
            value={newWorker.employeeNumber}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-400 rounded-md"
          />
          <button
            onClick={handleAddWorker}
            className="bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Add Worker
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkerInfo;