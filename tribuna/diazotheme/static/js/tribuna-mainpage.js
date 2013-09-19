jQuery17(function () {
    'use strict';

    var slider = jQuery17('#article-slider'),
        SLIDER_PREFIX = "slider-",
        LAST_ELEMENT = jQuery17("#article-slider li").last(),
        LAST_INDEX = LAST_ELEMENT.attr('data-carousel-index'),
        article_id,
        article_uid,
        article_url,
        comments,
        comments_url,
        text;

    /**
     * Test if the whole element can be seen
     *
     * @param   {Object}   elem  Element we're testing
     *
     * @return  {Boolean}        Can the whole element be seen or not
     */
    function isScrolledIntoView(elem) {
        var docViewLeft = jQuery17(window).scrollLeft(),
            docViewRight = docViewLeft + jQuery17(window).width();

        if (!jQuery17(elem).offset() || !jQuery17(elem).width()) {
            return false;
        }
        var elemLeft = jQuery17(elem).offset().left,
            elemRight = elemLeft + jQuery17(elem).width();

        return ((elemRight >= docViewLeft) && (elemLeft <= docViewRight) &&
                (elemRight <= docViewRight) &&  (elemLeft >= docViewLeft));
    }


    /**
     * Get the last child object that is still visible whole
     *
     * @param   {Object}  objectList  jQuery object, needs to have children
     *
     * @return  {Object}              Last of the children still visible
     */
    function getLastVisible(objectList) {
        var last = objectList.first();
        while (isScrolledIntoView(last.next())) {
            last = last.next();
        }
        return last;
    }


    /**
     * Figure out how many children elements fit on the screen
     *
     * @param   {Object}  objectList  jQuery object, needs to have children
     *
     * @return  {Number}              Number of elements that fit on the screen
     */
    function elementsOnScreen(objectList) {
        var first = objectList.first(),
            elemOnScreen = 0;

        while (isScrolledIntoView(first)) {
            first = first.next();
            elemOnScreen += 1;
        }

        return elemOnScreen;
    }


    /**
     * Figure out the page on which elem is and hide the carousel arrows if
     * we are on the first page (left arrow) or last page (right arrow)
     *
     * @param   {Object}  elem  jQuery object, one of the carousel elements
     *
     * @return  {Number}        The page on which the element is
     */
    function getStartPage(elem) {
        var page = Math.floor(elem.attr('data-carousel-index') / window.elemOnScreen),
            pageStart = jQuery17("[data-carousel-index = " + page * window.elemOnScreen + "]"),
            lastPage = Math.floor(LAST_INDEX / window.elemOnScreen);

        // Hide arrows if we are on the first or last page
        if (page === 0) {
            jQuery17("#prev").hide();
        } else if (page === lastPage) {
            jQuery17("#next").hide();
        }

        return pageStart;
    }


    /**
     * Slide to the page on which elem is
     *
     * @param   {Object}  elem  jQuery object, one of the carousel elements
     */
    function slideToPage(elem) {
        var pageStart = getStartPage(elem);
        slider.trigger('slideTo', pageStart);
    }


    /**
     * When we scroll the carousel to the right, show the left arrow and hide
     * the right arrow if we're on the last page
     */
    function nextScroll() {
        jQuery17("#prev").show();
        var last = getLastVisible(jQuery17("#article-slider li")).attr('data-carousel-index');
        if (last === LAST_INDEX) {
            jQuery17("#next").hide();
        }

    }


    /**
     * When we scroll the carousel to the left, show the right arrow and hide
     * the left arrow if we're on the last page.
     */
    function prevScroll() {
        jQuery17("#next").show();
        var first = jQuery17("#article-slider li").first();
        if (first.attr('data-carousel-index') === "0") {
            jQuery17("#prev").hide();
        }
    }


    /**
     * Load the Article/Image/Comment inside the div#main, mark the appropriate
     * carousel list element as selected and slide the carousel to the right
     * page.
     * Needs to be called on a carousel list element.
     */
    jQuery17.fn.loadArticle = function () {

        // Add/remove 'selected' class.
        this.addClass('selected');
        jQuery17("#article-slider li").not(this).each(function () {
            jQuery17(this).removeClass('selected');
        });

        // Show all arrows.
        jQuery17(".prev").show();
        jQuery17(".next").show();

        // Slide to appropriate page, hiding carousel arrows if needed.
        slideToPage(this);

        // Load the content.
        article_uid = this.attr('data-uid');
        article_url = this.attr('data-url');

        jQuery17('#main').load(article_url + " #center-column", function () {

            // Enable dropdown menus (for content actions e.g.).
            $(".dropdown-toggle").dropdown();

            // Change text size of comments responsively.
            // jQuery17(".fit-text").textfill(30, 16);

            // Set full width for center column and remove the "content" id
            // XXX: yes, I'm aware that this is bad ;) (we should probably
            // do this with diazo instead). I'm a perfectionist, but with
            // a deadline.
            jQuery17("#center-column").attr("class", "");
            jQuery17("#content").attr("id", "");

            // Show article comments if we have a comment hash in the url.
            if (window.location.hash) {
                jQuery17(".activate-comments").trigger("click");
            }
        });

        // If we are on the first/last article, hide appropriate arrows
        var currIndex = this.attr('data-carousel-index');
        if (currIndex === "0") {
            jQuery17("#article-navigation .prev").hide();
        } else if (currIndex === LAST_INDEX) {
            jQuery17("#article-navigation .next").hide();
        }
    };


    jQuery17(document).ready(function () {

        // Initialize the articles carousel
        slider.carouFredSel({
            circular: false,
            infinite: false,
            width: '100%',
            height: 62,
            items: {
                width: 220
            },
            auto: false,
            mousewheel: true,
            swipe: {
                onMouse: true,
                onTouch: true
            },
            prev: "#prev",
            next: "#next",
            scroll: {
                onAfter: function (data) {
                    if (data.scroll.direction === "prev") {
                        prevScroll();
                    } else {
                        nextScroll();
                    }
                }
            }
        });

        // Set up the global variables
        window.elemOnScreen = elementsOnScreen(jQuery17("#article-slider li"));

        // Load article (from url)
        article_id = jQuery17("#main").attr('data-id');
        jQuery17('#' + SLIDER_PREFIX + article_id).loadArticle();

        // Show spinner when loading
        jQuery17('#ajax-spinner')
            .ajaxStart(function () {
                jQuery17(this).show();
            })
            .ajaxStop(function () {
                jQuery17(this).hide();
            });

        ////////////////////////
        // Show/hide comments //
        ////////////////////////

        jQuery17("#main").on("change", ".activate-comments", function () {
            comments = jQuery17('#comments-' + article_uid);
            text = jQuery17('.article-text');

            // Load comments if they haven't been loaded yet
            if (comments.children().length === 0) {
                comments_url = comments.attr('data-url');

                comments.load(comments_url, function () {

                    // Go to the selected comment if we have a comment hash in
                    // the url.
                    if (window.location.hash) {
                        window.location.href = window.location.hash;
                    }

                });
            }

            if (jQuery17(this).prop("checked")) {
                comments.show();
                if (text.is(":visible")) {
                    comments.removeClass("span7").addClass("span5");
                    text.removeClass("span7").addClass("span6");
                } else {
                    comments.removeClass("span5").addClass("span7");
                }
            } else {
                comments.hide();
                text.removeClass("span6").addClass("span7");
            }
        });

        // Show/hide article text
        jQuery17("#main").on("change", ".activate-text", function () {
            text = jQuery17('.article-text');
            comments = jQuery17('#comments-' + article_uid);
            if (jQuery17(this).prop("checked")) {
                text.show();
                jQuery17(".article-image").show();
                if (comments.is(":visible")) {
                    text.removeClass("span7");
                    text.addClass("span6");
                    comments.removeClass("span7");
                    comments.addClass("span5");
                } else {
                    text.removeClass("span6");
                    text.addClass("span7");
                }
            } else {
                text.hide();
                jQuery17(".article-image").hide();
                comments.removeClass("span5");
                comments.addClass("span7");
            }
        });



        ///////////////////////////
        // Click functions setup //
        ///////////////////////////

        // Load content from selected article, slide to it and change the URL
        // to the new article with HTML5 replaceState.
        jQuery17('#article-slider li').click(function () {
            $(this).loadArticle();

            article_id = this.id.replace(SLIDER_PREFIX, "") + document.location.search;
            window.history.replaceState(null, null, article_id);

        });


        // Slide to the next article, return false to stop click from bubbling
        // up
        jQuery17('#article-navigation .next').click(function () {
            var current = parseInt(jQuery17('#article-slider li.selected').attr('data-carousel-index'), 10),
                next = jQuery17("[data-carousel-index = " + (current + 1) + "]");
            next.trigger('click');
            return false;
        });

        // Slide to the previous article, return false to stop click from
        // bubbling up
        jQuery17('#article-navigation .prev').click(function () {
            var current = parseInt(jQuery17('#article-slider li.selected').attr('data-carousel-index'), 10),
                prev = jQuery17("[data-carousel-index = " + (current - 1) + "]");
            prev.trigger('click');
            return false;
        });

    });



    // On resizing, set up the elemOnScreen again and move to the selected
    // article page
    jQuery17(window).resize(function () {
        window.elemOnScreen = elementsOnScreen(jQuery17("#article-slider li"));
        slideToPage(jQuery17("#article-slider li.selected"));
    });

});
