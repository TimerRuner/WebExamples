import {postData} from '../services/requests';

const forms = () => {
  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]'); //! отримуємо поле загрузки файла

  const message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...',
      spinner: 'assets/img/spinner.gif',
      ok: 'assets/img/ok.png',
      fail: 'assets/img/fail.png'
  };

  //? змінні з шляхами для відпавки данних із різних форм на різні адреса
  const path = {
      designer: 'assets/server.php',
      question: 'assets/question.php'
  };



  const clearInputs = () => {
      inputs.forEach(item => {
          item.value = '';
      });
      upload.forEach(item => {
          item.previousElementSibling.textContent = "Файл не выбран";
      });
  };

  //! мето для відображення файлу внесеного в поле file
  upload.forEach(item => {
      item.addEventListener('input', () => {
          console.log(item.files[0]);
          let dots;
          const arr = item.files[0].name.split('.'); //? розбиваємо строку на масив із назви і типу файлу

          arr[0].length > 6 ? dots = "..." : dots = '.';
          const name = arr[0].substring(0, 6) + dots + arr[1]; //! створюємо півім'я + точки + тип файлу
          item.previousElementSibling.textContent = name;
      });
  });

  form.forEach(item => {
      item.addEventListener('submit', (e) => {
          e.preventDefault();

          let statusMessage = document.createElement('div');
          statusMessage.classList.add('status');

          //! добавляємо сповіщення-картинку в батьківський блок і приховуємо поточну форму
          item.parentNode.appendChild(statusMessage);
          //! форма зникає візуально і фізично із вікна
          item.classList.add('animated', 'fadeOutUp');
          setTimeout(() => {
              item.style.display = 'none';
          }, 400);

          //? створюємо картинку-повідомлення і закидуємо в блок вище
          let statusImg = document.createElement('img');
          statusImg.setAttribute('src', message.spinner);
          statusImg.classList.add('animated', 'fadeInUp');
          statusMessage.appendChild(statusImg);

          //? закидуємо в той же блок текстове повідомлення також
          let textMessage = document.createElement('div');
          textMessage.textContent = message.loading;
          statusMessage.appendChild(textMessage);

          const formData = new FormData(item);

          //! визначаємо з яким модальним вікном ми співпацюємо
          let api;
          item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
          console.log(api);

          postData(api, formData)
              .then(res => {
                  console.log(res);
                  statusImg.setAttribute('src', message.ok);
                  textMessage.textContent = message.success;
              })
              .catch(() => {
                  statusImg.setAttribute('src', message.fail);
                  textMessage.textContent = message.failure;
              })
              .finally(() => {
                  clearInputs();
                  setTimeout(() => {
                      statusMessage.remove();
                      //! візуалізовуємо форму після відправки на сервер
                      item.style.display = 'block';
                      item.classList.remove('fadeOutUp');
                      item.classList.add('fadeInUp');
                  }, 5000);
              });
      });
  });
};

export default forms;