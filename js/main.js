/* ИМЯ ПОЛЬЗОВАТЕЛЯ */
document.addEventListener('DOMContentLoaded', function() {
    // Находим кнопку "Подтвердить" и элемент для отображения имени пользователя
    const submitBtn = document.getElementById('submit-name');
    const userNameDisplay = document.getElementById('user-name-display');

    // Функция для обработки клика по кнопке "Подтвердить"
    submitBtn.addEventListener('click', function() {
        // Находим поле ввода
        const nameInput = document.getElementById('name');
        // Читаем введенное имя пользователя
        const userName = nameInput.value.trim();

        // Проверяем что имя пользователя введено
        if (userName) {
            // И если да, выводим его имя в необходимом нам месте
            userNameDisplay.textContent = userName;
        } else {
            // Если имя не введено, можно установить стандартное значение или вывести предупреждение
            // В данном случае, установим стандартное имя "Аноним"
            userNameDisplay.textContent = "Аноним";
        }
    });
});

/* АНИМАЦИЯ ПЕРЕКЛЮЧАТЕЛИ */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.circle').forEach(circle => {
        circle.addEventListener('click', function() {
            const toggle = this.parentElement;
            // Проверяем, есть ли уже класс 'active'
            if (!toggle.classList.contains('active')) {
                // Для круга
                this.style.left = 'auto'; // сбрасываем стиль left
                this.style.right = '16px'; // новая позиция справа
                // Для иконки внутри круга - анимация уже задана через CSS
                
                // Изменение цветов
                if (toggle.classList.contains('toggle-fire')) {
                    toggle.style.backgroundColor = '#EE7B3C'; // новый цвет фона toggle-fire
                    this.style.backgroundColor = '#F2A369'; // новый цвет фона circle
                } else if (toggle.classList.contains('toggle-rocket')) {
                    toggle.style.backgroundColor = '#E5543C'; // новый цвет фона toggle-rocket
                    this.style.backgroundColor = '#ED9069'; // новый цвет фона circle
                }

                toggle.classList.add('active'); // помечаем элемент как активированный
            } else {
                // Сброс к исходному состоянию
                this.style.right = 'auto';
                this.style.left = '16px';
                
                if (toggle.classList.contains('toggle-fire')) {
                    toggle.style.backgroundColor = '#F7CC97';
                    this.style.backgroundColor = '#EE7B3C';
                } else if (toggle.classList.contains('toggle-rocket')) {
                    toggle.style.backgroundColor = '#F7CC97';
                    this.style.backgroundColor = '#E5543C';
                }

                toggle.classList.remove('active');
            }
        });
    });
});

/* АНИМАЦИЯ ВРАТУШКИ */
document.addEventListener('DOMContentLoaded', function() {
    // Получаем все элементы с классом 'vr-circle'
    var circles = document.querySelectorAll('.vr-circle');

    circles.forEach(function(circle) {
      // Начальный угол поворота каждого кружка
      let angle = 0;
      
      // Добавляем к каждому кружку прослушивание события клика
      circle.addEventListener('click', function() {
        // При каждом клике увеличиваем угол на 45 градусов
        angle += 45;
        // Применяем новый угол поворота
        this.style.transform = 'rotate(' + angle + 'deg)';
      });
    });
});

/* КРУГЛАЯ КНОПКА */
document.addEventListener('DOMContentLoaded', function() {
    var bottonCircle = document.querySelector('.botton_circle');

    // Функция обработки клика
    bottonCircle.addEventListener('click', function() {
        this.style.backgroundColor = "#B74330";
    });
});

/* ПОЛЕТ РАКЕТЫ */
document.addEventListener('DOMContentLoaded', () => {
    const planets = document.querySelectorAll('.planet');
    const rocket = document.querySelector('.rocket');

    let counter = 0;

    planets.forEach(planet => {
        planet.addEventListener('click', () => {
            if (!planet.classList.contains('hidden')) {
                planet.classList.add('hidden');
                counter++;

                if (counter === planets.length) {
                    rocket.style.transition = 'left 2s';
                    rocket.style.left = '1200px';
                }
            }
        });
    });
});

/* ЦВЕТЫ */
document.addEventListener('DOMContentLoaded', () => {
    let activePlant = null; // Элемент, который перемещается
    let offsetX = 0; // Смещение от начальной точки по оси X
    let offsetY = 0; // Смещение от начальной точки по оси Y
  
    document.querySelectorAll('.plant img.svg-flo').forEach(plant => {
      plant.addEventListener('mousedown', (event) => {
        activePlant = event.target;
        offsetX = event.offsetX;
        offsetY = event.offsetY;
  
        // Уставливаем нужные стили для перемещения
        activePlant.style.position = 'absolute';
        activePlant.style.zIndex = 1000;
        document.body.append(activePlant);
  
        moveAt(event.pageX, event.pageY);
      });
  
      // Функция перемещения
      function moveAt(pageX, pageY) {
        activePlant.style.left = pageX - offsetX + 'px';
        activePlant.style.top = pageY - offsetY + 'px';
      }
  
      // Перемещение по экрану
      document.addEventListener('mousemove', (event) => {
        if (!activePlant) return;
  
        moveAt(event.pageX, event.pageY);
      });
  
      plant.addEventListener('mouseup', () => {
        activePlant = null;
      });
    });
  
    // Для защиты от непредвиденного поведения - сброс при выходе мыши из окна
    document.addEventListener('mouseup', () => {
        if (activePlant) {
          activePlant = null;
        }
    });
});

/* КНОПКА НАЧАТЬ СНАЧАЛА */
const restartButton = document.querySelector('.restart-button');

restartButton.addEventListener('click', () => {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    
    // Подождать немного и обновить страницу
    setTimeout(() => {
        location.reload();
    }, 1000); // Время в миллисекундах (здесь 1 секунда)
});

/* МИНИ ИГРА ПАЗЛ */
document.addEventListener('DOMContentLoaded', function() {
    let currentDrag = null;
    
    document.addEventListener('mousedown', function(e) {
        currentDrag = e.target;
        if (!currentDrag.classList.contains('egg_pic')) {
            currentDrag = null;
            return;
        }

        let rect = currentDrag.getBoundingClientRect();
        let boundingRect = currentDrag.parentElement.getBoundingClientRect(); // Получаем границы родительского элемента

        currentDrag.offsetX = e.clientX - rect.left - boundingRect.left; // Учитываем смещение родителя по горизонтали
        currentDrag.offsetY = e.clientY - rect.top - boundingRect.top; // Учитываем смещение родителя по вертикали

        currentDrag.style.position = 'absolute';
        currentDrag.style.zIndex = '1000';

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!currentDrag) return;

        currentDrag.style.left = e.clientX - currentDrag.offsetX + 'px';
        currentDrag.style.top = e.clientY - currentDrag.offsetY + 'px';
    }

    function onMouseUp() {
        if (!currentDrag) return;
        
        currentDrag.style.zIndex = '';
        currentDrag.style.position = 'absolute';

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
});