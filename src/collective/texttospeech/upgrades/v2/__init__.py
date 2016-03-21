# -*- coding: utf-8 -*-
from collective.texttospeech.config import PROJECTNAME
from plone.app.upgrade.utils import loadMigrationProfile

import logging


def apply_profile(context):
    """Apply profile."""
    logger = logging.getLogger(PROJECTNAME)
    profile = 'profile-{0}:default'.format(PROJECTNAME)
    loadMigrationProfile(context, profile)
    logger.info('Profile migrated.')
