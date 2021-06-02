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
var User = require("./passport-config.js") ; 

var mongoose = require("mongoose"); 
app.set('view engine', 'ejs')
var bodyparser=require("body-parser");
app.use( express.static( "public" ) );
var flash = require("connect-flash");
app.use(flash()); 


app.use(bodyparser.urlencoded({extended : true }));



//passport ================================================================ //
var passport = require("passport");
const session = require('express-session'); 
var LocalStrategy = require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");

 app.use(require('express-session')(
 { secret : 'Mayuri is of 6 feet' ,
   resave : false ,
   saveUninitialized :  false 
}));


//initialize the passport and session 
app.use(passport.initialize());
app.use(passport.session());

 //This methods are generally used to read session and taking data from it econding it and decoding it 
passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())
 
//======================Routes =============================================/

app.get('/' , function(req , res )
	   {
	 
	 var error = req.flash('error'); 
	 console.log(error)

	res.render('login.ejs',  {error:error});
	
});

app.get('/news' , function(req , res )
	   {
    
	 res.render('news.ejs');
});

app.get('/register' , function(req , res )
	   {
	 var error1 = req.flash('error1'); 
	 console.log(error1) ; 
    
	 res.render('register.ejs', {error1 : error1} );
});

/*app.post('/news' , function(req , res )
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
	
});*/

app.post('/register' , function(req , res )
	   {
	   console.log(req.body.username)
	  console.log(req.body.password)

	// hashing of password 
	// stores in User collection :
	// 
	User.register(new User ({username : req.body.username }) , req.body.password , function( err , user )
	{
		if(err)
			{
				console.log(err);
				req.flash('error1', 'The user is already registered!!')
		   	res.redirect('/register')
				
			}
		else 
			{
				passport.authenticate("local")( req , res , function()
				 {
				 console.log('called')
				 res.render('news.ejs')
				});
			}
	});

});


/*app.post('/login' , function(req , res ) {

console.log('Login post is called ')
}); */

app.post('/login' , passport.authenticate("local" , {
	successRedirect :  '/news' , 
	failureRedirect : '/', 
	failureFlash : 'Invalid Username or password!!'

}) , function(req , res )
	{	
});







//=================================app listen ==========================================



app.listen(3000 , function(){
	console.log("Hey Server is connected") ;
	
});


// =================Mongose server =======================

const connect = mongoose.connect('mongodb+srv://frustratedpluto:dhiraj1thakre1@cluster0.p06in.mongodb.net/user?retryWrites=true&w=majority', { useNewUrlParser: true  , useUnifiedTopology: true });
//mongodb atlas 
//confirm the connection 
connect.then((db)=>{
	console.log('Succesfully Connected the mongoose server ');
} , (err) =>{
	console.log(err);
	
});



