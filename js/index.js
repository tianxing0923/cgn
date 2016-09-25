$(function () {
  var sourceArr = [
    'images/arrow.png',
    'images/arrow_left.png',
    'images/arrow_right.png',
    'images/bg1.jpg',
    'images/china.jpg',
    'images/data1.png',
    'images/data2.png',
    'images/data3.png',
    'images/data4.png',
    'images/general.jpg',
    'images/bg1_1.jpg',
    'images/logo.png',
    'images/bg1_2.png',
    'images/map.jpg',
    'images/nuclear.jpg',
    'images/bg1_3.jpg',
    'images/plane.png',
    'images/plane2.png',
    'images/bg2.jpg',
    'images/slogan.png',
    'images/smog1.png',
    'images/bg3.jpg',
    'images/smog2.png',
    'images/symbol.png',
    'images/bg4.jpg',
    'images/text1.png',
    'images/text2.png',
    'images/bg5.jpg',
    'images/text3.png',
    'images/text4.png',
    'images/bg6.jpg',
    'images/text5.png',
    'images/text6.png',
    'images/bg7.jpg',
    'images/text7.png',
    'images/text8.png',
    'images/bg8.jpg'
  ];
  var sourceArr2 = [
    'images/general.jpg',
    'images/logo.png',
    'images/logo2.png',
    'images/map.jpg',
    'images/nuclear.jpg',
    'images/plane.png',
    'images/plane2.png',
    'images/slogan.png',
    'images/smog1.png',
    'images/smog2.png',
    'images/symbol.png',
    'images/text1.png',
    'images/text2.png',
    'images/text3.png',
    'images/text4.png',
    'images/text5.png',
    'images/text6.png',
    'images/text7.png',
    'images/text8.png'
  ];
  new mo.Loader(sourceArr, {
    loadType: 1,
    onLoading: function (count, total) {
      var percentage = parseInt(count / total * 100);
      progress(percentage);
    },
    onComplete: function (time) {
      progress(100);
      var $loading = $('#loading');
      var $wrapper = $('#wrapper');
      $wrapper.html($('#tpl').html());
      $loading.removeClass('active');
      $wrapper.addClass('active');

      setTimeout(function () {
        $loading.addClass('hide');
        initListener();
        setTimeout(function () {
          $wrapper.find('.page1 .arrow').addClass('show');
        }, 1500);
      }, 300);
    }
  });

  function getMedia() {
    return (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) || navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
  }

  var flipTimeout;
  var handTimeout;

  // 进度
  function progress(percentage) {
    $('#load_text').text(percentage + '%');
  }

  // 返回角度
  function getSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
  }

  // 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
  function getSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;

    // 如果滑动距离太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
      return result;
    }
    var angle = getSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
      result = 4;
    } else if (angle >= 45 && angle < 135) {
      result = 1;
    } else if (angle >= -135 && angle < -45) {
      result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    }
    return result;
  }

  // 初始化事件监听
  function initListener() {
    var $container = $('#container');
    var $page1 = $container.find('.page1');
    var $page2 = $container.find('.page2');
    var $page3 = $container.find('.page3');
    var $page4 = $container.find('.page4');
    var $page5 = $container.find('.page5');
    var $page6 = $container.find('.page6');
    var $page7 = $container.find('.page7');
    var $page8 = $container.find('.page8');
    var $page9 = $container.find('.page9');
    var $page10 = $container.find('.page10');


    $page1.on('touchstart', '.arrow', function (e) {
      $(this).removeClass('show');
      $page2.removeClass('hide');
      setTimeout(function () {
        $page2.addClass('active');

        // if (getMedia()) {
        //   getMedia({
        //     audio: true
        //   }, function(stream) {
        //     alert('获取麦克风声音');
        //   }, function() {

        //   });
        // } else {
          setTimeout(function () {
            $page2.removeClass('active');
            setTimeout(function () {
              $page3.removeClass('hide');
              setTimeout(function () {
                $page3.addClass('active');
                setTimeout(function() {
                  $page1.removeClass('active').addClass('hide');
                  $page2.addClass('hide');
                }, 500);
              }, 50);
            }, 500);
          }, 3000);
        // }
      }, 50);
    });

    $page3.on('touchstart', '.plane', function (e) {
      $(this).addClass('flying');
      $page3.find('.light-up').addClass('uping');
      $page3.find('.text').addClass('show');
      setTimeout(function () {
        $page3.find('.arrow').removeClass('hide').addClass('show');
      }, 2000);
    });

    $page3.on('touchstart', '.arrow', function (e) {
      $page3.removeClass('active');
      $page4.removeClass('hide');
      setTimeout(function () {
        $page4.addClass('active');
        setTimeout(function () {
          $page3.addClass('hide');
          setTimeout(function () {
            $page4.find('.arrow').addClass('show');
          }, 1000);
        }, 500);
      }, 50);
    });

    $page4.on('touchstart', '.arrow', function (e) {
      $page4.removeClass('active');
      $page5.removeClass('hide');
      setTimeout(function () {
        $page5.addClass('active');
        setTimeout(function () {
          $page4.addClass('hide');
          $page5.find('.origin .plane').addClass('flying');
          setTimeout(function() {
            $page5.find('.origin .milestone').addClass('show');
          }, 1500);
        }, 500);
      }, 50);
    });

    var flipTimeout;

    $page5.on('touchstart', '.arrow-left, .arrow-right', function (e) {
      var current = $(this).data('current');
      var next = $(this).data('next');

      if (!current) {
        return;
      }

      var $current = $page5.find('.' + current);
      var $next = $page5.find('.' + next);

      $current.removeClass('show');
      $next.removeClass('hide');
      setTimeout(function () {
        $next.addClass('show');
        $next.find('.plane').addClass('flying');
        $current.find('.arrow').removeClass('show');
      }, 50);
      clearTimeout(flipTimeout);
      flipTimeout = setTimeout(function() {
        $current.addClass('hide');
        $next.find('.milestone').addClass('show');
        $current.find('.milestone').removeClass('show');
        $current.find('.plane').removeClass('flying');
        $next.find('.arrow').addClass('show');
      }, 1000);
    });

    $page5.on('touchstart', '.arrow', function (e) {
      $page5.removeClass('active');
      $page6.removeClass('hide');
      setTimeout(function () {
        $page6.addClass('active');
        setTimeout(function () {
          $page5.addClass('hide');
          setTimeout(function () {
            $page6.find('.arrow').addClass('show');
          }, 1000);
        }, 500);
      }, 50);
    });

    $page6.on('touchstart', '.arrow', function (e) {
      $page6.removeClass('active');
      $page7.removeClass('hide');
      setTimeout(function () {
        $page7.addClass('active');
        setTimeout(function () {
          $page6.addClass('hide');
          setTimeout(function () {
            $page7.find('.arrow').addClass('show');
          }, 2500);
        }, 500);
      }, 50);
    });

    $page7.on('touchstart', '.arrow', function (e) {
      $page7.removeClass('active');
      $page8.removeClass('hide');
      setTimeout(function () {
        $page8.addClass('active');
        setTimeout(function () {
          $page7.addClass('hide');
          setTimeout(function () {
            $page8.find('.arrow').addClass('show');
          }, 1000);
        }, 500);
      }, 50);
    });

    $page8.on('touchstart', '.arrow', function (e) {
      $page8.removeClass('active');
      $page9.removeClass('hide');
      var $map_wrap = $page9.find('.map-wrap');
      $map_wrap.scrollTop(300);
      $map_wrap.scrollLeft(1180);
      setTimeout(function () {
        $page9.addClass('active');
        setTimeout(function () {
          $page8.addClass('hide');
          setTimeout(function () {
            $page9.find('.arrow').addClass('show');
          }, 1000);
        }, 500);
      }, 50);
    });

    $page9.on('touchstart', '.shine', function (e) {
      $page9.find('.milestone').removeClass('show');
      var country = $(this).data('country');
      $page9.find('.milestone').filter('.' + country).addClass('show');
    });

    $page9.on('touchstart', '.arrow', function (e) {
      $page9.removeClass('active');
      $page10.removeClass('hide');
      setTimeout(function () {
        $page10.addClass('active');
        setTimeout(function () {
          $page9.addClass('hide');
          setTimeout(function () {
            $page10.find('.arrow').addClass('show');
          }, 1000);
        }, 500);
      }, 50);
    });

    // var $container = $('#container');
    // var startX,
    //     startY,
    //     moveEndX,
    //     moveEndY;

    // $container.on('touchstart', function (e) {
    //     e.preventDefault();
    //     startX = e.changedTouches[0].pageX,
    //     startY = e.changedTouches[0].pageY;
    // });
    // $container.on('touchmove', function (e) {
    //     e.preventDefault();
    //     moveEndX = e.changedTouches[0].pageX;
    //     moveEndY = e.changedTouches[0].pageY;
    // });
    // $container.on('touchend', function (e) {
    //     var $gear_wrap = $('#gear_wrap'),
    //         $gear_progress = $('#gear_progress'),
    //         $oldActive = $container.find('.active'),
    //         $newActive;

    //     var direction = getSlideDirection(startX, startY, moveEndX, moveEndY);
    //     switch (direction) {
    //     case 0:
    //         return;
    //     // 向上、向左
    //     case 1:
    //     case 3:
    //         var next = $oldActive.data('next');
    //         $newActive = $('.' + next);
    //         break;
    //     // 向下、向右
    //     case 2:
    //     case 4:
    //         var prev = $oldActive.data('prev');
    //         if (prev == null || prev == 'null') {
    //             return;
    //         }
    //         $newActive = $('.' + prev);
    //         break;
    //     default:
    //         return;
    //     }

    //     clearTimeout(flipTimeout);
    //     clearTimeout(handTimeout);

    //     var isDoor = $oldActive.data('door');
    //     if (isDoor) {
    //         var $door = $oldActive.find('.door');
    //         switch (direction) {
    //         // 向上
    //         case 1:
    //             $door.css('top', '-15%');
    //             break;
    //         // 向下
    //         case 2:
    //             $door.css('top', '49%');
    //             break;
    //         // 向左
    //         case 3:
    //             $door.css('left', '-34%');
    //             break;
    //         // 向右
    //         case 4:
    //             $door.css('left', '36%');
    //             break;
    //         }
    //         setTimeout(function () {
    //             flipPage($oldActive, $newActive, $gear_wrap, $gear_progress);
    //         }, 500);
    //     } else {
    //         flipPage($oldActive, $newActive, $gear_wrap, $gear_progress);
    //     }
    // });
  }

  // 翻页
  // function flipPage($oldActive, $newActive, $gear_wrap, $gear_progress) {
  //     if (!$oldActive.hasClass('end')) {
  //         $gear_wrap.removeClass('pause');
  //     }
  //     $oldActive.removeClass('active');
  //     $newActive.removeClass('hide');
  //     $('#wrapper').find('.hand').removeClass('moving press');
  //     $('#wrapper').find('.arrow').removeClass('show');

  //     $('#milestone').text($newActive.data('year') || '');
  //     var left = $newActive.data('left');
  //     if (left) {
  //         $gear_progress.css('margin-left', left);
  //     }

  //     flipTimeout = setTimeout(function () {
  //         $gear_wrap.addClass('pause');
  //         $oldActive.addClass('hide');
  //         $newActive.addClass('active');
  //         $('#container').find('.door').removeAttr('style');
  //         handTimeout = setTimeout(function () {
  //             $newActive.find('.hand').addClass('moving');
  //             $newActive.find('.arrow').addClass('show');
  //         }, 1000);
  //     }, 500);
  // }
});