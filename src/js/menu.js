import { lockScroll, unlockScroll } from "./scrollBlocker";
import gsap from 'gsap';

export default function menu() {
    const menuOpen = document.querySelector('.js-menu-open');
    const menuClose = document.querySelector('.js-menu-close');
    const menu = document.querySelector('.menu');
    const menuItems = Array.from(document.querySelectorAll('.menu__nav-link-text'))

    if (menuOpen && menuClose && menu) {
        let menuIsOpen = false;


        const openMenu = () => {
            lockScroll(menu);
            document.body.classList.add('menu-shown');
            menuIsOpen = true;

            const tl = gsap.timeline({
                delay: 0.3
            });
            tl.from(menuItems, {
                stagger: 0.15,
                duration: 0.6,
                xPercent: -50,
                autoAlpha: 0,
               
                ease: "power3.out"
            }).from('.menu__contacts-info', {
                duration: 0.6, 
                ease: "power3.out",
                yPercent: 20,
                autoAlpha: 0,
            }, 0).from('.menu__download-presentation', {
                duration: 0.6, 
                ease: "power3.out",
                yPercent: 20,
                autoAlpha: 0,
            }, 0.2).from('.menu__contact-us', {
                duration: 0.6, 
                ease: "power3.out",
                yPercent: 20,
                autoAlpha: 0,
            }, 0.4)
        }

        const closeMenu = () => {
            unlockScroll();
            document.body.classList.remove('menu-shown');
            menuIsOpen = false;
        }

        menuOpen.addEventListener('click', event => {
            event.preventDefault();
            openMenu();
        })
        menuClose.addEventListener('click', event => {
            event.preventDefault();
            closeMenu();
        })
    } else {
        console.warn('Menu not initialized')
    }
}