# -*- coding: utf-8 -*-
from collective.texttospeech.logger import logger
from plone import api


NEW_JS = '//code.responsivevoice.org/1.5/responsivevoice.js'
OLD_JS = '//code.responsivevoice.org/1.4/responsivevoice.js'


def pin_responsivevoice(setup_tool):
    """Use version 1.5 of the ResponsiveVoice API."""
    portal_js = api.portal.get_tool('portal_javascripts')
    if OLD_JS in portal_js.getResourceIds():
        portal_js.renameResource(OLD_JS, NEW_JS)
        assert NEW_JS in portal_js.getResourceIds()
        logger.info('ResponsiveVoice version updated to 1.5.')
