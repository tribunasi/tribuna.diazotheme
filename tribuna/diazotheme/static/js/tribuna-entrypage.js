jQuery17(function () {
    "use strict";

    /**
     * Set the correct padding on the #entrypage-form-container with an animation
     */
    function setPadding(){
        var currPadding = jQuery17('#entrypage-form-container').css('padding-top');
        if (currPadding === "0px") {
            jQuery17('#entrypage-form-container').animate({padding: "0.75em"}, 400);
        } else {
            jQuery17('#entrypage-form-container').animate({padding: "0px"}, 300);
        }
    }

    /**
     * Expend or retract the container and show/hide the close button
     */
    function openCloseContainer(){
        jQuery17('#entrypage-form-container').toggleClass('expanded');
        jQuery17('#entrypage-form-close').toggle();
    }

    /**
     * Resize the text to fit inside the container while being as large as
     * possible
     *
     * @param  {boolean} replace Should we replace the text with <br> or not
     */
    function resizeText(replace){
        // Set the appropriate height
        var tmpheight = $(window).height() - 145;
        $('#text-container').height(tmpheight);

        // Trim and replace new lines with <br />
        if(replace){
            var newtext = $("#entrypage-text").text().trim().replace(/\n/g, '<br>');
            $("#entrypage-text").html(newtext);
        }

        var $h = $('#entrypage-text');
        var $d = $('<div/>');
        $h.wrapInner($d);
        var $i = $('#entrypage-text div')[0];
        var height = $h.height();
        var innerHeight = $i.scrollHeight;

        while(innerHeight > height) {
            var size = parseInt($h.css("font-size"), 10);
            $h.css("font-size", size - 10);
            innerHeight = $i.scrollHeight;
        }

        if(height > innerHeight) {
            $h.height(innerHeight);
        }
    }

    jQuery17(document).ready(function () {
        jQuery17('#entrypage-link, #entrypage-form-close').click(function () {
            setPadding();
            openCloseContainer();
        });

        $(".accordion-toggle").click(function() {
            $(this).toggleClass('selected');
            $(".accordion-toggle").not(this).each(function(){
                $(this).removeClass('selected');
            });
        });

        if ($("#text-container").length) resizeText(true);

        $('input[type=file]').bootstrapFileInput();
        $(".textarea-widget").attr("maxlength", "150");
        $(".text-widget").attr("maxlength", "20");
    });
});
