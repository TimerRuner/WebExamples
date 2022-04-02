import $ from '../core';

$.prototype.modal = function(created) {
  for(let i = 0; i < this.length; i++) {
    const target = this[i].getAttribute('data-target'); //! отримуємо ід підв'язаного модального вікна
    $(this[i]).click((e) => {
      e.preventDefault();
      $(target).fadeIn(500);
      document.body.style.overflow = "hidden"; //! забороняємо прокручуватись сторінці під модальним вікном
    });

    const closeElements = document.querySelectorAll(`${target} [data-close]`);
    closeElements.forEach(elem => {
      $(elem).click(() => {
        $(target).fadeOut(500);
        document.body.style.overflow = '';
        if(created) { //! визначаємо чи створене дане вікно з допомогою скріпта
          document.querySelector(target).remove();
        }
      });
    });

    $(target).click(e => {
      if(e.target.classList.contains('modal')){
        $(target).fadeOut(500);
        document.body.style.overflow = '';
        if(created && $(target).fadeOut(500)) {
          document.querySelector(target).remove();
        }
      }
    });
  }


};

$('[data-toggle="modal"]').modal(); //! до усіх кнопок із даним атребутом ми засосовуємо наш метод


//! функціонал для динамічного створення модального вікна
$.prototype.createModal = function({text, btns} = {}) {
  for(let i = 0; i < this.length; i++) {
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute('id', this[i].getAttribute('data-target').slice(1)); //! встановлюємо модальному вікну атребут, який міститься в дата атребуті елемента трігера (кнопки)

    // btns = {count, settings: [[text, classNames=[], close, cb]]}
    const buttons = []; //! node масив із кнопками
    for(let j = 0; j < btns.count; j++){
      let btn = document.createElement('button');
      btn.classList.add('btn', ...btns.settings[j][1]);
      btn.textContent = btns.settings[j][0];
      if(btns.settings[j][2]){
        btn.setAttribute('data-close', 'true');
      }
      if(btns.settings[j][3] && typeof(btns.settings[j][3]) === 'function') { //! якщо кнопка містить даний параметр і він функція
        btn.addEventListener('click', btns.settings[j][3]);
      }

      buttons.push(btn);
    }

    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
            <button class="close" data-close>
                <span>&times;</span>
            </button>
            <div class="modal-header">
                <div class="modal-title">
                    ${text.title}
                </div>
            </div>
            <div class="modal-body">
                ${text.body}
            </div>
            <div class="modal-footer">

            </div>
        </div>
      </div>
    `;


    modal.querySelector('.modal-footer').append(...buttons); //! щоб наші кнопки не втратили увесь свій функціонал, ми закидуємо туди масив наших елементів
    document.body.appendChild(modal);
    $(this[i]).modal(true); //! прив'язуємо трігер під новостворений елемент
    $(this[i].getAttribute('data-target')).fadeIn(500);
  }
};