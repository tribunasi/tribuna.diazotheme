/* Author:

*/

jQuery17(function () {
    "use strict";

    $(document).ready(function () {
        $('.field.error').each(function (idx, el) {
            if ($.trim($(el).text()) == '') {
                $(el).remove();
            }
        });
        jQuery17('.dropdown-toggle').click(function () {
            var self = $(this).parent();
            $('.dropdown.open').each(function (idx, item) {
                if ($(item)[0] != self[0]) {
                    $(item).removeClass('open');
                }
            })
        });

        jQuery17('.carousel').carousel();

    });

    // $(window).load( function() {
    //     setTimeout(function() {
    //         // Crappy monkey fix that we will change ASAP
    //         $('#form-widgets-IBodyText-text_parent').attr('id', 'blablakrentagtosmjst');
    //         $('#blablakrentagtosmjst').attr('style', 'display: block');
    //         $('#form-widgets-IBodyText-text_parent').remove();
    //         $('#blablakrentagtosmjst').attr('id', 'form-widgets-IBodyText-text_parent');
    //     }, 500);

    // })


})
