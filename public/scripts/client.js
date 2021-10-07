// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

$(document).ready(function () {

  ////////////Helper Func to create and insert Tweets////////////


  const createTweetElement = function (data) {

    //Func to check for XSS attack
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const safeTweet = escape(data.content.text);

    let tweet = `
    <article id="each-tweet">
    <div id="tweet-header">
    <h4><img id="avatar-img" src="${data.user.avatars}">
       ${data.user.name}</h4>
       <h4>${data.user.handle}</h4>
    </div>
  
    <div id="tweet-content">
      <span>${safeTweet}</span>
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
    </article>
   
  `
    return tweet;
  };

  const renderTweets = function (arr) {

    $('#tweets-container').empty();

    arr.forEach((tweetObj) => {
      let tweet = createTweetElement(tweetObj);
      $('#tweets-container').append(tweet)
    })
  }

  const validateTweet = function (tweet) {

    if (tweet.trim().length <= 0) {
      // alert('A tweet has to be atleast 1 character long! ')
      // return false;
      $('#error-container').removeClass('alert').text('Tweet has to be atleast one character long');
      return false;
    } else if (tweet.length > 140) {
      // alert('Maximum 140 characters alllowed !!')
      // return false;
      $('#error-container').removeClass('alert').text('Maximum 140  characters allowed in a Tweet.');
      return false;
    }

    return true;
  }
  /////////////////////////////////////////////////////////

  $('#scroll-btn').on('click', () => {
    $('html,body').animate({
      scrollTop: 0
    }, 'slow');
    $('#tweet-text').focus();
  })

  //////////////////  AJAX GET and POST requests //////////////////////////

  const loadTweets = function () {

    $.get('/tweets', (res) => {
      renderTweets(res);
    })

  }


  $('#tweet-form').on('input', () => {
    //Removes error message upon input in textarea
    $('#error-container').addClass('alert')
    $('#error-span').empty();
  })

  $('#tweet-form').on('submit', (e) => {
    e.preventDefault();

    const inputTweet = $('#tweet-text').val();

    let test = validateTweet(inputTweet);

    //Only post the Tweet IF it is validated. OR else throw Alert
    if (test) {
      const tweetDataString = $('#tweet-form').serialize();

      $.post('/tweets', tweetDataString)
        .then(() => {
          //Clear the input field
          $('#tweet-text').val('');
          //Reload tweets including the one that got inputted
          loadTweets();
        })

    } else {
      validateTweet(inputTweet);
    }

  })

  //Load Tweets with every Refresh
  loadTweets();

})