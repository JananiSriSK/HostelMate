import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentLayout from "../Student/StudentLayout";
import DashboardHome from "../Student/DashboardHome";
import ComplaintForm from "../Student/ComplaintForm";
import MyComplaints from "../Student/MyComplaints";
import FeedbackForm from "../Student/FeedbackForm";
import Signup from "../Student/Signup";
import Login from "../common/Login";

const StudentHome = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/student" element={<StudentLayout />}>
        <Route path="/student" element={<DashboardHome />} />
        <Route path="new-complaint" element={<ComplaintForm />} />
        <Route path="my-complaints" element={<MyComplaints />} />
        {/* <Route path="feedback" element={<FeedbackForm />} /> */}
      </Route>
    </Routes>
  );
};

export default StudentHome;
