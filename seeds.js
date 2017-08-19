/************************************************************

  Database Seeding Script

*************************************************************/

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

function seedDB() {
  // Clear the database
  Campground.remove({}, function(err) {
    if (err) {
      // an error occured
    }
  });
}

module.exports = seedDB;
