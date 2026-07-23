const stdModel = require("../model/std.model");

async function CreateStudent(req, res) {
  try {
    const { name, subject, fathername, studentemail } = req.body;

    // Required Fields Validation
    if (!name || !subject || !fathername || !studentemail) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Sanitize Data
    const cleanName = name.trim();
    const cleanSubject = subject.trim();
    const cleanFatherName = fathername.trim();
    const cleanEmail = studentemail.trim().toLowerCase();

    // Empty String Validation
    if (!cleanName || !cleanSubject || !cleanFatherName || !cleanEmail) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        message: "Email is not valid",
      });
    }

    // Duplicate Email Check
    const alreadyCheck = await stdModel.findOne({
      studentemail: cleanEmail,
    });

    if (alreadyCheck) {
      return res.status(409).json({
        message: "Student already exists with this email",
      });
    }

    // Create Student
    const student = await stdModel.create({
      name: cleanName,
      subject: cleanSubject,
      fathername: cleanFatherName,
      studentemail: cleanEmail,
    });

    return res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function ReadStudent(req, res) {
  try {
    const student = await stdModel.find().sort({ createdAt: -1 });

    if (student.length === 0) {
      return res.status(404).json({
        message: "Students not found",
      });
    }

    res.status(200).json({
      message: "Students Read Successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

const mongoose = require("mongoose");

async function UpdateStudent(req, res) {
  try {
    const { id } = req.params;

    // ID Required
    if (!id) {
      return res.status(400).json({
        message: "Student ID is required",
      });
    }

    // ObjectId Validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Student ID is not valid",
      });
    }

    // Update
    await stdModel.findByIdAndUpdate(id, {
      name: req.body.name,
      subject: req.body.subject,
      fathername: req.body.fathername,
      studentemail: req.body.studentemail,
    });

    res.status(200).json({
      message: "Student Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function DeleteStudent(req, res) {
  
  try {
    const { id } = req.params;

    // ID Required
    if (!id) {
      return res.status(400).json({
        message: "Student ID is required",
      });
    }

    // ObjectId Validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Student ID is not valid",
      });
    }

    // Delete Student
    const deletedStudent = await stdModel.findByIdAndDelete(id);

    // Student Not Found
    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json({
      message: "Student Deleted Successfully",
      deletedStudent,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = { CreateStudent, ReadStudent, UpdateStudent, DeleteStudent };
