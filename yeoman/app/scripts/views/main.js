/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'responsivevoice',
  'templates'
], ($, _, Backbone, rVoice, JST) => {
  "use strict";

  class MainView extends Backbone.View {
    constructor() {
      var options = {};
      options.el = '#viewlet-texttospeech';
      options.events = {
        'click #texttospeech-button': 'play_pause'
      };
      super(options);
      this.template = JST['app/scripts/templates/main.ejs'];
      this.playing = false;
      this.render();
    }

    render() {
      this.$el.html(this.template());
    }

    play_pause() {
      if (this.playing) {
        this.playing = false;
        this.$('#texttospeech-button').attr('value', 'Play');
        rVoice.cancel();
      } else {
        this.playing = true;
        this.$('#texttospeech-button').attr('value', 'Pause');
        rVoice.speak($('#content').text());
      }
    }
  };

  return MainView;
});
