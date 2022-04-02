const sliders = (slides, dir, prev, next) => {
  let slideIndex = 1,
      paused = false;

  const items = document.querySelectorAll(slides);

  function showSlides(n) {
    if(n > items.length) {
      slideIndex = 1;
    }
    if(n < 1){
      slideIndex = items.length;
    }

    //! приховуємо усі слайди і додаємо класи анімації
    items.forEach( item => {
      item.classList.add('animated');
      item.style.display = 'none';
    });

    items[slideIndex - 1].style.display = 'block'; //? 0 елементу слайду присвоїли блок
  }

  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  //! якщо ми не передамо кнопки, то помилок всеодно не виникне
  try {
    const prevBtn = document.querySelector(prev),
          nextBtn = document.querySelector(next);

    prevBtn.addEventListener('click', () => {
      plusSlides(-1);
      //? додаємо анімацію перелистування для попередньо виведеного слайду при його перегортуванні
      items[slideIndex - 1].classList.remove('slideInLeft');
      items[slideIndex - 1].classList.add('slideInRight');
    });
    nextBtn.addEventListener('click', () => {
      plusSlides(1);
      items[slideIndex - 1].classList.remove('slideInRight');
      items[slideIndex - 1].classList.add('slideInLeft');
    });
  } catch (err) {
    console.log(err);
  }

  //! метод для активації автослайдера
  function activateAnimation() {
     //! задаємо параметр і реалізацію автослайдера
    if(dir === 'vertical') {
      paused = setInterval(function() {
        plusSlides(1);
        items[slideIndex - 1].classList.add('slideInDown');
      }, 3000);
    } else {
      paused = setInterval(function() {
        plusSlides(1);
        items[slideIndex - 1].classList.remove('slideInRight');
        items[slideIndex - 1].classList.add('slideInLeft');
      }, 3000);
    }
  }

  activateAnimation();

  //! при наведені на слайдер відключаємо автопрокрутку слайде
  items[0].parentNode.addEventListener('mouseenter', () => {
    clearInterval(paused); //! pused - містить ідентифікатор конеретного типу слайдера
  });

  items[0].parentNode.addEventListener('mouseleave', () => {
    activateAnimation();
  });


};

export default sliders;