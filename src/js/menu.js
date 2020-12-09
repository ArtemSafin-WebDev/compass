import { lockScroll, unlockScroll } from './scrollBlocker';
import gsap from 'gsap';
import { SMALL_TABLET } from './constants';
import { debounce } from 'lodash';

export default function menu() {
    const menu = document.querySelector('.menu');
    const menuItems = Array.from(document.querySelectorAll('.menu__nav-link-text'));

    if (menu) {
        let menuIsOpen = false;
        const menuNavLinks = Array.from(document.querySelectorAll('.menu__nav-link'));
        const initialActiveLink = menuNavLinks.findIndex(link => link.classList.contains('active'));
        const menuNav = document.querySelector('.menu__nav');

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
                xPercent: -30,
                autoAlpha: 0,

                ease: 'power2.ease'
            })
                .from(
                    '.menu__contacts-info',
                    {
                        duration: 0.6,
                        ease: 'power3.out',
                        yPercent: 20,
                        autoAlpha: 0
                    },
                    0
                )
                .from(
                    '.menu__download-presentation',
                    {
                        duration: 0.6,
                        ease: 'power3.out',
                        yPercent: 20,
                        autoAlpha: 0
                    },
                    0.2
                )
                .from(
                    '.menu__contact-us',
                    {
                        duration: 0.6,
                        ease: 'power3.out',
                        yPercent: 20,
                        autoAlpha: 0
                    },
                    0.4
                );
        };

        const closeMenu = () => {
            unlockScroll();
            document.body.classList.remove('menu-shown');
            menuIsOpen = false;
        };

        if (menuNavLinks.length && menuNav && !window.matchMedia(`(max-width: ${SMALL_TABLET}px)`).matches) {
            const pointer = document.createElement('div');
            pointer.className = 'menu__nav-link-pointer';
            menuNav.appendChild(pointer);

            let activeIndex = null;

            const setActiveLink = index => {
                if (index == null && index !== 0) {
                    menuNavLinks.forEach(link => link.classList.remove('active'));

                    activeIndex = null;
                    gsap.to(pointer, {
                        duration: 0.4,
                        autoAlpha: 0,
                        ease: 'power2.out'
                    });
                } else {
                    const targetLink = menuNavLinks[index];

                    const distance = targetLink.offsetTop;

                    activeIndex = index;

                    menuNavLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');

                    console.log(distance, targetLink);

                    gsap.to(pointer, {
                        duration: 0.4,
                        autoAlpha: 1,
                        y: distance + targetLink.offsetHeight * 0.4,
                        ease: 'power2.out'
                    });
                }
            };

            if (initialActiveLink !== -1) {
                setActiveLink(initialActiveLink);
            }

            menuNavLinks.forEach((link, linkIndex) => {
                link.addEventListener('mouseenter', () => {
                    setActiveLink(linkIndex);
                });
            });

            menuNav.addEventListener('mouseleave', () => {
                if (initialActiveLink) {
                    setActiveLink(initialActiveLink);
                } else {
                    setActiveLink(null);
                }
            });

            window.addEventListener('resize', debounce(() => {
                setActiveLink(activeIndex);
            }, 200));
        }

        document.addEventListener('click', event => {
            if (event.target.matches('.js-menu-open') || event.target.closest('.js-menu-open')) {
                event.preventDefault();
                openMenu();
            }
        });

        document.addEventListener('click', event => {
            if (event.target.matches('.js-menu-close') || event.target.closest('.js-menu-close')) {
                event.preventDefault();
                closeMenu();
            }
        });
    } else {
        console.warn('Menu not initialized');
    }
}
