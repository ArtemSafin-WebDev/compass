import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DARK_BG, LOGO_ON_DARK, PROGRESS_ON_DARK, PROGRESS_ON_LIGHT, PROGRESS_THUMB_ON_DARK, PROGRESS_THUMB_ON_LIGHT, TEXT_COLOR } from './colors';
import { SMALL_TABLET, TABLET } from './constants';
import detectIt from 'detect-it';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function homepageAnimations() {
    const intro = document.querySelector('#intro');
    const portfolio = document.querySelector('#portfolio');
    const arrows = document.querySelector('#arrows');

    const portfolioIntro = document.querySelector('.portfolio__intro');
    const ourClients = document.querySelector('#our-clients');
    const blogLeftCol = document.querySelector('.blog__posts-left-col');
    const blogRightCol = document.querySelector('.blog__posts-right-col');

    if (!window.matchMedia(`(max-width: ${SMALL_TABLET}px)`).matches && intro && portfolio) {
        const introFadeTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: portfolio,
                scrub: 1,
                start: 'top bottom',
                end: '+=50%'
            }
        });

        introFadeTimeline
            .to(
                intro,
                {
                    duration: 2,
                    backgroundColor: DARK_BG,
                    color: '#ffffff'
                },
                0
            )
            .to(
                portfolio,
                {
                    duration: 2,
                    backgroundColor: DARK_BG,
                    color: '#ffffff'
                },
                0
            )
            .to(
                '.page-header',
                {
                    '--page-header-text-color': '#ffffff',
                    duration: 2
                },
                0
            )
            .to(
                'html',
                {
                    '--logo-color': LOGO_ON_DARK,
                    duration: 2
                },
                0
            )
            .to(
                'html',
                {
                    '--progress-color': PROGRESS_ON_DARK,
                    duration: 2
                },
                0
            )
            .to(
                'html',
                {
                    '--progress-thumb-color': PROGRESS_THUMB_ON_DARK,
                    duration: 2
                },
                0
            )

            .to(
                'html',
                {
                    duration: 1,
                    '--social-color': '#ffffff'
                },
                0
            );
    } else {
        portfolio.setAttribute('data-midnight', 'dark');
    }

    const coloredArrowsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: arrows,
            scrub: 1,
            start: 'top center',
            end: 'bottom top'
        }
    });

    const arrowsColors = ['#4287f5', '#8014de', '#ffa203'];

    arrowsColors.forEach(color => {
        coloredArrowsTimeline.to(arrows, {
            '--arrows-fill-color': color,
            duration: 1
        });
    });

    if (!window.matchMedia(`(max-width: ${SMALL_TABLET}px)`).matches && portfolioIntro) {
        const portfolioIntroTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: portfolioIntro,
                scrub: 1,
                start: 'top bottom',
                end: 'bottom bottom'
            }
        });

        portfolioIntroTimeline.to(portfolioIntro, {
            duration: 1,
            yPercent: -20
        });
    }

    const albumsItems = Array.from(document.querySelectorAll('.portfolio__albums-list-item'));
    const albumsBgItems = Array.from(document.querySelectorAll('.portfolio__albums-background-list-item'));
    const albumsBgLayer = document.querySelector('.portfolio__albums-backgrounds');

    const setActiveAlbumItem = index => {
        if (index !== 0 && !index) {
            albumsBgLayer.classList.remove('shown');
            albumsBgItems.forEach(item => item.classList.remove('active'));
            gsap.to('.page-header__scroll-progress', {
                autoAlpha: 1,
                duration: 0.2,
                delay: 0.1
            });

            gsap.to(ourClients, {
                autoAlpha: 1,
                duration: 0.3
            });

            gsap.to('.page-header__social', {
                autoAlpha: 1,
                duration: 0.3
            });
        } else {
            albumsBgItems.forEach(item => item.classList.remove('active'));
            albumsBgItems[index].classList.add('active');
            albumsBgLayer.classList.add('shown');
            gsap.to('.page-header__scroll-progress', {
                autoAlpha: 0,
                duration: 0.2,
                delay: 0.1
            });

            gsap.to(ourClients, {
                autoAlpha: 0,
                duration: 0.3
            });

            gsap.to('.page-header__social', {
                autoAlpha: 0,
                duration: 0.3
            });
        }
    };

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
                        } else {
                            setActiveAlbumItem(null)
                        }
                       
                    }
                });
            });
        }
    }

    if (!window.matchMedia(`(max-width: ${SMALL_TABLET}px)`).matches) {
        if (blogLeftCol) {
            gsap.to(blogLeftCol, {
                duration: 1,
                y: -80,
                scrollTrigger: {
                    trigger: blogLeftCol,
                    scrub: 1,
                    start: 'top bottom',
                    end: 'bottom bottom'
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
                    end: 'bottom bottom'
                }
            });
        }
    }
}
