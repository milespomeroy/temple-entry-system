$(function(){
  
  var lookupController = new LookupController();
  var lookupView = new LookupView(lookupController);
  
  lookupView.init();
  
  // Global apperror event listener
  document.addEventListener('apperror', function(evt){
    alert(evt.message);
  });
  
});