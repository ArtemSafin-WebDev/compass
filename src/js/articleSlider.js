import { Swiper, Navigation, Pagination, EffectFade } from 'swiper';
Swiper.use([Navigation, Pagination, EffectFade]);

export default function articleSlider() {
    const elements = Array.from(document.querySelectorAll('.js-article-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 1,
            spaceBetween: 0,
            watchOverflow: true,
            centeredSlides: window.matchMedia('(max-width: 640px)').matches ? false : true,
            loop: true,
            loopedSlides: 3,
            touchStartPreventDefault: false,
            navigation: {
                nextEl: element.querySelector('.article__slider-arrow--next'),
                prevEl: element.querySelector('.article__slider-arrow--prev')
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
                el: element.querySelector('.article__slider-pagination'),
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

        $('[data-fancybox="article-gallery"]').fancybox({
            backFocus: false
        });
    });
}
