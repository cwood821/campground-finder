//

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Tettegouche",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Northern_MN_Spring_2005_099.jpg/500px-Northern_MN_Spring_2005_099.jpg",
    description: "Tettegouche State Park, in the United States, is a Minnesota state park on the north shore of Lake Superior northeast of Duluth in Lake County on scenic Minnesota Highway 61."
  },
  {
    name: "Arches",
    image: "http://1.bp.blogspot.com/-jORzHTR0nR4/T7r6sgx1osI/AAAAAAAAKM4/nTEG1uCODVI/s1600/USA_Arches_NP_Delicate_Arch%281%29.jpg",
    description: "Arches in Utah"
  }
];


function seedDB() {
  // Clear the database
  Campground.remove({}, function(err) {
    if (err) {
      // an error occured
    }

    // // Add a few campgrounds
    // data.forEach(function(seed) {
    //   Campground.create(seed, function(err, campground) {
    //     if (err) {
    //       // error occured
    //     }
    //     // Create a comment on each campground
    //     Comment.create({
    //       text: "This place is swell.",
    //       author: "Homer"
    //     }, function (err, comment) {
    //       if(err) {
    //         // error
    //       }
    //       campground.comments.push(comment);
    //       campground.save();
    //     });
    //   });
    // });

  });
}

module.exports = seedDB;
