// All middleware functions go here
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");
var User = require("../models/user.js");

var middlewareObj = {};


middlewareObj.checkCommentOwnership = function(req, res, next) {
  if (! req.isAuthenticated()) {
    req.flash("error", "Please login to do that.")
    return res.redirect("back");
  }

  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if (err) {
      req.flash("error", "Comment not found.");
      return res.redirect("back");
    }
    // does their id match the creator's id?
    if (foundComment.author.id.equals(req.user._id)) {
      next();
    } else {
      req.flash("error", "You do not have permission to do that.")
      return res.redirect("back");
    }
  });
}


middlewareObj.checkCampgroundOwnership = function(req, res, next) {
  if (! req.isAuthenticated()) {
    req.flash("error", "Please login to do that.")
    return res.redirect("back");
  }

  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      req.flash("error", "Campground not found.");
      return res.redirect("back");
    }
    // does their id match the creator's id?
    if (foundCampground.author.id.equals(req.user._id)) {
      next();
    } else {
      req.flash("error", "You do not have permission to do that.")
      return res.redirect("back");
    }
  });
}


middlewareObj.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  } else {
    req.flash("error", "Please Login First!");
    res.redirect("/login");
  }
}


module.exports = middlewareObj;
