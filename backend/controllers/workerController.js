// controllers/workerController.js
import Worker from "../models/Worker.js";

export const addWorker = async (req, res) => {
  const { name, email, password, field, mobile } = req.body;

  try {
    const existing = await Worker.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Worker already exists' });
    }

    const worker = await Worker.create({ name, email, password, field, mobile });
    res.status(201).json({ message: 'Worker added successfully', worker });
  } catch (error) {
    res.status(500).json({ message: 'Error adding worker', error: error.message });
  }
};


export const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find().select('-password').sort({ createdAt: 1 }); 
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workers', error: error.message });
  }
};

export const deleteWorker = async (req, res) => {
  const workerId = req.params.id;

  try {
    const deleted = await Worker.findByIdAndDelete(workerId);
    if (!deleted) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.status(200).json({ message: 'Worker deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting worker', error: error.message });
  }
};
