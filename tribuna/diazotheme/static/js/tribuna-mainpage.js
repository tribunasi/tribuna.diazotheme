jQuery17(function () {
    'use strict';

    var slider = jQuery17('#article-slider'),
        SLIDER_PREFIX = "slider-",
        article_id,
        article_uid,
        article_url,
        selected_article,
        comments,
        comments_url,
        text;

    jQuery17.fn.loadArticle = function() {

        // add/remove 'selected' class
        this.addClass('selected');
        jQuery17("#article-slider li").not(this).each(function() {
            jQuery17(this).removeClass('selected');
        });

        // slide to the selected element
        slider.trigger('slideTo', this);

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
            prev: '#prev',
            next: '#next',
            mousewheel: true,
            swipe: {
                onMouse: true,
                onTouch: true
            }
        });

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
    // XXX: should not be circular
    jQuery17('#article-navigation .next').click(function () {
        var current = jQuery17('#article-slider li.selected');
        var next = current.next();
        slider.trigger('slideTo', next);
        next.trigger('click');
        return false;
    });

    // slide to the previous article
    // XXX: should not be circular
    jQuery17('#article-navigation .prev').click(function () {
        var current = jQuery17('#article-slider li.selected');
        var prev = current.prev();
        slider.trigger('slideTo', prev);
        prev.trigger('click');
        return false;
    });


});
