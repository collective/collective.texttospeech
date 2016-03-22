/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], ($, _, Backbone, JST) => {
  "use strict";

  class MainView extends Backbone.View {
    constructor() {
      super({el: '#viewlet-texttospeech'});
      this.template = JST['app/scripts/templates/main.ejs'];
      this.render();
    }

    render() {
      this.$el.html(this.template());
    }
  };

  return MainView;
});
