jQuery17(function () {
    jQuery17(document).ready(function () {
        jQuery17('#entrypage-link').click(function () {
                    jQuery17('#entrypage-form-container').toggleClass('expanded');
                });
        console.info(jQuery17("#entrypage-text"));
        $("#entrypage-text").fitText();
        $($(".accordion-toggle")[0]).css("text-decoration", "underline");
        $($(".accordion-toggle")[0]).attr("clicked", "clicked")
        $(".accordion-toggle").click(function() {
            if($(this).attr("clicked") == "clicked") {
                $(this).css("text-decoration", "");
                $(this).attr("clicked", "");
            }
            else {
                $(this).css("text-decoration", "underline");
                $(this).attr("clicked", "clicked");
                $(".accordion-toggle").not(this).each(function(){
                    $(this).css("text-decoration", "");
                    $(this).attr("clicked", "");

                    });
                }
        });
    });
});