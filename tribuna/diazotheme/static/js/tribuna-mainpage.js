jQuery(function () {
    'use strict';

    var slider = jQuery('#article-slider'),
        article_id,
        target,
        url;

    jQuery(document).ready(function () {
        slider.carouFredSel({
            circular: false,
            infinite: false,
            responsive: true,
            width: '100%',
            items: {
                width: 200,
                height: 60,
                visible: {
                    min: 2,
                    max: 6
                }
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
        target = jQuery('#' + article_id);
        slider.trigger('slideTo', target);
        target.trigger('click');

        $('#ajax-spinner')
            .ajaxStart(function() {
                $(this).show();
            })
            .ajaxStop(function() {
                $(this).hide();
            });

    });

    jQuery('#article-slider li').click(function () {
        jQuery(this).addClass('selected');
        article_id = jQuery(this).attr('id');
        url = 'Tribuna/get-article?id=' + article_id;
        jQuery('#main').load(url + " #article");
        jQuery("#article-slider li").not(this).each(function(){
            $(this).removeClass('selected');
        });
    });

});
