
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TABLET } from './constants';


gsap.registerPlugin(ScrollTrigger);

export default function serviceNav() {
    if (window.matchMedia(`(max-width: ${TABLET}px)`).matches) return;

    const elements = Array.from(document.querySelectorAll('.js-service-nav'));

    const SPEED = 0.5;

    const dropdownLinks = Array.from(document.querySelectorAll('.service-nav__dropdown-link'))

    const activeDropdownLink = dropdownLinks.find(link => link.classList.contains('active'))

    const openAccordion = element => {
        gsap.to(element, {
            height: 'auto',
            duration: SPEED,
            onComplete: () => ScrollTrigger.refresh()
        });
    };
    const closeAccordion = element => {
        gsap.to(element, {
            height: 0,
            duration: SPEED,
            onComplete: () => ScrollTrigger.refresh()
        });
    };

    elements.forEach(element => {
        const links = Array.from(element.querySelectorAll('.js-has-dropdown'));


        links.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                const content = link.nextElementSibling;


                links.forEach(otherLink => {
                    if (link === otherLink) return;

                    if (otherLink.classList.contains('active')) {
                        const content =otherLink.nextElementSibling;
                        closeAccordion(content);
                        otherLink.classList.remove('active')
                    }
                })

                if (link.classList.contains('active')) {
                    closeAccordion(content);
                } else {
                    openAccordion(content);
                }

                link.classList.toggle('active');
            })
        })
    })

    if (activeDropdownLink) {
        console.log('Active dropdown link', activeDropdownLink)
        const initiallyActiveLink = activeDropdownLink.closest('.service-nav__item').querySelector('.service-nav__link');
        const content = initiallyActiveLink.nextElementSibling;
        gsap.set(content, {
            height: 'auto'
        });
        initiallyActiveLink.classList.add('active');
        ScrollTrigger.refresh()
    }
}