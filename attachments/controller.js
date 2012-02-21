var LookupController = function(){
};

LookupController.prototype.lookup = function(mrn, opt){
  $.get('/tes/' + mrn, function(data) {
        opt.success(data);
      },
      "json"
    )
    .error( function (xhr, tStatus, errThrown) {
      if(opt.failure){
        opt.failure(errThrown);
      }
      else{
        var evt = document.createEvent('Event');
        evt.initEvent('apperror', true, true);
        evt.message = errThrown;
        document.dispatchEvent(evt);
      }
    });
}