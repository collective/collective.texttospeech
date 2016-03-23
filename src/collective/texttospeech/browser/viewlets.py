# -*- coding: utf-8 -*-
"""Viewlets used on the package."""
from collective.texttospeech.interfaces import ITextToSpeechControlPanel
from plone import api
from plone.app.layout.viewlets.common import ViewletBase


class TextToSpeechViewlet(ViewletBase):

    """Viewlet with play button."""

    def voice(self):
        return api.portal.get_registry_record(
            ITextToSpeechControlPanel.__identifier__ + '.voice'
        )
