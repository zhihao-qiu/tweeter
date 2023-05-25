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

