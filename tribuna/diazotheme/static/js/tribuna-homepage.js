jQuery17(function () {
    "use strict";

    function selectOne(){
        // When clicking on name, push it to top and remove everything else
        var myname = jQuery17(this.parentNode.parentNode).attr('id');
        var alreadySelected = false;
        // jQuery17("#topside-tags").addClass("has-tags");
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
        var name;
        if(jQuery17(this.parentNode.parentNode).attr('id') === 'tags-list' ||
            jQuery17(this.parentNode.parentNode).attr('id') === 'all-tags-list' ||
            // XXX: Here because we change the structure to make multi columns
            jQuery17(this.parentNode.parentNode.parentNode.parentNode).attr('id') === 'all-tags-list'){
            name = jQuery17(this.parentNode).attr('id');
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
            name = jQuery17(this.parentNode).attr('id');
            jQuery17('#tags-list #' + name + ' > a').text('+');
            jQuery17('#all-tags-list #' + name + ' > a').text('+');
            jQuery17('#tags-list #' + name).removeClass("selected");
            jQuery17('#all-tags-list #' + name).removeClass("selected");
            jQuery17(this.parentNode).remove();
        }
        jQuery17("#formfield-form-widgets-all_tags [value='" + jQuery17(this.parentNode).attr('id') + "']").click();
        jQuery17("#formfield-form-widgets-tags [value='" + jQuery17(this.parentNode).attr('id') + "']").click();
        jQuery17("#form-buttons-filter").click();
        //scrollToContainer();
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
          sessionStorage.setItem("all-tags", "open");
          jQuery17( "#all-tags-list" ).show("fast");
        }
        else {
           jQuery17( "#all-tags-list" ).hide("fast");
           sessionStorage.setItem("all-tags", "closed");
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
        if(e.target.id !== 'all-tags-list'){
            var all_tags = $( "#all-tags-list" );
            if(all_tags.css("display") !== "none"){
              jQuery17( "#all-tags-list" ).hide("fast");
            }
        }
        // }
    }

    jQuery17(document).ready(function () {

        // set margin for results, depending on selected tags height
        var articles_margin = $("#selected-tags").height() + 10;
        $("#center-column #articles_list").css("margin-top", articles_margin);

        // set selected tags class, depending on whether we have a tag
        // selected or not
        // if ($("#selected-tags-list").children().length > 0) {
        //     $("#topside-tags").addClass("has-tags");
        // }

        // Setup the alphabetical stuff on all-tags-list ul
        var previousLetter = 0;
        var currentLetter = "#";
        var first = true;
        jQuery17("ul#all-tags-list li").each( function() {
            if(jQuery17(this).text()[1]){
                currentLetter = jQuery17(this).text()[1].toLowerCase();
            }
            if(currentLetter !== previousLetter){
                if(first){
                    jQuery17(this).before("<li class='all-tags-list-caption-first'>" + currentLetter + "</li>");
                    first = false;
                }else {
                    jQuery17(this).before("<li class='all-tags-list-caption'>" + currentLetter + "</li>");
                }
                previousLetter = currentLetter;
            }
        });


        // Setup the all-tags-list height
        var allTagsList = jQuery17("ul#all-tags-list");
        // var oldHeight = allTagsList.height();
        if(allTagsList.length){
            var topHeight = jQuery17("div#topside-tags").height();
            allTagsList.css('max-height', (jQuery17(window).height()*4/5 - topHeight));
            allTagsList.css("top", topHeight);

            allTagsList.width(jQuery17(window).width()/3);

            var tmpheight = jQuery17(window).height() - parseInt(jQuery17("#articles_list").css("margin-top"), 10) - jQuery17("#topside-content-name").height() - 15;
            jQuery17("#articles_list").css("height", tmpheight);
            jQuery17("div#homepage-div").css("height", tmpheight - 10);
            jQuery17("div#homepage-div").css("float", "left");
            jQuery17("div#homepage-div").css("width", "100%");

            // Split the list into columns
            var columns = Math.floor((allTagsList.width()-40)/160);
            var columnWidth = Math.floor((allTagsList.width()-40) / columns - 10);
            var numEntries = jQuery17("ul#all-tags-list li").length;
            var entriesInColumn = Math.ceil(numEntries/columns);


            allTagsList.html(allTagsList.html().replace('</a>', '</a><ul id="tmp-ul-tag" style="width: ' + columnWidth + 'px;">') + "</ul>");


            var size = entriesInColumn,
                $ul  = $("ul#tmp-ul-tag"),
                $lis = $ul.children().filter(':gt(' + (size - 1) + ')'),
                loop = columns,
                i    = 0;

            $ul.css('float', 'left').wrap("<div style='overflow: hidden;'></div>");

            for (; i < loop; i = i + 1) {
                $ul = $("<ul style='width: " + columnWidth + "px; margin-left: 5px; margin-right: 5px' />").css('float', 'left').append($lis.slice(i * size, (i * size) + size)).insertAfter($ul);
            }
        }




        // Setup for moving tags up and down via +/-
        if (jQuery17(".selected").size() > 0){
            jQuery17(".plusminus").css("display", "inline-block");
        }

        if (jQuery17("#homepage-div").size() > 0){
            jQuery17("#form-buttons-drag").addClass("selected");
        }
        else {
            jQuery17("#form-buttons-text").addClass("selected");
        }

        jQuery17("#selected-tags-list  li > a").click( moveUpDown);
        jQuery17("#tags-list  li > a").click( moveUpDown);
        jQuery17("#all-tags-list  li > a").click( moveUpDown);

        // Setup for selecting tag via clicking on name
        jQuery17("#selected-tags-list li > span > a").click( selectOne);
        jQuery17("#tags-list li > span > a").click( selectOne);
        jQuery17("#all-tags-list li > span > a").click( selectOne);

        if( sessionStorage.getItem("all-tags") === "open") {
            runEffect();
            jQuery17('#all-tags-list-close').toggle();
        }
        // Click event for show/hide "button" (actually just a link)
        jQuery17("#show-all-tags" ).click(function() {
          runEffect();
          jQuery17('#all-tags-list-close').toggle();
          return false;
        });
        jQuery17('#all-tags-list-close').click(function () {
            runEffect();
            jQuery17('#all-tags-list-close').toggle();
        });
        // jQuery17(document).click( function(e) {
        //   runEffectClose(e);
        //   return false;
        // })

        // Set up the click functions for filters, hardcoded for now
        jQuery17("#types-list #all").change( function(){
            var checked = jQuery17(this).prop('checked');
            jQuery17("#form-widgets-content_filters-0").click();
            jQuery17("#formfield-form-widgets-content_filters input.checkbox-widget").each(function (){
                jQuery17(this).prop('checked', checked);
            });
            jQuery17("#types-list input").each(function (){
                jQuery17(this).prop('checked', checked);
            });
            jQuery17("#form-buttons-filter").click();
        });
        jQuery17("#types-list #article").change( function(){
            jQuery17("#form-widgets-content_filters-1").click();
            jQuery17("#form-buttons-filter").click();
        });
        jQuery17("#types-list #comment").change( function(){
            jQuery17("#form-widgets-content_filters-2").click();
            jQuery17("#form-buttons-filter").click();
        });
        jQuery17("#types-list #image").change( function(){
            jQuery17("#form-widgets-content_filters-3").click();
            jQuery17("#form-buttons-filter").click();
        });

        // Sort_on
        jQuery17("#form-widgets-sort_on").attr('id', 'form-widgets-sort_on-noform');
        if(jQuery17("#form-widgets-sort_on").length === 0){
            jQuery17("#form-widgets-sort_on-noform").attr('id', 'form-widgets-sort_on');
        }
        else{
            jQuery17("#formfield-form-widgets-sort_on").attr('id', "formfield-form-widgets-sort_on-noform");
        }

        jQuery17("#form-widgets-sort_on").change( function() {
            jQuery17("#form-widgets-sort_on-noform").val(this.value);
            jQuery17("#form-buttons-filter").click();
        });
        jQuery17("#form-widgets-search").attr("placeholder", "Search ...");

    });

});
