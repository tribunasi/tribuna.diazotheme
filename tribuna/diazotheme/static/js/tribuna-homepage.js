jQuery17(function () {
    "use strict";


    /**
     * When clicking on the tag name, mark it as selected and unmark every
     * other tag.
     * Also take care of moving the tags up/down in the sidebar.
     */
    function selectOne(e) {
        e.preventDefault();
        // When clicking on name, push it to top and remove everything else.
        var myname = jQuery17(this.parentNode.parentNode).attr('id'),
            alreadySelected = false;

        jQuery17('#selected-tags-list > li > span').each(function () {
            var name = jQuery17(this.parentNode).attr('id');
            if (name === myname) {
                alreadySelected = true;
            } else {
                jQuery17('#tags-list #' + name + ' > a').text('+');
                jQuery17('#all-tags-list #' + name + ' > a').text('+');
                jQuery17('#tags-list #' + name).removeClass("selected");
                jQuery17('#all-tags-list #' + name).removeClass("selected");
                jQuery17("#formfield-form-widgets-all_tags [value='" + name + "']").click();
                jQuery17("#formfield-form-widgets-tags [value='" + name + "']").click();
                jQuery17(this.parentNode).remove();
            }

        });

        if (!alreadySelected) {
            jQuery17('#tags-list #' + myname + ' > a').text('-');
            jQuery17('#all-tags-list #' + myname + ' > a').text('-');
            jQuery17('#tags-list #' + myname).addClass("selected");
            jQuery17('#all-tags-list #' + myname).addClass("selected");
            jQuery17(this.parentNode.parentNode).clone(true).addClass("selected").appendTo('#selected-tags-list');
            jQuery17("#formfield-form-widgets-all_tags [value='" + myname + "']").click();
            jQuery17("#formfield-form-widgets-tags [value='" + myname + "']").click();
        }

        jQuery17(".plusminus").css("display", "inline-block");
        jQuery17("#show-all-tags").css("margin-left", 17);
        jQuery17("#topside-tags").addClass("has-tags");

        jQuery17("#form-widgets-clicked_tag-0").prop("checked", true);
        jQuery17("#form-buttons-filter").click();

    }


    /**
     * If selected, mark as not selected. If not selected, mark as selected.
     * Also take care of moving the tags up/down in the sidebar.
     */
    function moveUpDown(e) {
        e.preventDefault();
        // When clicking on +/-, move/remove from top and change sign
        // appropriately.
        var name = jQuery17(this.parentNode).attr('id');

        if (jQuery17(this).parents("ul#tags-list").length ||
                jQuery17(this).parents("ul#all-tags-list").length) {

            var item = jQuery17('#selected-tags-list #' + name);
            if (!item.attr('id')) {
                jQuery17('#tags-list #' + name + ' > a').text('-');
                jQuery17('#all-tags-list #' + name + ' > a').text('-');
                jQuery17('#tags-list #' + name).addClass("selected");
                jQuery17('#all-tags-list #' + name).addClass("selected");
                jQuery17(this.parentNode).clone(true).addClass("selected").appendTo('#selected-tags-list');
            } else {
                jQuery17('#tags-list #' + name + ' > a').text('+');
                jQuery17('#all-tags-list #' + name + ' > a').text('+');
                jQuery17('#tags-list #' + name).removeClass("selected");
                jQuery17('#all-tags-list #' + name).removeClass("selected");
                item.remove();
            }
        } else {
            jQuery17('#tags-list #' + name + ' > a').text('+');
            jQuery17('#all-tags-list #' + name + ' > a').text('+');
            jQuery17('#tags-list #' + name).removeClass("selected");
            jQuery17('#all-tags-list #' + name).removeClass("selected");
            jQuery17(this.parentNode).remove();
        }
        jQuery17("#formfield-form-widgets-all_tags [value='" + jQuery17(this.parentNode).attr('id') + "']").click();
        jQuery17("#formfield-form-widgets-tags [value='" + jQuery17(this.parentNode).attr('id') + "']").click();
        // jQuery17("#form-widgets-clicked_tag-0").prop("checked", true);
        jQuery17("#form-buttons-filter").click();
        if (!jQuery17("#selected-tags-list li").length) {
            jQuery17(".plusminus").css("display", "none");
            jQuery17("#show-all-tags").css("margin-left", 0);
            jQuery17("#topside-tags").removeClass("has-tags");
        }
    }


    /**
     * Open (if closed) or close (if opened) the 'all-tags-list' with a nice
     * effect.
     */
    function runEffect() {
        var all_tags = $("#all-tags-list");
        if (all_tags.css("display") === "none") {
            sessionStorage.setItem("all-tags", "open");
            jQuery17("#all-tags-list").show("fast");
        } else {
            jQuery17("#all-tags-list").hide("fast");
            sessionStorage.setItem("all-tags", "closed");
        }
        jQuery17('#all-tags-list-close').toggle();
    }


    /**
     * Close the 'all-tags-list' with a nice effect.
     */
    function runEffectClose() {
        var all_tags = $("#all-tags-list");
        if (all_tags.css("display") !== "none") {
            jQuery17("#all-tags-list").hide("fast");
        }
        jQuery17('#all-tags-list-close').hide();
        sessionStorage.setItem("all-tags", "closed");
    }


    /**
     * Add alphabetical headers to the all-tags list.
     */
    function alphabetizeTagsList() {
        var previousLetter = 0,
            currentLetter = "#",
            first = true;

        jQuery17("ul#all-tags-list li").each(function () {
            if (jQuery17(this).text()[1]) {
                currentLetter = jQuery17(this).text()[1].toLowerCase();
            }
            if (currentLetter !== previousLetter) {
                if (first) {
                    jQuery17(this).before("<li class='all-tags-list-caption-first'>" + currentLetter + "</li>");
                    first = false;
                } else {
                    jQuery17(this).before("<li class='all-tags-list-caption'>" + currentLetter + "</li>");
                }
                previousLetter = currentLetter;
            }
        });
    }


    /**
     * Change the all-tags list so it has columns.
     */
    function columnizeTagsList() {
        var allTagsList = jQuery17("ul#all-tags-list");
        if (allTagsList.length) {
            var topHeight = jQuery17("div#topside-tags").height();
            allTagsList.css('max-height', (jQuery17(window).height() * 4 / 5 - topHeight));
            allTagsList.css("top", topHeight);

            allTagsList.width(jQuery17(window).width() / 3);

            var tmpheight = jQuery17(window).height() - parseInt(jQuery17("#articles-list").css("margin-top"), 10) - jQuery17("#topside-content-name").height() - 15;
            // jQuery17("#articles-list").css("height", tmpheight);
            jQuery17(".dragdrop").css("height", tmpheight - 10);
            jQuery17(".dragdrop").css("float", "left");
            jQuery17(".dragdrop").css("width", "100%");

            // Split the list into columns.
            var columns = Math.floor((allTagsList.width() - 40) / 160),
                columnWidth = Math.floor((allTagsList.width() - 40) / columns - 10),
                numEntries = jQuery17("ul#all-tags-list li").length,
                entriesInColumn = Math.ceil(numEntries / columns);


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
    }

    /**
     * Setup drag-drop for articles and images and randomize their starting
     * position.
     * We also need to manually set div width and height to the width and
     * height of the image so it appears and doesn't get squished when going
     * over the container border.
     */
    function dragDropArticlesImages() {
        jQuery17("div.drag-view-article, div.drag-view-image").each(function () {
            var article = $(this),
                image = $(this).find('img');
            article.css({'position' : 'absolute'});
            article.draggable({stack: "div", cancel: "a"});
            article.draggable("option", "distance", 0);

            image.load(function () {
                var imageHeight = jQuery17(this).height(),
                    imageWidth = jQuery17(this).width(),
                    numRandx = Math.floor(Math.random() * (jQuery17('.dragdrop').width() - imageWidth)),
                    numRandy = Math.floor(Math.random() * (jQuery17('.dragdrop').height() - imageHeight));

                if (numRandx < 0) {
                    numRandx = 0;
                }
                if (numRandy < 0) {
                    numRandy = 0;
                }

                article.css({'height': imageHeight});
                article.css({'width': imageWidth});
                article.css({'left': numRandx});
                article.css({'top': numRandy});
            });
            image.one('load', function () {}).each(function () {
                if (this.complete) {
                    $(this).load();
                }
            });
        });
    }

    /**
     * Setup drag-drop for comments and annotations and randomize their
     * starting position. We also need to move them offscreen (to get the real
     * width that is not limited with the container) and set the div width
     * attribute to that.
     */
    function dragDropComments() {
        jQuery17("div.drag-view-comment, div.drag-view-annotation").each(function () {
            var article = $(this),
                numRandx = Math.floor(Math.random() * ($('.dragdrop').width() - article.width())),
                numRandy = Math.floor(Math.random() * ($('.dragdrop').height() - article.height()));
            article.css({'position' : 'absolute'});
            article.draggable({stack: "div", cancel: "a"});
            article.draggable("option", "distance", 0);


            if (numRandx < 0) {
                numRandx = 0;
            }
            if (numRandy < 0) {
                numRandy = 0;
            }

            // Move it to the left somewhere, get the width and move back
            article.css('left', -5000);
            article.css('width', article.width());

            article.css('left', numRandx);
            article.css('top', numRandy);
        });
    }

    /**
     * Override default search form submission to push the data into sidebar
     * and click on filter. This way, everything is done through the sidebar,
     * which acts like a central hub for getting the data
     *
     * @param  {jQuery Event}   event        The click event
     * @param  {String}         searchValue  What was inputted into search
     *
     */
    function setSearch(event, searchValue) {
        jQuery17("#form-widgets-query").prop("value", searchValue);
        event.preventDefault();
        event.stopPropagation();
        jQuery17("#form-buttons-filter").click();
        return false;
    }


    jQuery17(document).ready(function () {
        // Set the width of topside tag-picture and set the scroll "button" to
        // scroll to the appropriate region.
        jQuery17("#tag-picture img").css({"height": window.innerHeight - 100});
        jQuery17('#scroll').click(function () {
            jQuery17('html, body').animate({
                scrollTop: $("#container").offset().top
            }, 500);
        });

        var articles_margin = $("#selected-tags").height() + 10;

        // Set margin for results, depending on selected tags height.
        $("#center-column #articles-list").css("margin-top", articles_margin);

        alphabetizeTagsList();
        columnizeTagsList();

        dragDropArticlesImages();
        dragDropComments();

        // Mark the appropriate button as selected.
        // XXX: we should read this setting from the request
        if (jQuery17(".dragdrop").length) {
            jQuery17("#form-buttons-drag").addClass("selected");
        } else {
            jQuery17("#form-buttons-text").addClass("selected");
        }

        // If we have a tag selected, show the +/- and set a left margin.
        if (jQuery17("#selected-tags-list li").length) {
            jQuery17(".plusminus").css("display", "inline-block");
            jQuery17("#show-all-tags").css("margin-left", 17);
            jQuery17("#topside-tags").addClass("has-tags");
        }

        // If we had the 'all-tags' list opened when we refreshed, reopen it.
        if (sessionStorage.getItem("all-tags") === "open") {
            runEffect();

        }

        ///////////////////////////
        // Click functions setup //
        ///////////////////////////


        // Setup for moving tags up and down via +/-.
        jQuery17("#selected-tags-list  li > a").click(moveUpDown);
        jQuery17("#tags-list  li > a").click(moveUpDown);
        jQuery17("#all-tags-list  li > a").click(moveUpDown);

        // Setup for selecting tag via clicking on name.
        jQuery17("#selected-tags-list li > span > a").click(selectOne);
        jQuery17("#tags-list li > span > a").click(selectOne);
        jQuery17("#all-tags-list li > span > a").click(selectOne);

        // Click event for show/hide "button" (actually just a link).
        jQuery17("#show-all-tags").click(function () {
            runEffect();
            return false;
        });
        jQuery17('#all-tags-list-close').click(function () {
            runEffect();
        });

        // Setup the click functions for filters, hardcoded for now.
        jQuery17("#types-list #all").change(function () {
            var checked = this.checked;
            console.log(checked);
            jQuery17("#form-widgets-content_filters-0").prop("checked", checked);
            jQuery17("#formfield-form-widgets-content_filters input.checkbox-widget").each(function () {
                jQuery17(this).prop('checked', checked);
            });
            jQuery17("#types-list input").each(function () {
                jQuery17(this).prop('checked', checked);
            });
            jQuery17("#form-buttons-filter").click();
        });
        jQuery17("#types-list #article").change(function () {
            jQuery17("#form-widgets-content_filters-1").prop("checked", this.checked);
            jQuery17("#form-buttons-filter").click();
        });
        jQuery17("#types-list #comment").change(function () {
            jQuery17("#form-widgets-content_filters-2").prop("checked", this.checked);
            jQuery17("#form-buttons-filter").click();
        });
        jQuery17("#types-list #image").change(function () {
            jQuery17("#form-widgets-content_filters-3").prop("checked", this.checked);
            jQuery17("#form-buttons-filter").click();
        });
        jQuery17("#types-list #annotation").change(function () {
            jQuery17("#form-widgets-content_filters-4").prop("checked", this.checked);
            jQuery17("#form-buttons-filter").click();
        });

        // Setup sorting filters.
        jQuery17("#form-widgets-sort_on").attr('id', 'form-widgets-sort_on-noform');
        if (jQuery17("#form-widgets-sort_on").length === 0) {
            jQuery17("#form-widgets-sort_on-noform").attr('id', 'form-widgets-sort_on');
        } else {
            jQuery17("#formfield-form-widgets-sort_on").attr('id', "formfield-form-widgets-sort_on-noform");
        }

        // Setup the click functions for sorting filter, hardcoded for now.
        jQuery17("#form-widgets-sort_on").change(function () {
            jQuery17("#form-widgets-sort_on-noform").val(this.value);
            jQuery17("#form-buttons-filter").click();
        });

        // Setup the click functions for view_type, hardcoded for now.
        jQuery17("#form-buttons-text").click(function () {
            jQuery17("#form-widgets-view_type").val("text");
        })
        jQuery17("#form-buttons-drag").click(function () {
            jQuery17("#form-widgets-view_type").val("drag");
        })

        jQuery17("#search-use-filters").prop('checked', jQuery17("#form-widgets-use_filters-0")[0].checked);

        jQuery17("#search-use-filters").click(function () {
            jQuery17("#form-widgets-use_filters-0").prop("checked", this.checked);
            jQuery17("#form-buttons-filter").click();
        })

        // XXX: Why do we need this? [natan]
        jQuery17("#form-widgets-search").attr("placeholder", "Search ...");

        // If we click outside the 'all-tags' list, close it. Doesn't work on
        // the drag-drop images, so we need to override that separately.
        jQuery17(document).click(function (event) {
            if (event.isTrigger === undefined) {
                var is_inside_tags = $(event.target).parents("#all-tags-list").length || $(event.target).attr('id') === "all-tags-list";
                if (!is_inside_tags) {
                    runEffectClose();
                }

                var clicked_on_advanced_search = $(event.target).hasClass('advancedsearchlink')
                if (clicked_on_advanced_search) {
                    setSearch(event, jQuery17('#searchGadget').prop("value"));
                }
            }

        });

        jQuery17("#searchGadget").prop('value', jQuery17("#form-widgets-query").prop('value'));

        // Override for clicking on drag-drop images.
        jQuery17("div.ui-widget-content").click(function () {
            runEffectClose();
        });

        jQuery17('#searchGadget').keydown(function (event) {
            // If we pressed enter
            if (event.keyCode == 13) {
                // Copy the query to the sidebar and click the submit button
                setSearch(event, jQuery17(this).prop("value"));
            }
        });

        jQuery17("#search-button").click(function (event) {
            setSearch(event, jQuery17("#searchGadget").prop("value"));
        });



    });

});
