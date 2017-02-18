/**
 * Created by Administrator on 2017/1/23 0023.
 */
"use strict";
$(function (e) {//导航栏
    var color=['#FBB92E','#B4F62F','#3FF7F3','#3A97FA','#D544F6'];
    var m = 0,n=0;
    function updataN() {
        n = $('.nav-bar li').index($('.nav-bar li.active'));
    }
    updataN();
    $('.top-line').animate({left:(n*101+1)+"px"});
    $('.top-line').css('background',color[n]);
    $(".nav-bar").on('mouseenter','li',function(){//移入移出事件
        updataN();
        m = $('.nav-bar li').index($(this));
        var i = n-m;
         $(this).addClass('active').siblings('.active').removeClass('active');
        $('.top-line').stop().animate({left:(n*101+1+i*5)+"px"},50*(i>0?i:-i)+100,'swing',function(){
            $('.top-line').stop().animate({left:(m*101+1-i*8+5)+"px"},300,'swing',function(){
                $('.top-line').stop().animate({left:(m*101+1)+"px"},100,'swing');
            });
        });
        updataN();
        $('.top-line').css('background',color[n]);
    }).on('mouseleave','li',function(){
        updataN();
        var k =$('.nav-bar li').index($('.nav-bar li.on'));
        var j = n-k;
        if(j!=0){
            $('.top-line').stop().animate({left:(n*101+1+j*5)+"px"},50*(j>0?j:-j)+100,'swing',function(){
                $('.top-line').stop().animate({left:(k*101+1-j*8+5)+"px"},300,'swing',function(){
                    $('.top-line').stop().animate({left:(k*101+1)+"px"},100,'swing',function(){
                        $('.nav-bar li.on').addClass('active').siblings('.active').removeClass('active');
                    });
                });
            });
        }
        $('.top-line').css('background',color[k]);
    });
    $(".nav-bar").on('click','li',function(){//点击事件
        $(this).addClass('on').siblings('.on').removeClass('on');
    });

    $('.menu').click(function(){
        $('.shade').fadeToggle();
        $(this).toggleClass('active');
    });
});

$(function(){//fullPage回调函数
    var rankArr = ['了解','熟悉','熟练','精通','大神'];
    var rankScore = ['75%','65%','75%','60%','60%','60%'];
    var width = $('.skill-v').width();
    function rank(ele){
            var i=0;
            var nWidth = $(ele).width();
            var n = nWidth/width;
            //console.log(n);
            if(0<n<=0.2){
                i = 0;
            }else if(0.2<n<=0.4){
                i = 1;
            }else if(0.4<n<=0.6){
                i = 2;
            }else if(0.6<n<=0.8){
                i = 3;
            }else if(0.8<n){
                i = 4;
            }
            $('.skill-des').html(rankArr[i]);
    }
    $('main').fullpage({
        sectionsColor: ['#eee', '#eee', '#eee', '#eee'],
        afterLoad: function(anchorLink, index){
            if(index == 2){
                $('.vessel .skill-v .skill').each(function(index,ele){
                    var timer = setInterval(function(){
                        rank(ele);
                    },100);
                    $(ele).stop().animate({
                        width: rankScore[index]
                    }, 1500, 'easeOutExpo',function(){
                        clearInterval(timer);
                        timer=null;
                    });
                });
            }
        //     if(index == 3){
        //         $('.section3').find('p').delay(500).animate({
        //             bottom: '0'
        //         }, 1500, 'easeOutExpo');
        //     }
        //     if(index == 4){
        //         $('.section4').find('p').fadeIn(2000);
        //     }
        },
        onLeave: function(index, direction){
            if(index == '2'){
                $('.skill').stop().animate({
                    width: '15%'
                }, 500, 'easeOutExpo',function(){
                    $('.skill-des').html('了解');
                });
            }
        //     if(index == '3'){
        //         $('.section3').find('p').delay(500).animate({
        //             bottom: '-120%'
        //         }, 1500, 'easeOutExpo');
        //     }
        //     if(index == '4'){
        //         $('.section4').find('p').fadeOut(2000);
        //     }
        }
    });
});