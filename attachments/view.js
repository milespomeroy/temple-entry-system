var LookupView = function(controller){
  this.controller = controller;
};

LookupView.prototype.init = function(){  
  // Attach Event Listeners
  var thiz = this;
  
  $('#enterMrnBtn').bind('click', function(){
    
    thiz.controller.lookup($('#mrn').val(), {
      success : function(data){
        thiz.displayResult(data);
      },
      failure : function(message){
        alert(message);
      }
    });
    
  });
  
  $('.another').bind('click', function () {
    thiz.showEntry();
  });
    
};

LookupView.prototype.displayResult = function(data){
  
  if (data.blacklist) {
    $("body").addClass("blacklist");
    $("h1#verdict").text("YOU SHALL NOT PASS!");
  } else {
    $("body").addClass("whitelist");
    $("h1#verdict").text("Enjoy your visit");
  }
  $("#patron-name").text(data.name);
  $("#expiry-month").text(DateUtils.monthToText(data.expiryMonth) || 'empty');
  $("#expiry-year").text(data.expiryYear);
  
  this.showResult();
};

LookupView.prototype.showResult = function() {
  $("#entry").hide();
  $("#result").show();
};

LookupView.prototype.showEntry = function() {
  $("#result").hide();
  $("#entry").show();
  $("body").removeClass("whitelist blacklist");
};


