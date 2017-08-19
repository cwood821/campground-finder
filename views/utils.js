// Immediately invoked function wrapper to protect this from the global scope
(function() {

const config = {
  mobileBreakpoint: 915
};



/******************************************************************
  Force show navigation on desktop
*******************************************************************/

window.addEventListener("resize", showDesktop);

function showDesktop() {
  var mainNav = document.getElementById("mainNav");
  if (window.clientWidth > config.mobileBreakpoint) {
    mainNav.style.display = "block";
  }
}


/******************************************************************
  Hide book preview on tap
*******************************************************************/

var bookPreview = document.getElementById("bookPreview");
var previewOverlay = document.getElementById("previewOverlay");

if (bookPreview) {
  bookPreview.addEventListener("click", function() {
    var previewOverlay = document.getElementById("previewOverlay");
    previewOverlay.style.display = "none";
  });

}



/******************************************************************
  Toggle mobile navigation
*******************************************************************/

// Try/Catch in case the element doesn't exist
try {
  var navToggler = document.getElementById("navToggler");

  navToggler.addEventListener("click", function() {
    var mainNav = document.getElementById("mainNav");
    var navToggler = document.getElementById("navToggler");

    showHide(mainNav);
    swapInnerHTML(navToggler,
                  'Menu <i class="fa fa-bars" aria-hidden="true"></i>',
                  'Menu <i class="fa fa-times-circle" aria-hidden="true"></i>');
  });

} catch(err) {
  // Do nothing
  console.log(err);
}


/******************************************************************
  Toggle chapter navigation
*******************************************************************/


try {
  var navChaptersToggle = document.getElementById("navChaptersToggle");

  navChaptersToggle.addEventListener("click", function() {
    var navChapters = document.getElementById("chapterNav");
    var navChaptersToggle = document.getElementById("navChaptersToggle");
    showHide(navChapters);
    swapInnerHTML(navChaptersToggle,
                  '<i class="fa fa-bookmark" aria-hidden="true"></i> Capítulos / Chapters',
                  '<i class="fa fa-bookmark-o" aria-hidden="true"></i> Capítulos / Chapters');
  });
} catch(err) {
  // Do nothing
}


// TODO: Combine these functions; they do the same thing logically
// Toggle visibility of an element via the display value
function showHide(element) {
  var displayValue = element.style.display;
  element.style.display = displayValue === "block" ? "none" : "block";
}


// Toggle between two different innerHTML values
function swapInnerHTML(element, option1, option2) {
  element.innerHTML = (element.innerHTML.trim() === option1) ? option2 : option1;
}


function toggleValue(element, option1, option2) {
  element = (element === option1) ? option2 : option1;
}




/******************************************************************
  Google Analytics Code
*******************************************************************/

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-85726376-2', 'auto');
ga('send', 'pageview');




})();
