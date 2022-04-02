$(document).ready(function() {
	$('.block__title').click(function(event) {
		if($('.block').hasClass('one')){//! завдяки цьому класу може бути відкритим лише один спойлер за раз
			$('.block__title').not($(this)).removeClass('active');//! забираємо клас 'one', у всіх, окрім нажатого
			$('.block__text').not($(this).next()).slideUp(300);//! прихховати усі блоки із текстом, окрім  даного
		}
		$(this).toggleClass('active').next().slideToggle(300);//! next()-наступний елемент після
	});
});