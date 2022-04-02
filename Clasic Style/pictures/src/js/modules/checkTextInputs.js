const checkTextInputs = (selector) => {
  const txtInputs = document.querySelectorAll(selector);

  txtInputs.forEach(input => {
      input.addEventListener('keypress', function(e) {
          if (e.key.match(/[^а-яё 0-9]/ig)) { //! забороняє використовувати латиницю
            e.preventDefault();
          }
      });
  });
};

export default checkTextInputs;