# -*- coding: utf-8 -*-
from collective.texttospeech.logger import logger
from plone import api
from Products.CMFPlone.interfaces import IBundleRegistry


NEW_JS = '//code.responsivevoice.org/1.5/responsivevoice.js'
OLD_JS = '//code.responsivevoice.org/1.4/responsivevoice.js'


def update_references(setup_tool):
    """Use version 1.5 of the ResponsiveVoice API."""
    portal_js = api.portal.get_tool('portal_javascripts')
    if OLD_JS in portal_js.getResourceIds():
        portal_js.renameResource(OLD_JS, NEW_JS)
        assert NEW_JS in portal_js.getResourceIds()
        logger.info('ResponsiveVoice version updated to 1.5.')


def register_references_p5(setup_tool):
    """Register static resources for Plone 5."""
    bundle_data = {
        'last_compilation': '',
        'jscompilation': '++plone++collective.texttospeech/bundle-texttospeech-compiled.min.js',
        'merge_with': 'default',
        'depends': '',
        'compile': False,
        'enabled': True,
        'resources': ['responsivevoice', 'texttospeech'],
    }
    for key, value in bundle_data.iteritems():
        api.portal.set_registry_record(
            key, interface=IBundleRegistry, value=value)
