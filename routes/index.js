// General purpose routes

var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js");

// Landing page / root
router.get("/", function(req, res) {
  res.render("landing");
});



/************************************************************

  Authentication Routes

*************************************************************/

// Register view
router.get("/register", function(req, res) {
  res.render("register.ejs");
});

// Registration post route
router.post("/register", function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if (err) {
      req.flash("error", err.message);
      return res.render("register.ejs");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome to Campground Finder, " + user.username + "!");
      res.redirect("/campgrounds");
    });

  });
});


// Login Page
router.get("/login", function(req, res) {
  req.flash("error", "Please log in first!");
  res.render("login.ejs");
});


// Handle login
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res) {
    res.render("login.ejs");
  }
);


// Logout Route
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "You are now logged out.");
  res.redirect("/campgrounds");
});



module.exports = router;
