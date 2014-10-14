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

    //

    var phone = $('input#phone').val().trim();
    if (noErrors) {
      if (phone == masterNum) {
        $('form#contactUs').attr('action', 'http://forms.grok-interactive.com/forms/81a98a41-0840-49ee-98f9-8f3abddb7462/submissions');
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

    if($(this).hasClass('work')) {
      $('div.monitor .work').first().animate({opacity:1}, 500, function() {
        $(this).addClass('active');
      });
      $('div.description .work').first().animate({opacity:1}, 500, function() {
        $(this).addClass('active');
      });
    } else {
      $('div.monitor .active').animate({opacity:0}, 500, function() {
        $(this).removeClass('active');
      });
      $('div.description .active').animate({opacity:0}, 500, function() {
        $(this).removeClass('active');
      });
    }

  });

  var preventAdvance = false;
  $('a.directional').on('click', function() {
    if (preventAdvance) return false;
    preventAdvance = true;
    if ($(this).hasClass('left')) {
      var next = ($('div.monitor .work.active').prev()[0] != undefined) ? $('div.monitor .work.active').prev()[0] : $('div.monitor .work').last()[0];
    } else {
      var next = ($('div.monitor .work.active').next()[0] != undefined) ? $('div.monitor .work.active').next()[0] : $('div.monitor .work').first()[0];
    }
    var rel = $(next).attr('rel');
    // Animate the text
    $('div.description .work.active').animate({opacity:0}, 300, function() {
      $('div.description .work.'+rel).animate({opacity:1}, 300, function() {
        $(this).addClass('active');
      });
      $(this).removeClass('active');
    });
    // Animate the screen
    $('div.monitor .work.active').animate({opacity:0}, 500, function() {
      $(next).animate({opacity:1},500, function() {
        $(this).addClass('active');
        preventAdvance = false;
      });
      $(this).removeClass('active');
    });
    return false;
  });

  var leftNum = Math.floor(Math.random(1)*10)+1;
  var rightNum = Math.floor(Math.random(1)*10)+1;
  $('input#phone').attr('placeholder','Human Test: ' + leftNum + ' + ' + rightNum + ' = ??? ');
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