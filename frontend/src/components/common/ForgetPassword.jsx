

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import cegImage from "../../assets/ceg.jpg";
// import Navbar from "../common/Navbar";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const [otp, setOtp] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [step, setStep] = useState(1); // Step 1: Send OTP, Step 2: Enter OTP and new password
//     const [loading, setLoading] = useState(false);

//     const handleSendOtp = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
//             toast.success("OTP sent to your email",
//                 {
//                     duration: 4000,
//                     position: "top-right"
//                 });
//             setStep(2);
//         } catch (err) {
//             toast.error("Failed to send OTP", { duration: 4000, position: "top-right" });
//             console.error(err);
//         }
//         setLoading(false);
//     };

//     const handleResetPassword = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             await axios.post("http://localhost:5000/api/auth/reset-password", {
//                 email,
//                 otp,
//                 newPassword,
//             });
//             toast.success("Password reset successful", { duration: 4000, position: "top-right" });
//         } catch (err) {
//             toast.error("Invalid OTP or error resetting password", { duration: 4000, position: "top-right" });
//             console.error(err);
//         }
//         setLoading(false);
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="flex h-screen pt-16">
//                 <div
//                     className="hidden md:block md:w-1/2 bg-cover bg-center"
//                     style={{ backgroundImage: `url(${cegImage})` }}
//                 />

//                 <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
//                     <div className="w-full max-w-md">
//                         <div className="bg-white shadow-md rounded-xl p-8 border border-gray-200">
//                             <div className="flex justify-center mb-6">
//                                 <img
//                                     src="https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Anna_University_Logo.svg/640px-Anna_University_Logo.svg.png"
//                                     alt="University Logo"
//                                     className="h-16"
//                                 />
//                             </div>

//                             <div className="max-w-md mx-auto mt-20 p-4 border rounded">
//                                 {step === 1 && (
//                                     <>
//                                         <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
//                                         <input
//                                             className="w-full border px-4 py-2 mb-4"
//                                             placeholder="Enter your email"
//                                             onChange={(e) => setEmail(e.target.value)}
//                                         />
//                                         <button onClick={handleSendOtp} className="bg-blue-600 text-white px-4 py-2 rounded">
//                                             Send OTP
//                                         </button>
//                                     </>
//                                 )}

//                                 {step === 2 && (
//                                     <>
//                                         <h2 className="text-xl font-bold mb-4">Reset Password</h2>
//                                         <input
//                                             className="w-full border px-4 py-2 mb-2"
//                                             placeholder="Enter OTP"
//                                             onChange={(e) => setOtp(e.target.value)}
//                                         />
//                                         <input
//                                             className="w-full border px-4 py-2 mb-4"
//                                             placeholder="Enter New Password"
//                                             type="password"
//                                             onChange={(e) => setNewPassword(e.target.value)}
//                                         />
//                                         <button onClick={handleResetPassword} className="bg-green-600 text-white px-4 py-2 rounded">
//                                             Reset Password
//                                         </button>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ForgotPassword;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cegImage from "../../assets/ceg.jpg";
import Navbar from "../common/Navbar";
import axios from "axios";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      toast.success("OTP sent to your email", { duration: 4000, position: "top-right" });
      setStep(2);
    } catch (err) {
      toast.error("Failed to send OTP", { duration: 4000, position: "top-right" });
      console.error(err);
    }
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      toast.success("Password reset successful", { duration: 4000, position: "top-right" });
    } catch (err) {
      toast.error("Invalid OTP or error resetting password", { duration: 4000, position: "top-right" });
      console.error(err);
    }
    setLoading(false);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen pt-16 bg-gray-50">
        {/* Left Side Image */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${cegImage})` }}
        />

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
              <div className="flex justify-center mb-6">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Anna_University_Logo.svg/640px-Anna_University_Logo.svg.png"
                  alt="University Logo"
                  className="h-16"
                />
              </div>

              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                {step === 1 ? "Forgot Password" : "Reset Your Password"}
              </h2>

              {step === 1 ? (
                <form onSubmit={handleSendOtp} className="space-y-5">
                  <div>
                    <label className="block text-gray-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      autoComplete="off"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition duration-200 ${loading && "opacity-50 cursor-not-allowed"}`}
                    >
                      {loading ? "Sending..." : "Send OTP"}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div>
                    <label className="block text-gray-600 mb-1">OTP</label>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none "
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none "
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition duration-200 ${loading && "opacity-50 cursor-not-allowed"}`}
                    >
                      {loading ? "Resetting..." : "Reset Password"}
                    </button>
                  </div>
                </form>
              )}

              <p className="text-sm text-gray-600 text-center mt-6">
                Go back to{" "}
                <Link to="/" className="text-red-600 hover:underline font-medium">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
