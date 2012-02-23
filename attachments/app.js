$(function(){
  
  var tesController = new TesController();
  var tesView = new TesView(tesController);
  
  tesView.init();
  tesView.showLookup();
  
});
