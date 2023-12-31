const express = require("express");
const router = express.Router()
const ExamQuestions = require('../models/examQuestions')


router.get('/', (req, resp) => {
    ExamQuestions.find().then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})

//GET ExamQ
router.get("/:id", async (req, resp) => {
    try {
        ExamQuestions.find({ examId: req.params.id }).then(data => {
            resp.json(data)
        })
    } catch (err) {
        resp.json({ message: err });
    }
});


router.post("/", (req, res) => {
    const examQuestions = new ExamQuestions({
        examId: req.body.examId,
        questionTitle: req.body.questionTitle,
        options: req.body.option,
        correctOption: req.body.correctOption,
    })
    examQuestions.save().then(data => {
        res.json(data)
    }).catch(e => {
        res.json({message: e})
    })
})

router.put("/:id", (req, res) => {
    ExamQuestions.updateOne({ _id: req.params.id }, {
        $push: {
            options: req.body.options,
        }
    }).then(data => {
        res.json(data)
    }).catch(e => {
        res.json({ message: e })
    })
})

router.patch('/:id', (req, resp) => {
    ExamQuestions.updateOne({ _id: req.params.id }, {
        $set: {
            examId: req.body.examId,
            questionTitle: req.body.questionTitle,
            options: req.body.options,
            correctOption: req.body.correctOption,
        }
    }).then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})

router.delete('/:id', (req, resp) => {
    ExamQuestions.deleteOne({ _id: req.params.id })
        .then(data => {
            resp.json(data)
        }).catch(e => {
            resp.json({ message: e })
        })
})

module.exports = router;