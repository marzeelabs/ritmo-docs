$(function() {

  var breakMobile = 730, // viewport px breakpoint

      waitForScroll = false,

      triggerHashChange = function() {
        $( window ).trigger('hashchange');
      },

  scrollToSection = function() {

    var $sectionElement = $("section" + location.hash + '-section');

    if ($sectionElement.length) {

      waitForScroll = true;

      // We can't use $(".navigation").outerHeight() because
      // we'd need to wait for the CSS animation to finish.
      $("html, body").stop().animate({
        scrollTop: $sectionElement.scrollTop() + $sectionElement.offset().top ,
      }, 500, function() {
        waitForScroll = false;
      });
    }
  },

  fixedHeader = function() {
    var viewportWidth = $( window ).width(),
        fixedClass = 'navigation--fixed-top',
        $navElement = $(".navigation");

    if ($(window).scrollTop() > '1' && viewportWidth >= breakMobile) {
      $navElement.addClass(fixedClass);
    } else {
      $navElement.removeClass(fixedClass);
    }
  };

  // Toggle mobile navigation
  $(".navigation__mobile-menu__toggle").click(function() {
    $(this).parent().toggleClass('is-open');
  });

 // Force close mobile navigation when clicking anywhere (except the toggle button itself)
  $( document ).on('mousedown touchstart', function(event) {

    var selectorElement = '.navigation li a',
        targetElement = '.navigation__menu__item';

    $(selectorElement).on('click touch', function() {
      $(".navigation.is-open").removeClass('is-open');
    });

    // Force close mobile navigation when clicking anywhere (except the toggle button itself)
    if (!$(event.target).closest(".navigation").length) {
      $(".navigation.is-open").removeClass('is-open');
    }
  });


  function gridDemo() {
    //$(".demo-text__grid").hide();

    $("#show_hide_grid").click(function(){
      $(".demo-text__grid").toggleClass('show-grid hide-grid');
    });
  };


  gridDemo();
  $(window).on('resize scroll', fixedHeader);
  $( window ).on('hashchange', scrollToSection).trigger('hashchange');
  $("a[href^='/#']").click(triggerHashChange);

});
