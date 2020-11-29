import gsap from '../../node_modules/gsap/gsap-core';
import { MOBILE } from './constants';

export default function clientsLogos() {
    const elements = Array.from(document.querySelectorAll('.js-our-clients-logos'));

    elements.forEach(element => {
        const list = element.querySelector('.our-clients__logos-list:not(.our-clients__logos-list--hidden)');
        const ourClientsListHidden = element.querySelector('.our-clients__logos-list--hidden');

        if (!list || !ourClientsListHidden) {
            console.error('Not enough elements');
            return;
        }

        if (!list.children.length || !ourClientsListHidden.children.length) {
            console.error('No logos to change');

            return;
        }

        const allLogos = Array.from(list.children)
            .concat(Array.from(ourClientsListHidden.children))
            .map(logo => {
                const logoImage = logo.querySelector('img');
                const logoSrc = logoImage.src;
                return logoSrc;
            });

        let uniqueLogos = [...new Set(allLogos)];

        const range = window.matchMedia(`(max-width: ${MOBILE}px)`).matches
            ? list.children.length > 4
                ? 4
                : list.children.length
            : list.children.length;

        console.log('Current range', range);

        const getRandomNumberInRange = max => {
            return Math.floor(Math.random() * Math.floor(max));
        };

        const replaceItem = itemIndex => {
            const listItem = Array.from(list.children)[itemIndex];

            const currentImage = listItem.querySelector('img');

            const newImage = document.createElement('img');

            const availableLogos = uniqueLogos.filter(item => item !== currentImage.src);

            const newImageSrc = availableLogos[getRandomNumberInRange(availableLogos.length)];

            newImage.src = newImageSrc;

            console.log('New image element', newImage);
            console.log('Appending to', listItem);

            listItem.appendChild(newImage);

            gsap.set(newImage, {
                autoAlpha: 0,
                scale: 0
            });

            const tl = gsap.timeline({
                onComplete: () => {
                    currentImage.remove();
                }
            });

            tl.to(currentImage, {
                autoAlpha: 0,
                duration: 0.4,
                scale: 0
            }).to(newImage, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.4
            });
        };

        let timer = setInterval(() => {
            const randomNumber = getRandomNumberInRange(range);
            replaceItem(randomNumber);
        }, 1500);

        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                clearInterval(timer);
            } else {
                timer = setInterval(() => {
                    const randomNumber = getRandomNumberInRange(range);
                    replaceItem(randomNumber);
                }, 1500);
            }
        });

        window.addEventListener('pagehide', event => {
            clearInterval(timer);
        }, false);
    });
}
