import { gsap } from 'gsap';
import { DARK_BG, LOGO_ON_DARK, PROGRESS_ON_DARK, PROGRESS_ON_LIGHT, PROGRESS_THUMB_ON_DARK, PROGRESS_THUMB_ON_LIGHT, TEXT_COLOR } from './colors';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import detectIt from 'detect-it';
import { MOBILE } from './constants';
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function newHomepageAnimations() {
    ScrollTrigger.matchMedia({
        '(min-width: 641px)': () => {
            const portfolioFadeTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '.portfolio-intro',
                    start: 'bottom bottom+=100px',
                    toggleActions: 'play none none reverse'
                }
            });

            portfolioFadeTimeline
                .to(
                    '.intro',
                    {
                        duration: 0.3,
                        backgroundColor: DARK_BG,
                        color: '#ffffff'
                    },
                    0
                )
                .to(
                    '.portfolio-intro',
                    {
                        duration: 0.3,
                        backgroundColor: DARK_BG,
                        color: '#ffffff'
                    },
                    0
                )
                .to(
                    '.page-header',
                    {
                        '--page-header-text-color': '#ffffff',
                        duration: 0.3
                    },
                    0
                )
                .to(
                    '.intro__arrows',
                    {
                        '--arrows-gradient-first-color': 'rgba(32, 32, 32, 0)',
                        '--arrows-gradient-second-color': 'rgba(32, 32, 32, 0.8)',
                        duration: 0.3
                    },
                    0
                )
                .to(
                    'html',
                    {
                        '--logo-color': LOGO_ON_DARK,
                        '--progress-color': PROGRESS_ON_DARK,
                        '--progress-thumb-color': PROGRESS_THUMB_ON_DARK,
                        '--social-color': '#ffffff',
                        duration: 0.3
                    },
                    0
                );
        },
        '(min-width: 1025px)': () => {
            ScrollTrigger.create({
                trigger: '.portfolio',
                start: 'top top',
                end: 'bottom bottom',
                pin: '.portfolio__albums-backgrounds',
                // anticipatePin: 1,
                pinSpacing: false,
                markers: false
            });
        }
    });

    const albumsItems = Array.from(document.querySelectorAll('.portfolio__albums-list-item'));
    const albumsBgItems = Array.from(document.querySelectorAll('.portfolio__albums-background-list-item'));
    const albumsBgLayer = document.querySelector('.portfolio__albums-backgrounds');

    const setActiveAlbumItem = index => {
        if (index !== 0 && !index) {
            albumsBgLayer.classList.remove('shown');
            albumsBgItems.forEach(item => item.classList.remove('active'));
        } else {
            albumsBgItems.forEach(item => item.classList.remove('active'));
            albumsBgItems[index].classList.add('active');
            albumsBgLayer.classList.add('shown');
        }
    };

    if (albumsItems.length) {
        if (albumsItems.length !== albumsBgItems.length) {
            console.error('Не равное количество объектов');
        } else {
            albumsItems.forEach((item, itemIndex) => {
                item.addEventListener('mouseenter', () => {
                    albumsItems.forEach(item => item.classList.remove('active'));
                    item.classList.add('active');
                    setActiveAlbumItem(itemIndex);
                });
                item.addEventListener('mouseleave', () => {
                    item.classList.remove('active');
                    setActiveAlbumItem(null);
                });
            });

            if (detectIt.hasTouch) {
                albumsItems.forEach((item, itemIndex) => {
                    ScrollTrigger.create({
                        trigger: item,
                        start: 'top center',
                        end: 'bottom center',
                        onToggle: self => {
                            albumsItems.forEach(item => item.classList.remove('active'));
                            if (self.isActive) {
                                item.classList.add('active');
                                setActiveAlbumItem(itemIndex);
                                if (window.matchMedia(`(max-width: ${MOBILE}px)`).matches) {
                                    gsap.to('.our-clients', {
                                        autoAlpha: 0,
                                        duration: 0.3
                                    });
                                }
                            } else {
                                setActiveAlbumItem(null);
                                if (window.matchMedia(`(max-width: ${MOBILE}px)`).matches) {
                                    gsap.to('.our-clients', {
                                        autoAlpha: 1,
                                        duration: 0.3
                                    });
                                }
                            }
                        }
                    });
                });
            }
        }
    }
}
