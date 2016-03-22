/*global require*/
"use strict";

define('jquery', [], () => {
  return jQuery;
});

define('responsivevoice', [], () => {
  return responsiveVoice;
});

require.config({
  paths: {
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/lodash/dist/lodash'
  }
});

require([
  'backbone',
  'views/main'
], (Backbone, AppView) => {
  Backbone.history.start();
  if ($('#viewlet-texttospeech').length > 0) {
    return new AppView();
  }
});
