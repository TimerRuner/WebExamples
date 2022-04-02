const filter = () => {
  const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        btnAll = menu.querySelector('.all'),
        btnLovers = menu.querySelector('.lovers'),
        btnChef = menu.querySelector('.chef'),
        btnGirl = menu.querySelector('.girl'),
        btnGuy = menu.querySelector('.guy'),
        btnGrandmother = menu.querySelector('.grandmother'),
        btnGranddad = menu.querySelector('.granddad'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll('.all'), //! кожен елемент контейенра зфото
        markGirl = wrapper.querySelectorAll('.girl'),
        markLovers = wrapper.querySelectorAll('.lovers'),
        markChef = wrapper.querySelectorAll('.chef'),
        markGuy = wrapper.querySelectorAll('.guy'),
        no = document.querySelector('.portfolio-no');

        const typeFilter = (markType) => {
          //! приховуємо по замовчуванню усі блоки контенту і його блок при відсутніх типах
          markAll.forEach(mark => {
              mark.style.display = 'none';
              mark.classList.remove('animated', 'fadeIn');
          });

          no.style.display = "none";
          no.classList.remove('animated', 'fadeIn');

          //! якщо ми передали селектор із певними типами, то відображаємо їх, якщо ніто виводимо блокк повідомлення
          if (markType) {
              markType.forEach(mark => {
                  mark.style.display = 'block';
                  mark.classList.add('animated', 'fadeIn');
              });
          } else {
              no.style.display = 'block';
              no.classList.add('animated', 'fadeIn');
          }
      };

      btnAll.addEventListener('click', () => {
          typeFilter(markAll);
      });

      btnLovers.addEventListener('click', () => {
          typeFilter(markLovers);
      });

      btnChef.addEventListener('click', () => {
          typeFilter(markChef);
      });

      btnGuy.addEventListener('click', () => {
          typeFilter(markGuy);
      });

      btnGirl.addEventListener('click', () => {
          typeFilter(markGirl);
      });

      btnGrandmother.addEventListener('click', () => {
          typeFilter();
      });

      btnGranddad.addEventListener('click', () => {
          typeFilter();
      });

      menu.addEventListener('click', (e) => {
          let target = e.target;

          //! якщо користувач клікнув на елемент меню, то конкретно йогму присврюємо клас ктивності
          if (target && target.tagName == "LI") {
              items.forEach(btn => btn.classList.remove('active'));
              target.classList.add('active');
          }
      });
};

export default filter;