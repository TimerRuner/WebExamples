const burger = (menuSelector, burgerSelector) => {
  const menuElem = document.querySelector(menuSelector),
        burgerElem = document.querySelector(burgerSelector);

  menuElem.style.display = 'none';

  burgerElem.addEventListener('click', () => {
      if (menuElem.style.display == "none" && window.screen.availWidth < 993) {
          menuElem.style.display = 'block';
      } else {
          menuElem.style.display = 'none';
      }
  });

  window.addEventListener('resize', () => { //! при раптовій зміні величини екрана ми ховаємо наше меню
      if (window.screen.availWidth > 992) {
          menuElem.style.display = 'none';
      }
  });
};

export default burger;