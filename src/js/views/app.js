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
      
      Mixtape.fetch();
    },

    addTrack: function(data) {
      var view = new TrackView({model: data});
      this.$el.append(view.render().el);
    }

  });

  return AppView;
});