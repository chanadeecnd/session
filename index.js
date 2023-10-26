const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const port = 3001;
const app = express()

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
app.use(session({
    secret:'mysession',
    resave:false,
    saveUninitialized:false
}))

app.get('/',(req,res)=>{
    res.render('login')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return -1;
        }
        return res.redirect('/')
    })
})

app.get('/manage',(req,res)=>{
    //display session data
    console.log(`รหัส session : ${req.sessionID}`)
    const dataSession = JSON.stringify(req.session.login)
    console.log(dataSession)
    if(dataSession){
        return res.render('manage')
    }
    return res.render('login')
    
    // console.log(req)
    
})

app.post('/login',(req,res)=>{
    const {username, password} = req.body
    const timeExpire = 30000
    if(username === "admin" && password === '000'){
        //create session
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge = timeExpire
        res.redirect('/manage')
    }
})

app.listen(port,()=>{
    console.log('Server is running')
})