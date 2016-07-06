$(".warp").find('li').hover(function(){
$(this).find('img').stop(true,true).animate({width:360,height:270,left:-30,top:-23},200);
$(this).find('.desc').stop(true,true).animate({bottom:0},200);
},function(){
$(this).find('img').stop(true,true).animate({width:300,height:225,left:0,top:0},200);
$(this).find('.desc').stop(true,true).animate({bottom:-30},200);
});