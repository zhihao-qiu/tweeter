/* This code is setting up an event listener for when the document is ready. When the document is
ready, it selects the textarea element within the form with class "new-tweet", sets the maximum
length of the tweet to 140 characters, and sets up an event listener for when the user inputs text
into the textarea. */
$(document).ready(function() {
  const textarea = $('.new-tweet form textarea');
  const maxLengthOfTweet = 140;
  textarea.on('input', function(event) {
    const textareaValue = $(this).val();
    const textareaLength = maxLengthOfTweet - textareaValue.length;

    const counter = $(this).parent().find('.counter');
    counter.text(textareaLength);

    if (textareaLength < 0 && counter.css('color') !== 'rgb(255, 0, 0)') {
      counter.css('color', 'red');
    } else if (textareaLength >= 0 && counter.css('color') !== 'rgb(84, 81, 73)') {
      counter.css('color', 'rgb(84, 81, 73)');
    }

  });

});

