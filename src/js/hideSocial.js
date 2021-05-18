import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function hideSocial() {
    const hideSocials = Array.from(document.querySelectorAll('.js-hide-social'));
    const aboutFollow = document.querySelector('.about__follow') || document.querySelector('.page-footer');

    if (!hideSocials.length || !aboutFollow) return;

    console.log('Hide socials', hideSocials)

    hideSocials.forEach(hideSocial => {
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
                    duration: 0.2,
                    ease: 'none'
                });
            }
        });
    });
}
