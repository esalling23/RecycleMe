	// GAME LOGIC
	var levelItems,
      points = 0, 
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


  function ShowMatch(item, match) {
    console.log(item, match);

    var modalId = $(item).find('.item-pane').attr('id');

    if (matchOpen == true || !modalId)
      return;

    setTimeout(function(){
      item.remove();
    }, 1000);
    
    matchOpen = true;
    $('.modal-group').show(function(){

      if (match == true) {
        $('.modal-wrap.match#' + modalId + ' .message').text('It\'s a Match!');
        ion.sound.play("tada", {volume: 0.2});

      } else {
        $('.modal-wrap.match#' + modalId + ' .message').text('Not Quite!');
        ion.sound.play("wahwah");
      }
    
      $('.modal-wrap.match#' + modalId).addClass('open').fadeIn('200', function(){
        $(this).find('#back-btn').on('click', function() {
          $('#' + modalId).remove();
          matchOpen = false;
        })
      });;
    });
    
  }

  function CheckSpecial(item, special) {
    // check if item is recyclable
    if (item.hasClass(special)) {
      // if (item)
      console.log('CORRECT - dis special');
      UpdateScore(1);
      ShowMatch($(item), true);
    } else {
      ShowMatch($(item), false);
      console.log ('WRONG - dis something ELSe');
    }
  }

  function CheckTrash(item) {
    // check if item is trash
    if ($(item).hasClass('Trash')) {
      ShowMatch($(item), true);
      console.log('CORRECT - dis trash');
      UpdateScore(1);
    } else {
      ShowMatch($(item), false);
      console.log ('WRONG - dis recyclable');
    }
  }

  function CheckRecycle(item) {
    // check if item is recyclable
    if ($(item).hasClass('Recycle')) {
      UpdateScore(1);
      ShowMatch(item, true);
      console.log('CORRECT - dis recyclable');

    } else {
      ShowMatch(item, false);
      console.log ('WRONG - dis trash');
    }
  }

  function CheckCompost(item) {
    console.log(item);
    // check if item is recyclable
    if (item.hasClass('Compost')) {
      UpdateScore(1);
      ShowMatch(item, true);
      console.log('CORRECT - dis compost');

    } else {
      ShowMatch(item, false);
      console.log ('WRONG - dis something ELSe');
    }
  }

  $('.item').hammer().on("swipeleft", function(ev){

    if ($(this).hasClass('gone') || $(this).hasClass('open'))
      return;

    currentItem = $(this);

    if (buttonAlertTrash == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to trash this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort').show();
      $('.alert').fadeIn(function(){
          swipeAlertLeft = false;
          // Confirm to continue
          $(this).find('#alert-confirm').on('click', function(e){
             e.stopPropagation();
             e.preventDefault();
            // Check Item
            $(currentItem).addClass('gone').addClass('trashed');
            CheckTrash(currentItem);

            $(this).unbind('click');

            $('.alert').fadeOut();

            
          });
      });
    } else {
      // Check Item
      $(currentItem).addClass('gone').addClass('trashed');
      CheckTrash(currentItem);

    }

  });

	// If a player chooses to trash an item
  $('#trash').on('click', function(e) {

    e.stopPropagation();

    currentItem = $(document).find('.level.ACTIVE .item').last();
    console.log(currentItem);

    if (buttonAlertTrash == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to trash this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort').show();
      $('.alert').fadeIn(function(){
        buttonAlertTrash = false;
        // Confirm to continue
        $(this).find('#alert-confirm').on('click', function(e){
           e.stopPropagation();
           e.preventDefault();
          // Check Item
          $(currentItem).addClass('gone').addClass('trashed');
          CheckTrash($(currentItem));
          $(this).unbind('click');
          $('.alert').fadeOut();
        });
      });
    } else {
      // Check Item
      $(currentItem).addClass('gone').addClass('trashed');
      CheckTrash($(currentItem));
    }

    
  });

  $('.item').hammer().on("swiperight", function(ev){
    if ($(this).hasClass('gone') || $(this).hasClass('open'))
      return;

    currentItem = $(this);

    if (swipeAlertRight == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to recycle this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort').show();
      $('.alert').fadeIn(function(){
          swipeAlertRight = false;
          // Confirm to continue
          $(this).find('#alert-confirm').on('click', function(e){
             e.stopPropagation();
             e.preventDefault();
            $(currentItem).addClass('gone').addClass('recycled');
            CheckRecycle($(currentItem));
            $(this).unbind('click');
            $('.alert').fadeOut();
          });
      });
    } else {
      // Check Item
      $(currentItem).addClass('gone').addClass('recycled');
      CheckRecycle(currentItem);
    }
    
  });

  // If a player chooses to recycle
  $('#recycle').on('click', function(e) {
    e.stopPropagation();
    currentItem = $(document).find('.level.ACTIVE .item').last();
    console.log(currentItem);
    if (buttonAlertRecycle == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to recycle this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort').show();
      $('.alert').fadeIn(function(){
          buttonAlertRecycle = false;
          // Confirm to continue
          $(this).find('#alert-confirm').on('click', function(e){
             e.stopPropagation();
             e.preventDefault();
            // Check Item
            $(currentItem).addClass('gone').addClass('recycled');
            CheckRecycle($(currentItem));
            $(this).unbind('click');
            $('.alert').fadeOut();

          });
      });
    } else {
      // Check Item
      $(currentItem).addClass('gone').addClass('recycled');
      CheckRecycle($(currentItem));
      
    }

  });

  // If a player chooses to compost
  $('#compost').on('click', function() {
    currentItem = $(document).find('.level.ACTIVE .item').last();

    if (buttonAlertSuper == true) {
      // Let the player know what they are doing
      $('.alert .msg').html('<h2>You are about to compost this item! Are you sure?</h2>');
      $('.alert #alert-confirm, .alert #alert-abort').show();
      $('.alert').fadeIn(function(){
          buttonAlertSuper = false;
          // Confirm to continue
          $(this).find('#alert-confirm').on('click', function(e){
             e.stopPropagation();
            // Check item
            $(currentItem).addClass('gone').addClass('composted');
            CheckCompost(currentItem);
            $(this).unbind('click');
            $('.alert').fadeOut();

          });
      });
    } else {
      // Check Item
      $(currentItem).addClass('gone').addClass('composted');
      CheckCompost(currentItem);
    }

  });

  // If a player chooses 'special'
  $('#special').on('click', function() {

    currentItem = $(document).find('.level.ACTIVE .item')[0];
    
    $('.modal.special').fadeIn(function() {
      $('.option').click(function(){

        var option = $(this);

        if (buttonAlertSpecial == true) {
          // Let the player know what they are doing
          $('.alert .msg').html('<h2>You are about to <span></span> this item! Are you sure?</h2>');
          $('.alert #alert-confirm, .alert #alert-abort').show();
          $('.alert').fadeIn(function(){
            buttonAlertSpecial = false;
            // Confirm to continue
            $(this).find('#alert-confirm').on('click', function(e){
              e.stopPropagation();
              // Check Item
              $(currentItem).addClass('gone').addClass('specialPick');
              CheckSpecial(currentItem, option.attr('id'));
              $('.modal.special').fadeOut();
              
              $(this).unbind('click');
              $('.alert').fadeOut();
              
            });
          });
        } else {
          // Check Item
          $(currentItem).addClass('gone').addClass('specialPick');
          CheckSpecial(currentItem, option.attr('id'));
          $('.modal.special').fadeOut();
        }

      })
    });
    
  });

  $('.item').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    e.bubbles = false;
    return;
  });

  $('.item:not(.open)').on('click', function(event){

    event.preventDefault();
    event.stopPropagation();
    event.bubbles = false;

    var item = $(this);
    var glider = '#' + $(this).find('.item-pane').attr('id') + '-glide';

    $(item).addClass('open');

    $(item).find('.item-bio').show();

    $(item).find('.btn-close').css('visibility', 'visible');

    $(item).find('.glide__arrows').show();

    $(item).find('.image-glider').show(function(){

      $(glider).glide({
        type: "carousel",
        autoplay: false,
        autoheight: false, 
        default: 1
      });

      $('.glide__arrow').on('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        event.bubbles = false;

        var direction = $(this).data('glide-dir');

        $(glider).glide('next');

      });
    });

    $(item).on('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      e.bubbles = false;
      console.log(" open click ")
      return;
    });

    $(item).find('.btn-close').on('click', function(event){

      event.preventDefault();
      event.stopPropagation();

      $(item).removeClass('open');
      $(item).find('.item-bio').hide();
      $(this).css('visibility', 'hidden');

    });

  });

  

  function UpdateScore(num) {
  	var end = false;

    if (points >= $('.level.ACTIVE').data('max')){
      points = points + num/2;
    } else 
    	points = points + num;

    // Update player score
    $('#points-counter').html(points);

  	// Check if this is the last card in the stack - end the level
  	if ($('.level.ACTIVE .item:not(.gone)').length == 0){
  		end = true;
  	}

  	if (end == true) {
	  	// Send player data
	  	var data = {};
			data.id = "{{playerId}}";
			data.score = points, 
			data.level = $('.level.ACTIVE').data('level');

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

