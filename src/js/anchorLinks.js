import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function anchorLinks() {
    document.addEventListener('click', event => {
        if (event.target.matches('a') || event.target.closest('a')) {
            const link = event.target.matches('a') ? event.target : event.target.closest('a');
            const hash = link.hash;

            if (hash && hash.startsWith('#to-')) {
                const elementToScroll = document.getElementById(hash.replace(/^#to\-/, ''));

                if (elementToScroll) {
                    event.preventDefault();

                    window.currentAnchor = elementToScroll;

                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            offsetY: 60,
                            y: elementToScroll,
                            autoKill: false
                        },
                        onComplete: () => {
                            console.log('Anchor scrolling completed');
                            window.currentAnchor = null;
                        },
                        onInterrupt: () => {
                            window.currentAnchor = null;

                        }
                    });
                } else {
                    console.warn('Scroll element not found', hash)
                }
            }
        }

        if (event.target.closest('.js-scroll-top') || event.target.closest('.js-scroll-top')) {
            event.preventDefault();
            gsap.to(window, {
                duration: 2,
                scrollTo: {
                    y: 0,
                    autoKill: false
                }
            });
        }
    });
}
