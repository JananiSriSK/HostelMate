import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const WorkerProfileUpdate = () => {
  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [field, setField] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = Object.values(JSON.parse(localStorage.getItem("user")));
    console.log(userData);

    if (userData) {
      setName(userData[1].name || userData[0]);
      setEmail(userData[1].email || userData[2]);
      setPhone(userData[1].mobile || userData[1]);
      setEmployeeNumber(userData[1].employeeNumber || userData[3]);
      setField(userData[1].field || userData[4]);
      setId(userData[1].id || userData[5]);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name,
      phone,
      email,
      employeeNumber,
      field,
      id,
    };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/updateprofile/worker/${id}`,
        {
          name: name,
          email: email,
          mobile: phone,
          employeeNumber: employeeNumber,
          field: field,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile Updated successfully!", {
        duration: 4000,
        position: "top-right",
        style: {
          marginTop: "50px",
        },
      });
      navigate("/worker");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full  justify-center items-center max-w-xl bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#a80000]">
          Worker Profile
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              readOnly={!editMode}
              onChange={(e) => setName(e.target.value)}
              className={`w-full border ${
                editMode ? "border-gray-300" : "border-transparent bg-gray-100"
              } rounded-md px-4 py-2 mt-1`}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Mobile Number
            </label>
            <input
              type="tel"
              value={phone}
              readOnly={!editMode}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full border ${
                editMode ? "border-gray-300" : "border-transparent bg-gray-100"
              } rounded-md px-4 py-2 mt-1`}
            />
          </div>

          {/* Employee Number */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Employee Number
            </label>
            <input
              type="text"
              value={employeeNumber}
              readOnly={!editMode}
              onChange={(e) => setEmployeeNumber(e.target.value)}
              className={`w-full border ${
                editMode ? "border-gray-300" : "border-transparent bg-gray-100"
              } rounded-md px-4 py-2 mt-1`}
            />
          </div>

          {/* Field */}
          <div>
            <label className="block text-gray-700 font-semibold">Field</label>
            <input
              type="text"
              value={field}
              readOnly={!editMode}
              onChange={(e) => setField(e.target.value)}
              className={`w-full border ${
                editMode ? "border-gray-300" : "border-transparent bg-gray-100"
              } rounded-md px-4 py-2 mt-1`}
            />
          </div>

          {/* Button Section */}
          <div className="flex justify-between items-center mt-4">
            {!editMode ? (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="bg-[#a80000] hover:bg-[#800000] text-white px-6 py-2 rounded-md font-medium"
              >
                Update
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkerProfileUpdate;
