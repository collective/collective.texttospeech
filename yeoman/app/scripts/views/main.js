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
      this.paused = true;
      this.onstart = this.onstart.bind(this);
      this.onend = this.onend.bind(this);
      rVoice.cancel();
      this.render();
    }

    render() {
      this.$el.html(this.template());
    }

    onstart() {
      this.playing = true;
      this.paused = false;
      this.$('#texttospeech-button').attr('value', 'Pause');
    }

    onend() {
      this.playing = false;
      this.paused = true;
      this.$('#texttospeech-button').attr('value', 'Play');
    }

    play_pause() {
      if (this.playing) {
        if (this.paused) {
          this.paused = false;
          this.$('#texttospeech-button').attr('value', 'Pause');
          rVoice.resume();
        } else {
          this.paused = true;
          this.$('#texttospeech-button').attr('value', 'Play');
          rVoice.pause();
        }
      } else {
        rVoice.speak(
          $('#content').text(),
          this.$el.attr('data-voice'),
          {
            onstart: this.onstart,
            onend: this.onend
          }
        );
      }
    }
  };

  return MainView;
});
