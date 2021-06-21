
const express=require('express'); //import express
const app=express();
const dataService=require('./Service/data.service')
const session = require('express-session'); 
app.use(express.json())
app.use(session({                            //session
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}));
const authMiddleware=(req,res,next)=>{
    if(!req.session.currentUser){
        return res.json({
            statusCode:401,
            status:false,
            message:"please login"
        })
    }
    else{
    next();
    }
}


//register
app.post('/register',(req,res)=>{
    // console.log(req.body);
    dataService.register(req.body.uname,req.body.id,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
    
});
//login
app.post('/login',(req,res)=>{
    // console.log(req.body);
    dataService.login(req,req.body.id,req.body.pswd)   //asychronus
    .then(result=>{
        res.status(result.statusCode).json(result)
})
});

//addEvent
app.post('/addevent',authMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.addEvent(req,req.body.uid,req.body.eDate,req.body.eName)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
});

app.post('/viewevent',authMiddleware,(req,res)=>{
    console.log(req.session.currentUser);
    dataService.viewEvent(req,req.body.uid)
    .then(result=>{
        res.status(result.statusCode).json(result)
})
});




app.listen(5000,()=>{
    console.log("Server running on port:5000");
})