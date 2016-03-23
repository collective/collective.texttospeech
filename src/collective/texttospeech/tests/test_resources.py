# -*- coding: utf-8 -*-
"""Ensure add-on is properly installed and uninstalled."""
from collective.texttospeech.config import PROJECTNAME
from collective.texttospeech.testing import FUNCTIONAL_TESTING
from plone.testing.z2 import Browser

import Globals
import unittest


JS = (
    '//code.responsivevoice.org/responsivevoice.js',
    '++resource++collective.texttospeech/main.js',
)

CSS = '++resource++collective.texttospeech/main.css'


class ResourcesTestCase(unittest.TestCase):

    """Ensure resources are properly installed/uninstalled."""

    layer = FUNCTIONAL_TESTING

    def setUp(self):
        Globals.DevelopmentMode = True
        self.portal = self.layer['portal']
        self.browser = Browser(self.layer['app'])

    def test_resources(self):
        self.browser.open(self.portal.absolute_url())
        html = self.browser.contents
        for js in JS:
            self.assertIn(js, html, js + ' not installed')
        self.assertIn(CSS, html)

    def test_resources_removed_on_uninstall(self):
        import transaction
        qi = self.portal['portal_quickinstaller']
        qi.uninstallProducts(products=[PROJECTNAME])
        transaction.commit()

        self.browser.open(self.portal.absolute_url())
        html = self.browser.contents
        for js in JS:
            self.assertNotIn(js, html, js + ' not removed')
        self.assertNotIn(CSS, html)
