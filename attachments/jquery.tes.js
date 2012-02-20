// Temple Entry System

function textMonth(nbr) {
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
    return "Invalid Date";
  } else {
    return months[nbr - 1];
  }
}

(function($) {

  $.tes = $.tes || {};
  $.extend($.tes, {
    resetResult: function() {
      $(".result").empty();
    },
    entry: function() {
      $("body").removeClass("whitelist blacklist");
      $("#entry").show();
      $("#result").hide();
      $("form#entry-form").submit(function() {
        var mrn = $("#mrn").val();
        $("#entry").hide();
        $("#result").show();
        $.get('/tes/' + mrn, function(data) {
            if (data.blacklist) {
              $("body").addClass("blacklist");
              $("h1#verdict").text("YOU SHALL NOT PASS!");
            } else {
              $("body").addClass("whitelist");
              $("h1#verdict").text("Enjoy your visit");
            }
            $("#patron-name").text(data.name);
            $("#expiry-month").text(textMonth(data.expiryMonth));
            $("#expiry-year").text(data.expiryYear);
          },
          "json"
        )
        .error( function (xhr, tStatus, errThrown) {
          $("h1#verdict").text(errThrown);
        });
        return false;
      });
      $(".another").click(function() {
        $.tes.entry();
        $.tes.resetResult();
        return false;
      });
    },
    manage: function() {
      $("#manage").show();
      $("#add").hide();
      $(".new").click(function() {
        $("#manage").hide();
        $("#add").show();
        return false;
      });
      $("#cancel").click(function() {
        $.tes.manage();
        return false;
      });
      $("#add-new").submit(function() {
        $.tes.manage();
        return false;
      });
    }
    // make a ready function that determines which function to run by url
  });


  $(function() {
    $.tes.entry();
    $.tes.manage();
  });

})(jQuery);
