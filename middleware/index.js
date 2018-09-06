const Camp    = require('../models/campground');
const Comment = require('../models/comments');
const middlewareObj = {
};

middlewareObj.isLoggedIn = function (req,res,next) {
    if(req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "Please Login to continue.");
    res.redirect('/login');
  };

middlewareObj.checkComOwnership = function (req,res,next) {
    if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, comEdit)=> {
      if (err) {console.log(err);
     res.redirect('back');
      } else  {
        if(comEdit.author.id.equals(req.user._id)) {
        next();
      } else {
          req.flash("error", "You are not authorized to edit this campground.");
        res.redirect('back');
      }
    }
    });
  }
  else {
    req.flash("error", "You need to login to continue.");
    res.redirect('back');
  }
  };


middlewareObj.checkCampOwnership = function (req,res,next) {
     if(req.isAuthenticated()) {
    Camp.findById(req.params.id, (err, campEdit)=> {
      if (err) {console.log(err);
     res.redirect('back');
      } else  {
        if(campEdit.author.id.equals(req.user._id)) {
        next();
      } else {
          req.flash("error", "You are not authorized to edit this campground.");
        res.redirect('back');
      }
    }
    });
  }
  else {
      req.flash("error", "You need to login to continue.");
    res.redirect('back');
  }
  };

module.exports = middlewareObj;
