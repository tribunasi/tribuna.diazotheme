jQuery17(function () {
    "use strict";

    jQuery17(document).ready(function () {
        jQuery17('#entrypage-link').click(function () {
            var currPadding = jQuery17('#entrypage-form-container').css('padding-top');
            if (currPadding == "0px"){
                jQuery17('#entrypage-form-container').animate({padding: "0.75em"}, 400);
            }else{
                jQuery17('#entrypage-form-container').animate({padding: "0px"}, 300);
            }
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


        // Set the appropriate height, only run if we have the text-container
        if($("#text-container").length){
            var tmpheight = $(window).height() - 145;
            $('#text-container').height(tmpheight);

            // Trim and replace new lines with <br />
            var newtext = $("#entrypage-text").text().trim().replace(/\n/g, '<br>');
            $("#entrypage-text").html(newtext);

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
            // $('p em').text(height);
            // $('p strong').text(innerHeight);
            if(height > innerHeight) {
                $h.height(innerHeight);
            }
        }



        // $("#entrypage-text").fitText(1.2);
        $('input[type=file]').bootstrapFileInput();
        $(".textarea-widget").attr("maxlength", "150");
        $(".text-widget").attr("maxlength", "20");
    });
});
