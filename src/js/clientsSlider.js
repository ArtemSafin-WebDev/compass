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
        const names = Array.from(element.querySelectorAll('.our-clients__name'))
        const slider = new Swiper(container, {
            effect: 'fade',
            watchOverflow: true,
            touchStartPreventDefault: false,
            loop: true,
            fadeEffect: {
                crossFade: true
            },
            autoHeight: window.matchMedia(`(max-width: ${MOBILE}px)`).matches ? true : false,
            speed: 700,
            navigation: {
                nextEl: element.querySelector('.our-clients__slider-arrow--next'),
                prevEl: element.querySelector('.our-clients__slider-arrow--prev')
            },
            init: false
        });

       

        slider.on('init', swiper => {
            names.forEach(name => name.classList.remove('active'));
            names[swiper.realIndex].classList.add('active');
        })

        slider.init();

       

        const setAutoplay = () => {
            // const nextIndex = index + 1 >= slider.slides.length ? 0 : index + 1;
            // console.log("next index", nextIndex)
            gsap.to(progress, {
                '--slider-progress': 1,
                duration: 10,
                ease: 'linear',
                clearProps: 'all',
                onComplete: () => {
                    slider.slideNext();
                    // setAutoplay();
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

            names.forEach(name => name.classList.remove('active'));
            names[swiper.realIndex].classList.add('active');
           
            gsap.killTweensOf(progress);
            gsap.set(progress, {
                '--slider-progress': 0
            });
            setAutoplay();

            if (window.matchMedia(`(max-width: ${MOBILE}px)`).matches) {
                ScrollTrigger.refresh(true);
            }
        });


        names.forEach((name, nameIndex) => {
            name.addEventListener('click', event => {
                event.preventDefault();

                slider.slideToLoop(nameIndex)
            })
        })

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
