==================
tribuna.diazotheme
==================

One of the packages used for Tribuna webpage. Managed by ``tribuna.buildout``.

This is a Plone diazo theme based on
https://pypi.python.org/pypi/diazotheme.bootstrap/0.3

* `Source code @ GitHub <https://github.com/termitnjak/tribuna.content>`_

Installation
============

Installed using the ``tribuna.policy`` package.

Features
=========

* Portlets are converted to ``div`` elements instead of ``dl``, ``dt``, ``dd``
* Included carousel portlet provides a way to display images using Bootstrap's
  carousel
* ``eea.facetednavigation`` is also supported, with some enhancements.

  * The diazo rules rewrite facetednavigation templates to take advantage of
    the responsive design.
  * If the first widget at the top widget slot is a text search widget, it will
    appear as a full width widget with a different background.

* Installing ``webcouturier.dropdownmenu`` will enhance the top navigation with
  dropdown menus.

Using Bootstrap javascripts
===========================

This product leaves plone jquery alone not to break existing functionality. But
bootstrap requires a newer jQuery version. We include the needed one renaming
it to jQuery17.

If you need js functionality from bootstrap you have to use jQuery17, for
instance

    $(function() {
        jQuery17('.tooltipped').tooltip()
    });

to activate the tooltip plugin on elements with the class "tooltipped".

Copyright and licence
=====================

Copyright 2012-2013 2012-2013 Študentska organizacija Slovenije and Termitnjak d.o.o.
Copyright 2011 Mohd Izhar Firdaus Ismail

tribuna.diazotheme was funded by the Študentska organizacija
Slovenije and is licensed under the Apache License 2.0. More details under
docs/LICENSE.rst.
