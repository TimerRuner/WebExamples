//! модуль для функціоналу працюючого із властивістю елемента display
import $ from '../core';

$.prototype.show = function() {
  for(let i = 0; i < this.length; i++){
    if(!this[i].style) { //! якщо такої властивості в нашому елементі немає, ми його пропускаємо
      continue;
    }

    this[i].style.display = '';
  }

  return this;
};

$.prototype.hide = function() {
  for(let i = 0; i < this.length; i++){
    if(!this[i].style) { //! якщо такої властивості в нашому елементі немає, ми його пропускаємо
      continue;
    }

    this[i].style.display = 'none';
  }

  return this;
};

$.prototype.toggle = function() {
  for(let i = 0; i < this.length; i++){
    if(!this[i].style) { //! якщо такої властивості в нашому елементі немає, ми його пропускаємо
      continue;
    }

    if(this[i].style.display === 'none'){
      this[i].style.display = '';
    } else {
      this[i].style.display = 'none';
    }

  }

  return this;
};