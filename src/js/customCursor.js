import gsap from 'gsap';

export default function customCursor() {
    const cursorMain = document.createElement('div');

    cursorMain.className = 'custom-cursor-main';

    document.body.appendChild(cursorMain);

    const cursorSecondary = document.createElement('div');

    cursorSecondary.className = 'custom-cursor-secondary';

    document.body.appendChild(cursorSecondary);
    
    let xmouse = 0, ymouse = 0, x = 0, y = 0, dx = 0, dy = 0, key = -1;

    const delay = 0.125;

    document.addEventListener('mousemove', e => {
        xmouse = e.clientX || e.pageX;
        ymouse = e.clientY || e.pageY - pageYOffset;
        cursorMain.style.left = xmouse + 'px';
        cursorMain.style.top = ymouse + 'px';
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
    });

    document.addEventListener('mouseup', () => {
        cursorSecondary.classList.remove('expand');
        cursorMain.classList.remove('expand');
    });

    const interactiveElements = Array.from(document.querySelectorAll('a, button'));

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorMain.classList.add('interactive');
            cursorSecondary.classList.add('interactive');
        });
        element.addEventListener('mouseleave', () => {
            cursorMain.classList.remove('interactive');
            cursorSecondary.classList.remove('interactive');
        });
    });
}
