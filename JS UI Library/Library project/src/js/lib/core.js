// //! файл-ядро бібліотеки - ініціалізація об'єкта

const $ = function(selector) {
  return new $.prototype.init(selector); //! при кожному виклику даного метода і передачі селектора - буде створбватись новий об'єкт
}


//! створюємо метод в прототипі
$.prototype.init = function(selector) {
  if(!selector) {
    return this; //? {}
  }

  if(selector.tagName) {//! якщо в цього елемента є дана властивість, то нам передали html елемент, а не об'єкт елемента
    this[0] = selector;
    this.length = 1;
    return this;
  }

  Object.assign(this, document.querySelectorAll(selector)); //! копіюємо результат виконання пошуку методу в вигляді об'єкту в даний об'єкт
  this.length = document.querySelectorAll(selector).length;
  return this;
};

$.prototype.init.prototype = $.prototype; //! в прототип об'єкту, який нам повернеться, записуємо об'єкт даного методу ( тепер на об'єкті, створеному завдяки методу $, ми зможемо використати методи, які будуть записані в прототип даного методу )

window.$ = $; //! створили глобальний метод, який ми викликатимемо по даному символу

export default $; //! для роботи із даним об'єктом в інших файлах