// Temple Entry System
(function($) {

  $.tes = $.tes || {};
  $.extend($.tes, {
    entry: function() {
      $("#entry").show();
      $("#result").hide();
      $("form#entry-form").submit(function() {
        $("#entry").hide();
        $("#result").show();
        return false;
      });
      $(".another").click(function() {
        $.tes.entry();
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
