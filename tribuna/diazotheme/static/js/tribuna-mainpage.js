jQuery17(function () {
    'use strict';

    var slider = jQuery17('#article-slider'),
        article_id,
        article_uid,
        article_url,
        selected_article,
        comments,
        comments_form,
        comments_url;

    function processComment(comments_url) {
        comments_form = jQuery17("#commenting form");
        var options = {
            data: comments_form.serialize(),
            success:function() {
                comments_form.parent().load(comments_url);
            }
        };
        comments_form.ajaxForm(options);
    }

    //jQuery17('.activate-comments').click(function () {
    function loadComments(article_uid) {
        comments = jQuery17('#comments-' + article_uid);
        comments_url = comments.attr('data-url');
        comments.load(comments_url);
        //processComment(comments_url);
    }

    jQuery17('#article-slider li').click(function () {
        var $this = jQuery17(this);
        $this.addClass('selected');
        article_id = $this.attr('id');
        article_uid = $this.attr('data-uid');
        article_url = 'Tribuna/get-article?id=' + article_id;
        jQuery17('#main').load(article_url + " #article", function () {
            loadComments(article_uid);
        });

        jQuery17("#article-slider li").not(this).each(function() {
            jQuery17(this).removeClass('selected');
        });
    });

    jQuery17(document).ready(function () {
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
        article_id = jQuery17.url().param('article');
        selected_article = jQuery17('#' + article_id);
        slider.trigger('slideTo', selected_article);
        selected_article.trigger('click');

        jQuery17('#ajax-spinner')
            .ajaxStart(function() {
                jQuery17(this).show();
            })
            .ajaxStop(function() {
                jQuery17(this).hide();
            });
    });

});
