var TesController = function(){
};

TesController.prototype.getRecommend = function(mrn, opt){
  $.get('/tes/' + mrn, function(data) {
    opt.success(data);
  }, "json")
  .error( function (xhr, tStatus, errThrown) {
    opt.failure(errThrown);
  });
};

TesController.prototype.getRecommends = function (callback) {
  $.get('/tes/_design/app/_view/recommends?include_docs=true', function(data) {
    callback(data);
  }, "json");
};

TesController.prototype.putRecommend = function (data, opt) {

  if (data._id) {

    $.ajax({
      url: "/tes/" + data._id,
      type: "PUT",
      success: function(data) {
        opt.success(data);
      },
      error: function(xhr) {
        opt.failure(xhr.responseText);
      },
      dataType: "json",
      processData: false,
      data: JSON.stringify(data),
      contentType: "application/json"
    });

  } else {
    opt.failure('No MRN given.');
  }

};

TesController.prototype.deleteRecommend = function (data, opt) {

  if (data._id && data._rev) {
    $.ajax({
      url: "/tes/" + data._id + "?rev=" + data._rev,
      type: "DELETE",
      success: function(message) {
        opt.success(message);
      },
      error: function(xhr) {
        opt.failure(xhr.responseText);
      },
      dataType: "json",
      processData: false,
      data: JSON.stringify(data),
      contentType: "application/json"
    });
  } else {
    opt.failure('MRN and _rev needed.');
  }

};

