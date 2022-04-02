$(document).ready(function() {

	//!CHECKBOX
	$.each($('.checkbox'), function(index, val) {
		if($(this).find('input').prop('checked')==true){ //! в checkbox з атребутом checked додаємо клас .active
			$(this).addClass('active');
		}
	});
	$(document).on('click', '.checkbox', function(event) {
		//! при кліку на блок з .checkbox ми тоглимо .active і перевіряючи його наявність
		//! Змінюємо його параметри
		if($(this).hasClass('active')){
			$(this).find('input').prop('checked',false);
		}else{
			$(this).find('input').prop('checked',true);
		}
		$(this).toggleClass('active');

		return false;
	});

	//!RADIO
	$.each($('.radiobuttons__item'), function(index, val) {
		if($(this).find('input').prop('checked')==true){
			$(this).addClass('active');
		}
	});
	$(document).on('click', '.radiobuttons__item', function(event) {
		//! знаходомо всі інпути і видаляємо в них всі .active і в input [chacked=false]
		$(this).parents('.radiobuttons').find('.radiobuttons__item').removeClass('active');
		$(this).parents('.radiobuttons').find('.radiobuttons__item input').prop('checked',false);
		//! поточному задаємо .active і [chacked=true]
		$(this).toggleClass('active');
		$(this).find('input').prop('checked',true);
		return false;
	});
});