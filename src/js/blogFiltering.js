import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function blogFiltering() {
    const elements = Array.from(document.querySelectorAll('.js-blog-filtering'));

    elements.forEach(element => {
        const cardsCopy = Array.from(element.querySelectorAll('.blog__post-card')).map(item => item.cloneNode(true));
        const categoryLinks = Array.from(element.querySelectorAll('.blog__menu-nav-link'));
        const leftCol = element.querySelector('.blog__posts-left-col');
        const rightCol = element.querySelector('.blog__posts-right-col');

        const filterCategories = category => {
            leftCol.innerHTML = '';
            rightCol.innerHTML = '';

            let filteredCards = [];

            if (category.toLowerCase() === 'all') {
                filteredCards = [...cardsCopy];
            } else {
                filteredCards = cardsCopy.filter(card => card.getAttribute('data-category') === category);
            }

            filteredCards.forEach((card, cardIndex) => {
                if (cardIndex % 2 == 0) {
                    leftCol.appendChild(card);
                } else {
                    rightCol.appendChild(card);
                }

                // gsap.from(card, {
                //     duration: 0.5,
                //     autoAlpha: 0
                // });
            });

            ScrollTrigger.refresh(true);
            const stickyUpdateEvent = new CustomEvent('stickyupdate');
            document.dispatchEvent(stickyUpdateEvent);

            if (!window.matchMedia(`(max-width: ${SMALL_TABLET}px)`).matches) {
                gsap.to(window, { duration: 0.6, scrollTo: '.blog__content' });
            }

          
        };

        categoryLinks.forEach(link =>
            link.addEventListener('click', event => {
                event.preventDefault();
                categoryLinks.forEach(link => link.classList.remove('active'));
                link.classList.add('active');
                const currentCategory = link.getAttribute('data-category');

                filterCategories(currentCategory);
            })
        );
    });
}
