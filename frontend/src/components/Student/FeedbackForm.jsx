import axios from "axios";
import React, { useState } from "react";

const FeedbackForm = () => {

  const [form, setForm] = useState({
    complaintId: "",
    rating: "",
    comments: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // const feedback = await axios.put(`http://localhost:5000/api/complaints/${}`)
    console.log("Feedback submitted:", form);
    alert("Thank you for your feedback!");
    setForm({ complaintId: "", rating: "", comments: "" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#a80000] mb-4">
        🗣️ Complaint Feedback
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Complaint ID
          </label>
          <input
            type="text"
            name="complaintId"
            value={form.complaintId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a80000] focus:ring-[#a80000] sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rate the resolution
          </label>
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
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
            Additional Comments
          </label>
          <textarea
            name="comments"
            value={form.comments}
            onChange={handleChange}
            rows="4"
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
    </div>
  );
};

export default FeedbackForm;
