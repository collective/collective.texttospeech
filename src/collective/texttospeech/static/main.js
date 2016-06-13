var MainView = (function() {
  function MainView() {
    this.$el = $('#viewlet-texttospeech');
    if (typeof window.responsiveVoice === "undefined") {
      this.$el.html('');
      var error_message = this.$el.attr('data-error-message');
      console.log(error_message);
      return;
    }
    this.$button = $('#texttospeech-button', this.$el);
    this.voice = this.$el.attr('data-voice');
    this.label_stopped = this.$el.attr('data-label-stopped');
    this.label_playing = this.$el.attr('data-label-playing');
    this.label_paused = this.$el.attr('data-label-paused');
    this.playing = false;
    this.paused = true;
    this.$button.on('click', $.proxy(this.play_pause, this));
  }
  MainView.prototype.onstart = function() {
    this.playing = true;
    this.paused = false;
    this.$button.attr('value', this.label_playing);
  };
  MainView.prototype.onend = function() {
    this.playing = false;
    this.paused = true;
    this.$button.attr('value', this.label_stopped);
  };
  MainView.prototype.play_pause = function(e) {
    e.preventDefault();
    if (this.playing) {
      if (this.paused) {
        this.paused = false;
        this.$button.attr('value', this.label_playing);
        responsiveVoice.resume();
      } else {
        this.paused = true;
        this.$button.attr('value', this.label_paused);
        responsiveVoice.pause();
      }
    } else {
      responsiveVoice.speak(
        // remove spaces to avoid issues with some Firefox versions
        $('#content').text().replace(/\s+/g, ' ').trim(),
        this.voice, {
          onstart: $.proxy(this.onstart, this),
          onend: $.proxy(this.onend, this)
        }
      );
    }
  };
  return MainView;
})();


var ControlPanelView = (function() {
  function ControlPanelView() {
    if (typeof window.responsiveVoice === "undefined") {
      var $el = $('#viewlet-texttospeech');
      var error_message = $el.attr('data-error-message');
      alert(error_message);
      return;
    }
    this.template = "<select id=\"form-widgets-voice\" name=\"form.widgets.voice\" class=\"text-widget required textline-field\">\n</select>";
    this.actual_voice = $('#form-widgets-voice').val();
    this.render();
  }
  ControlPanelView.prototype.render = function() {
    $('#form-widgets-voice').replaceWith(this.template);
    var voicelist = responsiveVoice.getVoices();
    var vselect = $('#form-widgets-voice');
    var i, len, voice;
    for (i = 0, len = voicelist.length; i < len; i++) {
      voice = voicelist[i];
      if (voice.name === this.actual_voice) {
        vselect.append($('<option selected="selected" />').val(voice.name).text(voice.name));
      } else {
        vselect.append($('<option />').val(voice.name).text(voice.name));
      }
    }
  };
  return ControlPanelView;
})();


$(function() {
  if ($('#viewlet-texttospeech').length > 0) {
    new MainView();
  }
  if ($('body.template-texttospeech-settings').length > 0) {
    new ControlPanelView();
  }
});
