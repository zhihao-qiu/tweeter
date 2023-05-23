$(document).ready(function() {
  // Add hover event handler to the icons
  $('.tweet-icons i').hover(
    function() {
      // Mouse enter event
      $(this).css('color','orange');
    },
    function() {
      // Mouse leave event
      $(this).css('color','rgb(30,48,80)');
    }
  );
});