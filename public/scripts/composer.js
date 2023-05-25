/* This code is adding an event listener to the window object that listens for the scroll event. When
the user scrolls down the page, if the vertical distance scrolled is greater than 400 pixels, it
adds the "show" class to the element with the ID "backToTop" and the "hide" class to the element
with the ID "slogon". If the user scrolls back up and the distance is less than 400 pixels, it
removes those classes. */
$(document).ready(function() {

  window.addEventListener("scroll", function() {
    const backToTop = document.getElementById("backToTop");
    const slogonLink = document.getElementById("slogon");
    if (window.pageYOffset > 400) {
      backToTop.classList.add("show");
      slogonLink.classList.add("hide");
    } else {
      slogonLink.classList.remove("hide");
      backToTop.classList.remove("show");
    }
  });

  document.getElementById("backToTop").addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});