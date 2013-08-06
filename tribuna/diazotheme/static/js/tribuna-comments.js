jQuery17(document).ready(function () {

     /**********************************************************************
     * If the user hits the "reply" button of an existing comment, create a
     * reply form right beneath this comment.
     **********************************************************************/
    $(".reply-to-comment-button").bind("click", function (e) {
        var comment_div = $(this).parents().filter(".comment");
        $.createReplyForm(comment_div);
        $.clearForm(comment_div);
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
        $(".twitter-share").show();
        $(".facebook-share").show();
        $(".context.reply-to-comment-button.allowMultiSubmit").show();
        $(".comment ul").css('visibility', 'visible');
      },
      function () {
        $(".twitter-share").hide();
        $(".facebook-share").hide();
        $(".context.reply-to-comment-button.allowMultiSubmit").hide();
        $(".comment ul").css('visibility', 'hidden');
      }
    );

});