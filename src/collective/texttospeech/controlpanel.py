# -*- coding: utf-8 -*-
from collective.texttospeech import _
from collective.texttospeech.interfaces import ITextToSpeechControlPanel
from plone.app.registry.browser import controlpanel


class TextToSpeechEditForm(controlpanel.RegistryEditForm):

    schema = ITextToSpeechControlPanel
    label = _(u'Text-to-Speech')
    description = _(u'Here you can modify the settings for collective.texttospeech.')


class TextToSpeechControlPanel(controlpanel.ControlPanelFormWrapper):

    form = TextToSpeechEditForm
