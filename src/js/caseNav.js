import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function сaseNav() {

    if (window.matchMedia("(max-width: 1024px)").matches) {
        return;
    }
    const caseNav = document.querySelector('.js-case-nav');

    if (caseNav) {
        const links = Array.from(caseNav.querySelectorAll('.case-nav__link'));

        console.log('Links', links);

        const setActiveLink = id => {
            const links = Array.from(document.querySelectorAll('.case-nav__link'));

            links.forEach(link => {
                const linkId = link.hash.replace('to-', '');

                if (linkId !== id) {
                    link.classList.remove('active');
                } else {
                    link.classList.add('active');
                    console.log('Setting active link', link);
                }
            });
            // links.forEach(link => link.classList.remove('active'));
            // link.classList.add('active');
        };

        const cleanLinksWithId = id => {
            const links = Array.from(document.querySelectorAll('.case-nav__link'));

            links.forEach(link => {
                const linkId = link.hash.replace('to-', '');

                if (linkId === id) {
                    link.classList.remove('active');
                }
            });
        };

        links.forEach((link, linkIndex) => {
            const id = link.hash.replace('to-', '');
            const section = document.querySelector(id);

            if (!section) {
                console.error('Section not found for id', id);
                return;
            }

            const nextLink = links[linkIndex + 1];

            let nextSection = null;

            if (nextLink) {
                const nextId = nextLink.hash.replace('to-', '');
                nextSection = document.querySelector(nextId)
            }

            console.log('Section', section);
            console.log('Next section', nextSection)

            ScrollTrigger.create({
                trigger: section,
                start: 'top top+=70px',
                endTrigger: nextSection || null,
                end: nextSection ? 'top top+=70px' : () => `"+=${section.offsetHeight}"`,
                markers: false,
                onEnter: () => {
                    setActiveLink(id);
                },
                onEnterBack: () => {
                    setActiveLink(id);
                },
                onLeave: () => {
                    cleanLinksWithId(id);
                },
                onLeaveBack: () => {
                    cleanLinksWithId(id);
                }
            });
        });
    }
}
