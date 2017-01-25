"use strict";

$(document).ready(function() {
  //events for adding new task
  $('#add-input').keyup(function(e) {
    if (e.keyCode == 13) addTask();
  });

  $('#add-button').click(addTask);

  //mark as important
  $('body').on('click', '#tasks-list .star', function() {
    $(this).toggleClass('choosen');
    if ($(this).hasClass('choosen')) {
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
  });

  $('#remove-completed-tasks').click(function() {
    $('#completed-tasks-list').empty();
  });

  $('body').on('click', '#show-important-tasks', function() {
    $('#tasks-list .task-item').each(function(elem) {
      if (!$(this).find('.star').hasClass('choosen')) {
        $(this).addClass('hidden');
      }
    });
    $(this).html('Show all').attr('id','show-all');
  });

  $('body').on('click', '#show-all', function() {
    $('#tasks-list .task-item').each(function(elem) {
      if (!$(this).find('.star').hasClass('choosen')) {
        $(this).removeClass('hidden');
      }
    });
    $(this).html('Only important').attr('id','show-important-tasks');
  });

  //task adding function
  function addTask() {
    let addTextInput = $('#add-input');
    if (addTextInput.val() != '')
    $('#tasks-list').append('<div class="task-item"><p><input type="checkbox"> ' +addTextInput.val()+ '</p><span class="star"></span></div>');
    addTextInput.val('');
  }

});
