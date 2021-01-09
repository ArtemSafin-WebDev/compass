import gsap from 'gsap';

export default function newCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor-new');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
        gsap.to(cursor, {
            duration: 0.2,
            left: e.clientX || e.pageX,
            top: e.clientY || e.pageY - pageYOffset,
            overwrite: true
        });

      
    });


    
}
