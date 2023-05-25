/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const maxLengthOfTweet = 140;

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('.tweets-list').empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('.tweets-list').prepend($tweet);

  }
};

const createTweetElement = function(tweet) {
  let $tweet = `
  <br>
    <article class="tweet">
      <header>
        <div class="user-info">
          <img src="${tweet.user.avatars}">
          <h3 class="tweet-username">${tweet.user.name}</h3>
        </div>
        <span class="tweet-handle">${tweet.user.handle}</span>
      </header>
      <div class="content">
        <!-- Tweet content text -->
        <p class="content-text">${escape(tweet.content.text)}</p>
      </div>
      <footer>
        <!-- Footer information and icons -->
        <div class="footer-date">
          <span class="tweet-date">${timeago.format(tweet.created_at, 'en_US')}</span>
        </div>
        <div class="tweet-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>

      </footer>
    </article>
  `;

  return $tweet;
};

const fetechTweets = () => {
  $.ajax({
    url: 'http://localhost:8080/tweets/',
    method: 'GET',
    success: (tweetsData) => {
      renderTweets(tweetsData);
    }
  });
};

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {

  fetechTweets();

  $('form').submit(function(event) {
    event.preventDefault(); // Prevents the form from being submitted

    // Conduct form validation before submit
    const textarea = $('.new-tweet form textarea');
    const counter = $('.counter');
    const errorMessage = document.getElementById('error-message');

    if (!textarea.val()) {
      errorMessage.innerHTML = "<i class='fa-solid fa-triangle-exclamation' style='color: red;'></i> Please write something to tweet! <i class='fa-solid fa-triangle-exclamation' style='color: red;'></i>";
      errorMessage.classList.remove('error-message-show');
      errorMessage.classList.add('error-message-show');
      return;
    }

    if (counter.css('color') === 'rgb(255, 0, 0)') {
      errorMessage.innerHTML = "<i class='fa-solid fa-triangle-exclamation' style='color: red;'></i> Your tweet is too long! <i class='fa-solid fa-triangle-exclamation' style='color: red;'></i>";
      errorMessage.classList.remove('error-message-show');
      errorMessage.classList.add('error-message-show');
      return;
    }

    // Serialize form data
    const formData = $(this).serialize();
    // Send POST request
    $.ajax({

      url: '/tweets/',
      method: 'POST',
      data: formData

    }).then((data) => {
      errorMessage.classList.remove('error-message-show');
      $('#tweet-text').val('');
      $('.counter').val(maxLengthOfTweet);
      fetechTweets();

    }).catch((error) => {

      // Handle error response
      console.log('Request error:', error);
      errorMessage.innerHTML = `<i class='fa-solid fa-triangle-exclamation' style='color: red;'></i> ${error} <i class='fa-solid fa-triangle-exclamation' style='color: red;'></i>`;
      errorMessage.classList.remove('error-message-show');
      errorMessage.classList.add('error-message-show');
    });
  });

  $('.new-tweet button').mouseenter(function(event) {
    $(this).css('cursor', 'pointer');
    $(this).css({ 'box-shadow': '0 0 10px rgba(0, 0, 255, 0.5)' });
  });

  $('.new-tweet button').mouseleave(function(event) {
    $(this).css('cursor', 'default');
    $(this).css({ 'box-shadow': 'none' });
  });

  $('.tweet-icons i').off('mouseenter mouseleave');
  const slogonLink = document.querySelector('.slogon');
  $(slogonLink).mouseenter(function(event) {
    $(this).css('cursor', 'pointer');
  });

  $(slogonLink).mouseleave(function(event) {
    $(this).css('cursor', 'default');
  });

  $(slogonLink).on('click', () => {
    const composedTweeet = document.getElementById('new_tweet');

    if (composedTweeet.classList.contains('new-tweet')) {
      composedTweeet.classList.add('new-tweet-hide');
console.log('1')
      composedTweeet.addEventListener('animationend', () => {
        composedTweeet.classList.remove('new-tweet-hide');
        composedTweeet.classList.remove('new-tweet');
        composedTweeet.classList.add('new-tweet-hidden');
      });

    } else {
      composedTweeet.classList.add('new-tweet');
      
      composedTweeet.classList.add('new-tweet-show');
      
      composedTweeet.addEventListener('animationend', () => {
        composedTweeet.classList.remove('new-tweet-show');
        composedTweeet.classList.remove('new-tweet-hidden');
        composedTweeet.classList.add('new-tweet');
      });

      $('#tweet-text').focus();
    };
  });
});
