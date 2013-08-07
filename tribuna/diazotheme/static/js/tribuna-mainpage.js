jQuery(function () {
    'use strict';

    var slider = jQuery('#article-slider'),
        article_id,
        article_uid,
        article_url,
        selected_article,
        comments,
        comments_form,
        comments_url;

    function processComment(comments_url) {
        comments_form = $("#commenting form");
        var options = {
            data: comments_form.serialize(),
            success:function() {
                comments_form.parent().load(comments_url);
            }
        };
        comments_form.ajaxForm(options);
    }

    //jQuery('.activate-comments').click(function () {
    function loadComments(article_uid) {
        comments = jQuery('#comments-' + article_uid);
        comments_url = comments.attr('data-url');
        comments.load(comments_url);
        processComment(comments_url);
    }

    jQuery('#article-slider li').click(function () {
        jQuery(this).addClass('selected');
        article_id = jQuery(this).attr('id');
        article_uid = jQuery(this).attr('data-uid');
        article_url = 'Tribuna/get-article?id=' + article_id;
        jQuery('#main').load(article_url + " #article", function () {
            loadComments(article_uid);
        });

        jQuery("#article-slider li").not(this).each(function(){
            $(this).removeClass('selected');
        });
    });

    jQuery(document).ready(function () {
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
        article_id = jQuery.url().param('article');
        selected_article = jQuery('#' + article_id);
        slider.trigger('slideTo', selected_article);
        selected_article.trigger('click');

        $('#ajax-spinner')
            .ajaxStart(function() {
                $(this).show();
            })
            .ajaxStop(function() {
                $(this).hide();
            });
    });

});
