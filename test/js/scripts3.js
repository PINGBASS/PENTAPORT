/* JavaScript for Chapter 10 Example 3 */

var slider = $('#featured-carousel');

function carouselInit(carousel)	{
var slides = slider.find('li');
slider.before('<span id="page-controls"><span id="pages"></span></span>');

var pages = $('#pages');
/*for (i=1; i<=slides.length; i++) {
  pages.append('<a href="#">' + i + '</a>');
}

pages.find('a').bind('click', function(){
  carousel.scroll($.jcarousel.intval($(this).text()));
  $(this).siblings('.current').removeClass('current');
  $(this).addClass('current');
  return false;
}).filter(':first').click();
*/
var controls = $('#page-controls');
/* 이전 다음으로 버튼이미지 수정은 아래처럼 수정
controls.prepend('<a href="#" id="prev"><img src="" alt="" /></a>');
controls.append('<a href="#" id="next"><img src="" alt="" /></a>');
*/
controls.prepend('<a href="#" id="prev">&laquo;</a>');
controls.append('<a href="#" id="next">&raquo;</a>');

$('#prev').bind('click', function(){
  carousel.prev();
  var current = pages.find('.current');
  if ( current.prev().length ) { current.removeClass('current').prev().addClass('current'); }
  return false;
});

$('#next').bind('click', function() {
  carousel.next();
  var current = pages.find('.current');
  if ( current.next().length ) { current.removeClass('current').next().addClass('current'); }
  return false;
});
}

$(document).ready(function(){
	slider.jcarousel({
		scroll: 1,
		auto:0,
		animation:600,
		buttonNextHTML: null,
		buttonPrevHTML: null,
		initCallback: carouselInit
	});
});
