const express = require('express');
const UserExams = require('../models/userExams');
const router = express.Router();


router.get('https://quiz-application-backend.onrender.com/', (req, resp) => {
    UserExams.find().then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})

//spesific exam
router.get("https://quiz-application-backend.onrender.com/:id", async (req, resp) => {
    try {
        UserExams.find({ userId: req.params.id }).then(data => {
            resp.json(data)
        })
    } catch (err) {
        resp.json({ message: err });
    }
});

router.get("https://quiz-application-backend.onrender.com/exam/:id", async (req, resp) => {
    try {
        UserExams.find({ examId: req.params.id }).then(data => {
            resp.json(data)
        })
    } catch (err) {
        resp.json({ message: err });
    }
});



// router.get("https://quiz-application-backend.onrender.com/exam/:id", async (req, resp) => {
//     try {
//         let resultList = [];
//         const userExams = UserExams.find({ examId: req.params.id });

//         userExams.forEach(element => {
//             const user = Users.findOne(element.userId);

//             resultList.push({
//                 usename: user.name,
//                 examId: element.examId,
//                 userExamId: element,
//             })
//         });
//     } catch (err) {
//         resp.json({ message: err });
//     }
// });


router.post('https://quiz-application-backend.onrender.com/', (req, resp) => {
    const userExams = new UserExams({
        examId: req.body.examId,
        userId: req.body.userId,
        grade: req.body.grade,
        userInfo: req.body.userInfo,
        examReview: req.body.examReview,
        status: req.body.status,
    })
    userExams.save().then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})

router.put("https://quiz-application-backend.onrender.com/:id", (req, resp) => {
    UserExams.updateOne({ _id: req.params.id }, {
        $push: {
            examReview: req.body.examReview,
        }
    }).then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})


router.patch('https://quiz-application-backend.onrender.com/:id', (req, resp) => {
    UserExams.updateOne({ _id: req.params.id }, {
        $set: {
            examId: req.body.examId,
            userId: req.body.userId,
            grade: req.body.grade,
        }
    }).then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})

  
router.delete('https://quiz-application-backend.onrender.com/:id', (req, resp) => {
    UserExams.deleteOne({ _id: req.params.id })
        .then(data => {
            resp.json(data)
        }).catch(e => {
            resp.json({ message: e })
        })
})

module.exports = router;