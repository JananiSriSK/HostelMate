import express from "express";
import Otp from "../models/Otp.js";
import Student from "../models/Student.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken"; 
const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

const authRouter = express.Router(); 


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "unakuloruvan7@gmail.com",
    pass: "ipjb lgiq kzur vijc",    
  },
});


authRouter.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    await Otp.create({ email, otp, expiresAt });
    console.log("otp stored in database");
    await transporter.sendMail({
      from: "unakuloruvan7@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });
    console.log("Email sent!");


    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP" });
  }
});

authRouter.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const record = await Otp.findOne({ email, otp });

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Student.findOneAndUpdate({ email }, { password: hashedPassword });
    await Otp.deleteMany({ email }); 

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error" });
  }
});


authRouter.post("/google-login", async (req, res) => {
    const { token } = req.body;
  
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: "YOUR_GOOGLE_CLIENT_ID",
      });
  
      const payload = ticket.getPayload();
      const { email, name } = payload;
  
      let student = await Student.findOne({ email });
  
      if (!student) {
        student = new Student({
          name,
          email,
          password: "",
          mobile: "",
          registerNumber: "",
          hostelBlock: "",
          roomNumber: "",
        });
  
        await student.save();
      }
  
      const jwtToken = jwt.sign(
        { id: student._id, email: student.email },
        "your_jwt_secret",
        { expiresIn: "1d" }
      );
  
      res.status(200).json({
        message: "Google login successful",
        token: jwtToken,
        user: {
          id: student._id,
          name: student.name,
          email: student.email,
        },
      });
    } catch (error) {
      console.error("Google login error:", error);
      res.status(401).json({ message: "Invalid Google token" });
    }
  });
  

export default authRouter;
