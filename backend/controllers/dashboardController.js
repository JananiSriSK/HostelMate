import Complaint from '../models/Complaint.js';
import Worker from '../models/Worker.js';
import Student from '../models/Student.js';
export const getDashboardSummary = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });

    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const oldPending = await Complaint.countDocuments({
      status: 'Pending',
      createdAt: { $lte: threeDaysAgo }
    });
    
    const totalWorkers = await Worker.countDocuments();
    const totalStudents = await Student.countDocuments();

    res.status(200).json({
      totalComplaints,
      pendingComplaints,
      resolvedComplaints,
      oldPending,
      totalWorkers,
      totalStudents
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard summary', error: error.message });
  }
};
