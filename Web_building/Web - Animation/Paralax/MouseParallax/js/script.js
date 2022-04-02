"use strict"

// Ждем загрузку контента
window.onload = function () {
	const parallax = document.querySelector('.parallax');

	if (parallax) {
		const content = document.querySelector('.parallax__container');
		const clouds = document.querySelector('.images-parallax__clouds');
		const mountains = document.querySelector('.images-parallax__mountains');
		const human = document.querySelector('.images-parallax__human');

		//? Коефіцієнти зміщення об'єкту
		const forClouds = 40;
		const forMountains = 20;
		const forHuman = 10;

		//? Скорость анимации (плавність)
		const speed = 0.05;

		//? Объявление переменных
		let positionX = 0, positionY = 0;
		let coordXprocent = 0, coordYprocent = 0;

		function setMouseParallaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;

			positionX = positionX + (distX * speed);
			positionY = positionY + (distY * speed);

			// Передаем стили
			clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`;
			mountains.style.cssText = `transform: translate(${positionX / forMountains}%,${positionY / forMountains}%);`;
			human.style.cssText = `transform: translate(${positionX / forHuman}%,${positionY / forHuman}%);`;

			requestAnimationFrame(setMouseParallaxStyle); //! указывает браузеру на то, что вы хотите произвести анимацию, и просит его запланировать перерисовку на следующем кадре анимации. В качестве параметра метод получает функцию, которая будет вызвана перед перерисовкой.
		}
		setMouseParallaxStyle();

		parallax.addEventListener("mousemove", function (e) {
			//? Получение ширины и высоты блока
			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;

			//? Ноль по середине - координти центру
			const coordX = e.pageX - parallaxWidth / 2;
			const coordY = e.pageY - parallaxHeight / 2;

			//? Получаем проценты
			coordXprocent = coordX / parallaxWidth * 100;
			coordYprocent = coordY / parallaxHeight * 100;
		});

		//! Parallax при скролле

		let thresholdSets = []; //? масив чисел, який викоистовуватиметься, як параметр об'єкта, що вказує пр якому проценті видимості ключового елемента спрацює callback
		for (let i = 0; i <= 1.0; i += 0.005) {
			thresholdSets.push(i);
		}
		const callback = function (entries, observer) { //! callback даного методу
			const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100; //? визначаємо процент скролу
			setParallaxItemsStyle(scrollTopProcent);
		};
		const observer = new IntersectionObserver(callback, { //! метод викликається всякий раз при перетині його із областю ваидимості документа
			threshold: thresholdSets
		});

		observer.observe(document.querySelector('.content')); //! вказуємо елемент для спрацювання target при перетині його з областю видимості

		function setParallaxItemsStyle(scrollTopProcent) {
			content.style.cssText = `transform: translate(0%,-${scrollTopProcent / 9}%);`;
			mountains.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
			human.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 3}%);`;
		}


	}
}