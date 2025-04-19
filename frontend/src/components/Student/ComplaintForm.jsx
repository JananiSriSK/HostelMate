import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ComplaintForm = () => {
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
    else if (role === 'admin') {
      navigate('/admin');
    }
  }, []);

  const [issueCategory, setIssueCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized: Please log in again.");
        navigate("/");
        return;
      }

      const complaintData = {
        issueCategory,
        location,
        description,
        priority,
      };

      const response = await axios.post(
        "http://localhost:5000/api/complaints",
        complaintData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Complaint submitted successfully:", response.data);
      // alert("Complaint submitted successfully!");
      toast.success('Complaint submitted successfully!', {
        duration: 4000,
        position: 'top-right', style: {
          marginTop: '50px',
        }
      });
      setIssueCategory("");
      setLocation("");
      setDescription("");
      setPriority("Low");
      navigate('/student/my-complaints')

    } catch (error) {
      console.error("Complaint submission error:", error.response || error);
      toast.error('Enter valid details!', {
        duration: 4000,
        position: 'top-right', style: {
          marginTop: '50px',
        }
      });
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-0">File a Complaint</h2>
        <p className="text-gray-500 mb-6">
          Please provide the details of your complaint below.
        </p>
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md border border-gray-200">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            {/* Issue Category */}
            <div className="grid gap-2">
              <label htmlFor="issueCategory" className="text-gray-700 font-medium">
                Issue Category
              </label>
              <select
                id="issueCategory"
                value={issueCategory}
                placeholder="Select"
                onChange={(e) => setIssueCategory(e.target.value)}
                required
                className="border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select Category</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Location */}
            <div className="grid gap-2">
              <label htmlFor="location" className="text-gray-700 font-medium">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="Eg. Room 102, Block B"
                className="border border-gray-300 rounded-md px-4 py-2"
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <label htmlFor="description" className="text-gray-700 font-medium">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Explain the issue in detail"
                className="border border-gray-300 rounded-md px-4 py-2 min-h-[100px]"
              />
            </div>

            {/* Priority */}
            <div className="grid gap-2">
              <label htmlFor="priority" className="text-gray-700 font-medium">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option vazlue="Emergency">Emergency</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-[#a80000] hover:bg-[#800000] text-white font-medium py-2 px-4 rounded-md"
            >
              Submit Complaint
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ComplaintForm;
