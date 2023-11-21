const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({

  examname: {
    type: String,
    lowercase: true,
  },
  passGrade: {
    type: Number,
    default: 2,
  },
  time: {
    type: Number,
    default: 20,
  },
},
  {
    timestamps: true,
  }
);

const Exam = mongoose.model("exam", ExamSchema);
module.exports = Exam
