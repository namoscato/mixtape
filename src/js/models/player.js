define([
  'backbone',
  'soundmanager2'
], function(Backbone, soundManager) {
  'use strict';

  var STOPPED = 0,
      PLAYING = 1,
      PAUSED = 2,
      RESUMED = 3;

  var Player = Backbone.Model.extend({

    initialize: function() {

      this.sm = soundManager.setup({
        url: 'src/js/lib/soundmanager2/swf/',
        flashVersion: 9
      });
      soundManager.beginDelayedInit();

    },

    getStoppedState: function() {
      return STOPPED;
    },

    getPlayingState: function() {
      return PLAYING;
    },

    getPausedState: function() {
      return PAUSED;
    },

    getResumedState: function() {
      return RESUMED;
    },

    play: function(model) {
      var my = this;
      if (my.current) {
        my.current.set('state', my.getStoppedState());
      }
      my.current = model;
      my.current.get('sound').play({
        whileplaying: function() {
          my.current.whilePlaying.call(my.current);
        }
      });
      document.title = my.current.get('title') + ' - ' + my.current.get('artist');
    },

    resume: function() {
      this.current.get('sound').play();
    },

    pause: function() {
      this.current.get('sound').pause();
    },

    formatTime: function(ms) {
      var time = parseInt(ms / 1000);
      var result = "";
      do {
          var unit = time % 60;
          time = parseInt(time / 60);
          result = (time > 0 ? ":" : "") + unit + result;
      } while (time > 0);
      return result;
    }

  });

  return new Player();
  
});