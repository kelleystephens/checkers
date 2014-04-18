(function(){
  'use strict';

  $(document).ready(init);

  var selectedPiece;
  var originX;
  var originY;

  var selectedSpace;
  var targetX;
  var targetY;

  var adjacentBL;
  var adjacentBR;
  var adjacentTL;
  var adjacentTR;

  var $apple;
  var $windows;

  var turn = 1;
  var possible;

  function init(){
    $('tr:nth-child(even) td:nth-child(odd)').addClass('valid');
    $('tr:nth-child(odd) td:nth-child(even)').addClass('valid');

    $('#start').click(start);

    $('#board').on('click', '.valid.current', select);
    $('#board').on('click', 'td:not(.checker).valid', move);
  }

  function start(){
    $apple = $('td.valid[data-y = "0"],td.valid[data-y = "1"],td.valid[data-y = "2"]');
    $windows = $('td.valid[data-y = "5"],td.valid[data-y = "6"],td.valid[data-y = "7"]');
    $apple.addClass('player1 current checker');
    $windows.addClass('player2 checker');
  }

  function select(){
      selectedPiece = $(this);
      originX = $(selectedPiece).data('x');
      originY = $(selectedPiece).data('y');
      adjacentBL = $('td[data-x =' + (originX - 1) +'][data-y = ' + (originY + 1) +']');
      adjacentBR = $('td[data-x =' + (originX + 1) +'][data-y = ' + (originY + 1) +']');
      adjacentTL = $('td[data-x =' + (originX - 1) +'][data-y = ' + (originY - 1) +']');
      adjacentTR = $('td[data-x =' + (originX + 1) +'][data-y = ' + (originY - 1) +']');
      console.log(originX, originY);
      possible = true;
  }

  function move(){
    if(!possible){
      console.log('not valid');
      return;
    }else{
      selectedSpace = $(this);
      targetX = $(selectedSpace).data('x');
      targetY = $(selectedSpace).data('y');
      console.log(targetX, targetY);


      if(turn > 0){
        appleTurn();
        appleKing();

      } else if(turn < 0){
        windowsTurn();
        windowsKing();
      }

      switchPlayer();
      possible = false;
    }
  }


  function switchPlayer(){
    turn *= -1;
    console.log(turn);
    $('.player1').toggleClass('current');
    $('.player2').toggleClass('current');
  }

  function appleTurn(){
    if((originX + 1 === targetX || originX - 1 === targetX) && originY + 1 === targetY){
      selectedPiece.removeClass('player1 checker current');
      selectedSpace.addClass('player1 checker current');

    } else if((originX + 2 === targetX && originY + 2 === targetY) && adjacentBR.hasClass('player2 checker')) {
        selectedPiece.removeClass('player1 checker current');
        selectedSpace.addClass('player1 checker current');
        adjacentBR.removeClass('player2 checker');

    } else if((originX - 2 === targetX && originY + 2 === targetY) && adjacentBL.hasClass('player2 checker')) {
      selectedPiece.removeClass('player1 checker current');
      selectedSpace.addClass('player1 checker current');
      adjacentBL.removeClass('player2 checker');
    } else  {
      return;
    }
  }

  function windowsTurn(){
    if((originX + 1 === targetX || originX - 1 === targetX) && originY - 1 === targetY){
      selectedPiece.removeClass('player2 checker current');
      selectedSpace.addClass('player2 checker current');
    } else if((originX + 2 === targetX && originY - 2 === targetY) && adjacentTR.hasClass('player1 checker')) {
        selectedPiece.removeClass('player2 checker current');
        selectedSpace.addClass('player2 checker current');
        adjacentTR.removeClass('player1 checker');

    } else if((originX - 2 === targetX && originY - 2 === targetY) && adjacentTL.hasClass('player1 checker')) {
      selectedPiece.removeClass('player2 checker current');
      selectedSpace.addClass('player2 checker current');
      adjacentTL.removeClass('player1 checker');
    } else {
      return;
    }
  }

  function appleKing() {
    if(targetY === 7){
      selectedPiece.removeClass('player1 checker current');
      selectedSpace.addClass('appleKing player1 checker current');
    }
  }

  function windowsKing() {
    if(targetY === 0){
      selectedPiece.removeClass('player2 checker current');
      selectedSpace.addClass('windowsKing player2 checker current');
    }
  }

















})();
