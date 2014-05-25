define([
  'backbone',
  'models/track',
  'lib/id3'
], function(Backbone, Track) {
  'use strict';
  
  var Mixtape = Backbone.Collection.extend({
    
    model: Track,

    add: function(data) {
      if (data instanceof Array) {
        for (var i in data) {
          this.addOne(data[i]);
        }
      } else {
        this.addOne(data);
      }
    },

    addOne: function(data) {
      var me = this;

      // load tags via JavaScript-ID3-Reader
      // see https://github.com/aadsm/JavaScript-ID3-Reader
      ID3.loadTags(data.src, function() {
        var tags = ID3.getAllTags(data.src);
        Backbone.Collection.prototype.add.call(me, {
          title: tags.title,
          artist: tags.artist,
          album: tags.album,
          src: data.src
        });
      });
      
    }
    
  });
  
  return new Mixtape();
});