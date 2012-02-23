var TesView = function(controller){
  this.controller = controller;
  this.goTo = $('#goto');
  this.recForm = $("#rec-form");
  this.recommends = $("#recommends");
  this.result = $("#result");
  this.lookup = $("#lookup");
  this.mrn = $('#mrn');
};

TesView.prototype.init = function(){  
  var thiz = this;

  var lookupMrn = function() {
    
    thiz.controller.getRecommend(thiz.mrn.val(), {
      success : function(data){
        thiz.displayResult(data);
        thiz.mrn.val('');
      },
      failure : function(message){
        alert(message);
      }
    });

  };

  // Attach Event Listeners

  // Lookup
  // bind to enter key press and submit button click
  this.mrn.keypress(function(e){
    if(e.which == 13){
      lookupMrn();
    }
  });

  $('#enterMrnBtn').bind('click', lookupMrn);
  
  $('#another-lookup').bind('click', function () {
    $("body").removeClass("whitelist blacklist");
    thiz.showLookup();
  });

  // Add new rec
  $('#add-new-rec').bind('click', function () {
    $('#delete-rec').hide();
    thiz.showRecForm();
  });
  
  // refresh rec
  $('#refresh-rec').bind('click', function () {
    thiz.displayRecommends();
  });

  // submit rec 
  $('#submit-rec').bind('click', function () {

    var data = {};
    data._id = $("#mrn-input").val();
    data.name = $("#name-input").val();
    data.expiryMonth = $("#expiry-month-opt").val();
    data.expiryYear = $("#expiry-year-opt").val();
    data.blacklist = $("#blacklist-cb").is(':checked');
    var rev = $("#_rev").val();

    if (rev) { // update recommend
      data._rev = rev;
    }

    thiz.controller.putRecommend(data, {
      success : function(data){
        thiz.showRecommends();
        thiz.clearRecForm();
      },
      failure : function(message){
        alert(message);
      }
    });

  });

  $('#delete-rec').bind('click', function () {

    var data = {};
    data._id = $("#mrn-input").val();
    data._rev = $("#_rev").val();

    thiz.controller.deleteRecommend(data, {
      success : function(data){
        thiz.showRecommends();
        thiz.clearRecForm();
      },
      failure : function(message){
        alert(message);
      }
    });

  }); 

  $('#cancel-rec').bind('click', function () {
    thiz.showRecommends();
    thiz.clearRecForm();
  });

  $('.edit-rec').live('click', function () {
    var mrn = $(this).html();

    thiz.controller.getRecommend(mrn, {
      success : function(data){
        thiz.displayRecommend(data);
      },
      failure : function(message){
        alert(message);
      }
    });

  });

};

TesView.prototype.displayResult = function(data){
  
  if (data.blacklist) {
    $("body").addClass("blacklist");
    $("#verdict").text("YOU SHALL NOT PASS!");
  } else {
    $("body").addClass("whitelist");
    $("#verdict").text("Enjoy your visit");
  }
  $("#patron-name").text(data.name);
  $("#expiry-month").text(DateUtils.monthToText(data.expiryMonth) || '');
  $("#expiry-year").text(data.expiryYear);

  this.showResult();
};

TesView.prototype.displayRecommend = function (data) {
  $('#mrn-input').val(data._id).attr('readonly', 'readonly');
  $('#name-input').val(data.name);
  $('#expiry-month-opt').val(data.expiryMonth);
  $('#expiry-year-opt').val(data.expiryYear);
  $('#_rev').val(data._rev);

  if (data.blacklist) {
    $('#blacklist-cb').attr('checked', 'checked');
  }

  $('#delete-rec').show();

  this.showRecForm();
};

TesView.prototype.displayRecommends = function(){  
  var thiz = this;

  // Clear out recommend list before re-populating
  $("#rec-list").find("tr:gt(0)").remove();

  thiz.controller.getRecommends ( function (data) {
    $.each(data.rows, function(key, val) {
      var doc = val.doc;
      var blacklist = (doc.blacklist) ? "yes" : "no";
      $("#rec-list").append("<tr>" +
        "<td><a href='#' class='edit-rec'>" + doc._id + "</a></td>" +
        "<td>" + doc.name + "</td>" +
        "<td>" + (DateUtils.monthToText(doc.expiryMonth) || '') + 
        " " + doc.expiryYear + "</td>" +
        "<td>" + blacklist + "</td>" + 
      "</tr>");
    });
  });

};

TesView.prototype.showResult = function() {
  this.recForm.hide();
  this.recommends.hide();
  this.lookup.hide();
  this.result.show();
};

TesView.prototype.showLookup = function() {
  var thiz = this;
  
  this.goTo.unbind();
  this.goTo.text('Recommends');
  this.goTo.bind('click', function () {
    $("body").removeClass("whitelist blacklist");
    thiz.showRecommends();
  });
    
  this.recForm.hide();
  this.recommends.hide();
  this.result.hide();
  this.lookup.show();
};

TesView.prototype.showRecommends = function () {
  var thiz = this;
  
  this.goTo.unbind();
  this.goTo.text('MRN Lookup');
  this.goTo.bind('click', function () {
    thiz.showLookup();
    thiz.clearRecForm();
  });

  this.displayRecommends();

  this.recForm.hide();
  this.lookup.hide();
  this.result.hide();
  this.recommends.show();
};

TesView.prototype.showRecForm = function () {
  this.lookup.hide();
  this.result.hide();
  this.recommends.hide();
  this.recForm.show();
};

TesView.prototype.clearRecForm = function () {
  $(":input", "#add-new")
    .not(':button')
    .val('')
    .removeAttr('selected')
    .removeAttr('readonly')
    .removeAttr('checked');
};
