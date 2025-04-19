import Student from "../models/Student.js";
import Worker from "../models/Worker.js";


export const updateStudentProfile = async (req, res) => {
    const studentId = req.params.id;
    const {name,email,password,mobile,registerNumber,hostelBlock,roomNumber} = req.body;

    try {
        const update = await Student.findByIdAndUpdate(
            studentId,
            { $set: {
                name:name,
                email:email,
                password:password,
                mobile:mobile,
                registerNumber:registerNumber,
                hostelBlock:hostelBlock,
                roomNumber:roomNumber
            }}
        );

        res.status(200).json({ message: 'Profile Updated successfully' ,update});
    } catch (error) {
        res.status(500).json({ message: 'Error Updating Profile', error: error.message });
    }
};


export const updateWorkerProfile = async (req, res) => {
    const workerId = req.params.id;
    const {name,email,password,mobile, employeeNumber,field} = req.body;

    try {
        const update = await Worker.findByIdAndUpdate(
            workerId,
            { $set: {
                name:name,
                email:email,
                password:password,
                mobile:mobile,
                employeeNumber:employeeNumber,
                field:field,
            }},
        );
        res.status(200).json({ message: 'Profile Updated successfully' ,update});
    } catch (error) {
        res.status(500).json({ message: 'Error Updating Profile', error: error.message });
    }
};