//! модуль для роботи із контентом елемента
import $ from '../core';

//! отримання \ внесення текстового контенту
$.prototype.html = function(content) {
  for(let i = 0; i < this.length; i++){
    if(content){
      this[i].innerHTML = content;
    } else {
      return this[i].innerHTML;
    }
  }
  return this;
};

//! отримуємо лише один елемент за індексом
$.prototype.eq = function(i) {
  const swap = this[i]; //! отримуємо поточний елемент
  const objectLength = Object.keys(this).length; //? отримуємо к-сть елементів в масиві

  for(let i = 0; i < objectLength; i++){
    delete this[i]; //! для збереженян можливостей використовувати методи $ - ми працюватимемо з об'єктом this, а не стороннім об'єктом
  }

  this[0] = swap;
  this.length = 1;

  return this;
};

//! отримуємо індекс елемента в своєму батькові (передбачено лише один елемент)
$.prototype.index = function() {
  const parent = this[0].parentNode; //! знаходимо батька
  const childs = [...parent.children]; //! отримуємо масив усіх дочініх елементів даного батька

  const findMyIndex = (item) => {
    return item == this[0]; //! функція-колбек поверне лише той елемент із яким зійдеться порівняння, тобто шукаємий нами елемент (а метод findIndex поверне його індекс)
  };

  return childs.findIndex(findMyIndex);
};

//! знаходимо в обраному раншіше об'єкті елементи по переданому селекторі і працюємо із ними
$.prototype.find = function(selector) {
  let numberOfItems = 0; //? к-сть усіх знайдених елементів
  let counter = 0; //? к-сть нових елементів записаних в наш головний об'єкт

  const copyObj = Object.assign({}, this); //! записуємо неглубоку копію нашого об'єкта

  for (let i = 0; i < copyObj.length; i++) {
      const arr = copyObj[i].querySelectorAll(selector); //! знаходмо в копії, необхідний нам елемент по селектору
      if (arr.length == 0) {
        continue;
      }

      //! перезаписуємо в головний об'єкт всіма знайденеми в ньому елементами
      for (let j = 0; j < arr.length; j++) {
          this[counter] = arr[j];
          counter++;
      }

      numberOfItems += arr.length;  //? загальна к-сть елементів записаному в нашому масиві
  }

  this.length = numberOfItems; //! перезаписуємо його властивість довжини

  //! так як ми можемо перезаписати далеко не всі елементи, що містяться в базовому об'єкті, ми зачищаємо хвіст із залишків
  const objLength = Object.keys(this).length; //? отримуємо поточну довжину
  for (; numberOfItems < objLength; numberOfItems++) {
      delete this[numberOfItems];
  }

  return this;
};

//! пошук найближчого по ієрархії елемента до даного за вказаним селектором
$.prototype.closest = function(selector) {
  let counter = 0;
  let bool = false;
  for (let i = 0; i < this.length; i++) {
    if(this[i].closest(selector)){
      this[counter] = this[i].closest(selector);
      counter++;
      bool = true;
    }
  }

  if(bool === true) {
    this.length = counter;
    const objLength = Object.keys(this).length;
    for (; counter < objLength; counter++) {
        delete this[counter];
    }
  }

  return this;
};

//! отримуємо всі суідні елементи нашого блока, окрім поточного
$.prototype.siblings = function() {
  let numberOfItems = 0;
  let counter = 0;

  const copyObj = Object.assign({}, this);

  for (let i = 0; i < copyObj.length; i++) {
      const arr = copyObj[i].parentNode.children;

      for (let j = 0; j < arr.length; j++) {
          if (copyObj[i] === arr[j]) { //! якщо в перевірку потрапив елемент з яким ми зараз працюємо - він пропускається
              continue;
          }

          this[counter] = arr[j];
          counter++;
      }

      numberOfItems += arr.length - 1; //? так як ми забрали 1 елемент, то його і вінімаємо
  }

  this.length = numberOfItems;

  const objLength = Object.keys(this).length;
  for (; numberOfItems < objLength; numberOfItems++) {
      delete this[numberOfItems];
  }

  return this;
};