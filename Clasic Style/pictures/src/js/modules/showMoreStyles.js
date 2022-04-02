import {getResource} from '../services/requests';

const showMoreStyles = (trigger, wrapper) => {
  const btn = document.querySelector(trigger);

  //! візуалізація готових карточок
  //const cards = document.querySelectorAll(styles)
  // cards.forEach(card => {
  //   card.classList.add('animated', 'fadeInUp'); //! додаємо клас для плавної анімації
  // });

  // btn.addEventListener('click', () => {
  //   cards.forEach(card => {
  //       card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
  //       card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
  //   });
  //   btn.remove();
  // });

  btn.addEventListener('click', function() {
    getResource('assets/db.json')
      .then(res => createCards(res.style))
      .catch(err => console.log(err));

    this.remove();
  });

  //! метод отримання відповіді від сервера з даними
  function createCards(response) {
    response.forEach(({src, title, link}) => {
      let card = document.createElement('div');
      card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

      //! створюємо структуру картки
      card.innerHTML = `
        <div class="styles-block">
          <img src=${src} alt>
          <h4>${title}</h4>
          <a href="${link}">Подробнее</a>
        </div>
      `;

      document.querySelector(wrapper).appendChild(card); //! картка створена вище передаватиметься в розмітку
    });
  }

};

export default showMoreStyles;