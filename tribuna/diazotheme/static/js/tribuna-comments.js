$(document).ready(function () {
    "use strict";

     /**********************************************************************
     * If the user hits the "reply" button of an existing comment, create a
     * reply form right beneath this comment.
     **********************************************************************/

    function deleteAllForms(){
        $('.reply').each(function(index){
            if(index > 0){
                $(this).slideUp("slow", function() {
                    $(this).remove();
                });
            }
        });
    }

    $(".reply-to-comment-button").bind("click", function (e) {
        var comment_div = $(this).parents().filter(".comment");
        deleteAllForms();
        $.createReplyForm(comment_div);
        $.clearForm(comment_div);

        var varID = comment_div.attr('id');
        var varItem = $('#' + varID + ' .reply fieldset form div').children('textarea#form-widgets-subject');
        varItem.attr('id', varItem.attr('id') + varID);
        $('#form-widgets-subject' + varID).data('klass', 'token-input-widget list-field');

        var JsonSubjects = portal_url + '/json-subjects';
        keywordTokenInputActivate('form-widgets-subject' + varID, JsonSubjects, []);

        // Remove the extra input that is added automatically
        $($('#' + varID + ' .reply fieldset form ul.token-input-list-facebook')[0]).remove();
    });


    /**********************************************************************
     * If the user hits the "clear" button of an open reply-to-comment form,
     * remove the form and show the "reply" button again.
     **********************************************************************/
    $("#commenting #form-buttons-cancel").bind("click", function (e) {
        e.preventDefault();
        var reply_to_comment_button = $(this).
                                          parents().
                                          filter(".comment").
                                          find(".reply-to-comment-button");

        /* Find the reply-to-comment form and hide and remove it again. */
        $.reply_to_comment_form = $(this).parents().filter(".reply");
        $.reply_to_comment_form.slideUp("slow", function () {
            $(this).remove();
        });

        /* Show the reply-to-comment button again. */
        reply_to_comment_button.css("display", "inline");

    });


    /**********************************************************************
     * By default, hide the reply and the cancel button for the regular add
     * comment form.
     **********************************************************************/
    $(".reply").find("input[name='form.buttons.reply']")
                .css("display", "none");
    $(".reply").find("input[name='form.buttons.cancel']")
                .css("display", "none");


    /**********************************************************************
     * By default, show the reply button only when Javascript is enabled.
     * Otherwise hide it, since the reply functions only work with JS
     * enabled.
     **********************************************************************/
    $(".reply-to-comment-button").css("display" , "none");

    $(".comment").hover(
      function () {
        $("#" + $(this).attr("id") + " .twitter-share").show();
        $("#" + $(this).attr("id") + " .facebook-share").show();
        $("#" + $(this).attr("id") + " .context.reply-to-comment-button.allowMultiSubmit").show();
        $("#" + $(this).attr("id") + "  ul").css('visibility', 'visible');
      },
      function () {
        $("#" + $(this).attr("id") + " .twitter-share").hide();
        $("#" + $(this).attr("id") + " .facebook-share").hide();
        $("#" + $(this).attr("id") + " .context.reply-to-comment-button.allowMultiSubmit").hide();
        $("#" + $(this).attr("id") + "  ul").css('visibility', 'hidden');
      }
    );

    window.location.href = window.location.hash;
});
