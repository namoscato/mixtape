define([
  'jquery',
  'underscore',
  'backbone',
  'collections/mixtape',
  'views/track',
  'models/player'
], function ($, _, Backbone, Mixtape, TrackView, Player) {
  'use strict';

  var AppView = Backbone.View.extend({
    
    el: '#mixtape',
    
    initialize: function() {
      
      this.listenTo(Mixtape, 'add', this.addTrack);
      
      $.ajax({
        url: 'api/listDirectory'
      }).done(function(data) {
        var mixtape = $.parseJSON(data);
        Player.sm.onready(function() {
          for (var i in mixtape) {
            Mixtape.add(mixtape[i]);
          }
        });
      });

      
    },

    addTrack: function(data) {
      var view = new TrackView({model: data});

      this.$el.append(view.render().el);
    }

  });

  return AppView;
});