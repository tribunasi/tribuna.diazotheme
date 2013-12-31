/**
 * Initialization code for tribuna
 */

jQuery17(function () {
    "use strict";

    jQuery17(document).ready(function () {
        jQuery17('.field.error').each(function (idx, el) {
            if (jQuery17.trim(jQuery17(el).text()) === '') {
                jQuery17(el).remove();
            }
        });

        // init navigation dropdown menu
        jQuery17('.dropdown-toggle').dropdown();
        jQuery17('.dropdown-toggle').click(function () {
            var self = jQuery17(this).parent();
            jQuery17('.dropdown.open').each(function (idx, item) {
                if (jQuery17(item)[0] != self[0]) {
                    jQuery17(item).removeClass('open');
                }
            });
        });

        // init carousel
        jQuery17('.carousel').carousel();
    });
});
