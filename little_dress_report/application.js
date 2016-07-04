
$(function() {

  $('form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url: 'http://autocomplete.wunderground.com/aq',
      dataType: 'jsonp',
      jsonp: 'cb',
      data: {
        query: $('input[name=query]').val(),
        format: 'json',
      },
      success: function(response) {
        var results = response.RESULTS;
        $.each(results, function(i, result) {
          console.log(result.name);
          $('ul.results').append($('<li class="result">').text(result.name));
        });
      }
    });
  });


});
