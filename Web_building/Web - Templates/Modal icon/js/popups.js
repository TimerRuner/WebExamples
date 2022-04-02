const popupLinks = document.querySelectorAll('.popup-link');//! для вішання подій на усі посилання з даним класом
const body = document.querySelector('body');//!елемент для блокування скролу
const lockPadding = document.querySelectorAll(".lock-padding"); //! клас, який добавляється фіксованим елементам

let unlock = true; //! блокуэмо відкриття попапа на певний час, щоб унеможливти різке відкриття одного і того ж декілька раз

const timeout = 800; //? значення взято із властивості transition

//! відкриваємо попап
if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');//! отримуємо id елемента, переданого, як якірне посилання
			const curentPopup = document.getElementById(popupName);//! отримуємо елемент за id
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}

//! закриваємо popap
const popupCloseIcon = document.querySelectorAll('.close-popup'); //! отримуємо усі елементи призначені закрити попап
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));//! передаєм найближчого батька з класом попап
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');//! якщо є відкритий попап, то код нижче його закриває
		//! якщо відкритий 1 попап, то відбудеться блокування скролу, якщо якийсь попап уже відкритий, то відключаємо блокування скролу, так як він уже заблокований
		if (popupActive) {
			popupClose(popupActive, false);//! другий параметр вказує, що нам не треба активовувати блокування скролу
		} else {
			bodyLock();//! блочим скрол для баді
		}
		curentPopup.classList.add('open');//? задаєм стилі для відкриття попапа
		curentPopup.addEventListener("click", function (e) {//! для вішання кліку на темну облість
			if (!e.target.closest('.popup__content')) {//! уникаєм елементів, які не належать до тесної області
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}


//! забороняємо контенту під моальним вікном скролитись + добавляємо падінг збоку при зникненні скролу для коректнго відображення контенту
function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';//! визначаємо ромір скролу

	//! доставляємо паддінг і фіксованим елементам, які не відносяться до body
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;//! блочить выдкриття попапа на час виконання анімацї, щоб унеможливити раптове повторне выдкриття того ж попапа
	setTimeout(function () {
		unlock = true;
	}, timeout);
}


//! розблоковуємо скрол, щоб скрол появлявсь лише після закінчення анімації
function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}


//! закриваємо попап по esc
document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});


//! поліфіл для підтримки closest i mathches старими браузерами
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
