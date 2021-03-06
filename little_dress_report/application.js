"use strict";
var api_key = '6f5df01d0f316976';


$(function() {
  var $query_box = $('input.query');
  var $results = $('ul.results');

  $('form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url: 'http://autocomplete.wunderground.com/aq',
      dataType: 'jsonp',
      jsonp: 'cb',
      data: {
        query: $query_box.val(),
        format: 'json',
      },
      success: function(response) {
        $results.html('');
        var results = response.RESULTS;
        $.each(results, function(i, result) {
          var $list_result = $('<li>');
          $list_result.addClass('result');
          $list_result.text(result.name);
          $list_result.data('link', result.l);
          $results.append($list_result);
        });
      }
    });
  });

  $results.on('click', 'li.result', function() {
    var city = $(this).text();
    $query_box.val(city);
    var link = $(this).data('link');
    var url = 'http://api.wunderground.com/api/' + api_key + '/forecast' + link + '.json';
    $.ajax({
      url: url,
      success: function(response) {
        var forecast = response.forecast.simpleforecast.forecastday[0];
        var low = forecast.low.celsius;
        console.log(low);
        if (low >= 20) {
          $results.text('YES!');
        }
        else {
          $results.text("I'm not going to tell you what to do, but it's going to be " + low + " degrees out later, so bring a sweater.")
        }
      }
    });
  });


});
