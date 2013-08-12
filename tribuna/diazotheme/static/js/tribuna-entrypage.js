jQuery17(function () {
    "use strict";

    jQuery17(document).ready(function () {
        jQuery17('#entrypage-link').click(function () {
            jQuery17('#entrypage-form-container').toggleClass('expanded');
            jQuery17('#entrypage-form-close').toggle();
        });
        jQuery17('#entrypage-form-close').click(function () {
            jQuery17('#entrypage-form-container').toggleClass('expanded');
            jQuery17('#entrypage-form-close').toggle();
        });
        $(".accordion-toggle").click(function() {
            $(this).toggleClass('selected');
            $(".accordion-toggle").not(this).each(function(){
                $(this).removeClass('selected');
            });
        });
        $("#entrypage-text").fitText();
        $('input[type=file]').bootstrapFileInput();
        $(".textarea-widget").attr("maxlength", "150");
        $(".text-widget").attr("maxlength", "20");
    });
});