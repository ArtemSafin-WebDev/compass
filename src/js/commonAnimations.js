import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function commonAnimations() {
   
    console.log('Common animations triggered')
    gsap.to("html", {
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
