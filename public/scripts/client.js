// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

const createTweetElement = function (data) {

  let tweet = `
  
  <div id="tweet-header">
    <h4>${data.user.name}</h4>
    <h4>${data.user.handle}</h4>
  </div>

  <div id="tweet-content">
    <span>${data.content.text}</span>
  </div>

  <div id="tweet-footer">
    <div id="tweet-date">
      <span>${timeago.format(data.created_at)}</span>
    </div>
    <div class="tweet-options-container">
      <i id="tweet-flag-btn" class="fas fa-flag tweet-options"></i>
      <i id="retweet-btn" class="fas fa-retweet tweet-options"></i>
      <i id="tweet-like-btn" class="fas fa-heart tweet-options"></i>
    </div>
  </div> 
 
`
  return tweet;
};

const renderTweets = function (arr) {
  arr.forEach((tweetObj) => {
    let tweet = createTweetElement(tweetObj);
    $('#tweets-container').append(tweet)
  })
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Xyz",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@xxx"
    },
    "content": {
      "text": "A test tweet is a test tweet."
    },
    "created_at": 14611139590
  },
  {
    "user": {
      "name": "abc",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@abc"
    },
    "content": {
      "text": "Another test huh"
    },
    "created_at": 14611111390
  }
]


$(document).ready(function () {

  $('#tweet-form').on('submit', (e) => {
    e.preventDefault();
    const tweetDataString = $('#tweet-form').serialize();

    console.log(tweetDataString);

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: tweetDataString
    }).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.log(e)
    })
  })

  renderTweets(data);
})