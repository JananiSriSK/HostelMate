import Complaint from "../models/Complaint.js";

export const createComplaint = async (req, res) => {
  try {
    const studentId = req.user._id;
    const {
      issueCategory,
      location,
      description,
      priority,
      photo
    } = req.body;

    const complaint = await Complaint.create({
      student: studentId,
      issueCategory,
      location,
      description,
      priority,
      photo
    });

    res.status(201).json({ message: 'Complaint submitted successfully', complaint });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting complaint', error: error.message });
  }
};



export const getPendingComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ status: 'Pending' })
      .populate('student', 'name email')
      .populate('worker', 'name field');

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending complaints', error: error.message });
  }
};

export const getResolvedComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ status: 'Resolved' })
      .populate('student', 'name email')
      .populate('worker', 'name field');

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resolved complaints', error: error.message });
  }
};

export const getStalePendingComplaints = async (req, res) => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const complaints = await Complaint.find({
      status: 'Pending',
      createdAt: { $lt: threeDaysAgo }
    })
      .populate('student', 'name email')
      .populate('worker', 'name field');

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stale pending complaints', error: error.message });
  }
};



export const getStudentComplaints = async (req, res) => {
    try {
      const studentId = req.user._id;
  
      const complaints = await Complaint.find({ student: studentId }).populate('worker', 'name field');
  
      res.status(200).json(complaints);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching student complaints', error: error.message });
    }
  };
  

  export const getWorkerComplaints = async (req, res) => {
    try {
      const workerField = req.user.field;
  
      const complaints = await Complaint.find({
        issueCategory: workerField
      }).populate('student', 'name email');
  
      res.status(200).json(complaints);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching worker complaints', error: error.message });
    }
  };
  