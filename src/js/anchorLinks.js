import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default function anchorLinks() {
    document.addEventListener('click', event => {
        if (event.target.matches('a') || event.target.closest('a')) {
            const link = event.target.matches('a') ? event.target : event.target.closest('a');
            const hash = link.hash;

            if (hash && hash.startsWith('#to-')) {
                const elementToScroll = document.getElementById(hash.replace(/^#to\-/, ''));

                if (elementToScroll) {
                    event.preventDefault();

                    gsap.to(window, {
                        duration: 2,
                        scrollTo: {
                            y: elementToScroll,
                            autoKill: true
                        }
                    });
                }
            }
        }

        if (event.target.closest('.js-scroll-top') || event.target.closest('.js-scroll-top')) {
            event.preventDefault();
            gsap.to(window, {
                duration: 2,
                scrollTo: {
                    y: 0,
                    autoKill: true
                }
            });
        }
    });
}
