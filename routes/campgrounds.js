const express = require('express');
const router  = express.Router();
const Camp    = require('../models/campground');
const middlewareObj = require('../middleware');

/*  GET--------/camgrounds----------  */
router.get('/', (req,res)=>{
  Camp.find({}, (err, camp)=> {
  if (err) {console.log("There is an error") }
  else {
  res.render('campgrounds', {camps: camp}); }
  });
});

/*  GET--------/campgrounds/new----------  */
router.get('/new', middlewareObj.isLoggedIn ,(req,res)=> {
  res.render("addcampground");
});

/*  POST--------/campgrounds----------  */
router.post('/', middlewareObj.isLoggedIn ,(req,res)=>{
const name = req.body.campName;
const price = req.body.campPrice;
const image = req.body.campImage;
const description = req.body.campDesc;
const author = { id: req.user._id, username: req.user.username };
const newCamp = {  name: name, price: price,  image: image, description: description, author: author};
Camp.create (newCamp, (err,Camp)=> {
if(err) { console.log("Something went wrong")} else {
  console.log("A new campground added:"); console.log(Camp);};
});
req.flash('success','Succesfuly added new campground.');
res.redirect('/campgrounds');
});

/*  GET--------/campgrounds/:id----------  */
router.get('/:id',(req,res)=> {
  Camp.findById(req.params.id).populate('comments').exec((err, campfound)=> {
  if (err) {console.log(err); }
  else {
  res.render('show', {campus: campfound}); }
  });
});

/*  GET--------/campgrounds/:id/edit----------  */
router.get('/:id/edit', middlewareObj.checkCampOwnership, (req,res)=> {
   Camp.findById(req.params.id, (err, campEdit)=> {
   res.render("campgroundEdit", {camp: campEdit} );
  });
});

/* Edit Campground-PUT--------/campgrounds/:id----------  */
router.put('/:id', middlewareObj.checkCampOwnership, (req,res)=>{
  const name        = req.body.campName;
  const price       = req.body.campPrice;
  const image       = req.body.campImage;
  const description = req.body.campDesc;
  const newCamp     = {  name: name, price: price,  image: image, description: description};
  Camp.findByIdAndUpdate(req.params.id, newCamp, (err,updated)=> {
    if(err) {console.log(err);} else {
req.flash('success','Succesfuly edited the campground.');
      res.redirect(`/campgrounds/${req.params.id}`);}
  });
});
/*  DELETE--------/campgrounds/:id----------  */
router.delete('/:id', middlewareObj.checkCampOwnership, (req,res)=> {
  Camp.findByIdAndRemove(req.params.id, (err, deleted)=> {
    if(err) {console.log(err);} else {
req.flash('success','Campground deleted.');
      res.redirect('/campgrounds')}
  });
});

module.exports = router;
