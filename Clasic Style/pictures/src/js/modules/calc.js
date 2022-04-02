const calc = (size, material, options, promocode, result) => {
  const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);

  let sum = 0;

  const calcFuntion = () => {
    sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionBlock.value));

    //! виконуютья умови виведення інформації
    if(sizeBlock.value == '' || materialBlock.value == '') {
      resultBlock.textContent = 'Пожалуйста виберите размер и материал картини';
    } else if(promocodeBlock.value === 'IWANTPOPART'){
      resultBlock.textContent = Math.round(sum * 0.7);
    } else {
      resultBlock.textContent = sum;
    }
  };

  sizeBlock.addEventListener('change', calcFuntion);
  materialBlock.addEventListener('change', calcFuntion);
  optionBlock.addEventListener('change', calcFuntion);
  promocodeBlock.addEventListener('input', calcFuntion);
};

export default calc;