import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function commonAnimations() {
    const progress = document.querySelector('.page-header__scroll-progress');

    gsap.to(progress, {
        "--scroll-progress": 1,
        duration: 1,
        scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            endTrigger: 'html',
            end: 'bottom bottom',
            scrub: true,
        }
    });


  
}
