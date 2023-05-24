$(document).ready(function() {

  window.addEventListener("scroll", function() {
    const backToTop = document.getElementById("backToTop");
    const slogonLink = document.getElementById("slogon");
    if (window.pageYOffset > 200) {
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