# -*- coding: utf-8 -*-
from plone import api


PROJECTNAME = 'collective.texttospeech'

# by default, all standard content types will be enabled
DEFAULT_ENABLED_CONTENT_TYPES = [
    'Document',
    'News Item'
]

IS_PLONE_5 = api.env.plone_version().startswith('5')
