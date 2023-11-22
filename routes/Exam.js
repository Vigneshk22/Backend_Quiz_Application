const express = require('express')
const Exam = require('../models/exam')
const mongoose = require("mongoose");
const router = express.Router()
const app = express()
app.use(express.json());

require('../models/exam')
const Exams = mongoose.model("exam");

router.route("/").post((req,res) => {
    const examname = req.body.examname;
    const passGrade = req.body.passGrade;
    const time = req.body.time;
    const newdata = new Exam({
        examname,
    });
    newdata.save();
    
})


router.get('/', (req, resp) => {
    Exam.find().then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})

//GET Exam by examId
router.get("/exam/:id", async (req, resp) => {
    try {
        Exam.find({ _id: req.params.id }).then(data => {
            resp.json(data)
        })
    } catch (err) {
        resp.json({ message: err });
    }
});

router.patch('/:id', (req, resp) => {
    Exam.updateOne({ _id: req.params.id }, {
        $set: {
            examname: req.body.examname,
            passGrade: req.body.passGrade,
            time: req.body.time,
        }
    }).then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})


router.delete('/:id', (req, resp) => {
    Exam.deleteOne({ _id: req.params.id })
        .then(data => {
            resp.json(data)
        }).catch(e => {
            resp.json({ message: e })
        })
})

module.exports = router;