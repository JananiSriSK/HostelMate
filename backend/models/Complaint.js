import mongoose from 'mongoose';
import Student from './Student.js';
import Worker from './Worker.js';
const complaintSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  issueCategory: {
    type: String,
    enum: ['Electrical', 'Plumbing', 'Carpentry', 'Cleaning', 'Other'],
    required: true
  },
  location: { type: String, required: true },
  description: { type: String, required: true },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Emergency'],
    default: 'Low'
  },
  status: {
    type: String,
    enum: ['Pending', 'Resolved'],
    default: 'Pending'
  },
  photo: { type: String }, // URL or filename if stored
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: String
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker'
  },
  resolvedAt: Date
}, { timestamps: true });

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
