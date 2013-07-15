console.info("Cisto zunaj!");
// (function () {
//     "use strict";
    console.info("Badum badum!");
    function selectOne(){
        // When clicking on name, push it to top and remove everything else
        jQuery17('#selected-tags-list > li > span').each( function(index) {
            var name = jQuery17(this).text().toLowerCase().replace(/ /g, '_');
            jQuery17('#tags-list #' + name + ' > a').text('+');
            jQuery17('#all-tags-list #' + name + ' > a').text('+');
            jQuery17('#tags-list #' + name).removeClass("selected");
            jQuery17('#all-tags-list #' + name).removeClass("selected");
            jQuery17(this.parentNode).remove();
        });

        var name = jQuery17(this).text().toLowerCase().replace(/ /g, '_');
        jQuery17('#tags-list #' + name + ' > a').text('-');
        jQuery17('#all-tags-list #' + name + ' > a').text('-');
        jQuery17('#tags-list #' + name).addClass("selected");
        jQuery17('#all-tags-list #' + name).addClass("selected");
        jQuery17(this.parentNode.parentNode).clone(true).addClass("selected").appendTo('#selected-tags-list');
    }

    function moveUpDown(){
        // When clicking on +/-, move/remove from top and change sign appropriately
        if(jQuery17(this.parentNode.parentNode).attr('id') == 'tags-list' ||
            jQuery17(this.parentNode.parentNode).attr('id') == 'all-tags-list'){
            var name = jQuery17(this.parentNode.getElementsByTagName('span')).text().toLowerCase().replace(/ /g, '_');
            console.info(name);
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
            var name = jQuery17(this.parentNode.getElementsByTagName('span')).text().toLowerCase().replace(/ /g, '_');
            jQuery17('#tags-list #' + name + ' > a').text('+');
            jQuery17('#all-tags-list #' + name + ' > a').text('+');
            jQuery17('#tags-list #' + name).removeClass("selected");
            jQuery17('#all-tags-list #' + name).removeClass("selected");
            jQuery17(this.parentNode).remove();
        }
    }

    // jQuery17(document).ready(function () {

        // Setup for moving tags up and down via +/-
        jQuery17("#tags-list > li > a").click( moveUpDown);
        jQuery17("#selected-tags-list > li > a").click( moveUpDown);
        jQuery17("#all-tags-list > li > a").click( moveUpDown);

        // Setup for selecting tag via clicking on name
        jQuery17("#tags-list > li > span > a").click( selectOne);
        jQuery17("#selected-tags-list > li > span > a").click( selectOne);
        jQuery17("#all-tags-list > li > span > a").click( selectOne);


        jQuery17('#entrypage-link').click(function () {
            jQuery17('#entrypage-form-container').toggleClass('expanded');
        });

    // });

    // $(function() {
        function runEffect() {
            // Show the div if it's hidden, hide if it it's shown
            var all_tags = $( "#all-tags-list" );
            if(all_tags.css("display") == "none"){
              $( "#all-tags-list" ).show("fast");
            }
            else{
               $( "#all-tags-list" ).hide("fast");
            }
        };

        // Click event for show/hide "button" (actually just a link)
        $( "#show-all-tags" ).click(function() {
          runEffect();
          return false;
        });
    // });

// });
