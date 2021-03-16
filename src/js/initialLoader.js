import imagesLoaded from 'imagesloaded';
import gsap from 'gsap';
import Splitting from 'splitting';

export default function initialLoader() {
    const initialLoader = document.querySelector('.initial-loader');

    if (!initialLoader) return;
    const firstGroupOfArrows = Array.from(initialLoader.querySelectorAll('.initial-loader__arrow--first-group'));
    const secondGroupOfArrows = Array.from(initialLoader.querySelectorAll('.initial-loader__arrow--second-group'));
    const allArrows = Array.from(initialLoader.querySelectorAll('.initial-loader__arrow'));
    const arrowsWrapper = initialLoader.querySelector('.initial-loader__arrows');
    const mainHeadingArrow = document.querySelector('.intro__main-heading-arrow');
    const imgLoad = imagesLoaded('.page-content');
    const mainHeading = document.querySelector('.intro__main-heading');

    const results = Splitting({ target: mainHeading, by: 'lines' });

    results[0].words.forEach(word => {
        const text = word.textContent;
        word.innerHTML = `
            <span class="intro__main-heading-word-wrapper">
                <span class="intro__main-heading-word-wrapper-inner">
                ${text}
                </span>
            </span>
        `;
    });

    results[0].lines.forEach(line => {
        console.log('Line', line);
        const innerSpans = line.map(word => word.querySelector('.intro__main-heading-word-wrapper-inner'));
        gsap.set(innerSpans, {
            yPercent: 100
        })
    });

    console.log('Heading lines', results[0].lines);

    gsap.set(mainHeadingArrow, {
        autoAlpha: 0
    });

    console.log('First group of arrows', firstGroupOfArrows);
    console.log('Second group of arrows', secondGroupOfArrows);

    const totalNumberOfImages = imgLoad.images.length;
    let numberOfLoadedImages = 0;
    let arrowsWrapperGap = parseFloat(window.getComputedStyle(arrowsWrapper).gridGap);

    window.addEventListener('resize', () => {
        arrowsWrapperGap = parseFloat(window.getComputedStyle(arrowsWrapper).gridGap);
    });

    console.log('Arrows grid gap', arrowsWrapperGap);

    console.log('Total number of images', totalNumberOfImages);

    imgLoad.on('progress', () => {
        numberOfLoadedImages++;

        const progress = Math.ceil((numberOfLoadedImages / totalNumberOfImages) * 100);

        if (progress <= 50) {
            firstGroupOfArrows.forEach(arrow => {
                const progressBar = arrow.querySelector('.arrow-cls-3');

                gsap.to(progressBar, {
                    scaleX: Math.ceil(progress / 50),
                    duration: 0.2
                });
            });
        } else {
            secondGroupOfArrows.forEach(arrow => {
                const progressBar = arrow.querySelector('.arrow-cls-3');

                gsap.to(progressBar, {
                    scaleX: Math.ceil(progress / 100),
                    duration: 0.2
                });
            });
        }

        console.log('Progress of images loaded', progress);
    });

    window.addEventListener('load', () => {
        console.log('All images has been loaded');

        console.log('All arrows', allArrows);

        const arrowsCenter = [
            arrowsWrapper.getBoundingClientRect().left + arrowsWrapper.offsetWidth / 2,
            arrowsWrapper.getBoundingClientRect().top + arrowsWrapper.offsetHeight / 2
        ];

        const mainHeadingArrowCenter = [
            mainHeadingArrow.getBoundingClientRect().left + mainHeadingArrow.offsetWidth / 2,
            mainHeadingArrow.getBoundingClientRect().top + mainHeadingArrow.offsetHeight / 2
        ];

        console.log('Arrows center', arrowsCenter);
        console.log('Main heading arrow center', mainHeadingArrowCenter);

        const tl = gsap.timeline({
            onComplete: () => {
                const tl = gsap.timeline({
                    onComplete: () => {
                        document.documentElement.classList.remove('initial-loader-locked')
                    }
                });

                tl.to(initialLoader, {
                    autoAlpha: 0,
                    duration: 0.3
                }).to(
                    mainHeadingArrow,
                    {
                        autoAlpha: 1,
                        duration: 0.3
                    },
                    0
                );
            }
        });

        tl.to(allArrows[0], {
            duration: 0.6,
            xPercent: 50,
            yPercent: 50,
            x: arrowsWrapperGap / 2,
            y: arrowsWrapperGap / 2
        });
        tl.to(
            allArrows[1],
            {
                duration: 0.6,
                xPercent: -50,
                yPercent: 50,
                x: (-1 * arrowsWrapperGap) / 2,
                y: arrowsWrapperGap / 2
            },
            0
        );
        tl.to(
            allArrows[2],
            {
                duration: 0.6,
                xPercent: 50,
                yPercent: -50,
                x: arrowsWrapperGap / 2,
                y: (-1 * arrowsWrapperGap) / 2
            },
            0
        );
        tl.to(
            allArrows[3],
            {
                duration: 0.6,
                xPercent: -50,
                yPercent: -50,
                x: (-1 * arrowsWrapperGap) / 2,
                y: (-1 * arrowsWrapperGap) / 2
            },
            0
        )
            .to(initialLoader, {
                background: 'transparent',
                duration: 0.5
            })
            .to(
                arrowsWrapper,
                {
                    duration: 0.8,
                    x: mainHeadingArrowCenter[0] - arrowsCenter[0],
                    y: mainHeadingArrowCenter[1] - arrowsCenter[1]
                },
                '<'
            );

        results[0].lines.forEach(line => {
            console.log('Line', line);
            const innerSpans = line.map(word => word.querySelector('.intro__main-heading-word-wrapper-inner'));
            console.log('Line inner spans', innerSpans);

            tl.to(
                innerSpans,

                {
                    yPercent: 0,
                    duration: 0.8
                },
                0.3
            );
        });
    });

    imgLoad.on('always', function() {});
}
