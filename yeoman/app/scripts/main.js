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
  'views/main',
  'views/controlpanel'
], (Backbone, AppView, ControlPanelView) => {
  Backbone.history.start();
  if ($('#viewlet-texttospeech').length > 0) {
    new AppView();
  }
  if ($('body.template-texttospeech-settings').length > 0) {
    new ControlPanelView();
  }
});
