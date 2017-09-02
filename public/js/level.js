	// GAME LOGIC
	var levelItems,
      points = 0,
      clicking = false, 
      currentItem,
      nextItem,
      matchOpen, 
      matchList = [],
      tutorial = false,
      level = window.level;

  ion.sound({
    sounds: [
        {
            name: "tada"
        },
        {
            name: "wahwah"
        }
    ],
    volume: 0.5,
    path: sfxPath,
    preload: true
  });

  function clearScreen() {

    // Hide elements
    $('.modal').hide();

    // Special Option reset
    SpecialReset();

  }

  function SpecialReset() {
      $('.option.open .profile').css('visibility', 'hidden').addClass('hidden');
      $('.special-options .col-xs-12').removeClass('col-xs-12').addClass('col-xs-6');
      $('.special-scroll').css('overflow-y', 'scroll');
      $('.option.open').removeClass('open');
      $('.option-wrap').css('height', '240px').css('width', '50%');
      $('.option-wrap, .option-select').show();
      $('.option-wrap').css('visibility', 'visible');
  }


  if (level == '*') {

    var display = $('#time'), 
        readyDisplay = $('#ready-timer'), 
        counting = false, 
        countdown = null, 
        timerSize;

    function timer(duration, display, anim, callback) {
      counting = true;
      var time = duration;

      $(display).text(time);

      clearInterval(countdown);

      countdown = setInterval(function() {

        if (anim) {
          $(display).css('font-size', timerSize);
          $(display).animate({
            'font-size': '0px'
          }, 900)
        }
        
        if (time >= 0)
          $(display).text(time);

        time = time - 1;

        if(time <= -1) {
          counting = false;
          $(display).css('font-size', timerSize);
          callback();
        }
      }, 1000);

    }

    function getReady() {
      $(readyDisplay).show(function(){

        setTimeout(function(){

          var text = $(readyDisplay).find('#ready-timer-text');
          timerSize = $(text).css('font-size');

          $(text).show(function() {
              // Are you ready countdown
            timer(5, text, true, function(){
              $(readyDisplay).hide();
              free(true);
            });
            // Skip the countdown for advanced players
            $(readyDisplay).find('#skip').on('click', function(){
              clearInterval(countdown);
              $(readyDisplay).hide();
              free(true);
            });
          });
          
        }, 1000);

      });
      
    }

    // Each Item Count
    function free(first) {

      if (first)
        timerSize = $(display).css('font-size');

      // Was that the last item?? Stop the loop
      if ($('.level .item:not(.gone)').length == 0)
        return;

      // Catch for current item
      if (!currentItem)
        currentItem = $(document).find('.level .item:not(.gone)').last();

      clearInterval(countdown);

      // Timer
      timer(5, display, true, function(){
        // They haven't chosen in time
        currentItem = $(document).find('.level .item:not(.gone)').last();
        ShowMatch(currentItem, false);

        $(currentItem).addClass('gone');

        clearInterval(countdown);
        clearScreen();

        // Was that the last item?? Stop the loop
        if ($('.level .item:not(.gone)').length == 0 || $('.level .item.loss').length == 3)
          return;

        free();

      });

    }

    getReady();
    
  } else 
    tutorial = true;

  function Reload() {
    points = 0;
    $('#points-counter #points-text').text(points);
  }


  function ShowMatch(item, match) {

    var modalId = $(item).find('.item-pane').attr('id');

    if (level == '*') {
      // Save Matches/Misses for the end
      matchList.push({ item: modalId, match: match });

      if (!match) {
        $(item).addClass('loss');
        $('.lives-wrap').find('.life:not(.loss)').first().addClass('loss');
        UpdateScore(-1);
      } else {
        UpdateScore(1);
      }

      return;
    }

    if (matchOpen == true || !modalId)
      return;

    matchOpen = true;

    var data = {
      match: match, 
      id: modalId
    };

    $.get("/api/game/match", data, function(data){

      if (match == true) {
        ion.sound.play("tada", {volume: 0.2});
      } else {
        ion.sound.play("wahwah");
      }

      setTimeout(function(){
        item.remove();
      }, 1000);

      $(".modal.match").html(data.html).fadeIn(function(){

        $(this).find('#back-btn').on('click', function() {

          $('.modal.match .modal-wrap').remove();
          $('.modal.match').fadeOut();
          matchOpen = false;
        });
      });
    });
  }

  function CheckItem(item, match) {

    ShowMatch(item, match);

  }

  $('.btn-handler').unbind('click').on('click', function(e){
    e.bubbles = false;
    e.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();

    if (clicking == true)
      return;

    clicking = true;
  });

  $('.item').hammer().on("swipeleft", function(ev){

    if ($(this).hasClass('gone') || $(this).hasClass('open') || clicking == true || (!tutorial && counting == false))
      return;

    clicking = true;

    currentItem = $(this);

    if (swipeAlertLeft == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to trash this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').show();
      $('.alert').fadeIn(function(){
          swipeAlertLeft = false;
          $(this).find('#alert-abort').on('click', function(e){
              clicking = false;
              $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').hide();
          });
          // Confirm to continue
          $(this).find('#alert-confirm').on('click', function(e){
             e.stopPropagation();
             e.preventDefault();
            // Check Item
            $(currentItem).addClass('gone').addClass('trashed');
            CheckItem(currentItem, $(currentItem).hasClass('Trash'));

            $(this).unbind('click');

            $('.alert').fadeOut();
            $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').hide();
            clicking = false;
            
          });
      });
    } else {

      // Check Item
      if (!tutorial && counting == true) {
        free();
        clearScreen();
      }

      $(currentItem).addClass('gone').addClass('trashed');
      CheckItem(currentItem, $(currentItem).hasClass('Trash'));
      clicking = false;
    }

  });

	// If a player chooses to trash an item
  $('#trash').unbind('click').on('click', function(e) {

    if (!tutorial && counting == false)
      return;

    currentItem = $(document).find('.level .item:not(.gone)').last();

    if (buttonAlertTrash == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to trash this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').show();
      $('.alert').fadeIn(function(){
        buttonAlertTrash = false;
        $(this).find('#alert-abort').on('click', function(e){
          clicking = false;
          $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').hide();
        });
        // Confirm to continue
        $(this).find('#alert-confirm').on('click', function(e){
           e.stopPropagation();
           e.preventDefault();
          // Check Item
          $(currentItem).addClass('gone').addClass('trashed');
          CheckItem(currentItem, $(currentItem).hasClass('Trash'));
          $(this).unbind('click');
          $('.alert').fadeOut();
          $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').hide();
          clicking = false;
        });
      });
    } else {
      // Check Item

      if (!tutorial && counting == true) {
        free();
        clearScreen();
      }

      $(currentItem).addClass('gone').addClass('trashed');
      CheckItem($(currentItem), $(currentItem).hasClass('Trash'));
      clicking = false;
    }

    
  });

  $('.item').hammer().on("swiperight", function(e){

    if ($(this).hasClass('gone') || $(this).hasClass('open') || clicking == true || (!tutorial && counting == false))
      return;

    clicking = true;

    currentItem = $(this);

    if (swipeAlertRight == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to recycle this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').show();
      $('.alert').fadeIn(function(){
          swipeAlertRight = false;
          $(this).find('#alert-abort').on('click', function(e){
              clicking = false;
              $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').hide();
          });
          // Confirm to continue
          $(this).find('#alert-confirm').on('click', function(e){
             e.stopPropagation();
             e.preventDefault();
            $(currentItem).addClass('gone').addClass('recycled');

            CheckItem(currentItem, $(currentItem).hasClass('Recycle'));
            $(this).unbind('click');
            $('.alert').fadeOut();
            $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').hide();
            clicking = false;
          });
      });
    } else {
      // Check Item
      if (!tutorial && counting == true) {
        free();
        clearScreen();
      }

      $(currentItem).addClass('gone').addClass('recycled');
      CheckItem(currentItem, $(currentItem).hasClass('Recycle'));
      clicking = false;
    }
    
  });

  // If a player chooses to recycle
  $('#recycle').unbind('click').on('click', function(e) {

    if (!tutorial && counting == false)
      return;

    currentItem = $(document).find('.level .item:not(.gone)').last();

    if (buttonAlertRecycle == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to recycle this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').show();
      $('.alert').fadeIn(function(){
          buttonAlertRecycle = false;
          $(this).find('#alert-abort').on('click', function(e){
              clicking = false;
              $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').hide();
          });
          // Confirm to continue
          $(this).find('#alert-confirm').on('click', function(e){
             e.stopPropagation();
             e.preventDefault();
            // Check Item
            $(currentItem).addClass('gone').addClass('recycled');
            CheckItem(currentItem, $(currentItem).hasClass('Recycle'));
            $(this).unbind('click');
            $('.alert').fadeOut();
            $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').hide();
            clicking = false;

          });
      });
    } else {
      // Check Item
      if (!tutorial && counting == true) {
        free();
        clearScreen();
      }

      $(currentItem).addClass('gone').addClass('recycled');
      CheckItem(currentItem, $(currentItem).hasClass('Recycle'));
      clicking = false;
    }

  });

  // If a player chooses to compost
  $('#compost').unbind('click').on('click', function() {

    if (!tutorial && counting == false)
      return;

    currentItem = $(document).find('.level .item:not(.gone)').last();

    if (buttonAlertSuper == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to compost this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').show();
      $('.alert').fadeIn(function(){
          buttonAlertSuper = false;

          $(this).find('#alert-abort').on('click', function(e){
              clicking = false;
              $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').hide();
          });
          // Confirm to continue
          $(this).find('#alert-confirm').on('click', function(e){
             e.stopPropagation();
            // Check item
            $(currentItem).addClass('gone').addClass('composted');
            CheckItem(currentItem, $(currentItem).hasClass('Compost'));
            $(this).unbind('click');
            $('.alert').fadeOut();
            $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').hide();
            clicking = false;

          });
      });
    } else {
      // Check Item
      if (!tutorial && counting == true) {
        free();
        clearScreen();
      }

      $(currentItem).addClass('gone').addClass('composted');
      CheckItem(currentItem, $(currentItem).hasClass('Compost'));
      clicking = false;
    }

  });

  // If a player chooses 'special'
  $('#special').unbind('click').on('click', function() {

    if (!tutorial && counting == false)
      return;

    currentItem = $(document).find('.level .item:not(.gone)').last();
    
    $('.modal.special').fadeIn(function() {
      $(this).find('.btn.close-special').unbind('click').on('click', function(e){
        SpecialReset();
        setTimeout(function() {
          $('.modal.special').fadeOut();
        }, 200)
      });

      // Option Select
      $('.option-select input[data-action="select"]').unbind('click').on('click', function(e){

        if (counting == false || $(this).hasClass('open'))
          return;

        console.log()

        var option = $(this).closest('.option-wrap').find('.option');

        if (buttonAlertSpecial == true) {
          // Let the player know what they are doing
          $('.alert .msg').html('<h2>You are about to choose a special option for this item! Are you sure?</h2>');
          $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').show();
          $('.alert').fadeIn(function(){
            buttonAlertSpecial = false;
            $(this).find('#alert-abort').on('click', function(e){
              $(this).unbind('click');
              $('.alert').fadeOut();
              $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').hide();
              clicking = false;
            });

            // Confirm to continue
            $(this).find('#alert-confirm').on('click', function(e){
              e.stopPropagation();
              // Check Item
              $(currentItem).addClass('gone').addClass('specialPick');

              var choice = option.attr('id');
              CheckItem(currentItem, $(currentItem).hasClass(choice));

              SpecialReset();

              $('.modal.special').fadeOut();
              
              $(this).unbind('click');
              $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').hide();
              $('.alert').fadeOut();
              clicking = false;
              
            });
          });
        } else {
          // Check Item
          if (!tutorial && counting == true) {
            free();
            clearScreen();
          }

          $(currentItem).addClass('gone').addClass('specialPick');

          var choice = option.attr('id');
          CheckItem(currentItem, $(currentItem).hasClass(choice));

          SpecialReset();

          $('.modal.special').fadeOut();
          clicking = false;
        }
      });

      // Option Info
      $('.option-select input[data-action="info"]').unbind('click').on('click', function(e){

        if (counting == false || $(this).hasClass('open'))
          return;

        $('.special-scroll').css('overflow', 'hidden');
        $('.option-select').hide();
        $('.option-wrap').css('visibility', 'hidden');

        var option = $(this).closest('.option-wrap').find('.option');
        $(this).closest('.option-wrap').css('height', '100%').css('width', '100%');
        
        $('.option-wrap').hide(function(){
          $(option).addClass('open');
          $(option).closest('.col-xs-6').removeClass('col-xs-6').addClass('col-xs-12');

          $(option).find('.profile').css('visibility', 'visible').removeClass('hidden');
        });

        $(option).closest('.option-wrap').fadeIn(function(){

          $(this).css('visibility', 'visible');

          $(this).find('.btn').unbind('click').on('click', function(e){

            e.stopImmediatePropagation();
            e.bubble = false;

            console.log($(this).data('action'))

            if ($(this).data('action') === 'select') {

              if (buttonAlertSpecial == true) {
                // Let the player know what they are doing
                $('.alert .msg').html('<h2>You are about to choose a special option for this item! Are you sure?</h2>');
                $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').show();
                $('.alert').fadeIn(function(){
                  buttonAlertSpecial = false;
                  $(this).find('#alert-abort').on('click', function(e){
                    $(this).unbind('click');
                    $('.alert').fadeOut();
                    $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').hide();
                    clicking = false;
                  });

                  // Confirm to continue
                  $(this).find('#alert-confirm').on('click', function(e){
                    e.stopPropagation();
                    // Check Item
                    $(currentItem).addClass('gone').addClass('specialPick');

                    var choice = option.attr('id');
                    CheckItem(currentItem, $(currentItem).hasClass(choice));

                    SpecialReset();

                    $('.modal.special').fadeOut();
                    
                    $(this).unbind('click');
                    $('.alert #alert-confirm, .alert #alert-abort, .alert .msg').hide();
                    $('.alert').fadeOut();
                    clicking = false;
                    
                  });
                });
              } else {
                // Check Item
                if (!tutorial && counting == true) {
                  free();
                  clearScreen();
                }

                $(currentItem).addClass('gone').addClass('specialPick');

                var choice = option.attr('id');
                CheckItem(currentItem, $(currentItem).hasClass(choice));

                SpecialReset();

                $('.modal.special').fadeOut();
                clicking = false;
              }

            } else if ($(this).data('action') === 'back') {
              SpecialReset();
              setTimeout(function(){
                  $('.option-wrap').css('visibility', 'visible');
              }, 100)

            }

          });

        });

      })
    });
    
  });

  $('.item.open').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.bubbles = false;
    return;
  });

  $('.item:not(.open)').on('click', function(e){
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.bubbles = false;

    var item = $(this);
    var glider = '#' + $(this).find('.item-pane').attr('id') + '-glide';

    $(item).addClass('open');
    $(item).find('.btn-close, .image-glider, .glide__arrows').css('visibility', 'visible');
    // $(glider).glide({
    //     type: "slider",
    //     mode: 'vertical',
    //     autoplay: false,
    //     startAt: 1,
    //     touchDistance: false, 
    //     dragDistance: false
    //   });
    $(item).find('.item-bio').show(function(){
      setTimeout(function(){
      
      }, 500)
      
      // $('.glide__arrow').unbind('click').on('click', function(e){
      //   e.stopImmediatePropagation();
      //   e.stopPropagation();
      //   e.bubbles = false;

      //   var direction = $(this).data('glide-dir');

      //   $(glider).glide('>');

      // });

      $('.material').unbind('click').on('click', function(e){

        e.stopPropagation();
        e.stopImmediatePropagation();
        e.bubbles = false;

        $.get("/api/game/material", { material: $(this).attr('id') }, function(data){

          $(".modal.material-profile").html(data.html).fadeIn(function(){

            $(this).find('#back-btn').on('click', function() {

              $('.modal.material-profile .modal-wrap').remove();
              $('.modal.material-profile').fadeOut();
            });

          });

        });

      });

    });

    $(item).on('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.bubbles = false;
      console.log(" open click ")
      return;
    });

    $(item).find('.btn-close').on('click', function(e){
      e.bubbles = false;
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();

      $(item).removeClass('open');
      $(item).find('.item-bio').hide();
      $(this).css('visibility', 'hidden');

    });

  });

  

  function UpdateScore(num) {

  	var end = false;

  	points = points + num;

    // Update player score
    $('#points-counter #points-text').text(points);

  	// Check if this is the last card in the stack - end the level
  	if ($('.level .item:not(.gone)').length == 0 || $('.level .life.loss').length >= 3)
  		end = true;
  	
  	if (end === true) {

      // Send player data
      var data = {
        id: window.playerId,
        score: points, 
        level: $('.level.tinderslide').data('level')
      };

      if (!tutorial) {
        clearInterval(countdown);
        data.matchList = matchList;
      }

      var level = $('.game-level .level').data('level').toString();
      var tries = $('.game-level .level[data-level="'+ level +'"]').data('tries')

      if (!tries)
        $('.game-level .level[data-level="'+ level +'"]').data('tries', 1);
      else
        $('.game-level .level[data-level="'+ level +'"]').data('tries', tries + 1);

	  	$.get("/api/game/", data, function(data){

	  		// Show that end-of-level modal
        $('.buttons').hide();

	  		$('.modal.end').html(data.html).fadeIn(function(){

          if ($('.match-list').height() > $('.match-inner').length * 100) {
            $('.match-list').css('height', $('.match-inner').length * 100);
          }

          $('.match-list').css('visibility', 'visible')

          $('.btn.replay').unbind('click').on('click', function(){
            StartLevel(level);
            $('.modal.end').hide();
          });

          $('.btn.next-lvl').unbind('click').on('click', function(){
            StartLevel(level + 1);
            $('.modal.end').hide();
          });

        });
        
  		});
  	} 
  }

  //# sourceURL=level.js


