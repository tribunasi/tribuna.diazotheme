jQuery17(function () {
    'use strict';

    var slider = jQuery17('#article-slider'),
        SLIDER_PREFIX = "slider-",
        LAST_ELEMENT = jQuery17("#article-slider li").last(),
        LAST_INDEX = LAST_ELEMENT.attr('carousel-index'),
        article_id,
        article_uid,
        article_url,
        selected_article,
        comments,
        comments_url,
        text;

    function isScrolledIntoView(elem) {
        var docViewLeft = jQuery17(window).scrollLeft();
        var docViewRight = docViewLeft + jQuery17(window).width();

        var elemLeft = jQuery17(elem).offset().left;
        var elemRight = elemLeft + jQuery17(elem).width();

        return ((elemRight >= docViewLeft) && (elemLeft <= docViewRight)
          && (elemRight <= docViewRight) &&  (elemLeft >= docViewLeft) );
    }

    function getLastVisible(first) {
        var first = jQuery17("#article-slider li").first();
        while(isScrolledIntoView(first.next())){
            first = first.next();
        }
        return(first);
    }

    function getStartPage(elem) {
        // Figure out the page on which our selected element is
        var page = Math.floor(elem.attr('carousel-index') / window.elemOnScreen);
        var pageStart = jQuery17("[carousel-index = " + page * window.elemOnScreen + "]")

        // Hide arrows if needed
        var lastPage = Math.floor(LAST_INDEX / window.elemOnScreen);
        if(page === 0){
            jQuery17("#prev").hide();
        }else if(page === lastPage){
            jQuery17("#next").hide();
        }

        return(pageStart);
    }

    function slideToPage(elem) {
        var pageStart = getStartPage(elem);
        // Slide to the start of that page
        slider.trigger('slideTo', pageStart);
    }

    function elementsOnScreen() {
        // Figure out how many elements fit on the screen and save it into
        // window global variable
        var first = jQuery17("#article-slider li").first();
        window.elemOnScreen = 0;
        while(isScrolledIntoView(first)){
            first = first.next();
            window.elemOnScreen += 1;
        }
    }


    // Make sure that we can still see our selected element when we resize
    jQuery17(window).resize(function() {
        // Need to set up again on resize
        elementsOnScreen();
        slideToPage(jQuery17("#article-slider li.selected"));
    })


    jQuery17.fn.loadArticle = function() {

        // add/remove 'selected' class
        this.addClass('selected');
        jQuery17("#article-slider li").not(this).each(function() {
            jQuery17(this).removeClass('selected');
        });

        jQuery17(".prev").show();
        jQuery17(".next").show();

        // Slide to appropriate page, hiding arrows if needed
        slideToPage(this);

        // load content
        article_uid = this.attr('data-uid');
        article_url = this.attr('data-url');

        jQuery17('#main').load(article_url + " #center-column", function () {

            // enable dropdown menus (for content actions e.g.).
            $(".dropdown-toggle").dropdown();

            // increase text size for comments
            jQuery17(".fit-text").textfill(30);

            // set full width for center column and remove the "content" id
            // XXX: yes, I'm aware that this is bad ;) (we should probably
            // do this with diazo instead) I'm a perfectionist, but with
            // a deadline
            jQuery17("#center-column").attr("class", "");
            jQuery17("#content").attr("id", "");

            // show article comments if we have hash in url
            if(window.location.hash) {
                jQuery17(".activate-comments").trigger("click");
            }

        });

        // If we are on the first/last article, hide appropriate arrows
        var currIndex = this.attr('carousel-index');
        if(currIndex === "0"){
            jQuery17("#article-navigation .prev").hide();
        }
        else if(currIndex === LAST_INDEX){
            jQuery17("#article-navigation .next").hide();
        }
    }

    jQuery17(document).ready(function () {

        // initialize the articles carousel
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
                onTouch: true,
            },
            prev: "#prev",
            next: "#next",
            scroll: {
                onAfter: function(data){
                    if(data.scroll.direction === "prev"){
                        prevScroll();
                    }else{
                        nextScroll();
                    }
                }
            }
        });

        // Set up the global variables
        elementsOnScreen();

        // load article (from url)
        article_id = jQuery17("#main").attr('data-id');
        jQuery17('#' + SLIDER_PREFIX + article_id).loadArticle();

        // show spinner when loading
        jQuery17('#ajax-spinner')
            .ajaxStart(function() {
                jQuery17(this).show();
            })
            .ajaxStop(function() {
                jQuery17(this).hide();
            });

        // show/hide comments
        jQuery17("#main").on("change", ".activate-comments", function () {
            comments = jQuery17('#comments-' + article_uid);
            text = jQuery17('.content-core');

            // load comments if they haven't been loaded yet
            if (comments.children().length === 0) {
                comments_url = comments.attr('data-url');

                comments.load(comments_url, function () {

                    // go to the selected comment
                    if(window.location.hash) {
                        window.location.href = window.location.hash;
                    }

                });
            }
            if (jQuery17(this).prop("checked")) {
                comments.show();
                if (text.is(":visible")) {
                    comments.removeClass("span7");
                    comments.addClass("span5");
                    text.removeClass("span9");
                    text.addClass("span6");
                }
                else {
                    comments.removeClass("span5");
                    comments.addClass("span7");
                }
            }
            else {
                comments.hide();
                text.removeClass("span6");
                text.addClass("span9");
            }
        });

        // show/hide article text
        jQuery17("#main").on("change", ".activate-text", function () {
            text = jQuery17('.content-core');
            comments = jQuery17('#comments-' + article_uid);
            if (jQuery17(this).prop("checked")) {
                text.show();
                if (comments.is(":visible")) {
                    text.removeClass("span9");
                    text.addClass("span6");
                    comments.removeClass("span7");
                    comments.addClass("span5");
                }
                else {
                    text.removeClass("span6");
                    text.addClass("span9");
                }
            }
            else {
                text.hide();
                comments.removeClass("span5");
                comments.addClass("span7");
            }
        });

    });

    jQuery17('#article-slider li').click(function () {

        // load content and slide to the selected article
        $(this).loadArticle();

        // Change the URL with HTML5 replaceState. Only needed here
        article_id = this.id.replace(SLIDER_PREFIX, "");
        window.history.replaceState(null, null, article_id);

    });

    // slide to the next article
    jQuery17('#article-navigation .next').click(function () {
        var current = parseInt(jQuery17('#article-slider li.selected').attr('carousel-index'));
        var next = jQuery17("[carousel-index = " + (current + 1) + "]")
        next.trigger('click');
        return false;
    });

    // slide to the previous article
    jQuery17('#article-navigation .prev').click(function () {
        var current = parseInt(jQuery17('#article-slider li.selected').attr('carousel-index'));
        var prev = jQuery17("[carousel-index = " + (current - 1) + "]")
        prev.trigger('click');
        return false;
    });

    function nextScroll() {
        jQuery17("#prev").show();
        var last = getLastVisible().attr('carousel-index');
        if(last === LAST_INDEX){
            jQuery17("#next").hide();
        }

    }

    function prevScroll() {
        jQuery17("#next").show();
        var first = jQuery17("#article-slider li").first();
        if(first.attr('carousel-index') === "0"){
            jQuery17("#prev").hide();
        }
    }


});
