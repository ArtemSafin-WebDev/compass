import { Swiper, Navigation, Pagination, EffectFade } from 'swiper';
Swiper.use([Navigation, Pagination, EffectFade]);

export default function caseSlider() {
    const elements = Array.from(document.querySelectorAll('.js-case-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 1,
            spaceBetween: 12,
            watchOverflow: true,
            centeredSlides: true,
            loop: true,
            loopedSlides: 3,
            breakpoints: {
                641: {
                    slidesPerView: 'auto',
                    spaceBetween: 40,
                },
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 90,
                },
                968: {
                    slidesPerView: 'auto',
                    spaceBetween: 134,
                }
            },
            navigation: {
                nextEl: element.querySelector('.case__content-slider-arrow--next'),
                prevEl: element.querySelector('.case__content-slider-arrow--prev')
            },
            on: {
                touchStart: () => {
                    const cursor = document.querySelector('.custom-cursor-slider');

                    if (cursor) {
                        cursor.classList.add('expand');
                    }
                },
                touchEnd: () => {
                    const cursor = document.querySelector('.custom-cursor-slider');

                    if (cursor) {
                        cursor.classList.remove('expand');
                    }
                }
            },
            pagination: {
                el: element.querySelector('.case__content-slider-pagination'),
                type: 'fraction',
                renderFraction: function(currentClass, totalClass) {
                    return (
                        '<span class="' + currentClass + '"></span>' + '<span class="divider"></span>' + '<span class="' + totalClass + '"></span>'
                    );
                },
                formatFractionCurrent: number => {
                    if (number < 10) {
                        return '0' + number;
                    } else {
                        return number;
                    }
                },
                formatFractionTotal: number => {
                    if (number < 10) {
                        return '0' + number;
                    } else {
                        return number;
                    }
                }
            }
        });
    });
}
