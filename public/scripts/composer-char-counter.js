$(document).ready(function () {
  //On every Refresh
  const maxLength = 140;
  $('#letter-count-display').text(maxLength);

  $('#tweet-text').on('input', (e) => {
    const target = e.currentTarget;
    const currentLength = target.value.length;
    const displayLength = maxLength - currentLength;

    //Makes displayer RED
    if (displayLength < 0) {
      $('#letter-count-display').addClass('red');
    }
    //Makes displayer default color IF character count is positive.
    if (displayLength >= 0) {
      $('#letter-count-display').removeClass('red');
    }

    $('#letter-count-display').text(displayLength);

  })

});