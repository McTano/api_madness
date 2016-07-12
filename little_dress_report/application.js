"use strict";
var api_key = '6f5df01d0f316976';
// var underscore = require('underscore');

$(function() {
  var $query_box = $('input.query');
  var $results = $('table.results');

  // $('form').on('submit', function(event) {
    // event.preventDefault();
    $.ajax({
      url: 'http://api.eventful.com/json/events/search',
      dataType: 'jsonp',
      data: {
        location: "49.2788,-123.1139",
        app_key: 'FFmssWtvRRfc9VF7',
        page_size: 100,
        date: "Today",
        within: 1,
        change_multi_day_start: true,
        ex_category: 'learning_education,schools_alumni,conference,community,family_fun_kids,clubs_associations',
        category: 'comedy,food,music,festivals_parades,movies_film,fundraisers,art,support,holiday,books,attractions,business,singles_social,outdoors_recreation,performing_arts,animals,politics_activism,sales,science,religion_spirituality,sports,technology,other',
      },
      success: function(response) {
        $results.html('');
        var results = response.events.event;
        // results = underscore.shuffle(results);
        console.log(results);
        $.each(results, function(i, result) {
          var $list_result = $('<tr>');
          $list_result.addClass('result');
          $list_result.append($('<td>').html(result.title));
          $list_result.append($('<td>').html(result.url));
          $list_result.append($('<td>').html(result.venue_name));
          $list_result.append($('<td>').html(result.date));
          $list_result.append($('<td>').html(result.start_time));
          $list_result.append($('<td>').html(result.stop_time));
          // $list_result.text(result.title);
          // $list_result.data('link', result.l);
          $results.append($list_result);
        });
      }
    });

// If i exclude categories, things in that category will be excluded even
// if they have other categories we want.
// best option is probably to limit the search to all categories we want.


  // });

  // $results.on('click', 'li.result', function() {
  //   var city = $(this).text();
  //   $query_box.val(city);
  //   var link = $(this).data('link');
  //   var url = 'http://api.wunderground.com/api/' + api_key + '/forecast' + link + '.json';
  //   $.ajax({
  //     url: url,
  //     success: function(response) { 
  //       var forecast = response.forecast.simpleforecast.forecastday[0];
  //       var low = forecast.low.celsius;
  //       console.log(low);
  //       if (low >= 20) {
  //         $results.text('YES!');
  //       }
  //       else {
  //         $results.text("I'm not going to tell you what to do, but it's going to be " + low + " degrees out later, so bring a sweater.")
  //       }
  //     }
  //   });
  // });


});
