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

    // hyst modal
    // По клику на красную кнопку "Связаться" закрываем меню
    const btn = document.querySelector('.menu__contact-us');
    if (btn) {
        btn.addEventListener('click', () => {
            window.closeMenu();
        })
    }
})