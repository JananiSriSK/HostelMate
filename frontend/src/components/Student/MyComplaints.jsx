import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyComplaints = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      navigate("/");
    } else if (role === "worker") {
      navigate("/worker");
    } else if (role === "admin") {
      navigate("/admin");
    }
  }, []);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "`${import.meta.env.VITE_API_URL}/api/complaints/student",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const complaintsArray = Object.values(response.data);
        console.log(response.data);

        setComplaints(complaintsArray);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [isfeed, setIsFeed] = useState(false);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/complaints/${id}/feedback`,
        { rating: rating, comment: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Feedback for complaint ID");
      alert("Thank you for your feedback!");
      toast.success("Thank you for your feedback!", {
        duration: 4000,
        position: "top-right",
        style: {
          marginTop: "50px",
        },
      });
      setComment("");
      setRating("");
      setIsFeed(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [current, setCurrent] = useState("");
  const toggleForm = (id) => {
    setCurrent(id);
    setIsFeed(!isfeed);
    setComment("");
    setRating("");
  };

  return (
    <div className="space-y-6">
      {complaints.map((complaint) => (
        <div
          key={complaint._id}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {complaint.description}
              </h3>
              <p className="text-sm text-gray-500">
                Submitted on {complaint.createdAt.split("T")[0]}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                complaint.status === "Resolved"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {complaint.status}
            </span>
          </div>

          {complaint.status === "Resolved" && (
            <div>
              <button
                onClick={() => toggleForm(complaint._id)}
                className="text-sm text-[#a80000] font-medium hover:underline"
              >
                {isfeed && complaint._id === current
                  ? "Hide Feedback Form"
                  : "Give Feedback"}
              </button>

              {isfeed && complaint._id === current && (
                <form
                  onSubmit={(e) => handleSubmit(e, complaint._id)}
                  className="mt-4 space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Rating
                    </label>
                    <select
                      name="rating"
                      onChange={(e) => setRating(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a80000] focus:ring-[#a80000] sm:text-sm"
                      required
                    >
                      <option value="">Select rating</option>
                      <option value="5">⭐️⭐️⭐️⭐️⭐️ - Excellent</option>
                      <option value="4">⭐️⭐️⭐️⭐️ - Good</option>
                      <option value="3">⭐️⭐️⭐️ - Average</option>
                      <option value="2">⭐️⭐️ - Poor</option>
                      <option value="1">⭐️ - Very Poor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Comments
                    </label>
                    <textarea
                      name="comments"
                      onChange={(e) => setComment(e.target.value)}
                      rows="3"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a80000] focus:ring-[#a80000] sm:text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#a80000] text-white px-4 py-2 rounded hover:bg-[#870000]"
                  >
                    Submit Feedback
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyComplaints;
