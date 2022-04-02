//! модуль із функціоналом для роботи із класами
import $ from '../core';

$.prototype.addClass = function(...classNames) {

  for(let i = 0; i < this.length; i++) {
    if(!this[i].classList) { //! якщо такої властивості в нашому елементі немає, ми його пропускаємо
      continue;
    }
    this[i].classList.add(...classNames);
  }

  return this;
};

$.prototype.removeClass = function(...classNames) {

  for(let i = 0; i < this.length; i++) {
    if(!this[i].classList) { //! якщо такої властивості в нашому елементі немає, ми його пропускаємо
      continue;
    }
    this[i].classList.remove(...classNames);
  }

  return this;
};

$.prototype.toggleClass = function(classNames) {

  for(let i = 0; i < this.length; i++) {
    if(!this[i].classList) { //! якщо такої властивості в нашому елементі немає, ми його пропускаємо
      continue;
    }
    this[i].classList.toggle(classNames);
  }

  return this;
};

