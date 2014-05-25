define([
  'jquery',
  'underscore',
  'backbone',
  'models/player'
], function ($, _, Backbone, Player) {
  'use strict';

  var TrackView = Backbone.View.extend({

    tagName:  'li',

    template: _.template($('#track-template').html()),

    events: {
      'click': 'toggle'
    },

    initialize: function(data) {
      this.listenTo(this.model, 'change:state', this.changeState);
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    toggle: function() {
      if (this.model.isStopped()) {
        // play
        this.model.set('state', Player.getPlayingState());
      } else if (this.model.isPaused()) {
        // resume
        this.model.set('state', Player.getResumedState());
      } else {
        // pause
        this.model.set('state', Player.getPausedState());
      }
    },

    changeState: function(model) {
      if (model.isPlaying()) {
        // playing
        Player.play(model);
        this.$el.addClass('playing');
      } else if (model.isPaused()) {
        // paused
        Player.pause();
      } else if (model.isResumed()) {
        // resumed
        this.$el.addClass('playing');
        Player.resume();
      } else {
        // stopped
        model.get('sound').stop();
        this.$el.removeClass('playing');
        model.set('progress', 0);
      }

    }

  });

  return TrackView;
  
});
