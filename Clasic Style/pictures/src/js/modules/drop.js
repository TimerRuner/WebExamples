const drop = () => {

  // drag *
    // dragend *
    // dragenter - объект над dropArea
    // dragexit *
    // dragleave - объект за пределами dropArea
    // dragover - объект зависает над dropArea
    // dragstart *
    // drop - объект отправлен в dropArea


  const fileInputs = document.querySelectorAll('[name="upload"]');

  //? Кожну подію ми присвоюємо усім інпутам
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    //? метод із базовими налаштуваннями подій для елементів
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    //? підсвітка поля на яке ми перетягуємо фото
    function highlight(item) {
        item.closest('.file_upload').style.border = "5px solid yellow";
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
    }

    //? зворотній метод до
    function unhighlight(item) {
        item.closest('.file_upload').style.border = "none";
        //! зміна стилів при скидувані файлу в залежності від батька даного поля
        if (item.closest('.calc_form')) { //? якщо це калькулятор
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }

    //! змінюємо стилі поля в залежності від подій
    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files; //! отримуємо файл який ми пертягнули із файлової системи і вкладаємо в поле
            //! вносимо зміни до назви перетягнутого файлу
            let dots;
            const arr = input.files[0].name.split('.');

            arr[0].length > 6 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    });
};

export default drop;