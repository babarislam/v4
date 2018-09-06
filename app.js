/* --------requiring----------  */
const express               = require('express');
const app                   = express();
const bodyParser            = require('body-parser');
const methodOverride        = require('method-override');
const mongoose              = require('mongoose');
const passport              = require('passport');
const localStrategy         = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const expressSession        = require('express-session');
const flash                 = require('connect-flash');
const Camp                  = require('./models/campground');
const Comment               = require('./models/comments');
const seedDb                = require('./models/seeds');
const User                  = require('./models/userModel');

const campRoute = require('./routes/campgrounds');
const commentRoute = require('./routes/comments');
const userRoute = require('./routes/users');

/* --------Methods----------  */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(expressSession({
  secret: 'Whatever man whatever',
  resave: false,
  saveUninitialized: false
}));
passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
  res.locals.currentUser = req.user;
  res.locals.error     = req.flash('error');
  res.locals.success     = req.flash('success');
  next();
});
/* --------Mongoose-Setup----------  */
mongoose.connect('mongodb://localhost/yelpcamp');
/*seedDb();
/*  --------HOME----------  */
app.get('/', (req,res)=>{
  res.render('home');
});

app.use('/campgrounds', campRoute);
app.use('/campgrounds/:id/comments', commentRoute);
app.use(userRoute);


app.listen(3000, process.env.IP, ()=>{
  console.log("Server has started!");
});
