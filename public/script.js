
$(function(){var pageTopBtn=$('#page-top');var height=100;if($(this).scrollTop()<height){pageTopBtn.hide();}
$(window).scroll(function(){($(this).scrollTop()>height)?pageTopBtn.fadeIn():pageTopBtn.fadeOut();});pageTopBtn.click(function(){$("html,body").animate({scrollTop:0},'slow');});$(".button-collapse").sideNav();(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.9&appId=1158144580925371";fjs.parentNode.insertBefore(js,fjs);}(document,'script','facebook-jssdk'));});