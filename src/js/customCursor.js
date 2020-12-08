
import gsap from 'gsap';

export default function customCursor() {
    const cursor = document.createElement('div');

    cursor.className = 'custom-cursor';

    document.body.appendChild(cursor);


    document.addEventListener('mousemove', e => {
        cursor.style.top = (e.pageY - scrollY) + 'px';
        cursor.style.left = e.pageX + 'px';
    })


    // document.addEventListener('click', () => {
    //     cursor.classList.add('expand');
    //     setTimeout(() => {
    //         cursor.classList.remove('expand')
    //     }, 300)
    // })
    document.addEventListener('mousedown', () => {
        cursor.classList.add('expand');
       
    })

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('expand')
    })
}