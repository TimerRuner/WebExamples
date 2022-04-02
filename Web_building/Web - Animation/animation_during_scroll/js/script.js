
const animItems = document.querySelectorAll('._anim-items'); //? діжурний клас для елементів із анімацією

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	//! у кожного елемента із класом _anim-items при досягненні скролом 1\4 його висоти чи висоти вікна браузера, якщо елемент більший за висоту вікна браузера йому добавляється клас .active, якщо ми не докрутили або перекрутили, то клас видаляється
		function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;//? отримуємо висоту даного елемента
			const animItemOffset = offset(animItem).top;//? отримуємо позицію елемента відносно верху сторінки (метод заготовлений із інтернету)
			const animStart = 4;//? коефіцієнт для регуляції моменту старту анімації (в даному випадку це буде четвверта частина величини блоку)

			//! Змінна для визначення точки старту анімації
			let animItemPoint = window.innerHeight - animItemHeight / animStart;//? висота вікна браузера - висота даного елемента / на коефіцієнт (якщо елемент меньше за висоту вікна браузера)
			if (animItemHeight > window.innerHeight) {//! переірка чи висота елемента вище висоти браузера
				animItemPoint = window.innerHeight - window.innerHeight / animStart; //? (якщо елемент меньше за висоту вікна браузера)
			}
			//! якщо к-сть проскролених пікселів  > ніж позиція об'єкта - точка старту, але меньше ніж позиція об'єкта + його висота
			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {//! клас призначений для заборони повторного виклику анімації
					animItem.classList.remove('_active');
				}
			}
		}
	}

	//! метод для коректного отримання позиції елемента відносно верху і лівої  сторони сторінки
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	//! виконуємо метод і без сколу для елементів, які при старті уже в фокусі із затримкою
	setTimeout(() => {
		animOnScroll();
	}, 300);
}