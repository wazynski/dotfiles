var barebones = {};

/**
 * map.contactMap();
 * Description: Load google maps.
 */
barebones.map = () => {
  if ($('#map').length > 0) {
    var locations = $('#map').data('locations');

    var LatLngList = [];

    var bounds = new google.maps.LatLngBounds();

    var marker;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 1,
      center: LatLngList[0],
      zoomControl: true,
      scaleControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      scaleControl: false,
      fullscreenControl: false,
    });

    $.each(locations, function(i, val) {
      LatLngList.push(new google.maps.LatLng(val.lat, val.lng));

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(val.lat, val.lng),
        map: map,
        icon:
          'http://localhost:8888/storageworld/wp-content/themes/storageworld-theme/assets/images/marker.png',
        //url: val.url
      });

      // google.maps.event.addListener(marker, 'click', function() {
      //   window.location.href = this.url;
      // });

      var boxText = document.createElement('div');
      boxText.style.cssText =
        "font-size: 18px; background: #FCD600; padding: 6px; font-family: 'nimbus-sans'; line-height: 1.2; font-weight: 700; text-align: center;";
      boxText.innerHTML = val.title;

      var infoBoxOptions = {
        alignBottom: true,
        content: boxText,
        disableAutoPan: false,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(-90, 40),
        zIndex: null,
        boxStyle: {
          width: '180px',
        },
        closeBoxURL: '',
        infoBoxClearance: new google.maps.Size(1, 1),
        visible: true,
        pane: 'floatPane',
        enableEventPropagation: false,
      };

      var ib = new InfoBox(infoBoxOptions);
      ib.open(map, marker);

      bounds.extend(LatLngList[i]);
    });

    map.fitBounds(bounds);

    $(window).on('resize', () => {
      map.fitBounds(bounds);
    });
  }
};

barebones.blogFilter = () => {
  if ($('#filter').length > 0) {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var cat = url.searchParams.get('category');

    $('#filter .checkbox').on('change', function() {
      $('.lds-ellipsis').addClass('active');
      var filter = $('#filter');
      $.ajax({
        url: filter.attr('action'),
        data: filter.serialize(), // form data
        type: filter.attr('method'), // POST
        success: function(data) {
          $('#response').html(data); // insert data
          $('.lds-ellipsis').removeClass('active');
        },
      });
      return false;
    });

    if (cat != null) {
      $('#cat-' + cat)
        .prop('checked', true)
        .trigger('change');
    }
  }
};

barebones.pagination = () => {
  if ($('#pagination-form-initial').length > 0) {
    $('#pagination-form-initial a').on('click', function(e) {
      e.preventDefault();
      $(window).scrollTo($('.main'), 0, {
        offset: -$('.header').height(),
      });

      var pagedParam = this.href.match(/page\/\d*/g);
      var paged = pagedParam[0].split('/')[1];
      var paginate = $('#pagination-form-initial');
      var data = paginate.serialize();
      data += '&paged=' + paged;

      $.ajax({
        url: paginate.attr('action'),
        data: data, // form data
        type: paginate.attr('method'), // POST
        success: function(data) {
          $('#response').html(data); // insert data
        },
      });
      return false;
    });
  }
};

barebones.slider = () => {
  if ($('.slider--slider').length > 0) {
    var current;

    $('.slider--slider').flickity({
      cellAlign: 'center',
      pageDots: false,
      adaptiveHeight: true,
      setGallerySize: false,
      arrowShape: '',
      on: {
        scroll: function() {
          if (current) current.removeClass('btn-fade');
          if (current) current.removeClass('btn-active');
          current = $('.is-selected').addClass('btn-active');
        },
        settle: function() {
          current.addClass('btn-fade');
        },
      },
    });
  }
};

/* ==========================================================================
  Document Load
  ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  barebones.map();
  barebones.blogFilter();
  barebones.pagination();
  barebones.slider();

  var $duration = 250;

  $('.faq').on('click', function() {
    // if ($(this).hasClass('active')) {
    //   toggleFaq(this);
    // } else {
    //   toggleFaq(this, CSSSupportsRule);
    // }
  });

  var $faqs = $('.faq');
  var $container = $('.faq--grid');
  var tallest = $faqs
    .first()
    .find('.question')
    .height();
  var containerHeight;
  var faqOpen = false;
  var margin = 16;
  var questionPadding = 32;

  function getTallest() {
    $faqs.each(function() {
      var question = $(this).find('.question');
      var answerWrapper = $(this).find('.answer--wrapper');
      var answer = $(this).find('.answer');

      // get first question section and then find the tallest and set all to be this height;
      var height = question.height();
      if (height > tallest) {
        tallest = height;
      }
    });
    console.log(tallest);
  }

  function setAnswerHeights() {
    $faqs.each(function() {
      var $this = $(this);
      var answerWrapper = $(this).find('.answer--wrapper');
      var answer = $(this).find('.answer');

      // set data attr of the answer height to the faq based on being a number of question heights
      var height = answerWrapper.height();
      var tallestWithPadding = tallest + questionPadding;

      var heightInBlocks = Math.ceil(height / (tallestWithPadding + margin));

      var niceHeight = (tallestWithPadding + margin) * heightInBlocks;

      $this.attr('data-answerheight', niceHeight);

      // set answer wrapper height to 0
      answerWrapper.height(0);
      answer.hide();
      answer.css('opacity', 0);
    });
  }

  function faqInit() {
    console.log('init');

    // $container.css('opacity', 0);

    getTallest();
    setAnswerHeights();

    $faqs.find('.question').height(tallest);

    containerHeight = $container.height();

    $('.faq').on('click', function() {
      getPosition(this);
    });
  }

  function getPosition(faq) {
    var $faq = $(faq);
    var position = $faq.position();
    var height = $faq.outerHeight(true);
    var fullheight = height + $faq.data('answerheight');

    // console.log(position);
    // console.log(height);
    // console.log(fullheight);
    // console.log(containerHeight);

    if (position.top + height == containerHeight) {
      // console.log('a');
      toggleFaq(faq, 'bottom');
    } else if (
      position.top + fullheight > containerHeight &&
      fullheight < containerHeight
    ) {
      var positionBottom = position.top + (height - margin);
      var calculatedBottom = containerHeight - positionBottom;
      toggleFaq(faq, calculatedBottom);
    } else if (fullheight > containerHeight) {
      toggleFaq(faq, 0);
    } else {
      toggleFaq(faq, false);
      // console.log('c');
    }
  }

  function toggleFaq(faq, position) {
    if (faqOpen == faq) {
      // console.log('a1');
      closeFaq(faqOpen, position, false);
    } else if (faqOpen) {
      // console.log('a2');
      closeFaq(faqOpen, position, faq);
    } else {
      // console.log('a3');
      openFaq(faq, position, false);
    }
  }

  function openFaq(faq, position) {
    console.log('open position ' + position);

    var $faq = $(faq);
    var inner = $faq.find('.faq--inner');

    // use position to choose opening direction
    if (position === 'bottom') {
      inner.css('bottom', margin + 'px');
      animateOpen(faq);
    } else if ($.isNumeric(position)) {
      if (position === 0) {
        inner.css('top', 0);
        var transform = inner.position().top;

        inner.transition({ translateY: '-' + transform + 'px' });
        animateOpen(faq);
      } else {
        inner.css('bottom', position + 'px');
        animateOpen(faq);
      }
    } else {
      animateOpen(faq);
    }
  }

  function animateOpen(faq) {
    var $faq = $(faq);
    var inner = $faq.find('.faq--inner');

    var answerWrapper = $faq.find('.answer--wrapper');
    var answer = $faq.find('.answer');
    var answerHeight = $faq.data('answerheight');
    // get width so it doesn't expand and set inner to absolute
    var width = $faq.width();
    inner.width(width).css('position', 'absolute');

    if (answerHeight + tallest > containerHeight) {
      answerHeight = containerHeight - margin - tallest - questionPadding;
    }

    // set colours with css class
    $faq.addClass('active');
    // Animate wrapper height then fade in answer
    answerWrapper.animate(
      { height: answerHeight + 'px' },
      $duration,
      'linear',
      () => {
        answer.show();
        answer.animate({ opacity: 1 }, $duration, 'linear', () => {
          faqOpen = faq;
        });
      }
    );
  }

  function closeFaq(faq, position, newFaq) {
    console.log('closing position ' + position);

    var $faq = $(faq);
    var inner = $faq.find('.faq--inner');
    var answerWrapper = $faq.find('.answer--wrapper');
    var answer = $faq.find('.answer');
    // var answerHeight = $faq.data('answerheight');

    // if (position == 'bottom') {
    //   inner.css('bottom', margin + 'px');
    // } else if (position == 'odd') {
    //   console.log('figure it out');
    // }

    answer.animate({ opacity: 0 }, $duration, 'linear', () => {
      answer.hide();
      answerWrapper.animate({ height: 0 }, $duration, 'linear', () => {
        $faq.removeClass('active');
        inner.width('auto').css('position', 'static');

        if (newFaq) {
          openFaq(newFaq, position);
        }

        faqOpen = false;
      });
    });
  }

  function faqDestroy() {}

  faqInit();

  // function openFaq(faq) {
  //   console.log('open');
  //   calculatePosition(faq);
  //   $(faq).addClass('active');
  //
  //   var width = $(faq).width();
  //   $(faq)
  //     .find('.faq--inner')
  //     .width(width);
  //
  //   $(faq).find('.answer--wrapper');
  //
  //   $(faq)
  //     .find('.answer--wrapper')
  //     .show()
  //     .css('max-height', $('.faq--grid').height());
  //
  //   $('.answer').show();
  //
  //   setTimeout(() => {
  //     $(faq)
  //       .find('.answer')
  //       .addClass('active');
  //   }, $duration);
  // }
  //
  // function toggleFaq(faq, open) {
  //   console.log('close');
  //   if ($('.faq.active').length > 0) {
  //     $('.answer').removeClass('active');
  //
  //     setTimeout(() => {
  //       $('.answer--wrapper').css('max-height', 0);
  //
  //       setTimeout(() => {
  //         $('.answer').hide();
  //         $('.answer--wrapper').hide();
  //         $('.faq').removeClass('active');
  //         $('.faq--inner').width('auto');
  //
  //         if (open) {
  //           openFaq(faq);
  //         }
  //       }, $duration);
  //     }, $duration);
  //   } else if (open) {
  //     openFaq(faq);
  //   }
  // }
  //
  // function calculatePosition(faq) {
  //   var position = $(faq).position();
  //   var height = $(faq).outerHeight(true);
  //   var containerHeight = $('.faq--grid').outerHeight(true);
  //   var fullHeight;
  //
  //   $(faq)
  //     .find('.answer--wrapper')
  //     .show()
  //     .css('max-height', $('.faq--grid').height());
  //
  //   setTimeout(() => {
  //     fullHeight = $(faq).outerHeight(true);
  //
  //     console.log('-------');
  //     console.log(position);
  //     console.log(height);
  //     console.log('container ' + containerHeight);
  //     console.log(height + position.top);
  //     console.log('fullHeight: ' + fullHeight);
  //     console.log(fullHeight + position.top);
  //     console.log('-------');
  //
  //     if (position.top + height == containerHeight) {
  //       //at bottom fix to bottom and open upwards.
  //       console.log('A');
  //       $(faq)
  //         .find('.faq--inner')
  //         .css('bottom', 0);
  //     } else if (position.top + fullHeight >= containerHeight) {
  //       console.log('B');
  //     }
  //   }, $duration);
  // }
});

/* ==========================================================================
  Window Load
  ========================================================================== */

window.onload = () => {};
