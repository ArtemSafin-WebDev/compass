import { Swiper, Navigation, EffectFade } from 'swiper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOBILE } from './constants';

Swiper.use([Navigation, EffectFade]);

export default function clientsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-clients-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        const progress = element.querySelector('.our-clients__slider-progressbar');
        const slider = new Swiper(container, {
            effect: 'fade',
            watchOverflow: true,
            fadeEffect: {
                crossFade: true
            },
            autoHeight: window.matchMedia(`(max-width: ${MOBILE}px)`).matches ? true : false,
            speed: 700,
            navigation: {
                nextEl: element.querySelector('.our-clients__slider-arrow--next'),
                prevEl: element.querySelector('.our-clients__slider-arrow--prev')
            }
        });

        if (window.matchMedia(`(max-width: ${MOBILE}px)`).matches) {
            slider.on('slideChange', () => {
                ScrollTrigger.refresh(true);
            });
        }

        const setAutoplay = index => {
            const nextIndex = index + 1 >= slider.slides.length ? 0 : index + 1;
            // console.log("next index", nextIndex)
            gsap.to(progress, {
                '--slider-progress': 1,
                duration: 10,
                ease: 'linear',
                clearProps: 'all',
                onComplete: () => {
                    slider.slideTo(nextIndex);
                    setAutoplay(nextIndex);
                }
            });
        };

        const removeAutoplay = () => {
            gsap.killTweensOf(progress);
            gsap.to(progress, {
                '--slider-progress': 0,
                duration: 0.4
            });
        };

        setAutoplay(0);

        slider.on('slideChange', swiper => {
            gsap.killTweensOf(progress);
            gsap.set(progress, {
                '--slider-progress': 0
            });
            setAutoplay(swiper.realIndex);
        });

        // [slider.navigation.nextEl, slider.navigation.prevEl].forEach(nav => {
        //     nav.addEventListener('click', () => {
        //         removeAutoplay();
        //     })
        // });

        // slider.on('sliderMove', () => {
        //     removeAutoplay();
        // })
    });
}
