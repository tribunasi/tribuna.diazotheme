# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

version = '0.1'

setup(
    name='tribuna.diazotheme',
    version=version,
    description="Theme package for Tribuna project",
    long_description=open("README.rst").read() + "\n" +
                     open("HISTORY.txt").read(),
    # Get more strings from
    # http://pypi.python.org/pypi?:action=list_classifiers
    classifiers=[
        "Programming Language :: Python",
    ],
    author='Termitnjak d.o.o.',
    author_email='info@termitnjak.com',
    url='',
    license='BSD',
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
