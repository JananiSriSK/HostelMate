import React, { useState } from "react";

const ComplaintForm = () => {
  const initialState = {
    name: "",
    email: "",
    rollNumber: "",
    block: "",
    roomNumber: "",
    subject: "",
    image: null,
    details: "",
    issueCategory: "",
    otherIssue: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      issueCategory:
        formData.issueCategory === "Other"
          ? formData.otherIssue
          : formData.issueCategory,
    };

    console.log("Form submitted:", finalData);

    setFormData(initialState);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-0">File a Complaint</h2>
        <p className="text-gray-500 mb-6">
          We take your feedback seriously. Please provide the details of your
          complaint below.
        </p>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="name" className="text-gray-700 font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none "
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none "
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="rollNumber" className="text-gray-700 font-medium">
              Roll Number
            </label>
            <input
              id="rollNumber"
              name="rollNumber"
              type="text"
              required
              placeholder="Enter your roll number"
              value={formData.rollNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none "
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="block" className="text-gray-700 font-medium">
              Block Name
            </label>
            <input
              id="block"
              name="block"
              type="text"
              required
              placeholder="Enter your block name"
              value={formData.block}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none "
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="roomNumber" className="text-gray-700 font-medium">
              Room Number
            </label>
            <input
              id="roomNumber"
              name="roomNumber"
              type="text"
              required
              placeholder="Enter your room number"
              value={formData.roomNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none "
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="issueCategory"
              className="text-gray-700 font-medium"
            >
              Issue Category
            </label>
            <select
              id="issueCategory"
              name="issueCategory"
              required
              value={formData.issueCategory}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none "
            >
              <option value="">Select Category</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {formData.issueCategory === "Other" && (
            <div className="grid gap-2">
              <label htmlFor="otherIssue" className="text-gray-700 font-medium">
                Please specify
              </label>
              <input
                id="otherIssue"
                name="otherIssue"
                type="text"
                required
                placeholder="Specify your issue"
                value={formData.otherIssue}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none "
              />
            </div>
          )}
          <div className="grid gap-2">
            <label htmlFor="subject" className="text-gray-700 font-medium">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="Briefly describe your complaint"
              value={formData.subject}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none "
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="image" className="text-gray-700 font-medium">
              Image of the Problem
            </label>
            <input
              id="image"
              name="image"
              type="file"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 
                file:mr-4 file:border file:border-gray-300 
                file:rounded-md file:px-3 file:py-1 
                file:bg-white file:text-gray-700 
                file:cursor-pointer cursor-pointer"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="details" className="text-gray-700 font-medium">
              Details
            </label>
            <textarea
              id="details"
              name="details"
              required
              placeholder="Provide more information about your complaint"
              value={formData.details}
              onChange={handleChange}
              className="border border-gray-300 border-gray-300rounded-md px-4 py-2 focus:outline-none  min-h-[150px] "
            />
          </div>

          {/* <div className="flex justify-center"> */}
          <button
            type="submit"
            className="bg-[#a80000] hover:bg-[#800000] text-white font-medium py-2 px-4 rounded-md"
          >
            Submit Complaint
          </button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
