/************************************************************

  Comments Routes

*************************************************************/

// Requirements
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");


// Show the form to create a new comment
router.get("/new", middleware.isLoggedIn, function(req, res) {
  // find campground by id and send on render
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {

    } else {
      res.render("comments/new", {campground: foundCampground});
    }
  });
});


// Create a new Comment and associate it with the given Campground
router.post("/", middleware.isLoggedIn, function(req, res) {
  // lookup campground using id
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      req.flash("error", "Something went wrong.");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        // add username and id to comment
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        // save comment
        comment.save();
        campground.comments.push(comment);
        campground.save();
        req.flash("success", "Succesfully added comment.");
        res.redirect("/campgrounds/" + campground._id);
      });
    }
  });
});


// Edit the given comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if(err) {
        res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
    });
});


// Update the given comment given an id
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment) {
      if(err) {
        res.redirect("back");
      } else {
        res.redirect("/campgrounds/" + req.params.id);
      }
    });
});


// Destroy the comment given an id
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, req.body.comment, function(err, foundComment) {
      if(err) {
        res.redirect("back");
      } else {
        req.flash("success", "Comment deleted.");
        res.redirect("/campgrounds/" + req.params.id);
      }
    });
});


module.exports = router;
