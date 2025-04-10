import React, { useState } from "react";

const MyComplaints = () => {
  const complaints = [
    {
      id: 1,
      title: "Leaking tap in bathroom",
      date: "2025-04-08",
      status: "Resolved",
    },
    {
      id: 2,
      title: "Broken ceiling fan",
      date: "2025-04-09",
      status: "Pending",
    },
    {
      id: 3,
      title: "Power outage on 2nd floor",
      date: "2025-04-05",
      status: "Resolved",
    },
  ];

  const [feedbackForms, setFeedbackForms] = useState({}); // Tracks visibility & values

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setFeedbackForms((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    console.log("Feedback for complaint ID", id, feedbackForms[id]);
    alert("Thank you for your feedback!");
    setFeedbackForms((prev) => ({ ...prev, [id]: undefined }));
  };

  const toggleForm = (id) => {
    setFeedbackForms((prev) => ({
      ...prev,
      [id]: prev[id] ? undefined : { rating: "", comments: "" },
    }));
  };

  return (
    <div className="space-y-6">
      {complaints.map((complaint) => (
        <div
          key={complaint.id}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {complaint.title}
              </h3>
              <p className="text-sm text-gray-500">
                Submitted on {complaint.date}
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
                onClick={() => toggleForm(complaint.id)}
                className="text-sm text-[#a80000] font-medium hover:underline"
              >
                {feedbackForms[complaint.id]
                  ? "Hide Feedback Form"
                  : "Give Feedback"}
              </button>

              {feedbackForms[complaint.id] && (
                <form
                  onSubmit={(e) => handleSubmit(e, complaint.id)}
                  className="mt-4 space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Rating
                    </label>
                    <select
                      name="rating"
                      value={feedbackForms[complaint.id]?.rating || ""}
                      onChange={(e) => handleInputChange(e, complaint.id)}
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
                      value={feedbackForms[complaint.id]?.comments || ""}
                      onChange={(e) => handleInputChange(e, complaint.id)}
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
