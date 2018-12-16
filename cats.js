(function () {
    // Находим элементы по идентификаторам
    var wrapper = document.getElementById('wrapper');
    var popup = document.getElementById('popup');
    var popupImage = document.getElementById('popup-image');
    var popupTitle = document.getElementById('popup-title');
    var cards = document.querySelectorAll('.card');

    if (!cards || cards.length === 0) {
        return;
    }

    // Цикл по всем карточкам с котиками
    for (var idx = 0; idx < cards.length; idx += 1) {
        var card = cards[idx];
        var cardData = getCardData(card);

        if (!cardData.src) {
            return;
        }

        card.addEventListener('click', onCardClick.bind(cardData));
    }

    // При клике по области вокруг модального окна закрываем его
    wrapper.addEventListener('click', hidePopup);

    // Останавливаем обработку при клике на окно
    popup.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // При нажатии клавиши Escape скрываем окно
    window.addEventListener('keydown', function (e) {
        if (e.keyCode === 27) {
            hidePopup();
        }
    });

    /**
     * Показываем модальное окно
     */
    function showPopup() {
        wrapper.className = 'wrapper';
    }

    /**
     * Скрываем модальное окно
     */
    function hidePopup() {
        wrapper.className = 'wrapper wrapper_hidden';
    }

    /**
     * Обработчик клика по карточке. Меняем картинку и текст в модальном окне
     * и показываем его
     */
    function onCardClick() {
        if (window.innerWidth < 413) {
            return; // Не показываем модальное окно на узких экранах
        }

        popupImage.setAttribute('src', this.src);
        popupImage.setAttribute('alt', this.alt);
        popupImage.setAttribute('title', this.title);
        popupTitle.innerText = this.title;

        showPopup();
    }

    /**
     * Получаем изображение и заголовок из карточки,
     * на которую кликнул пользователь
     * @param {DOMElement} element
     * @returns {{ src: String?, title: String? }} 
     */
    function getCardData(element) {
        var cardData = {};

        var title = element.getElementsByClassName('card__title')[0];
        var image = element.getElementsByClassName('card__image')[0];
        var img = image.getElementsByTagName('IMG')[0];

        if (img) {
            cardData.src = img.getAttribute('src');
            cardData.alt = img.getAttribute('alt');
            cardData.title = img.getAttribute('title');
        }

        if (title) {
            cardData.title = title.innerText;
        }

        return cardData;
    }
})();
