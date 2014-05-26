define([
  'backbone',
  'models/track',
  'models/player'
], function(Backbone, Track, Player) {
  'use strict';
  
  var Mixtape = Backbone.Collection.extend({
    
    model: Track,

    fetch: function() {
      var my = this;

      $.ajax({
        url: 'api/tracks'
      }).done(function(data) {
        var mixtape = $.parseJSON(data);
        Player.sm.onready(function() {
          my.reset(mixtape);
        });
      });
    },

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
      Backbone.Collection.prototype.add.call(this, {
        src: data.src
      }, {
        at: data.order
      });
    }
    
  });
  
  return new Mixtape();
});