import React from "react";
import ComplaintForm from "./ComplaintForm";

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to HostelMate
        </h1>
        <p className="text-gray-700">
          We're glad to have you here! This platform is designed to make it
          easier for you to submit and track hostel-related complaints, provide
          feedback, and stay informed.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#a80000] mb-4">
          Announcements
        </h2>
        <ol className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            Maintenance work is scheduled in Block B on April 15th from 9 AM to
            5 PM.
          </li>
          <li>
            {" "}
            New complaint submission deadlines will now close at 8 PM daily.
          </li>
          <li>
            Feedback is now mandatory for resolved complaints to help improve
            our service.
          </li>
        </ol>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#a80000] mb-4">
          Instructions
        </h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>
            Use the <strong>"New Complaint"</strong> tab to register any issues
            you face in your hostel block.
          </li>
          <li>
            You can view the status of your complaints under{" "}
            <strong>"My Complaints"</strong>.
          </li>
          <li>
            Once your complaint is marked as resolved, please fill out the{" "}
            <strong>"Feedback"</strong> form.
          </li>
          <li>
            Make sure all required fields in forms are filled before submitting.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default DashboardHome;
