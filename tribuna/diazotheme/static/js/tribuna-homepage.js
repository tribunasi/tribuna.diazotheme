jQuery17(function () {
    "use strict";

    function selectOne(){
        // When clicking on name, push it to top and remove everything else
        var myname = jQuery17(this.parentNode.parentNode).attr('id');
        var alreadySelected = false;
        jQuery17('#selected-tags-list > li > span').each( function() {
            var name = jQuery17(this.parentNode).attr('id');
            if(name === myname){
                alreadySelected = true;
            }
            else{
                jQuery17('#tags-list #' + name + ' > a').text('+');
                jQuery17('#all-tags-list #' + name + ' > a').text('+');
                jQuery17('#tags-list #' + name).removeClass("selected");
                jQuery17('#all-tags-list #' + name).removeClass("selected");
                jQuery17("#formfield-form-widgets-all_tags [value='" + name + "']").click();
                jQuery17("#formfield-form-widgets-tags [value='" + name + "']").click();
                jQuery17(this.parentNode).remove();
            }

        });

        if(!alreadySelected){
            jQuery17('#tags-list #' + myname + ' > a').text('-');
            jQuery17('#all-tags-list #' + myname + ' > a').text('-');
            jQuery17('#tags-list #' + myname).addClass("selected");
            jQuery17('#all-tags-list #' + myname).addClass("selected");
            jQuery17(this.parentNode.parentNode).clone(true).addClass("selected").appendTo('#selected-tags-list');
            jQuery17("#formfield-form-widgets-all_tags [value='" + myname + "']").click();
            jQuery17("#formfield-form-widgets-tags [value='" + myname + "']").click();
        }
        jQuery17(".plusminus").css("display", "inline-block");
        if (jQuery17(".selected").size() > 0){
            jQuery17(".plusminus").css("display", "inline-block");
        }
        else {
            jQuery17(".plusminus").css("display", "none");
        }
        jQuery17("#form-buttons-filter").click();


    }

    function moveUpDown(){
        // When clicking on +/-, move/remove from top and change sign appropriately
        if(jQuery17(this.parentNode.parentNode).attr('id') === 'tags-list' ||
            jQuery17(this.parentNode.parentNode).attr('id') === 'all-tags-list'){
            var name = jQuery17(this.parentNode).attr('id');
            var item = jQuery17('#selected-tags-list #' + name);
            if(!item.attr('id')){
                jQuery17('#tags-list #' + name + ' > a').text('-');
                jQuery17('#all-tags-list #' + name + ' > a').text('-');
                jQuery17('#tags-list #' + name).addClass("selected");
                jQuery17('#all-tags-list #' + name).addClass("selected");
                jQuery17(this.parentNode).clone(true).addClass("selected").appendTo('#selected-tags-list');
            }
            else{
                jQuery17('#tags-list #' + name + ' > a').text('+');
                jQuery17('#all-tags-list #' + name + ' > a').text('+');
                jQuery17('#tags-list #' + name).removeClass("selected");
                jQuery17('#all-tags-list #' + name).removeClass("selected");
                item.remove();
            }
        }
        else{
            var name = jQuery17(this.parentNode).attr('id');
            jQuery17('#tags-list #' + name + ' > a').text('+');
            jQuery17('#all-tags-list #' + name + ' > a').text('+');
            jQuery17('#tags-list #' + name).removeClass("selected");
            jQuery17('#all-tags-list #' + name).removeClass("selected");
            jQuery17(this.parentNode).remove();
        }
        jQuery17("#formfield-form-widgets-all_tags [value='" + jQuery17(this.parentNode).attr('id') + "']").click();
        jQuery17("#formfield-form-widgets-tags [value='" + jQuery17(this.parentNode).attr('id') + "']").click();
        jQuery17("#form-buttons-filter").click();
        scrollToContainer();
        if (jQuery17(".selected").size() > 0){
            jQuery17(".plusminus").css("display", "inline-block");
        }
        else {
            jQuery17(".plusminus").css("display", "none");
        }
    }

    function runEffect() {
        // Show the div if it's hidden, hide if it it's shown
        var all_tags = $( "#all-tags-list" );
        if(all_tags.css("display") === "none"){
          jQuery17( "#all-tags-list" ).show("fast");
        }
        else {
           jQuery17( "#all-tags-list" ).hide("fast");
        }
    }

     function scrollToContainer() {
                        $('html, body').animate({
                             scrollTop: $("#container").offset().top
                         });
                    }

    function runEffectClose(e) {
        // Show the div if it's hidden, hide if it it's shown
        // console.info(e.target.id);
        // console.info(e.target.parentNode.id);
        // if(e.target.id === 'all-tags-list'){
        //     // console.info("Ne zapret!");
        // }
        // else{
        if(e.target.id != 'all-tags-list'){
            var all_tags = $( "#all-tags-list" );
            if(all_tags.css("display") !== "none"){
              jQuery17( "#all-tags-list" ).hide("fast");
            }
        }
        // }
    }

    jQuery17(document).ready(function () {
        // Setup for moving tags up and down via +/-
        jQuery17("#articles_list").css("min-height", jQuery17(window).height());
        jQuery17("div#homepage-div").css("float", "left");
        jQuery17("div#homepage-div").css("width", "100%");

        console.info(jQuery17("#articles").css("min-height"));
        if (jQuery17(".selected").size() > 0){
            jQuery17(".plusminus").css("display", "inline-block");
        }

        jQuery17("#selected-tags-list > li > a").click( moveUpDown);
        jQuery17("#tags-list > li > a").click( moveUpDown);
        jQuery17("#all-tags-list > li > a").click( moveUpDown);

        // Setup for selecting tag via clicking on name
        jQuery17("#selected-tags-list > li > span > a").click( selectOne);
        jQuery17("#tags-list > li > span > a").click( selectOne);
        jQuery17("#all-tags-list > li > span > a").click( selectOne);


        // Click event for show/hide "button" (actually just a link)
        jQuery17("#show-all-tags" ).click(function() {
          runEffect();
          return false;
        });
        // jQuery17(document).click( function(e) {
        //   runEffectClose(e);
        //   return false;
        // })

        // Set up the click functions for filters, hardcoded for now
        jQuery17("#types-list #articles").change( function(){
            jQuery17("#form-widgets-content_filters-0").click();
            jQuery17("#form-buttons-filter").click();
        });
        jQuery17("#types-list #comments").change( function(){
            jQuery17("#form-widgets-content_filters-1").click();
            jQuery17("#form-buttons-filter").click();
        });
        jQuery17("#types-list #images").change( function(){
            jQuery17("#form-widgets-content_filters-2").click();
            jQuery17("#form-buttons-filter").click();
        });

        // Sort_on
        // var uniqueName = "thisShouldBeAnUniqueName";
        jQuery17("#form-widgets-sort_on").attr('id', 'form-widgets-sort_on-noform');
        if(jQuery17("#form-widgets-sort_on").length === 0){
            jQuery17("#form-widgets-sort_on-noform").attr('id', 'form-widgets-sort_on');
        }
        else{
            jQuery17("#formfield-form-widgets-sort_on").attr('id', "formfield-form-widgets-sort_on-noform");
        }

        jQuery17("#form-widgets-sort_on").change( function() {
            console.info("stvari");
            jQuery17("#form-widgets-sort_on-noform").val(this.value);
            jQuery17("#form-buttons-filter").click();
        });

    });

});
