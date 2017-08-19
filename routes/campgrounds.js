/*

  Campground routes

*/

var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Commment = require("../models/comment");
var middleware = require("../middleware/index.js");



router.get("/", function(req, res) {
  // Get all campgrounds fron db
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      // error
    } else {
      res.render("campgrounds/index", {
        campgrounds: allCampgrounds
      });
    }
  });
});


// Edit campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
      res.render("campgrounds/edit", {campground: foundCampground});
  });
});


// Edit campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
    if (err) {
      // res.redirect("/campgrounds");
      res.send("There was an errror");
    } else {
      res.redirect("/campgrounds/" + updatedCampground._id);
    }
  });
});

// Edit campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err, updatedCampground) {
    if (err) {
      // res.redirect("/campgrounds");
      res.redirect("/campgrounds/");
    } else {
      res.redirect("/campgrounds/");
    }
  });
});

// Create a new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new.ejs");
});


router.post("/", middleware.isLoggedIn, function(req, res) {
  // Get post data (from form)
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name: name, image: image, description: description, author: author};
  // Create new campground and save to database
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      // Error occured
    } else {
      res.redirect("/campgrounds");
    }
  });
});


// Show the given campground
router.get("/:id", function(req, res) {
  // find the campground with the given id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      // errro
    } else {
      res.render("campgrounds/show.ejs", {campground: foundCampground});
  }
});

});




module.exports = router;
