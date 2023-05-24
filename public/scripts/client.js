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
          <img src="${tweet.user.avatars}" style="width:60px;height:60px">
          <h3 class="tweet-username">${tweet.user.name}</h3>
        </div>
        <span>${tweet.user.handle}</span>
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

const escape = function (str) {
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
    if (!textarea.val()) {
      alert("Please write something to tweet!");
      return;
    }

    const counter = $('.counter');
    if (counter.css('color') === 'rgb(255, 0, 0)') {
      alert("Your tweet is too long!");
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
      
      $('#tweet-text').val('');
      console.log(data);
      fetechTweets();

    }).catch((error) => {
      
      // Handle error response
      console.log('Request error:', error);

    });
  });


  const newTweetBtn = document.querySelector('.new-tweet button');
  $('.new-tweet button').mouseenter(function(event) {
    $(this).css('cursor', 'pointer');
  });

});
