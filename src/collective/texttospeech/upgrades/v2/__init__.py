# -*- coding: utf-8 -*-
from collective.texttospeech.config import IS_PLONE_5
from collective.texttospeech.logger import logger
from plone import api


NEW_JS = '//code.responsivevoice.org/1.4/responsivevoice.js'
OLD_JS = '//code.responsivevoice.org/responsivevoice.js'


def pin_responsivevoice(setup_tool):
    """Use version 1.4 of the ResponsiveVoice API."""
    if IS_PLONE_5:
        return  # upgrade step not supported under Plone 5

    portal_js = api.portal.get_tool('portal_javascripts')
    if OLD_JS in portal_js.getResourceIds():
        # HACK: can not use portal_js.renameResource
        #       see: https://github.com/plone/Products.ResourceRegistries/pull/20
        portal_js.getResource(OLD_JS)._data['id'] = NEW_JS
        assert NEW_JS in portal_js.getResourceIds()
        logger.info('ResponsiveVoice version updated to 1.4.')
