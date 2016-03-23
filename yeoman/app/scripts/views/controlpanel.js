/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'responsivevoice',
  'templates'
], ($, _, Backbone, rVoice, JST) => {
  "use strict";

  class ControlPanelView extends Backbone.View {
    constructor() {
      super();
      this.template = JST['app/scripts/templates/controlpanel.ejs'];
      this.actual_voice = $('#form-widgets-voice').val();
      this.render();
    }

    render() {
      this.$el.html(this.template());
      $('#form-widgets-voice').replaceWith(this.el);
      //Populate voice selection dropdown
      var voicelist = rVoice.getVoices();
      var vselect = $('#form-widgets-voice');
      for (let voice of voicelist) {
        if (voice.name === this.actual_voice) {
          vselect.append($('<option selected="selected" />').val(voice.name).text(voice.name));
        } else {
          vselect.append($('<option />').val(voice.name).text(voice.name));
        }
      }
    }
  };

  return ControlPanelView;
});
