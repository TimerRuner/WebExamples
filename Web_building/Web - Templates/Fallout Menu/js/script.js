let isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};
		let body=document.querySelector('body');
if(isMobile.any()){//! метод, який дає зрозуміти, що ми перейшли на tachScreen
		body.classList.add('touch');//? клас, завдяки якому ми розділяємо стилі touchscreen and descktop
		let arrow=document.querySelectorAll('.arrow');//? клас завдяки якому ми виславляємо необхідні стилі лише в необхідних місцях
	for(i=0; i<arrow.length; i++){
			let thisLink=arrow[i].previousElementSibling;//! елемент перед срілкою(посилання)
			let subMenu=arrow[i].nextElementSibling;//! елемент після стрілки(пілменюшка)
			let thisArrow=arrow[i];//! елемент стрілка

			thisLink.classList.add('parent');//! щоб відсунути текст при виникненні посилання лише в цих об'єктах
		arrow[i].addEventListener('click', function(){
			subMenu.classList.toggle('open');//! відкриється підменю при кліку
			thisArrow.classList.toggle('active');//! стрілка поміняє стилі при кліку
		});
	}
}else{
	body.classList.add('mouse');
}
