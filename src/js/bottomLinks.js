import gsap from 'gsap';

export default function bottomLinks() {
    const elements = Array.from(document.querySelectorAll('.page-footer__write-us-btn'));
    const DURATION = 0.3;

    if (window.matchMedia("(max-width: 1024px)").matches) {
        return;
    }

    elements.forEach(element => {
        const icon = element.querySelector('.page-footer__write-us-btn-arrow');
        element.addEventListener('mouseenter', () => {
            const tl = gsap.timeline();
            tl.to(element, {
                duration: DURATION,
                ease: 'easeIn',
                webkitTextFillColor: 'rgba(255, 255, 255, 1)'
            }).to(
                icon,
                {
                    duration: DURATION,
                    color: 'rgba(255, 69, 69, 1)',
                    ease: 'easeIn'
                },
                0
            );
        });

        element.addEventListener('click', () => {
            const tl = gsap.timeline();
            tl.to(element, {
                duration: DURATION,
                ease: 'easeIn',
                webkitTextFillColor: 'rgba(255, 255, 255, 1)'
            }).to(
                icon,
                {
                    duration: DURATION,
                    color: 'rgba(255, 69, 69, 1)',
                    ease: 'easeIn'
                },
                0
            );
        });
        element.addEventListener('mouseleave', () => {
            const tl = gsap.timeline();
            tl.to(element, {
                duration: DURATION,
                ease: 'easeOut',
                webkitTextFillColor: 'rgba(255, 255, 255, 0)'
            }).to(
                icon,
                {
                    duration: DURATION,
                    color: 'rgba(255, 69, 69, 0)',
                    ease: 'easeOut'
                },
                0
            );
        });
    });
}
