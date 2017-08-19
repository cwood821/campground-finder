/************************************************************

  Express Server for Campground Finder

*************************************************************/

// Requirements
var express = require('express'),
    request = require('request'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require('method-override'),
    flash = require("connect-flash"),
    seedDB = require('./seeds'),
    User = require("./models/user")
    Campground = require("./models/campground"),
    Comment = require("./models/comment");


var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index.js");



var app = express();
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect("mongodb://localhost/campgrounds_app", {useMongoClient: true});

// Set up application
app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
// Views configuration
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
// Method override to handle PUT and DELETE requests
app.use(methodOverride("_method"));


// Pasport Configuration
app.use(require("express-session")({
  secret: "secret salt for all passwords",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Middleware to pass current user information to all views
app.use( function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// Route configuration
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

// Get app to listen on process port or 80
app.listen(process.env.PORT || 80);
