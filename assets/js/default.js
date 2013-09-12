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

    return noErrors;
  });

  $('header a, a.advance, a.arrow').on('click', function() {
    $('html, body').animate({
      scrollTop: $( $(this).attr('href')).offset().top
    }, 500, 'easeInOutCubic');
    return false;
  })
});

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g,"");
}

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