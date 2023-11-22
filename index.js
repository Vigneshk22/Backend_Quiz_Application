const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json())

const bcrypt = require("bcryptjs");
app.use(express.urlencoded({ extended: false}));


const examQuestionsRoute = require('./routes/ExamQuestions')
const examRoute = require('./routes/Exam')
const userExamsRoute = require('./routes/UserExams')


app.use('/exam', examRoute)
app.use("/",require('./routes/Exam'));
app.use('/examquestions', examQuestionsRoute)
app.use('/userexams', userExamsRoute)


const jwt = require("jsonwebtoken");

const JWT_SECRET = "sfhbhufb4232!@@#djnfjfbsdsbftenj=*ehbrf./$asdej%jbgd^";

const mongoUrl =
  "mongodb+srv://Vignesh22:Vignesh22@cluster0.ustqjal.mongodb.net/";

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./models/userDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password, userType} = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});


app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});


app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.get("/getAllUsers", async (req,res)=>{
  try{
    const allUser = await User.find({});
    res.send({status: "ok", data: allUser});
  }catch (error){
    console.log(error);
  }
})

app.get("/getAllUsers/:id", async (req,res)=>{
  try{
    const allUser = await User.find({});
    res.send({status: "ok", data: allUser});
  }catch (error){
    console.log(error);
  }
})



app.listen(5000, () => {
  console.log("Server Started");
});

