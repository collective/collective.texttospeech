# -*- coding: utf-8 -*-
from collective.texttospeech import _
from plone.directives import form
from zope import schema
from zope.interface import Interface


class IBrowserLayer(Interface):

    """A layer specific for this add-on product."""


class ITextToSpeechControlPanel(form.Schema):

    """Schema for the control panel form."""

    voice = schema.TextLine(
        title=_(u'Voice'),
        description=_(u'Voice used to read the text.'),
        required=True,
        default=u'UK English Female',
    )
