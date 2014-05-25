'use strict';

require.config({
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    soundmanager: 'lib/backbone.soundmanager2',
    soundmanager2: 'lib/soundmanager2/soundmanager2'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    soundmanager2: {
      exports: 'soundManager'
    }
  }
});

require([
  'backbone',
  'views/app'
], function(Backbone, AppView) {

  new AppView();
  
});