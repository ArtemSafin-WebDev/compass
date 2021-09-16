document.addEventListener('DOMContentLoaded', function() {
    console.log('Backend JS');

    var contactUsForm = document.querySelector('#contact-us-form');

    if (contactUsForm) {
        var standardLayer = contactUsForm.querySelector('.contact-us__form-standard-layer');
        var successLayer = contactUsForm.querySelector('.contact-us__form-success-layer');
        var backLink = contactUsForm.querySelector('.contact-us__form-success-link');
        contactUsForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if ($(contactUsForm).parsley().isValid()) {
                standardLayer.classList.remove('active');
                successLayer.classList.add('active');
                contactUsForm.reset();
                var heightChangeEvent = new CustomEvent('heightchange');

                document.dispatchEvent(heightChangeEvent);
            }
        });

        backLink.addEventListener('click', function(event) {
            event.preventDefault();
            standardLayer.classList.add('active');
            successLayer.classList.remove('active');
            var heightChangeEvent = new CustomEvent('heightchange');

            document.dispatchEvent(heightChangeEvent);
        })
    }

    // Модалка с оповещением об успехе отправки формы
    const modal = document.querySelector('.modal-form__inner');
    if (modal) {
        const modalForm = modal.querySelector('.modal-form__form');
        const standardLayer = modal.querySelector('.modal-form__standart-layer');
        const successLayer = modal.querySelector('.modal-form__success-layer');
        const backLink = modal.querySelector('.contact-us__form-success-link');

        modalForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if ($(modalForm).parsley().isValid()) {
                standardLayer.classList.remove('active');
                successLayer.classList.add('active');
                modalForm.reset();
                var heightChangeEvent = new CustomEvent('heightchange');

                document.dispatchEvent(heightChangeEvent);
            }
        });

        backLink.addEventListener('click', function(event) {
            event.preventDefault();
            standardLayer.classList.add('active');
            successLayer.classList.remove('active');
            var heightChangeEvent = new CustomEvent('heightchange');

            document.dispatchEvent(heightChangeEvent);
        })
    }

    // hyst modal
    // По клику на красную кнопку "Связаться" закрываем меню
    const btn = document.querySelector('.menu__contact-us');
    if (btn) {
        btn.addEventListener('click', () => {
            window.closeMenu();
        })
    }

    // Открытие модалки через 20 секунд нахождения на одной странице
    // Либо после перехода на новую страницу
    const isActive = sessionStorage.getItem('modal');

    // 1. Если sessionStorage пуст, то сработает таймер, sessionStorage станет равен "active"
    // 2. Если сработает таймер (откроется модалка), то sessionStorage перезапишется на "disabled" и
    // после вся эта тема перестанет работать у пользователя
    // 3. Если sessionStorage равен "active" при загрузке страницы, то попап откроется сразу,
    // после вся эта тема перестанет работать у пользователя
    
    // Все обновляется после закрытия вкладки в браузере

    if (isActive === null) {
        setTimeout(() => {
            window.formModal.open("#formModal");
            sessionStorage.setItem('modal', 'disabled');
        }, 20000);

        sessionStorage.setItem('modal', 'active');
    }
    if (isActive === 'active') {
        window.formModal.open("#formModal");

        sessionStorage.setItem('modal', 'disabled');
    }
})