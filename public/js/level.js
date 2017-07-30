	// GAME LOGIC
	var levelItems,
      points = 0,
      clicking = false, 
      currentItem,
      swipeAlertRight,
      swipeAlertLeft,
      buttonAlertRecycle,
      buttonAlertTrash,
      buttonAlertSpecial,
      buttonAlertSuper,
      matchOpen;

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

  function Reload() {
    points = 0;
    $('#points-counter').text(points);
  }


  function ShowMatch(item, match) {

    var modalId = $(item).find('.item-pane').attr('id');

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

  function CheckSpecial(item, special) {
    // check if item is recyclable
    if ($(item).hasClass(special)) {
      UpdateScore(1);
      ShowMatch($(item), true);
    } else {
      ShowMatch($(item), false);
    }
  }

  function CheckTrash(item) {
    // check if item is trash
    if ($(item).hasClass('Trash')) {
      ShowMatch($(item), true);
      UpdateScore(1);
    } else {
      ShowMatch($(item), false);
    }
  }

  function CheckRecycle(item) {
    // check if item is recyclable
    if ($(item).hasClass('Recycle')) {
      UpdateScore(1);
      ShowMatch(item, true);
    } else {
      ShowMatch(item, false);
    }
  }

  function CheckCompost(item) {
    // check if item is recyclable
    if ($(item).hasClass('Compost')) {
      UpdateScore(1);
      ShowMatch(item, true);
    } else {
      ShowMatch(item, false);
    }
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

    if ($(this).hasClass('gone') || $(this).hasClass('open') || clicking == true)
      return;

    clicking = true;

    currentItem = $(this);

    if (swipeAlertTrash == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to trash this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort').show();
      $('.alert').fadeIn(function(){
          swipeAlertLeft = false;
          $(this).find('#alert-abort').on('click', function(e){
              clicking = false;
          });
          // Confirm to continue
          $(this).find('#alert-confirm').on('click', function(e){
             e.stopPropagation();
             e.preventDefault();
            // Check Item
            $(currentItem).addClass('gone').addClass('trashed');
            CheckTrash(currentItem);

            $(this).unbind('click');

            $('.alert').fadeOut();
            clicking = false;
            
          });
      });
    } else {
      // Check Item
      $(currentItem).addClass('gone').addClass('trashed');
      CheckTrash(currentItem);
      clicking = false;
    }

  });

	// If a player chooses to trash an item
  $('#trash').unbind('click').on('click', function(e) {

    currentItem = $(document).find('.level .item').last();

    if (buttonAlertTrash == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to trash this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort').show();
      $('.alert').fadeIn(function(){
        buttonAlertTrash = false;
        $(this).find('#alert-abort').on('click', function(e){
          clicking = false;
        });
        // Confirm to continue
        $(this).find('#alert-confirm').on('click', function(e){
           e.stopPropagation();
           e.preventDefault();
          // Check Item
          $(currentItem).addClass('gone').addClass('trashed');
          CheckTrash($(currentItem));
          $(this).unbind('click');
          $('.alert').fadeOut();
          clicking = false;
        });
      });
    } else {
      // Check Item
      $(currentItem).addClass('gone').addClass('trashed');
      CheckTrash($(currentItem));
      clicking = false;
    }

    
  });

  $('.item').hammer().on("swiperight", function(e){

    if ($(this).hasClass('gone') || $(this).hasClass('open') || clicking == true)
      return;

    clicking = true;

    currentItem = $(this);

    if (swipeAlertRight == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to recycle this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort').show();
      $('.alert').fadeIn(function(){
          swipeAlertRight = false;
          $(this).find('#alert-abort').on('click', function(e){
              clicking = false;
          });
          // Confirm to continue
          $(this).find('#alert-confirm').on('click', function(e){
             e.stopPropagation();
             e.preventDefault();
            $(currentItem).addClass('gone').addClass('recycled');
            CheckRecycle($(currentItem));
            $(this).unbind('click');
            $('.alert').fadeOut();
            clicking = false;
          });
      });
    } else {
      // Check Item
      $(currentItem).addClass('gone').addClass('recycled');
      CheckRecycle(currentItem);
      clicking = false;
    }
    
  });

  // If a player chooses to recycle
  $('#recycle').unbind('click').on('click', function(e) {

    currentItem = $(document).find('.level .item').last();

    if (buttonAlertRecycle == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to recycle this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort').show();
      $('.alert').fadeIn(function(){
          buttonAlertRecycle = false;
          $(this).find('#alert-abort').on('click', function(e){
              clicking = false;
          });
          // Confirm to continue
          $(this).find('#alert-confirm').on('click', function(e){
             e.stopPropagation();
             e.preventDefault();
            // Check Item
            $(currentItem).addClass('gone').addClass('recycled');
            CheckRecycle($(currentItem));
            $(this).unbind('click');
            $('.alert').fadeOut();
            clicking = false;

          });
      });
    } else {
      // Check Item
      $(currentItem).addClass('gone').addClass('recycled');
      CheckRecycle($(currentItem));
      clicking = false;
    }

  });

  // If a player chooses to compost
  $('#compost').unbind('click').on('click', function() {

    currentItem = $(document).find('.level .item').last();

    if (buttonAlertSuper == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to compost this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort').show();
      $('.alert').fadeIn(function(){
          buttonAlertSuper = false;

          $(this).find('#alert-abort').on('click', function(e){
              clicking = false;
          });
          // Confirm to continue
          $(this).find('#alert-confirm').on('click', function(e){
             e.stopPropagation();
            // Check item
            $(currentItem).addClass('gone').addClass('composted');
            CheckCompost(currentItem);
            $(this).unbind('click');
            $('.alert').fadeOut();
            clicking = false;

          });
      });
    } else {
      // Check Item
      $(currentItem).addClass('gone').addClass('composted');
      CheckCompost(currentItem);
      clicking = false;
    }

  });

  // If a player chooses 'special'
  $('#special').unbind('click').on('click', function() {

    currentItem = $(document).find('.level .item').last();
    
    $('.modal.special').fadeIn(function() {
      $(this).find('.btn.close-special').unbind('click').on('click', function(e){
        $('.modal.special').fadeOut();
      });
      $('.option').unbind('click').on('click', function(){

        var option = $(this);

        $('.option').hide(function(){
          $(option).addClass('open')
          $(option).closest('.col-xs-6').removeClass('col-xs-6').addClass('col-xs-12');

          $(option).find('.profile').css('visibility', 'visible').removeClass('hidden');
        });

        $(option).fadeIn(function(){

          $(this).find('.btn').unbind('click').on('click', function(e){

            console.log($(this).data('action'))

            if ($(this).data('action') === 'select') {

              if (buttonAlertSpecial == true) {
                // Let the player know what they are doing
                $('.alert .msg').html('<h2>You are about to choose a special option for this item! Are you sure?</h2>');
                $('.alert #alert-confirm, .alert #alert-abort').show();
                $('.alert').fadeIn(function(){
                  buttonAlertSpecial = false;
                  $(this).find('#alert-abort').on('click', function(e){
                    clicking = false;
                  });

                  // Confirm to continue
                  $(this).find('#alert-confirm').on('click', function(e){
                    e.stopPropagation();
                    // Check Item
                    $(currentItem).addClass('gone').addClass('specialPick');
                    CheckSpecial(currentItem, option.attr('id'));
                    $('.option .profile').css('visibility', 'hidden');
                    $('.special-options .col-xs-12').removeClass('col-xs-12').addClass('col-xs-6');
                    $('.option .profile').css('visibility', 'hidden').addClass('hidden');
                    $('.option').removeClass('open');
                    $('.option').show();
                    $('.modal.special').fadeOut();
                    
                    $(this).unbind('click');
                    $('.alert').fadeOut();
                    clicking = false;
                    
                  });
                });
              } else {
                // Check Item
                $(currentItem).addClass('gone').addClass('specialPick');
                CheckSpecial(currentItem, option.attr('id'));
                $('.option .profile').css('visibility', 'hidden');
                $('.special-options .col-xs-12').removeClass('col-xs-12').addClass('col-xs-6');
                $('.option .profile').css('visibility', 'hidden').addClass('hidden');
                $('.option').removeClass('open');
                $('.option').show();

                $('.modal.special').fadeOut();
                clicking = false;
              }

            } else if ($(this).data('action') === 'back') {
                  
              setTimeout(function(){
                $('.option').hide(function(){
                  $('.option .profile').css('visibility', 'hidden');
                  $('.special-options .col-xs-12').removeClass('col-xs-12').addClass('col-xs-6');
                  $('.option .profile').css('visibility', 'hidden').addClass('hidden');
                  $('.option').removeClass('open');
                  setTimeout(function(){
                    $('.option').fadeIn(function(){

                    });
                  }, 1000)
                  
                }); 
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
    console.log(num)
  	var end = false;

    if (points >= $('.level').data('max')){
      points = points + num/2;
    } else 
    	points = points + num;


    // Update player score
    $('#points-counter').html(points);

  	// Check if this is the last card in the stack - end the level
  	if ($('.level .item:not(.gone)').length == 0){

  		end = true;
  	}

    console.log(end)

  	if (end == true) {
	  	// Send player data
	  	var data = {
			  id: window.playerId,
			  score: points, 
			  level: $('.level.tinderslide').data('level')
      };

	  	$.get("/api/game/", data, function(data){
	  		// Show that end-of-level modal
        $('.buttons').hide();
	  		$('.modal.end').html(data.html).fadeIn();
  		})
  		.fail(function(err) {
  		    alert( "error" + err );
  		});

  	} 

  }

  //# sourceURL=level.js


