import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function hideSocial() {
    const hideSocial = document.querySelector('.js-hide-social');
    const aboutFollow = document.querySelector('.about__follow')

    if (!hideSocial || !aboutFollow) return;

    ScrollTrigger.matchMedia({
        '(min-width: 641px)': () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: aboutFollow,
                    start: 'top bottom',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.to(hideSocial, {
                autoAlpha: 0,
                duration: 0.3
            })
           
        }
    })
}