define([
  'underscore',
  'backbone',
  'models/player',
  'lib/id3'
], function(_, Backbone, Player) {
  'use strict';
  
  var TrackModel = Backbone.Model.extend({

    defaults: {
      title: '',
      artist: '',
      album: '',
      sound: null,
      duration: 0,
      percentLoaded: 0,
      percentProgress: 0,
      timeProgress: 0,
      state: Player.getStoppedState()
    },
    
    initialize: function() {
      var my = this;
      
      // create Sound Manager sound
      this.set('sound', Player.sm.createSound({
        url: this.get('src'),
        id: this.cid,
        autoLoad: true,
        autoPlay: false,
        whileloading: function() {
          my.whileLoading.call(my);
        }
      }));

      // load ID3 tags
      ID3.loadTags(my.get('src'), function() {
        var tags = ID3.getAllTags(my.get('src'));
        my.set({
          title: tags.title,
          artist: tags.artist,
          album: tags.album
        });
      });
    },

    isPlaying: function() {
      return this.get('state') === Player.getPlayingState();
    },

    isPaused: function() {
      return this.get('state') === Player.getPausedState();
    },

    isStopped: function() {
      return this.get('state') === Player.getStoppedState();
    },

    isResumed: function() {
      return this.get('state') === Player.getResumedState();
    },

    whileLoading: function() {
      var sound = this.get('sound');
      if (sound.isBuffering || this.get('duration') === 0) {
        this.set('duration', Player.formatTime(sound.durationEstimate));
        this.set('percentLoaded', sound.bytesLoaded / sound.bytesTotal * 100);
      } else if (this.get('duration') !== 100) {
        this.set('percentLoaded', 100);
      }
    },

    whilePlaying: function() {
      var sound = this.get('sound');
      var percent = sound.position / sound.durationEstimate;
      this.set('percentProgress', percent * 100);
      this.set('timeProgress', Player.formatTime(percent * sound.durationEstimate));
    }
    
  });
  
  return TrackModel;
  
});