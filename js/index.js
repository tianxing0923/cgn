$(function () {
  var sourceArr = [
    'images/arrow.png',
    'images/arrow_left.png',
    'images/arrow_right.png',
    'images/bg1.jpg',
    // 'images/china.jpg',
    'images/data1.png',
    'images/data2.png',
    'images/data3.png',
    'images/data4.png',
    // 'images/general.jpg',
    'images/bg1_1.jpg',
    'images/logo.png',
    'images/bg1_2.png',
    'images/map.jpg',
    'images/nuclear.jpg',
    // 'images/bg1_3.jpg',
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

      var $audio = $('#audio');
      var audio = $audio[0];
      audio.src = 'res/bgm.m4a';
      audio.play();

      setTimeout(function () {
        $loading.addClass('hide');
        initListener();
        setTimeout(function () {
          $wrapper.find('.page1 .arrow').addClass('show');
        }, 1500);
      }, 300);
    }
  });

  AV.init({
    appId: 'w6l5vcDulMVOiMFpAmcN7F6c-gzGzoHsz',
    appKey: 'zSFjcsytxCy0l9HkrXFLe1xQ'
  });

  // 获取计数
  function getCount(options) {
    var Counter = AV.Object.extend('Counter');
    var query = new AV.Query(Counter);
    query.equalTo('url', options.url);
    query.find({
      success: function (results) {
        options.success(results);
      },
      error: function (error) {
        console && console.log('Error:' + error.code + ' ' + error.message);
      }
    });
  }

  // 添加计数
  function addCount(options) {
    var Counter = AV.Object.extend('Counter');
    if (options.counter) {
      options.counter.increment('read', parseInt(Math.random() * 20));
      options.counter.increment('realread', 1);
      options.counter.save();
    } else if (options.isInit) {
      var newcounter = new Counter();
      newcounter.set('title', options.title);
      newcounter.set('url', options.url);
      newcounter.set('read', 1);
      newcounter.set('realread', 1);
      newcounter.save();
    } else {
      var query = new AV.Query(Counter);
      query.equalTo('url', options.url);
      query.find({
        success: function (results) {
          if (results.length > 0) {
            var counter = results[0];
            counter.increment('read', parseInt(Math.random() * 20));
            counter.increment('realread', 1);
            counter.save();
          } else {
            var newcounter = new Counter();
            newcounter.set('title', options.title);
            newcounter.set('url', options.url);
            newcounter.set('read', parseInt(Math.random() * 20));
            newcounter.set('realread', 1);
            newcounter.save();
          }
        },
        error: function (error) {
          console && console.log('Error:' + error.code + ' ' + error.message);
        }
      });
    }
  }

  var STATISTICS = {
    title: '中广核，一次把事情做好',
    url: 'http://www.phboy.com/cgn/'
  };

  var COUNT = 0;

  getCount({
    url: STATISTICS.url,
    success: function (results) {
      if (results.length !== 0) {
        var counter = results[0];
        COUNT = counter.get('read');

        // 增加阅读量
        addCount({
          counter: counter
        });
      } else {
        addCount({
          title: STATISTICS.title,
          url: STATISTICS.url,
          isInit: true
        });
      }
    }
  });

  var flipTimeout;
  var arrowTimeout;

  var $container;
  var $page1;
  var $page2;
  var $page3;
  var $page4;
  var $page5;
  var $page6;
  var $page7;
  var $page8;
  var $page9;
  var $page10;
  var $page11;

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
    $container = $('#container');
    $page1 = $container.find('.page1');
    $page2 = $container.find('.page2');
    $page3 = $container.find('.page3');
    $page4 = $container.find('.page4');
    $page5 = $container.find('.page5');
    $page6 = $container.find('.page6');
    $page7 = $container.find('.page7');
    $page8 = $container.find('.page8');
    $page9 = $container.find('.page9');
    $page10 = $container.find('.page10');
    $page11 = $container.find('.page11');

    var $audio = $('#audio');
    var $music = $('#music');
    var audio = $audio[0];

        // 播放背景音乐
        $audio.on('play', function (e) {
            $music.addClass('playing')
        });
        $audio.on('pause', function (e) {
            $music.removeClass('playing')
        });
        $music.on('touchstart', function (e) {
            $music.hasClass('playing') ? audio.pause() : audio.play();
        });

    $page3.on('touchstart', '.plane', function (e) {
      $(this).addClass('flying');
      $page3.find('.light-up').addClass('uping');
      $page3.find('.text').addClass('show');
      setTimeout(function () {
        var options = {  
          useEasing: true,
            useGrouping: true,
            separator: '',
            decimal: '',
            prefix: '',
            suffix: ''
        };
        var countup = new CountUp('countup', 0, COUNT, 0, 2.5, options);
        countup.start();
      }, 500);
      setTimeout(function () {
        $page3.find('.arrow').addClass('show');
      }, 2000);
    });

    $page5.on('touchstart', '.plane', function (e) {
      var $milestone_page = $container.find('.active').find('.milestone-page.show');
      var milestonePrev = $milestone_page.data('prev');
      var milestoneNext = $milestone_page.data('next');
      if (milestoneNext != null && milestoneNext != 'null') {
        showMilestonePage[milestoneNext]();
      }
    });

    $page9.on('touchstart', '.shine', function (e) {
      $page9.find('.milestone').removeClass('show');
      var country = $(this).data('country');
      $page9.find('.milestone').filter('.' + country).addClass('show');
    });

    $page9.on('touchstart', '.arrow', function (e) {
      flipPage('page8', 'page10', $page9, $page10);
    });

    $page11.on('touchstart', '.text2', function (e) {
      $('#share_wrap').removeClass('hide');
    });

    $('#share_wrap').on('touchstart', function (e) {
      $(this).addClass('hide');
    });

    var startX;
    var startY;
    var moveEndX;
    var moveEndY;

    $container.on('touchstart', function (e) {
      var $target = $(e.target);
      if ($target.closest('.page9').length == 0) {
        e.preventDefault();
        startX = e.changedTouches[0].pageX;
        startY = e.changedTouches[0].pageY;
      }
    });
    $container.on('touchmove', function (e) {
      var $target = $(e.target);
      if ($target.closest('.page9').length == 0) {
        e.preventDefault();
        moveEndX = e.changedTouches[0].pageX;
        moveEndY = e.changedTouches[0].pageY;
      }
    });
    $container.on('touchend', function (e) {
      var $target = $(e.target);
      if ($target.closest('.page9').length == 0) {
        var $oldActive = $container.find('.active');
        var $newActive;

        var direction = getSlideDirection(startX, startY, moveEndX, moveEndY);
        var prev = $oldActive.data('prev');
        var next = $oldActive.data('next');
        switch (direction) {
          // case 0:
          //   return;
          // 向上
        case 1:
          $newActive = $('.' + next);
          break;
          // 向下
        case 2:
          // if (prev == null || prev == 'null') {
          //   return;
          // }
          // $newActive = $('.' + prev);
          if ($oldActive.hasClass('page5')) {
            var $milestone_page = $oldActive.find('.milestone-page.show');
            var milestonePrev = $milestone_page.data('prev');
            var milestoneNext = $milestone_page.data('next');
            if (milestonePrev != null && milestonePrev != 'null') {
              $page5.find('.' + milestonePrev).removeClass('hide');
              $milestone_page.removeClass('show');
              setTimeout(function () {
                $page5.find('.' + milestonePrev).addClass('show');
                $page5.find('.' + milestonePrev).find('.milestone').addClass('show');
                $milestone_page.addClass('hide');

                clearAni($milestone_page);
              }, 500);
            }
          }
          return;;
        default:
          return;
        }

        if (!$oldActive.find('.arrow').hasClass('show')) {
          if ($oldActive.hasClass('page5')) {
            var $milestone_page = $oldActive.find('.milestone-page.show');
            var milestonePrev = $milestone_page.data('prev');
            var milestoneNext = $milestone_page.data('next');
            if (direction == 1 && milestoneNext != null && milestoneNext != 'null') {
              showMilestonePage[milestoneNext]();
            }
          }
          return;
        }

        clearTimeout(flipTimeout);
        clearTimeout(arrowTimeout);

        flipPage(prev, next, $oldActive, $newActive);
      }
    });
  }

  // 翻页
  function flipPage(prev, next, $oldActive, $newActive) {
    if (next !== 'page2') {
      $oldActive.removeClass('active');
    }
    $newActive.removeClass('hide');
    setTimeout(function () {
      $newActive.addClass('active');
      if (next == 'page2') {
        $page2.find('.smog').addClass('moving');
        setTimeout(function () {
          $page2.find('.text, .tips').addClass('show');
        }, 1500);
        flipTimeout = setTimeout(function () {
          $page2.find('.text, .tips').removeClass('show');
          setTimeout(function () {
            $page2.find('.smog').removeClass('moving');
            setTimeout(function () {
              $page2.removeClass('active');
              $page3.removeClass('hide');
              setTimeout(function () {
                $page3.addClass('active');
                arrowTimeout = setTimeout(function () {
                  $page1.removeClass('active').addClass('hide');
                  $page2.addClass('hide');
                }, 500);
              }, 50);
            }, 2000);
          }, 500);
        }, 5000);
      } else if (next == 'page5') {
        setTimeout(function () {
          $page4.addClass('hide');
          showOrigin();
        }, 500);
      } else if (next == 'page9') {
        var $map_wrap = $page9.find('.map-wrap');
        $map_wrap.scrollTop(222);
        $map_wrap.scrollLeft(1425);
        arrowTimeout = setTimeout(function () {
          $newActive.find('.arrow').addClass('show');
        }, 1500);
      } else {

        flipTimeout = setTimeout(function () {
          $oldActive.addClass('hide');
          $oldActive.addClass('hide');


          arrowTimeout = setTimeout(function () {
            $newActive.find('.arrow').addClass('show');
          }, 1500);

        }, 500);
      }

    }, 50);
  }

  function clearAni($page) {
    $page.find('[data-ani]').each(function (index, item) {
      var $item = $(item);
      $item.removeClass($item.data('ani'));
    });
  }

  var showMilestonePage = {
    origin: showOrigin,
    scale: showScale,
    international: showInternational,
    international2: showInternational2
  }

  function showOrigin() {
    $page5.find('.origin .milestone').addClass('show');
    // setTimeout(function () {
    //   showScale();
    // }, 3000);
  }

  function showScale() {
    $page5.find('.origin .plane').addClass('flying');
    setTimeout(function () {
      $page5.find('.origin').removeClass('show');
      $page5.find('.scale').removeClass('hide');
      setTimeout(function () {
        $page5.find('.scale').addClass('show');
        $page5.find('.scale .milestone').addClass('show');
        // setTimeout(function () {
        //   showInternational();
        // }, 3000)
      }, 50);
      setTimeout(function () {
        $page5.find('.origin').addClass('hide');
        clearAni($page5.find('.origin'));
      }, 500);
    }, 1500);
  }

  function showInternational() {
    $page5.find('.scale .plane').addClass('flying');
    setTimeout(function () {
      $page5.find('.scale').removeClass('show');
      $page5.find('.international').removeClass('hide');
      setTimeout(function () {
        $page5.find('.international').addClass('show');
        $page5.find('.international .milestone').addClass('show');
        // setTimeout(function () {
        //   showInternational2();
        // }, 3000)
      }, 50);
      setTimeout(function () {
        $page5.find('.scale').addClass('hide');
        clearAni($page5.find('.scale'));
      }, 500);
    }, 1500);
  }

  function showInternational2() {
    $page5.find('.international .plane').addClass('flying');
    setTimeout(function () {
      $page5.find('.international').removeClass('show');
      $page5.find('.international2').removeClass('hide');
      setTimeout(function () {
        $page5.find('.international2').addClass('show');
        $page5.find('.international2 .milestone').addClass('show');
        setTimeout(function () {
          // $page5.find('.international2 .plane').addClass('flying');
          $page5.find('.arrow').addClass('show');
        }, 3000)
      }, 50);
      setTimeout(function () {
        $page5.find('.international').addClass('hide');
        clearAni($page5.find('.international'));
      }, 500);
    }, 1500);
  }
});