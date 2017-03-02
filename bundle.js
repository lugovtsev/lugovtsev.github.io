/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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


/***/ })
/******/ ]);