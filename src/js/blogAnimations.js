import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SMALL_TABLET } from './constants';
import './resizeSensor';
import StickySidebar from 'sticky-sidebar';

gsap.registerPlugin(ScrollTrigger);

export default function blogAnimations() {
    const blogLeftCol = document.querySelector('.blog__posts-left-col');
    const blogRightCol = document.querySelector('.blog__posts-right-col');
    const blogMenu = document.querySelector('.blog__menu');

    if (!window.matchMedia(`(max-width: ${SMALL_TABLET}px)`).matches) {
        if (blogLeftCol) {
            gsap.to(blogLeftCol, {
                duration: 1,
                y: -80,
                scrollTrigger: {
                    trigger: blogLeftCol,
                    scrub: 1,
                    start: 'top bottom',
                    end: 'bottom top'
                }
            });
        }
        if (blogRightCol) {
            gsap.to(blogRightCol, {
                duration: 1,
                y: 80,
                scrollTrigger: {
                    trigger: blogRightCol,
                    scrub: 1,
                    start: 'top bottom',
                    end: 'bottom top'
                }
            });
        }

        
        const blogSidebar = document.querySelector('.js-blog-sidebar');
       

        if (blogSidebar) {
            const stickySidebar = new StickySidebar('.js-blog-sidebar', {
                topSpacing: 80,
                bottomSpacing: 20,
                containerSelector: '.js-blog-main-content',
                innerWrapperSelector: '.js-blog-sidebar-inner',
                resizeSensor: true,
                minWidth: SMALL_TABLET + 1,
                stickyClass: 'is-affixed'
            });


            document.addEventListener('stickyupdate', () => {
                stickySidebar.updateSticky();
                console.log('Sticky update event')
            })
        }
    }
}
