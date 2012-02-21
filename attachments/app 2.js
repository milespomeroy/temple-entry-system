
var TES = (function () {
  //init our app
  var entryDiv;
  var resultDiv;
  var entryBtn;
  var mrnInput;
  var anotherLink;
  
  
  $(function(){
    init();
  });
  
  var init = function(){
    this.entryDiv = $('#entry');
    this.resultDiv = $('#result');
    this.entryBtn = $('#enterMrnBtn');
    this.mrnInput = $('#mrn');
    this.anotherLink = $(".another");
    
    //Attach listeners
    this.entryBtn.bind('click', function(){
        submitEntryLookup($('#mrn').val());
        showResult();
    }); 
    
    this.anotherLink.bind('click', function() {
      $("body").removeClass("whitelist blacklist");
      showEntryForm();
      resetResult();
    });
  };
  
  
  var submitEntryLookup = function(mrn){
    $.get('/tes/' + mrn, function(data) {
          if (data.blacklist) {
            $("body").addClass("blacklist");
            $("h1#verdict").text("YOU SHALL NOT PASS!");
          } else {
            $("body").addClass("whitelist");
            $("h1#verdict").text("Enjoy your visit");
          }
          $("#patron-name").text(data.name);
          $("#expiry-month").text(monthToText(data.expiryMonth));
          $("#expiry-year").text(data.expiryYear);
        },
        "json"
      )
      .error( function (xhr, tStatus, errThrown) {
        $("h1#verdict").text(errThrown);
      });
  };
  
  var showEntryForm = function(){
    this.entryDiv.show();
    this.resultDiv.hide();
  };
  
  var showResult = function () {
    this.entryDiv.hide();
    this.resultDiv.show();
  };
  
  var resetResult = function() {
    $(".result").empty();
  };
  
  var monthToText = function textMonth(nbr) {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    if (nbr > months.length) {
      return "Invalid Month";
    } else {
      return months[nbr - 1];
    }
  };
  
  
  return {
    entry: function () {
      showEntryForm();
    },
    result: function () {
      showResult();
    }
  };
}());

