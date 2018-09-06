const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const User     = require('../models/userModel');
const middlewareObj = require('../middleware');
/*----------------------/register-------------------*/
router.get('/register',(req,res)=>{
  res.render('register');
});
router.post('/register',(req,res)=>{
  User.register(new User({username: req.body.username}), req.body.password, (err,newUser)=>{
    if (err) {
      req.flash("error", err.message);
       return res.redirect('/register');
    } else {
    passport.authenticate('local') (req,res, ()=>{
      req.flash('success', `Welcome to YelpCamp ${newUser.username}`)
          res.redirect('/campgrounds');
    });
  }
});
});
/*----------------------/login-------------------*/
router.get('/login',(req,res)=>{
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
successRedirect: '/campgrounds',
failureRedirect: '/login'
}), (req,res)=>{
});

router.get('/logout', (req,res)=>{
  req.logout();
  req.flash('success', 'Successfuly Logged Out');
  res.redirect('/campgrounds');
});

module.exports = router;
