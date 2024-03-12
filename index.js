const express = require('express')
const cors = require('cors')
const methodOverride = require('method-override')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const path = require('path')
const dbConnect = require('./lib/db/dbConnect')
const bodyParser = require('body-parser')
const Student = require('./lib/models/student')
const User = require('./lib/models/user')


const app = express();

dbConnect()

//set view engine and middle where
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', 'pages')

//middleware
app.use(cors())
app.use(express.json())
app.use(express.static("public"));

//login
app.get('/', (req, res)=>{
    res.status(200).render('login');
})

//list of students
app.get("/students", async (req, res)=>{
    // res.status(200).render('index');
    try {
        const students = await Student.find()
        res.status(200).render('index', {students: students});
        console.log(students)
    } catch (error) {
        res.status(400).json({mssg: error.message})
    }
    
})


//login
app.post('/login', (req, res) => {
    const details = req.body

    const username = details.username
    const pwd = details.password

    User.find({userName: username})
    .then((user) => {
        if(user.length > 0 && user.password == pwd){
        console.log(user)
        res.status(200).redirect('/students');
        }else{
        console.log(`User with username: ${username} is no found`)
        res.status(400).redirect('/', {})
        }
    })
    .catch((error)=>{
        console.log("Something went wrong. Please enter correct information");
        res.status(400).redirect('/')
    })

})

//
app.get('/signup', (req,res)=>{
    res.render('signup')
})

//create new user.
app.post('/user', (req, res)=>{
    const userDetails = req.body
    const user = new User({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        userName: userDetails.userName,
        password: userDetails.password
     })


     user.save()
     .then(()=>{
        res.status(200).redirect('/login')
     })
     .catch((error)=>{
        res.status(400).json({mssg: error.message})
     })
     
})

//add student
app.post("/admit", (req, res)=>{
    const info =  req.body
    newEntrant = new Student ({
        studentData: {
            firstName: info.firstName,
            middleName: info.middleName,
            lastName: info.lastName,
            religion: info.religion,
            level: info.level,
            dateOfBirth: info.dateOfBirth
        },
        residence: {
            country: info.country,
            district: info.district,
            town: info.town
        },
        parentsData: {
            father: {
                fullName: info.fatherName,
                contact: info.fContact,
                otherContact: info.otherFcontact,
                email: info.fEmail,
                occupation: info.fOccupation
            },
            mother: {
                fullName: info.motherName,
                contact: info.mContact,
                otherContact: info.otherMcontact,
                email: info.mEmail,
                occupation: info.mOccupation
            }
        }
    })
    
    newEntrant.save()
    .then((results)=>{
        console.log(newEntrant)
        res.status(200).json({mssg: "New student saved", data: results})
    })
    .catch((error) => {
        res.status(400).json({mssg: error.message})
    });
    
    console.log(info);
})
app.get("/add-student", (req, res)=>{
    res.status(200).render('add-student');
    console.log(app.get('env'))
})

//edit student
app.get('/edit/:id', async (req, res)=>{

    const studentId = req.params.id

    try {
        const student = await Student.findById(studentId);

        
        if(!student){
            console.log("student not found");
        }

        res.status(200).render('update-student', {student: student});

    } catch (error) {
        console.log(error.message);
    }
})

//update student
app.put('/update/:id', async (req, res) => {
    const studentId = req.params.id;
    

    const update = {
        studentData: {
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            religion: req.body.religion,
            level: req.body.level,
            dateOfBirth: req.body.dateOfBirth
        },
        residence: {
            country: req.body.country,
            district: req.body.district,
            town: req.body.town
        },
        parentsData: {
            father: {
                fullName: req.body.fatherName,
                contact: req.body.fContact,
                otherContact: req.body.otherFcontact,
                email: req.body.fEmail,
                occupation: req.body.fOccupation
            },
            mother: {
                fullName: req.body.motherName,
                contact: req.body.mContact,
                otherContact: req.body.otherMcontact,
                email: req.body.mEmail,
                occupation: req.body.mOccupation
            }
        }
    }


    try {
        const  updateStudent = await Student.findByIdAndUpdate(studentId, update, {new: true});
        res.status(200).json(updateStudent)
    } catch (error) {
        res.status(400).json({mssg: error.message});
    }
})

//delete student
app.delete('/student/delete/:id', async (req, res) => {
    const studentId = req.params.id

    try {
        deleteStudent = await Student.findByIdAndDelete(studentId)

        res.status(200).redirect('/');
        
    } catch (error) {
        res.status(400).send('Something went wrong');
    }

})

//log-in system


//import port number from env
const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`server running at localhost: ${port}`)
})