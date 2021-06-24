const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const dataService = require('./services/dataService');
// use part
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))

app.use(session({
    secret: 'randomsecurestring',
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());

// middleware used
app.use((req,res,next)=>{
    next();
})

const authMiddleware = (req, res, next) =>{
    if(!req.session.currentUser){
        return res.json({
            statusCode: 401,
            status: false,
            message: "session expired please log in"
        })
    }
    else{
        next()
    }
}

//POST - register
app.post('/register',(req,res)=>{
    // console.log(req.body)
    dataService.register(req.body.phoneNumber,req.body.username,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
   });
//POST - login
app.post('/login',(req,res)=>{
    // console.log(req.body)
    dataService.login(req,req.body.phoneNumber,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
});

app.post('/addTodo', authMiddleware, (req,res)=>{
    // console.log(req.body)
    dataService.addTodo(req,req.body.todos,req.body.phoneNumber)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
});
app.post('/displayTodo', authMiddleware, (req,res)=>{
    // console.log(req.body)
  dataService.displayTodo(req,req.body.phoneNumber)
  .then(result=>{
    res.status(result.statusCode).json(result)
  })
});


// connection server at 3000
app.listen(3000, ()=>{
    console.log("server started at port 3000");
})