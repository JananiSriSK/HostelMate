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
      .sort({ createdAt: 1 })
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
      .sort({ resolvedAt: -1 })
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
      .sort({ createdAt: 1 })
      .populate('student', 'name email')
      .populate('worker', 'name field');

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stale pending complaints', error: error.message });
  }
};



export const getPendingComplaintsByStudent = async (req, res) => {
  try {
    const studentId = req.user._id;

    const complaints = await Complaint.find({
      student: studentId,
      status: 'Pending'
    })
    .sort({ createdAt: 1 })
    .populate('worker', 'name field');

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending complaints', error: error.message });
  }
};

export const getResolvedComplaintsByStudent = async (req, res) => {
  try {
    const studentId = req.user._id;

    const complaints = await Complaint.find({
      student: studentId,
      status: 'Resolved'
    })
    .sort({ resolvedAt: -1 })
    .populate('worker', 'name field');

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resolved complaints', error: error.message });
  }
};

export const addComplaintFeedback = async (req, res) => {
  const studentId = req.user._id;
  const { complaintId } = req.params;
  const { rating, comment } = req.body;

  try {
    const complaint = await Complaint.findOne({
      _id: complaintId,
      student: studentId,
      status: 'Resolved'  // Only allow feedback on resolved complaints
    });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found or not resolved yet' });
    }

    complaint.feedback = { rating, comment };
    await complaint.save();

    res.status(200).json({ message: 'Feedback submitted successfully', complaint });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
};

  

  export const getWorkerComplaints = async (req, res) => {
    try {
      const workerField = req.user.field;
  
      const complaints = await Complaint.find({
        issueCategory: workerField
      })
      .sort({ createdAt: 1 })
      .populate('student', 'name email');
  
      res.status(200).json(complaints);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching worker complaints', error: error.message });
    }
  };
  

  
export const updateComplaintStatusByWorker = async (req, res) => {
  try {
    const workerId = req.user._id; // coming from the JWT token
    const { id } = req.params; // complaint ID

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Only update if the complaint is still pending
    if (complaint.status === 'Resolved') {
      return res.status(200).json({ message: 'Complaint already resolved' });
    }

    // Update complaint
    complaint.status = 'Resolved';
    complaint.worker = workerId;
    complaint.resolvedAt = new Date();

    await complaint.save();

    res.status(200).json({
      message: 'Complaint marked as resolved',
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating complaint', error: error.message });
  }
};



export const adminUpdateComplaintStatus = async (req, res) => {
  const { complaintId } = req.params;

  try {
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = 'Resolved';
    complaint.resolvedAt = new Date();

    await complaint.save();

    res.status(200).json({ message: 'Complaint marked as resolved by admin', complaint });
  } catch (error) {
    res.status(500).json({ message: 'Error updating complaint status', error: error.message });
  }
};
