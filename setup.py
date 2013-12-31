# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

import os

version = '0.2dev'


def read(*rnames):
    return open(os.path.join(os.path.dirname(__file__), *rnames)).read()

long_description = \
    read('README.rst') + \
    read('docs', 'CHANGELOG.rst') + \
    read('docs', 'LICENSE.rst')

setup(
    name='tribuna.diazotheme',
    version=version,
    description="Plone diazo theme for the Tribuna web page",
    long_description=long_description,
    # Get more strings from
    # http://pypi.python.org/pypi?:action=list_classifiers
    classifiers=[
        "Framework :: Plone",
        "Programming Language :: Python",
    ],
    author='Termitnjak d.o.o.',
    author_email='info@termitnjak.si',
    url='',
    license='Apache License 2.0',
    packages=find_packages(exclude=['ez_setup']),
    namespace_packages=['tribuna'],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'setuptools',
        # -*- Extra requirements: -*-
    ],
    entry_points="""
    # -*- Entry points: -*-
    [z3c.autoinclude.plugin]
    target = plone
    """,
)
