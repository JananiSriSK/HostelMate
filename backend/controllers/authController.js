import Student from '../models/Student.js';
import Admin from '../models/Admin.js';
import Worker from '../models/Worker.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Student Sign Up
export const studentSignup = async (req, res) => {
  const { name, email, password, mobile, registerNumber, hostelBlock, roomNumber } = req.body;

  try {
    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Student already exists' });

    const student = new Student({
      name,
      email,
      password,
      mobile,
      registerNumber,
      hostelBlock,
      roomNumber
    });

    await student.save();

    const token = jwt.sign({ id: student._id, role: 'student' }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token, user: { id: student._id, name: student.name, role: 'student' } });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Student.findOne({ email }).select('+password');
    let role = 'student';

    if (!user) {
      user = await Worker.findOne({ email }).select('+password');
      role = 'worker';
    }

    if (!user) {
      user = await Admin.findOne({ email }).select('+password');
      role = 'admin';
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    console.log('User found:', user);
    console.log('Password match:', isMatch);
    
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};