import gsap from 'gsap';

export default function customCursor() {
    const cursorMain = document.createElement('div');

    cursorMain.className = 'custom-cursor-main';

    document.body.appendChild(cursorMain);

    const cursorSecondary = document.createElement('div');

    cursorSecondary.className = 'custom-cursor-secondary';

    document.body.appendChild(cursorSecondary);

    const cursorSlider = document.createElement('div');
    

    cursorSlider.className = 'custom-cursor-slider';

    cursorSlider.innerHTML = `
        <svg width="14" height="14" aria-hidden="true" class="icon-cursor-arrow-left">
            <use xlink:href="#cursor-arrow-left"></use>
        </svg>
        <span class="custom-cursor-slider__content">
           
        </span>
        <svg width="14" height="14" aria-hidden="true" class="icon-cursor-plus">
            <use xlink:href="#cursor-plus"></use>
        </svg>
        <svg width="14" height="14" aria-hidden="true" class="icon-cursor-arrow-right">
            <use xlink:href="#cursor-arrow-right"></use>
        </svg>
    `;

    document.body.appendChild(cursorSlider);

    let sliderCursorEnabled = false;

    let xmouse = 0,
        ymouse = 0,
        x = 0,
        y = 0,
        dx = 0,
        dy = 0,
        key = -1;

    const delay = 0.18;

    document.addEventListener('mousemove', e => {
        xmouse = e.clientX || e.pageX;
        ymouse = e.clientY || e.pageY - pageYOffset;
        cursorMain.style.left = xmouse + 'px';
        cursorMain.style.top = ymouse + 'px';

        if (!sliderCursorEnabled) return;
        cursorSlider.style.left = xmouse + 'px';
        cursorSlider.style.top = ymouse + 'px';
    });

    function followCursor() {
        key = requestAnimationFrame(followCursor);
       
        if (!x || !y) {
            x = xmouse;
            y = ymouse;
        } else {
            dx = (xmouse - x) * delay;
            dy = (ymouse - y) * delay;

            if (Math.abs(dx) + Math.abs(dy) < 0.1) {
                x = xmouse;
                y = ymouse;
            } else {
                x += dx;
                y += dy;
            }
        }

        cursorSecondary.style.left = x + 'px';
        cursorSecondary.style.top = y + 'px';
    }

    followCursor();

    document.addEventListener('mousedown', () => {
        cursorSecondary.classList.add('expand');
        cursorMain.classList.add('expand');
        cursorSlider.classList.add('expand');
    });

    document.addEventListener('mouseup', () => {
        cursorSecondary.classList.remove('expand');
        cursorMain.classList.remove('expand');
        cursorSlider.classList.remove('expand');
    });

    // const interactiveElements = Array.from(document.querySelectorAll('a:not([data-slider-card]), button:not([data-slider-card])'));

    // interactiveElements.forEach(element => {
    //     element.addEventListener('mouseenter', () => {
    //         cursorMain.classList.add('interactive');
    //         cursorSecondary.classList.add('interactive');
    //     });
    //     element.addEventListener('mouseleave', () => {
    //         cursorMain.classList.remove('interactive');
    //         cursorSecondary.classList.remove('interactive');
    //     });
    // });

    const sliderElements = Array.from(document.querySelectorAll('.swiper-container'));

    sliderElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorSlider.classList.add('visible');
            cursorMain.classList.add('hidden');
            cursorSecondary.classList.add('hidden');

            if (element.closest('.js-cursor-no-plus')) {
                cursorSlider.classList.add('no-plus');
            }

            sliderCursorEnabled = true;
        });

        element.addEventListener('mouseleave', () => {
            cursorSlider.classList.remove('visible');
            cursorMain.classList.remove('hidden');
            cursorSecondary.classList.remove('hidden');

            if (element.closest('.js-cursor-no-plus')) {
                cursorSlider.classList.remove('no-plus');
            }

            sliderCursorEnabled = false;
        });
    });


    

    

    const blackCursorBlock = document.querySelector('.js-black-cursor');
    if (blackCursorBlock) {
        document.addEventListener('mousemove', (event) => {
            if (event.pageY <= blackCursorBlock.offsetHeight) {
                cursorSecondary.classList.add('black-cursor');
            } else {
                cursorSecondary.classList.remove('black-cursor');
            }
        })    


       
    }

   
    document.addEventListener('mouseover', event => {
        if (event.target.matches('a, button') || event.target.closest('button') || event.target.closest('a')) {
            cursorMain.classList.add('interactive');
            cursorSecondary.classList.add('interactive');
        } else {
            console.log('Event target is not interactive', event.target);
        }
    });
    document.addEventListener('mouseout', event => {

        cursorMain.classList.remove('interactive');
        cursorSecondary.classList.remove('interactive');
    });
}
