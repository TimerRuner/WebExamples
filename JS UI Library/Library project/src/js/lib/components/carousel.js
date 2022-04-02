import $ from '../core';

$.prototype.carousel = function() {
    for (let i = 0 ;i < this.length; i++) {
        const width = window.getComputedStyle(this[i].querySelector('.carousel-inner')).width; //! вираховуємо ширину батківського елемента для подальшого використання в усьому коді
        const slides = this[i].querySelectorAll('.carousel-item');
        const slidesField = this[i].querySelector('.carousel-slides');
        const dots = this[i].querySelectorAll('.carousel-indicators li');

        slidesField.style.width = 100 * slides.length + '%';//! виставляємо ширину, яка буде підлаштовуватись під к-сть слайдів, приховуючи усі окрім одного, завдяки однакови розмірам кожного
        slides.forEach(slide => {
            slide.style.width = width; //! встановлюємо кожному слайду ширину його батька
        });

        let offset = 0; //! визначає позицію блоку зі слайдами на сторінці
        let slideIndex = 0;//! індекс дотс елементів

        $(this[i].querySelector('[data-slide="next"]')).click((e) => {
            e.preventDefault();
            if (offset == (+width.replace(/\D/g, '') * (slides.length - 1))) {//! якщо ми дійшли до кінця слайдера, визначивши це за його змінною, обнуляємо її
                offset = 0;
            } else {
                offset += +width.replace(/\D/g, ''); //! якщо ми не дійшли до кінця, то в змінну добавляємо ширину нашого контейнера, вирізавши перед цим число із строки
            }

            slidesField.style.transform = `translateX(-${offset}px)`;//! зсовуємо контейнер разом із слайдами на велечину визначену вище

            //! поступове переміщення по дот елементах
            if (slideIndex == slides.length - 1) {
                slideIndex = 0;
            } else {
                slideIndex++;
            }
            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active');
        });

        $(this[i].querySelector('[data-slide="prev"]')).click((e) => {
            e.preventDefault();
            if (offset == 0) { //! якщо слайд перший, то присвоюємо йому величину останнього
                offset = +width.replace(/\D/g, '') * (slides.length - 1);
            } else {
                offset -= +width.replace(/\D/g, ''); //! якщо ні, то присвоюємо віднімаємо ширину слайду
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == 0) {
                slideIndex = slides.length - 1;
            } else {
                slideIndex--;
            }
            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active');
        });

        //! переміщення слайдів по точкам навігації
        const sliderId = this[i].getAttribute('id'); //! для підвищення пріорітетності
        $(`#${sliderId} .carousel-indicators li`).click(e => {
            const slideTo = e.target.getAttribute('data-slide-to');//! отримуємо в значення індекс слайду записаного в дата атребуті із яким він пов'язаний

            slideIndex = slideTo;
            offset = +width.replace(/\D/g, '') * slideTo;

            slidesField.style.transform = `translateX(-${offset}px)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active');
        });
    }
};

$('.carousel').carousel();