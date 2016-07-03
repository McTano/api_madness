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

function getImage(pageNumber) {
  console.log("requesting new image");
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
      page: pageNumber,
      sort: 'interestingness-asc'
    },
    success: function(response) {
      console.log("image loaded");
      var photo = response.photos.photo[0];
      $("img.lighthouse").attr('src', flickrUrl(photo));
      pageNumber++;
      setTimeout(function() {
        getImage(pageNumber);
      }, 1000);
    }
  });
}


$(function() {
    var imageNumber = 0;
    getImage(imageNumber);
});