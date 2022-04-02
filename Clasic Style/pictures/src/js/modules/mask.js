const mask = (selector) => {

  //! встанвленян позіції курсора при фокусі
  let setCursorPointer = (pos, elem) => {
    elem.focus(); //! ставим фокус на поточний символ в вказаному діапазоні

    if(elem.setSelectionRange){
      elem.setSelectionRange(pos, pos);//? встановлюємо курсор, завдяки
    } else if (elem.createTextRange){
      let range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }
  function createMask(event) {
    let matrix = '+7 (___) ___ __ __', //?матриця маски
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');

    //! при видалені елементів маски, ми їх відновлюємо
    if(def.length >= val.length) {
      val = def;
    }

    this.value = matrix.replace(/./g, function(a){
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });

    //! метод реакції форми на відображення маски при фокусі і на повернення в дефолтне значення при події blur
    if(event.type === 'blur') {
      if(this.value.length == 2){
        this.value = '';
      }
    } else {
      setCursorPointer(this.value.length, this);
    }
  }

  console.log(selector);
  let inputs = document.querySelectorAll(selector);
  inputs.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
};

export default mask;