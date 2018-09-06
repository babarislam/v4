const express = require('express');
const router  = express.Router({mergeParams: true});
const Camp    = require('../models/campground');
const Comment = require('../models/comments');
const middlewareObj = require('../middleware');
/*****GET-----------/campgrounds/:id/comments/new---------------*/
router.get('/new', middlewareObj.isLoggedIn, (req,res)=>{
  Camp.findById(req.params.id, (err, goto)=>{
 if(err) {console.log(err);} else {
res.render('editComments',{details: goto});
 }
  });
});
/******POST------------/campgrounds/:id/comments-----------------*/
router.post('/', middlewareObj.isLoggedIn, (req,res)=>{
const newComment = req.body.comment;
  Camp.findById(req.params.id, (err,edited)=>{
    if(err) {console.log(err);} else {
      Comment.create(newComment,(err,added)=>{
        if(err) {console.log(err);} else {
     added.author.id = req.user._id;
     added.author.username = req.user.username;
     added.save();
          edited.comments.push(added);
          edited.save();
            res.redirect(`/campgrounds/${req.params.id}`);
        }
      });
    }
  });
});
/*****GET-----------/campgrounds/:id/comments/comments_id/edit---------------*/
router.get('/:comment_id/edit', middlewareObj.checkComOwnership , (req,res)=>{
  Camp.findById(req.params.id, (err, goto)=>{
 if(err) {console.log(err);} else {
   Comment.findById(req.params.comment_id, (err, comment)=>{
     if(err) {console.log(err);} else {
       res.render('edit',{details: goto, comment: comment});
     }
   });
 }
});
});
/*****PUT-----------/campgrounds/:id/comments/comments_id---------------*/
router.put('/:comment_id/', middlewareObj.checkComOwnership, (req,res)=>{
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err,comment)=>{
    if(err) { console.log(err);} else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});
/*****Delete-----------/campgrounds/:id/comments/comments_id---------------*/
router.delete('/:comment_id/', middlewareObj.checkComOwnership , (req,res)=>{
  Comment.findByIdAndRemove(req.params.comment_id, (err,comRemoved)=>{
    if(err) {console.log(err);} else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});




module.exports = router;
