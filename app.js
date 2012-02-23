 var couchapp = require('couchapp')
  , path = require('path')
  ;

ddoc = { 
  _id:'_design/app',
  rewrites : [ 
    {from:"/", to:'entry.html'}, 
    {from:"/*", to:'*'}
  ],
  views: {}
}
;

ddoc.views.recommends = {
  map: function (doc) {
    if (doc.name) {
      emit(doc._id, null);
    }
  }
};

couchapp.loadAttachments(ddoc, path.join(__dirname, 'attachments'));

module.exports = ddoc;
