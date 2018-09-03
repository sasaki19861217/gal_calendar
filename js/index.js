"use strict";

//ハート入力
$(function() {
  $('.di-input__heart').each(function() {
    for (var i = 0; i < 5; i ++) {
      $(this).append('<a>');
    }
  });
  $('.di-input__heart>a').on('click', function() {
    var index = $(this).index();
    $(this).siblings().removeClass('on');
    for (var i = 0; i < index; i++) {
      $(this).parent().find('a').eq(i).addClass('on');
    }
    $(this).parent().find('.di-input__heart').attr('value', index);
  });
});

//モーダル
function jsDialog(dialog){
  $(dialog).removeClass('hide');
  $(this).blur();
  if($("#js-dialog__overlay")[0]) return false;
  $("body").append('<div id="js-dialog__overlay"></div>');
  $("#js-dialog__overlay").fadeIn("slow");

  centeringModalSyncer() ;
  $(".js-dialog__content").fadeIn("slow");

  $("#js-dialog__overlay,.js-dialog__close").unbind().click(function(){
    $(".js-dialog__hide").addClass('hide');
    $(".js-dialog__content,#js-dialog__overlay").fadeOut("slow" , function(){
      $('#js-dialog__overlay').remove();
    });
  });
}

//削除ボタンを押したらダイアログを表示
$(".js-dialog__open").click(function(){
  jsDialog("#js-dialog__del");
});


$( window ).resize( centeringModalSyncer ) ;

//センタリング
function centeringModalSyncer() {

  var w = $( window ).width() ;
  var h = $( window ).height() ;

  //		var cw = $( "#modal-content" ).outerWidth( {margin:true} );
  //		var ch = $( "#modal-content" ).outerHeight( {margin:true} );
  var cw = $( ".js-dialog__content" ).outerWidth();
  var ch = $( ".js-dialog__content" ).outerHeight();

  //センタリングを実行
  $(".js-dialog__content").css({"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"});
}
