//! модуль із анімацією

import $ from '../core';

//! метод-конфігурація для задання параметрів анімації
$.prototype.animateOverTime = function(dur, cb, fin) {
    let timeStart;

    function _animateOverTime(time) {
        if (!timeStart) {
            timeStart = time;
        }

        let timeElapsed = time - timeStart; //? відстежування часового прогресу виконання
        let complection = Math.min(timeElapsed / dur, 1); //? визначаємо зміну прозорості

        cb(complection);

        if (timeElapsed < dur) {
            requestAnimationFrame(_animateOverTime);
        } else {
            if (typeof fin === 'function') { //! кол-бек, який запускається, коли анімація закінчується
                fin();
            }
        }
    }

    return _animateOverTime;
};

$.prototype.fadeIn = function(dur, display, fin) {
    for (let i = 0; i < this.length; i++) {
        this[i].style.display = display || 'block';

        const _fadeIn = (complection) => {
            this[i].style.opacity = complection; //! тут контекс виклику не ламається через стрілочний метод
        };

        const ani = this.animateOverTime(dur, _fadeIn, fin);
        requestAnimationFrame(ani);
    }

    return this;
};

$.prototype.fadeOut = function(dur, fin) {
    for (let i = 0; i < this.length; i++) {

        const _fadeOut = (complection) => {
            this[i].style.opacity = 1 - complection; //! поступове зменшення прозорості
            if (complection === 1) {
                this[i].style.display = 'none';
            }
        };

        const ani = this.animateOverTime(dur, _fadeOut, fin);
        requestAnimationFrame(ani);
    }

    return this;
};

$.prototype.fadeToggle = function(dur, display, fin) {
    for (let i = 0; i < this.length; i++) {
        if (window.getComputedStyle(this[i]).display === 'none') {
            this[i].style.display = display || 'block';

            const _fadeIn = (complection) => {
                this[i].style.opacity = complection;
            };

            const ani = this.animateOverTime(dur, _fadeIn, fin);
            requestAnimationFrame(ani);
        } else {
            const _fadeOut = (complection) => {
                this[i].style.opacity = 1 - complection;
                if (complection === 1) {
                    this[i].style.display = 'none';
                }
            };

            const ani = this.animateOverTime(dur, _fadeOut, fin);
            requestAnimationFrame(ani);
        }
    }

    return this;
};


$.prototype.fadeToggle = function(dur, display, fin) {
  for (let i = 0; i < this.length; i++) {
      if (window.getComputedStyle(this[i]).display === 'none') { //! визначаємо чи показаний елемент насторінці
          this[i].style.display = display || 'block';

          const _fadeIn = (complection) => {
              this[i].style.opacity = complection;
          };

          const ani = this.animateOverTime(dur, _fadeIn, fin);
          requestAnimationFrame(ani);
      } else {
          const _fadeOut = (complection) => {
              this[i].style.opacity = 1 - complection;
              if (complection === 1) {
                  this[i].style.display = 'none';
              }
          };

          const ani = this.animateOverTime(dur, _fadeOut, fin);
          requestAnimationFrame(ani);
      }
  }

  return this;
};