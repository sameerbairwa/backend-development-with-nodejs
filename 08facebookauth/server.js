var express = require('express')
var passport = require('passport')
var Strategy = require('passport-facebook').Strategy;

passport.use(
    new Strategy(
    {
        clientID: "828594410974556",
        clientSecret: "a40923b36b61cfd5ade36e05fb53c271",
        callbackURL: "http://localhost:3000/login/facbook/return"
    },
    function(accessToken, refreshToken, profile, cb){
        return cb(null, profile);

    }
  )
);
passport.serializeUser(function(user, cb){
    cb(null, user);
});

passport.deserializeUser(function(obj, cb){
    cb(null, obj);
});

//create express app
var app = express();

// set view dir
app.set('views', __dirname + "/views");
app.set("view engine", "ejs");

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({secret: 'MY APP', resave:  true,saveUninitialized: true}));


//@route    -     GET  /home
//@desc     -     a route to home page
//@access   -     PUBLIC 

app.get('/' ,(req, res)=>{
    res.render('home', {user: req.user});
});

//@route    -     GET  /login
//@desc     -     a route to login
//@access   -     PUBLIC 

app.get('/login', (req, res)=>{
    res.render('login');
});

//@route    -     GET  /login/facbook
//@desc     -     a route to facbook auth
//@access   -     PUBLIC 

app.get('/auth/facebook',
    passport.authenticate('facebook'));


 //@route    -     GET  /login/facebook/callback
//@desc     -     a route to facebook auth
//@access   -     PUBLIC    
app.get('/login/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    function (req, res){
        // successful authenticating redirect home.
        res.redirect('/');
    });

//@route    -     GET  /profile
//@desc     -     a route profile of user
//@access   -     PRIVATE

app.get('/profile', 
    require('connect-ensure-login').ensureLoggedIn(), 
    (req, res)=>{
        res.render("profile", {'user': req.user});
});

app.listen(port);
