jQuery17(function () {
    "use strict";

    /**
     * Set the correct padding on the #entrypage-form-container with an animation
     */
    function setPadding() {
        var currPadding = jQuery17('#entrypage-form-container').css('padding-top');
        if (currPadding === "0px") {
            jQuery17('#entrypage-form-container').animate({padding: "0.75em"}, 400);
        } else {
            jQuery17('#entrypage-form-container').animate({padding: "0px"}, 300);
        }
    }


    /**
     * Expand or retract the container and show/hide the close button
     */
    function openCloseContainer() {
        jQuery17('#entrypage-form-container').toggleClass('expanded');
        jQuery17('#entrypage-form-close').toggle();
    }


    /**
     * Opens or closes the accordion
     *
     * @this  {Object}  An accordion we will open/close
     */
    function openCloseAccordion() {
        jQuery17(this).toggleClass('selected');
        jQuery17(".accordion-toggle").not(this).each(function () {
            jQuery17(this).removeClass('selected');
        });
    }


    /**
     * Resize the text to fit inside the container while being as large as
     * possible
     *
     * @param   {Boolean}  replace  Should we replace the '\n' with <br> or not
     * @param   {Number}   step     Step for lowering font-size, defaults to 10
     */
    function resizeText(replace, step) {
        // Set default value for step
        step = step || 10;

        // Set the appropriate height
        var tmpheight = $(window).height() - 145,
            $h = jQuery17('#entrypage-text'),
            $d = jQuery17('<div/>'),
            size;
        jQuery17('#text-container').height(tmpheight);

        // Trim and replace new lines with <br />
        if (replace) {
            $h.html($h.text().trim().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r\n|\r|\n/g, "<br />"));
        }

        $h.wrapInner($d);
        var $i = jQuery17('#entrypage-text div')[0],
            height = $h.height(),
            innerHeight = $i.scrollHeight;

        // Resize the text while it's still in the bounds
        while (innerHeight > height) {
            size = parseInt($h.css("font-size"), 10);
            $h.css("font-size", size - step);
            innerHeight = $i.scrollHeight;
        }

        if (height > innerHeight) {
            $h.height(innerHeight);
        }
    }


    jQuery17(document).ready(function () {
        jQuery17('#entrypage-link, #entrypage-form-close').click(function () {
            setPadding();
            openCloseContainer();
        });

        jQuery17(".accordion-toggle").click(openCloseAccordion());

        if (jQuery17("#text-container").length) {
            resizeText(true);
        }

        // This needs to be $ and not jQuery17
        $('input[type=file]').bootstrapFileInput();
        // Limit the maxlength of inputs
        jQuery17(".textarea-widget").attr("maxlength", "150");
        jQuery17(".text-widget").attr("maxlength", "20");
    });
});
