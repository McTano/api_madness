"use strict";

function flickrUrl (photo_object) {
    return "https://farm" +
     photo_object.farm +
      ".staticflickr.com/" +
      photo_object.server +
      "/"  +
      photo_object.id +
      "_"  +
      photo_object.secret +
      ".jpg";
  }


$(function() {
    var i = 0;
    $(document).on('click', function() {
      i++;
      $.ajax({
        url: "https://api.flickr.com/services/rest/",
        method: "GET",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        data: {
          method: 'flickr.photos.search',
          format: 'json',
          tags: 'lighthouse',
          api_key: '0db6c317dc7c61b5da0a59c3e674cdd6',
          per_page: 1,
          page: i,
          sort: 'interestingness-desc'
        },
        success: function(response) {
          console.log(response);
          var photos = response.photos.photo;
          $("img.lighthouse").attr('src', flickrUrl(photos[0]));
        }
      });
    });
});

