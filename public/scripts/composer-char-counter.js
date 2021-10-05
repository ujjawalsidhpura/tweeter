$(document).ready(function () {
  //On every Refresh
  const maxLength = 20;
  $('#letter-count-display').text(maxLength);

  $('#tweet-text').on('input', (e) => {
    const target = e.currentTarget;
    const currentLength = target.value.length;
    const displayLength = maxLength - currentLength;

    if (displayLength < 0) {
      $('#letter-count-display').addClass('red');
    }

    if (displayLength >= 0) {
      $('#letter-count-display').removeClass('red');
    }
    $('#letter-count-display').text(displayLength);

  })

});