$(document).ready(function() {

    // Generate and show response
    $('.option-one').text($('.messages .message.active .response').data('response-one'));
    $('.option-two').text($('.messages .message.active .response').data('response-two'));

    // First message to appear
    $('.messages .message.active .question').text($('.messages').data('opening-message'));

    $('.options a').click(function(){

        message_delay = 1000;
        active_response = $('.messages .message.active .response');
        active_message = $('.messages .message.active .question');

        // Remove options
        $('.options').css('bottom', '-100');

        // Update reply with option clicked
        if ($(this).hasClass('option-one')) {
            message = active_message.data('message-one');
            response = active_response.data('response-one');
            setTimeout(function(){$('.option-two').hide();}, message_delay);  
        } else {
            message = active_message.data('message-two');
            response = active_response.data('response-two');
            setTimeout(function(){$('.option-one').hide();}, message_delay);  
        }
        active_response.text(response);
        active_response.show();


        // Show next message and current question is asked
        $('.messages .message.active').next().addClass('active');
        $('.messages .message.active:first').removeClass('active').addClass('asked');

        $('.messages .message.active .question').hide();
        setTimeout(function(){
            $('.messages .message.active .question').show();
        }, message_delay);        
        $('.messages .message.active .question').text('...').addClass('loading');

        // Once response has loaded, do this
        setTimeout(function(){
            $('.messages .message.active .question').text(message).removeClass('loading');

            page_bottom = $(document).height();

            $('html, body').animate({
                scrollTop: page_bottom
            }, 500);

            // Update reply options
            $('.options').css('bottom', '10');
            $('.option-one').text($('.messages .message.active .response').data('response-one'));
            $('.option-two').text($('.messages .message.active .response').data('response-two'));

            // If only one option, assume it's the last question
            if ($('.option-two').text() == '') {
                $('.option-two').hide();
            }

            // if all questions asked, hide responses
            if ($('.messages .message.asked').length == $('.messages .message').length) {
                $('.options').hide();
            }
        }, message_delay * 4);
    });
});
