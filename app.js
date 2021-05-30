// install npm  init 
// express 
// heroku login -i 
// git init 
// git add .
// git commit -m "initial commit "
// heroku create 
// git remote -v 
// git push heroku master 
// heroku logs to see errors 
//
var express= require("express")
var app=express();
var flash = require("connect-flash");

const session = require('express-session'); 
app.set('view engine', 'ejs')
var bodyparser=require("body-parser");
app.use( express.static( "public" ) );

app.use(bodyparser.urlencoded({extended : true }));

app.use(session({ 
    secret:'geeksforgeeks', 
    saveUninitialized: true, 
    resave: true
})); 
  
app.use(flash()); 

//======================Routes =============================================/

app.get('/' , function(req , res )
	   {
	 var error1 = req.flash('error1'); 
	console.log(error1) ; 
	 res.render('login.ejs',  {error1 : error1 });
});
app.get('/news' , function(req , res )
	   {
    
	 res.render('news.ejs');
});

app.post('/news' , function(req , res )
	   {
	var credentials = {
    "admin": "12345",
    "STQA": "selenium",
    "varun": "203",
    "sanskruti": "205",
    "vaishali": "256",
    "vedant": "270", 
    "dhiraj" : "265", 
    "adarsh" : "275"
	}

    var username = req.body.name ;
    var password = req.body.pass ; 
	console.log(username) ;
	console.log(password) ; 

   if (credentials[username] == password)
         res.redirect('/news');
   else
	   {
          req.flash('error1', 'Incorrect Username or Password !! ')
		   res.redirect('/')
		   
	   }
		
	
	
});



app.listen(process.env.PORT , process.env.IP , function(){
	console.log("Hey Server is connected") ;
	
});




