"use strict";

//ハート入力
//$(function(){
//  $('.di-input__heart').each(function() {
//    for (var i = 0; i < 5; i ++) {
//      $(this).append('<span>');
//    }
//  });
//  $('.di-input__heart > span').on('click', function() {
//    var index = $(this).index();
//    $(this).siblings().removeClass('on');
//    for (var i = 0; i < index; i++) {
//      $(this).parent().find('span').eq(i).addClass('on');
//    }
//    $(this).parent().find('.di-input__heart').attr('value', index);
//  });
//
//  if(page == "m/diary/top"){
//      $(".di-input__heart span:nth-child(-n+4)").addClass("on");
//  }
//
//});


$(function(){

  //指定の日付取得
  $('.days').click(function(){
      var str = $(this).data("date");
      $('#moon').text(str);
      $('input:hidden[name="diary_date"]').val(str);
  });

  //日記本文文字カウント
  $('#diary').bind('keyup',function(){
      var thisValueLength = $(this).val().length;
      $('.count').html(thisValueLength + '/4000');
  });

  //「今日」ボタン押下
  $('#js-btn-today').on('click', function(){
      $('input:hidden[name="diary_date"]').val(todayDate);
  });

  //「先週」ボタン押下
  $('div[role^="prev"]').on('click', function(){
      var prevDate = $('#js-week-prev div:nth-child(1)').data('date');
    console.log(prevDate);
    $('#moon').text(prevDate);
      $('input:hidden[name="diary_date"]').val(prevDate);
  });

});


//モーダル
function jsDialog(dialog,title,contents,id,page1,page2,cate1,cate2,ym1,ym2,and,zspid,content2){
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

//listのキャプション
$('.di-list__caption').each(function(){
  if ($(this).text().length > 30) {
    $(this).text($(this).text().substr(0, 27));
    $(this).append('…');
  }
});

//listのタイトル
$('.di-list__DiTitle').each(function(){
  var w = $(window).width();
  console.log(w);
  if ($(this).text().length >= 10) {
    $(this).text($(this).text().substr(0, 8));
    $(this).append('…');
  }
});

//listの削除ボタン
$('.di-list__LiBox .js-dialog__open').on('click', function(){
    var targetLink = $(this).parent().parent().find("li a").attr('href'),
         delTarget = targetLink.substr(18),
         elem = '<div class="di-btn__space"><a class="di-btn di-btn__defa" href="t.cgi?t=m/diary/del' + delTarget + '">削除する</a></div><div class="di-btn__space"><button class="di-btn di-btn__del js-dialog__close">削除しない</button></div>';
    console.log(elem);
    jsDialog("#js-dialog__area", "本当に削除する？", elem);
});


//削除ボタンを押したらダイアログを表示
$(".js-dialog__open").click(function(){
  jsDialog("#js-dialog__area", "本当に削除する？", elem);
});


$(window).on('load',function(){
  var url = location.search.substr(3,10);
  if(url == 'm/diary/bn'){
    if(save == 1 ){
      jsDialog("#js-dialog__area","日記を保存したよ！", elem2);
    }
var url =$(location).attr('search'),
url = url.replace("&saveok=1", "");
console.log(url);
history.replaceState('', '', url);
  }
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


//日記一覧スワイプ
var tsJqSwipeX = -1;
var tsJqSwipeY = -1;

$(function(){

  if ('ontouchstart' in window) {
     // スワイプ処理

     $("li.di-list__date").bind("touchstart", function(){
         tsJqSwipeX = event.changedTouches[0].pageX;
         tsJqSwipeY = event.changedTouches[0].pageY;
     });
     $("li.di-list__date").bind("touchend", function(){
         tsJqSwipeX = -1;
         flag = 0;
     });
     $("li.di-list__date").bind("touchmove", function(){
         if (Math.abs(event.changedTouches[0].pageY - tsJqSwipeY) > 10) tsJqSwipeX = -1;
         if (tsJqSwipeX != -1 && Math.abs(event.changedTouches[0].pageX - tsJqSwipeX) > 35) {
             tsJqSwipeX = -1;
             // スワイプられた時の処理
              $('li.di-list__date').animate({"margin-left":"0"},"fast");
              $('li.di-list__date a').css('pointer-events','auto');
              if($(this).css("margin-left") == "0px"){
                $('a',this).css('pointer-events','none');
                $(this).animate({"margin-left":"-45%"},"fast");
              }else{
                $('li.di-list__date a').css('pointer-events','auto');
                $('li.di-list__date').animate({"margin-left":"0"});
              }
         }
     });
  } else {
    console.log("PCだよ");
  }

  $(".edit").hide();
  $("li.di-list__date").hover(
    function(){
      $(".edit",this).fadeIn("slow");
    },
    function(){
      $(".edit").fadeOut("slow");
    });


  $(".edit").on('click', function(){
      $('li.di-list__date').animate({"margin-left":"0"},"fast");
      $('li.di-list__date a').css('pointer-events','auto');
      if($(this).parent("li").css("margin-left") == "0px"){
        $(this).css("display","block");
        $('+a',this).css('pointer-events','none');
        $(this).parent("li").animate({"margin-left":"-45%"},"fast");
      }else{
        $('li.di-list__date a').css('pointer-events','auto');
        $('li.di-list__date').animate({"margin-left":"0"});
        $(this).fadeOut("slow");
      }
  })

});
