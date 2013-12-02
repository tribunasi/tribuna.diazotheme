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
     * Loads the annotator and annotations, adds the required plugins and the
     * share buttons and changes placeholders to what we need.
     */
    function loadAnnotator() {
        // Override invertY so the editor cannot be turned around
        Annotator.Editor.prototype.invertY = function() {
            return this;
        };

        // Override api request method for annotator ajax calls, so we fix
        // problems with caching in IE
        Annotator.Plugin.Store.prototype._apiRequestOptions = function(action, obj, onSuccess) {
          var data, method, opts;
          method = this._methodFor(action);
          opts = {
            type: method,
            headers: this.element.data('annotator:headers'),
            dataType: "json",
            success: onSuccess || function() {},
            error: this._onError,
            cache: false
          };
          if (this.options.emulateHTTP && (method === 'PUT' || method === 'DELETE')) {
            opts.headers = $.extend(opts.headers, {
              'X-HTTP-Method-Override': method
            });
            opts.type = 'POST';
          }
          if (action === "search") {
            opts = $.extend(opts, {
              data: obj
            });
            return opts;
          }
          data = obj && this._dataFor(obj);
          if (this.options.emulateJSON) {
            opts.data = {
              json: data
            };
            if (this.options.emulateHTTP) {
              opts.data._method = method;
            }
            return opts;
          }
          opts = $.extend(opts, {
            data: data,
            contentType: "application/json; charset=utf-8"
          });
          return opts;
        };

        // Initialize annotator
        var annotator_content = $("#annotator").annotator();

        annotator_content.annotator('addPlugin', 'Tags');
        annotator_content.annotator('addPlugin', 'Store', {
              // The endpoint of the store on your server.
              prefix: '/Tribuna',
        });

        // XXX:
        // Everytime we change to another article, annotator-editor field ID's
        // go up by one. We change them back to 0 and 1
        var foo = jQuery17("li.annotator-item textarea"),
            bar = foo.attr('id').split('-');
        bar[2] = parseInt(bar[2], 10) % 2;
        foo.attr('id', bar.join('-'));

        foo = jQuery17("li.annotator-item input");
        bar = foo.attr('id').split('-');
        bar[2] = parseInt(bar[2], 10) % 2;
        foo.attr('id', bar.join('-'));


        // Change placeholder for annotator tags field and save button
        jQuery17("#annotator-field-1").attr('placeholder', "dodaj tag (optional)");
        jQuery17(".annotator-save").text("počrtaj!");

        jQuery17(".twitter-share").clone().removeClass('twitter-share').addClass('twitter-share-annotator').insertAfter('.annotator-controls');
        jQuery17(".facebook-share").clone().removeClass('facebook-share').addClass('facebook-share-annotator').insertAfter('.annotator-controls');

        // Parse the selection and append the needed data in facebook and
        // twitter buttons.
        jQuery17(".annotator-adder").click(function () {
            // Get selection and remove newlines (change them to a space)
            var quote = window.getSelection().toString().replace(/(\r\n|\r|\n)+/g, " ");
            // Facebook
            var first = jQuery17(".facebook-share").attr('onclick').split("[summary]")[0],
                second = jQuery17(".facebook-share").attr('onclick').split("[summary]")[1];
            second = second.substring(second.indexOf("&p"));
            jQuery17(".facebook-share-annotator").attr('onclick', first + "[summary]=" + quote + second);

            // Twitter
            first = jQuery17(".twitter-share").attr('onclick').split("?text=")[0];
            second = jQuery17(".twitter-share").attr('onclick').split("?text=")[1];
            second = second.substring(second.indexOf("&"));
            jQuery17(".twitter-share-annotator").attr('onclick', first + "?text=" + quote + second);
        });

        annotator_content.prop("loaded", true);
        window.scrollTo(0, $(".article-heading").offset().top);

    }

    /**
     * Load the Article/Image/Comment inside the div#main, mark the appropriate
     * carousel list element as selected and slide the carousel to the right
     * page.
     * After loading the article it loads the Annotator, sets it up and
     * overrides the invertY function beacuse we do not want to use it and we
     * could not find a way to disable it via options.
     * Needs to be called on a carousel list element.
     *
     * @param   {Boolean}  filter  When calling from annotation tag filtering,
     *                             set filter to true so we do not mess up the
     *                             top bar.
     */
    jQuery17.fn.loadArticle = function (filter) {
        filter = filter || false;

        // If we are just filtering, do not do anything with the top bar
        if (!filter) {
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
        }

        // Load the content.
        article_uid = this.attr('data-uid');
        article_url = this.attr('data-url');

        jQuery17('#main').load(article_url + " #center-column", function (responseText, textStatus, req) {

            if (textStatus == 'error') {
                jQuery17(".tribuna-error-message").show();
            }

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

            // Show/hide annotations. Only allow annotations when we aren't
            // already filtering, as it causes some problems.
            // This needs to be here so we can get the
            // number of selected annotation tags.
            if (jQuery17(".annotation-tags-item.selected").length === 0) {

                // Hide the annotation tags/header until we need it (on clicking
                // the annotation checkbox).
                jQuery17(".annotation-tags").hide();
                jQuery17(".annotation-tags-header").hide();

                jQuery17('#main').on("change", ".activate-annotations",
                                     function () {

                    text = jQuery17('.article-text');

                    // XXX: Setting it to readOnly doesn't seem to work, didn't
                    // find an options to disable it either ... For now we're
                    // doing this manually by hiding appropriate divs until we
                    // find a better way.
                    // $("#annotator").annotator({
                    //     readOnly: true
                    // });
                    if (jQuery17(this).prop("checked")) {
                        jQuery17(".annotation-tags").show();
                        jQuery17(".annotation-tags-header").show();
                        if (jQuery17("#annotator").prop("loaded")) {
                            jQuery17(".annotator-editor").removeAttr('style');
                            jQuery17("span.annotator-hl").removeAttr('style');
                            jQuery17(".annotator-adder").removeAttr('style');
                        } else {
                            loadAnnotator();
                        }
                    } else {
                        jQuery17(".annotator-editor").hide();
                        jQuery17("span.annotator-hl").css("background", "transparent");
                        jQuery17(".annotator-adder").css("visibility", "hidden");
                        jQuery17(".annotation-tags").hide();
                        jQuery17(".annotation-tags-header").hide();
                    }

                });
            } else {
                jQuery17(".activate-annotations").prop("disabled", "true");
            }

            // Load the article, but do not change the URL, so our selected
            // filters aren't moved around when we go to another article
            jQuery17('.annotation-tags a').click(function () {
                $(this).loadArticle(true);
            });

            // Show article comments if we have a comment hash in the url. If
            // we have a special hash ("enableannotation") enable annotations
            // instead.
            if (window.location.hash) {
                if (window.location.hash === "#enableannotations") {
                    jQuery17(".activate-annotations").trigger("click");
                } else {
                    jQuery17(".activate-comments").trigger("click");
                }
            }
            // Changing site title and description in relation to loaded article
            document.title = jQuery17(".article-text.title h2").text();
            $('meta[name="description"]').attr('content',
                jQuery17(".article-text.content-core .description").text());

        });

        // If we are on the first/last article, hide appropriate arrows
        var currIndex = this.attr('data-carousel-index');
        if (currIndex === "0") {
            jQuery17("#article-navigation .prev").hide();
        }
        if (currIndex === LAST_INDEX) {
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
        if(jQuery17("#no-load").length === 0) {
            jQuery17('#' + SLIDER_PREFIX + article_id).loadArticle();
        }

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
                    else {
                        window.scrollTo(0, $(".article-heading").offset().top);
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
            article_id = this.id.replace(SLIDER_PREFIX, "") + document.location.search;
            if (window.history && window.history.pushState) {
                $(this).loadArticle();
                window.history.pushState(null, null, article_id);
            }
            else {
                window.location.href = article_id;
            }
            return false;

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

        jQuery17(document).click(function (event) {
            if (event.isTrigger === undefined) {
                var is_inside = $(event.target).parents(".annotator-editor").length || $(event.target).hasClass("annotator-editor") || $(event.target).parents(".annotator-adder").length || $(event.target).hasClass("annotator-adder");
                if (!is_inside) {
                    // runEffectClose();
                    // jQuery17(".annotator-editor").hide();
                    jQuery17(".annotator-cancel").click();
                }
            }

        });

    });

    // On resizing, set up the elemOnScreen again and move to the selected
    // article page
    jQuery17(window).resize(function () {
        window.elemOnScreen = elementsOnScreen(jQuery17("#article-slider li"));
        slideToPage(jQuery17("#article-slider li.selected"));
    });

});
