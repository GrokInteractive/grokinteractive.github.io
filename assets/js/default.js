var masterNum = 0;
$(function() {
  $('form#contactUs').submit(function(e) {
    clearFormErrors();
    var noErrors = true;

    var fullName = $('input#full_name').val().trim();
    if (fullName == "") {
      noErrors = false;
      setFormError('full_name', 'You must include a valid contact name.');
    }

    var email = $('input#email').val().trim();
    if (/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email) == false) {
      noErrors = false;
      setFormError('email', 'You must include a valid contact email.');
    }

    var message = $('textarea#message').val().trim();
    if (message == "") {
      noErrors = false;
      setFormError('message', 'You must include a valid message of some kind.');
    }

    var phone = $('input#phone').val().trim();
    if (noErrors) {
      // Check phone against masterNum to turn captcha back on
      if (phone == '') {
        $('form#contactUs').attr('action', 'https://www.elformo.com/forms/f26b8214-3141-4d6f-8026-b810620d9210');
      } else {
        noErrors = false;
      }
    }

    return noErrors;
  });

  $('header a, a.advance, a.arrow').on('click', function() {
    $('html, body').animate({
      scrollTop: $( $(this).attr('href')).offset().top
    }, 500, 'easeInOutCubic');
    return false;
  });

  // Do something based on which area we are in
  $('ul.nav li').on('activate', function() {
    // If we are at service, animate the icons
    if($(this).hasClass('service')) {
      $('img.development.inverted').animate({opacity:1}, 300, function() {
        $('img.architecture.inverted').animate({opacity:1}, 300, function() {
          $('img.prototyping.inverted').animate({opacity:1}, 300, function() {
            $('img.iterative.inverted').animate({opacity:1}, 300, function() {
              $(this).animate({opacity:0}, 800);
            });
            $(this).animate({opacity:0}, 800);
          });
          $(this).animate({opacity:0}, 800);
        });
        $(this).animate({opacity:0}, 800);
      });
    }
  });

  // On click client, make it active and show it
  $('.client').on('click', function() {
    // Make all the buttons inactive
    $('.client').removeClass('active');
    // Make this button active
    $(this).addClass('active');
    // Hide all other case studies
    $('.case-study').hide();
    // Make sure we have a case study
    var id = $(this).data('id');
    if (id) {
      // Show it.
      $(id).show();
      // Move the screen to it.
      window.scrollTo(0, $("#work").offset()['top']);
    }
  });

  var leftNum = Math.floor(Math.random(1)*10)+1;
  var rightNum = Math.floor(Math.random(1)*10)+1;
  $('input#phone').attr('placeholder','Human Test: ' + leftNum + ' + ' + rightNum + ' = ??? ');
  // Remove CSS below to turn captcha back on
  $('input#phone').css({
    'visibility': 'hidden',
    'position': 'absolute',
    'left': 0
  });
  masterNum = leftNum + rightNum;
});

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g,"");
};

function setFormError(field, error) {
  $("label[for="+field+"]").addClass('error');
  $("#"+field).attr("placeholder", error);
  $("#"+field).addClass('error');
}

function clearFormErrors() {
  $("label").removeClass('error');
  $("input").removeClass('error');
  $("textarea").removeClass('error');
}
