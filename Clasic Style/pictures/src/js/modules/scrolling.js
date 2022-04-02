const scrolling = (upSelector) => {

  const upElem = document.querySelector(upSelector);

  //! проявляє елемент при скролі до певної відстані
  window.addEventListener('scroll', () => {
    if(document.documentElement.scrollTop > 1650) {
      upElem.classList.add('animated', 'fadeIn');
      upElem.classList.remove('fadeOut');
    } else {
      upElem.classList.add('fadeOut');
      upElem.classList.remove('fadeIn');
    }
  });

 //! Scrolling with request animation frame---------------------------------------------------------------------

  let links = document.querySelectorAll('[href^="#"]'), //? шукаю всі посилання, які вміст атрибуту яких посинається з #
      speed = 0.3;

  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      let widthTop = document.documentElement.scrollTop,
          hash = this.hash,
          toBlock = document.querySelector(hash).getBoundingClientRect().top, //? верхня границя елемента до якого ми будемо скролити
          start = null;

      requestAnimationFrame(step);

      function step(time){
        if(start === null){
          start = time;
        }

        let progress = time - start,
            r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));
        document.documentElement.scrollTo(0, r);

        if(r != widthTop + toBlock){ //! якщо ми долистали до потрібного пікселя то закінчуєо анімацію
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  });


  //! Pure js scrolling ----------------------------------------------------------------------------------------
  // const element = document.documentElement,
  //       body = document.body;

  // const calcScroll = () => {
  //   upElem.addEventListener('click', function(event) {
  //     let scrollTop = Math.round(body.scrollTop || element.scrollTop); //? викоистаємо результат того методу, який об'явиться //? визначаємо скільки пікселів користувач уже пролистав
  //     if(this.hash !== ''){

  //       event.preventDefault();

  //       let hashElement = document.querySelector(this.hash), //?отримуємо елемент по id взятому із хеша локального посилання по якому ми клікаємо
  //           hashElementTop = 0; //? к-сть елементів до необхідного нам блоку

  //       while(hashElement.offsetParent) { //! перебераємо всіх існуючих батьків елемента (визначаємо к-сть елементів)
  //         hashElementTop += hashElement.offsetTop; //! накопичуємо к-сть пукселів, які нам необхідні щоб дістатись вершини сайту
  //         hashElement = hashElement.offsetParent; //! з кожною ітерацією, ми відштовхуватимемось від батька попереднього елемента і так до кінця
  //       }

  //       hashElementTop = Math.round(hashElementTop); //! завкруглюємо
  //       smooshScroll(scrollTop, hashElementTop, this.hash);
  //     }
  //   });
  // };

  // const smooshScroll = (from, to, hash) => {
  //   let timeInterval = 1,
  //       prevScrollTop,
  //       speed;

  //   if(to > from) {
  //     speed = 30;
  //   } else {
  //     speed = -30;
  //   }

  //   let move = setInterval(function() {
  //     let scrollTop = Math.round(body.scrollTop || element.scrollTop); //? ще раз отримуємо змінну, так як вона може мінятись при нових анімаціях

  //     if(
  //       //! точна умова, що нам нікуди рухати сторінку
  //       prevScrollTop === scrollTop ||
  //       (to > from && scrollTop >= to) ||
  //       (to < from && scrollTop <= to)
  //     ){
  //       clearInterval(move);
  //       history.replaceState(history.state, document.title. location.href.replace(/#.*$/g, '') + hash);
  //     } else {
  //       body.scrollTop += speed;
  //       element.scrollTop += speed;
  //       prevScrollTop = scrollTop;
  //     }
  //   }, timeInterval);
  // };

  // calcScroll();
};

export default scrolling;