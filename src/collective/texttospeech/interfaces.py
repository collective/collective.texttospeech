# -*- coding: utf-8 -*-
from collective.texttospeech import _
from collective.texttospeech.config import DEFAULT_ENABLED_CONTENT_TYPES
from plone.directives import form
from zope import schema
from zope.interface import Interface


class IBrowserLayer(Interface):

    """A layer specific for this add-on product."""


class ITextToSpeechControlPanel(form.Schema):

    """Schema for the control panel form."""

    globally_enabled = schema.Bool(
        title=_(u'Enable Text-to-Speech?'),
        description=_(u'If selected, Text-to-Speech feature will be enabled sitewide.'),
        default=True,
    )

    enabled_content_types = schema.List(
        title=_(u'Enabled Content Types'),
        description=_(
            u'Only objects of these content types will display a Text-to-Speech button.'),
        required=False,
        default=DEFAULT_ENABLED_CONTENT_TYPES,
        # we are going to list only the main content types in the widget
        value_type=schema.Choice(
            vocabulary=u'plone.app.vocabularies.ReallyUserFriendlyTypes'),
    )

    voice = schema.TextLine(
        title=_(u'Voice'),
        description=_(u'Voice used to read the text.'),
        required=True,
        default=u'UK English Female',
    )
