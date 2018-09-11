"use strict";


$(function() {
  //ハート入力
  $('.di-input__heart').each(function() {
    for (var i = 0; i < 5; i ++) {
      $(this).append('<span>');
    }
  });
  $('.di-input__heart > span').on('click', function() {
    var index = $(this).index();
    $(this).siblings().removeClass('on');
    for (var i = 0; i < index; i++) {
      $(this).parent().find('span').eq(i).addClass('on');
    }
    $(this).parent().find('.di-input__heart').attr('value', index);
  });

  if(page == "m/diary/top"){
    $(".di-input__heart span:nth-child(-n+4)").addClass("on");
  }

  //指定の日付取得
  $('.days').click(function(){
    var str = $(this).data("date");
    $('#dateTime').text(str);
    $('input:hidden[name="datetime"]').val(str);
  });

});

//モーダル
function jsDialog(dialog,title,contents){
  $(dialog).removeClass('hide');
  $(this).blur();
  if($("#js-dialog__overlay")[0]) return false;
  $("body").append('<div id="js-dialog__overlay"></div>');
  $("#js-dialog__overlay").fadeIn("slow");

  centeringModalSyncer() ;
  $(".js-dialog__content").fadeIn("slow");
  $(".js-dialog__content h4").text(title);
  $(".js-dialog__inner").html(contents);
  $("#js-dialog__overlay,.js-dialog__close").unbind().click(function(){
    $(".js-dialog__hide").addClass('hide');
    $(".js-dialog__content,#js-dialog__overlay").fadeOut("slow" , function(){
      $('#js-dialog__overlay').remove();
    });
  });
}

//削除ボタンを押したらダイアログを表示
$(".js-dialog__open").click(function(){
  jsDialog("#js-dialog__area", "本当に削除する？", '<div class="di-btn__space"><a class="di-btn di-btn__defa" href="t.cgi?t=m/diary/list&<!--DEF_P-->">削除する</a></div><div class="di-btn__space"><button class="di-btn di-btn__del js-dialog__close">削除しない</button></div>');
});


$( window ).resize( centeringModalSyncer ) ;

//センタリング
function centeringModalSyncer() {

  var w = $( window ).width() ;
  var h = $( window ).height() ;

  //    var cw = $( "#modal-content" ).outerWidth( {margin:true} );
  //    var ch = $( "#modal-content" ).outerHeight( {margin:true} );
  var cw = $( ".js-dialog__content" ).outerWidth();
  var ch = $( ".js-dialog__content" ).outerHeight();

  //センタリングを実行
  $(".js-dialog__content").css({"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"});
}
