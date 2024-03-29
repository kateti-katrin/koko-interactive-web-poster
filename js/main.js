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









document.addEventListener('DOMContentLoaded', function() {
    let selectedPlanet = null;
    let shiftX;
    let shiftY;

    document.querySelectorAll('.planet').forEach(planet => {
        planet.addEventListener('mousedown', onDragStart);
        planet.addEventListener('touchstart', onDragStart);
    });

    function onDragStart(event) {
        selectedPlanet = event.target;
        // Поддержка сенсорных устройств
        let eventCoords = event.touches ? event.touches[0] : event;
        shiftX = eventCoords.clientX - selectedPlanet.getBoundingClientRect().left;
        shiftY = eventCoords.clientY - selectedPlanet.getBoundingClientRect().top;

        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragEnd);
        document.addEventListener('touchmove', onDragMove);
        document.addEventListener('touchend', onDragEnd);
    }

    function onDragMove(event) {
        if (!selectedPlanet) return;

        let eventCoords = event.touches ? event.touches[0] : event;
        let newLeft = eventCoords.clientX - shiftX - document.querySelector('.thirdmodule').getBoundingClientRect().left;
        let newTop = eventCoords.clientY - shiftY - document.querySelector('.thirdmodule').getBoundingClientRect().top;

        // Ограничение перемещения внутри .thirdmodule
        let boundaries = document.querySelector('.thirdmodule').getBoundingClientRect();
        newLeft = Math.min(newLeft, boundaries.width - selectedPlanet.offsetWidth);
        newLeft = Math.max(newLeft, 0);
        newTop = Math.min(newTop, boundaries.height - selectedPlanet.offsetHeight);
        newTop = Math.max(newTop, 0);

        selectedPlanet.style.left = ${newLeft}px;
        selectedPlanet.style.top = ${newTop}px;
    }

    function onDragEnd() {
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragEnd);
        document.removeEventListener('touchmove', onDragMove);
        document.removeEventListener('touchend', onDragEnd);

        checkPath() && animateRocket();
        selectedPlanet = null; // Сбросить выделенную планету
    }

    function checkPath() {
        const rocket = document.querySelector('.rocket');
        const rocketRect = rocket.getBoundingClientRect();
        let isPathClear = true;

        document.querySelectorAll('.planet').forEach(planet => {
            let planetRect = planet.getBoundingClientRect();

            // Проверяем, находится ли планета в "коридоре" ракеты
            if (planetRect.top < rocketRect.top + rocketRect.height && planetRect.bottom > rocketRect.top) {
                isPathClear = false;
            }
        });

        return isPathClear;
    }

    function animateRocket() {
        const rocket = document.querySelector('.rocket');
        // Устанавливаем начальное положение ракеты, если был произведен возврат
        rocket.style.left = '30px'; // Соответствует начальному CSS значению
        rocket.style.transition = 'left 2s ease-in-out';
        // Анимируем полет ракеты, перемещая ее вправо на ширину блока .thirdmodule
        rocket.style.left = ${document.querySelector(&#039;.thirdmodule&#039;).offsetWidth}px;

        // После анимации полета ракеты, возможно, захотим вернуть ее на исходную позицию.
        // Это можно сделать, удалив анимацию и сбросив свойство left.
        rocket.addEventListener('transitionend', () => {
            // Даем некоторое время, чтобы пользователь успел увидеть исчезновение ракеты
            setTimeout(() => {
                rocket.style.transition = '';
                rocket.style.left = 30px;
            }, 1000);
        }, { once: true }); // Обработчик события удаляется после первого вызова
    }

    // Вставьте в приложение вместе с оставшейся частью представленного выше кода
});


function onTouchStart(event) {
    if (event.target.classList.contains('planet')) {
        selectedPlanet = event.target;
        let touch = event.touches[0];
        shiftX = touch.clientX - selectedPlanet.getBoundingClientRect().left;
        shiftY = touch.clientY - selectedPlanet.getBoundingClientRect().top;

        document.addEventListener('touchmove', onDragMove);
        document.addEventListener('touchend', onDragEnd);
    }
}

document.querySelectorAll('.planet').forEach(planet => {
    planet.addEventListener('touchstart', onTouchStart);
});