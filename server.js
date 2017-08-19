/*

  -- Express Server Code for Campground Finder --


*/

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

// Populate db
// seedDB();

// Set up application
app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));


// Pasport Configuration
app.use(require("express-session")({
  secret: "secret salt for all passwords",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Middleware to pass current user information to all views
app.use( function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.set("views", __dirname + "/views");

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

/*

  -- Application Routes --

*/
//
// app.get("/", function(req, res) {
//   res.render(__dirname + "/views/landing");
// });
// //
//
// app.get("/campgrounds", function(req, res) {
//   // Get all campgrounds fron db
//   Campground.find({}, function(err, allCampgrounds) {
//     if(err) {
//       // error
//     } else {
//       res.render(__dirname + "/views/campgrounds/index", {
//         campgrounds: allCampgrounds
//       });
//     }
//   });
// });
//
//
// // Create a new campground
// app.get("/campgrounds/new", function(req, res) {
//
//   res.render(__dirname + "/views/campgrounds/new.ejs");
// });
//
//
// app.post("/campgrounds", isLoggedIn, function(req, res) {
//   // Get post data (from form)
//   var name = req.body.name;
//   var image = req.body.image;
//   var description = req.body.description;
//   var newCampground = {name: name, image: image, description: description};
//   // Create new campground and save to database
//   Campground.create(newCampground, function(err, newlyCreated){
//     if (err) {
//       // Error occured
//     } else {
//       res.redirect("/campgrounds");
//     }
//   });
// });
//
//
// // Show specific campground
// app.get("/campgrounds/:id", function(req, res) {
//   // find the campground with the given id
//   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
//     if (err) {
//       // errro
//     } else {
//       res.render(__dirname + "/views/campgrounds/show.ejs", {campground: foundCampground});
//   }
// });
//
// });
//
//
// /************************************************************
//
//   Authentication Routes
//
// *************************************************************/
//
// app.get("/register", function(req, res) {
//   res.render(__dirname + "/views/register.ejs");
// });
//
//
// app.post("/register", function(req, res) {
//   var newUser = new User({username: req.body.username});
//   User.register(newUser, req.body.password, function(err, user){
//     if (err) {
//       // error
//       return res.render(__dirname + "/views/register.ejs");
//     }
//     passport.authenticate("local")(req, res, function() {
//       res.redirect("/campgrounds");
//     });
//
//   });
//   // res.render(__dirname + "/views/campgrounds/register.ejs");
// });
//
//
// // Login
// app.get("/login", function(req, res) {
//   res.render(__dirname + "/views/login.ejs");
// });
//
// // Handle login
// app.post("/login", passport.authenticate("local",
//   {
//     successRedirect: "/campgrounds",
//     failureRedirect: "/login"
//   }), function(req, res) {
//
//     res.render(__dirname + "/views/login.ejs");
// });
//
// // Logout
// app.get("/logout", function(req, res) {
//   req.logout();
//   res.redirect("/campgrounds");
// });
//
//
// function isLoggedIn(req, res, next) {
//   if( req.isAuthenticated() ) {
//     next();
//   } else {
//       res.redirect("/login");
//   }
// }
//
//
//
//
// /************************************************************
//
//   Comments Routes
//
// *************************************************************/
//
// app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
//   // find campground by id and send on render
//   Campground.findById(req.params.id, function(err, foundCampground) {
//     if (err) {
//
//     } else {
//       res.render(__dirname + "/views/comments/new", {campground: foundCampground});
//     }
//   });
//
// });
//
// app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
//   // lookup campground using id
//   Campground.findById(req.params.id, function(err, campground) {
//     if(err) {
//       // error!
//     } else {
//       Comment.create(req.body.comment, function(err, comment) {
//         campground.comments.push(comment);
//         campground.save();
//         res.redirect("/campgrounds/" + campground._id);
//       });
//     }
//
//
//
//   });
//
// });



/* get app to listen on process port or 80 */
app.listen(process.env.PORT || 80);
