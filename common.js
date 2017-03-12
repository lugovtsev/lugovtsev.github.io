"use strict";
const $ = require('jquery');

$(document).ready(function() {
  //events for adding new task
  $('#add-input').keyup(function(e) {
    if (e.keyCode == 13) addTask();
  });

  $('#add-button').click(addTask);

  //mark as important
  $('body').on('click', '#tasks-list .star', function() {
    //$(this).toggleClass('choosen');
    if ($(this).hasClass('icon-star-full')) {
      $(this).removeClass('icon-star-full').addClass('icon-star-empty');
    }
    else {
      $(this).removeClass('icon-star-empty').addClass('icon-star-full');
    }
    if ($(this).hasClass('icon-star-full')) {
      $('#tasks-list').prepend($(this).parents('.task-item'));
    }
    else {
      $('#tasks-list').append($(this).parents('.task-item'));
    }
  });

  //switch state 'done'
  $('body').on('change', '.task-item :checkbox', function() {
    if(this.checked) {
      $('#completed-tasks-list').append($(this).parents('.task-item').addClass('done'));
    }
    else {
      $('#tasks-list').append($(this).parents('.task-item').removeClass('done'));
    }
  });

  //events for control buttons
  $('#show-completed-tasks').click(function() {
    $('#completed-tasks-list').toggleClass('hidden');
    if ($('#completed-tasks-list').hasClass('hidden'))
      $(this).text('Show completed tasks');
    else
      $(this).text('Hide completed tasks');
  });

  $('#remove-completed-tasks').click(function() {
    $('#completed-tasks-list').empty();
  });

  $('body').on('click', '#show-important-tasks', function() {
    $('#tasks-list .task-item').each(function(elem) {
      if (!$(this).find('.star').hasClass('icon-star-full')) {
        $(this).addClass('hidden');
      }
    });
    $(this).attr('id','show-all').css('color','#f5e4aa');
  });

  $('body').on('click', '#show-all', function() {
    $('#tasks-list .task-item').each(function(elem) {
      $(this).removeClass('hidden');
    });
    $(this).attr('id','show-important-tasks').css('color','#fff');
  });

  //task adding function
  function addTask() {
    let addTextInput = $('#add-input');
    if (addTextInput.val() != '') {
      $('#tasks-list').append('<div class="task-item"><input type="checkbox"> <div class="task-item__text"><p>' +addTextInput.val()+ '</p><span class="star icon-star-empty"></span></div></div>');
      addTextInput.val('');
    }
  }

});
