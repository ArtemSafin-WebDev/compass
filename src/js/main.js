import polyfills from './polyfills';
import detectTouch from './detectTouch';
// import homepageAnimations from './homepageAnimations';
import commonAnimations from './commonAnimations';
import clientsSlider from './clientsSlider';
import blogFiltering from './blogFiltering';
import anchorLinks from './anchorLinks';
import clientsLogos from './clientsLogos';
import blogAnimations from './blogAnimations';
import menu from './menu';
import customCursor from './customCursor';
import imagesLoaded from 'imagesloaded';
import caseSlider from './caseSlider';
import mediaPlayer from './mediaPlayer';
import { SMALL_TABLET } from './constants';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import newHomepageAnimations from './newHomepageAnimations';
import bottomLinks from './bottomLinks';
import validation from './validation';
import phoneMask from './phoneMask';
import fileUpload from './fileUpload';
import newCustomCursor from './newCustomCursor';

document.addEventListener('DOMContentLoaded', function() {
    customCursor();
    polyfills();
    detectTouch();
    commonAnimations();
    newHomepageAnimations();
    clientsSlider();
    blogFiltering();
    anchorLinks();
    clientsLogos();
    blogAnimations();
    menu();
    caseSlider();
    mediaPlayer();
    bottomLinks();
    phoneMask();
    validation();
    fileUpload();
    // newCustomCursor();
   

    const imgLoaded = imagesLoaded(document.querySelector('.page-content'));

    imgLoaded.on('always', () => {
        console.log('ALWAYS - all images have been loaded');
        if (window.matchMedia(`(max-width: ${SMALL_TABLET}px)`).matches) {
            const mobileMidnight = Array.from(document.querySelectorAll('[data-mobile-midnight]'));

            mobileMidnight.forEach(item => {
                item.setAttribute('data-midnight', item.getAttribute('data-mobile-midnight'))
            })
        }
        

        $('.sidebar').midnight();
        $('.page-header').midnight();

        
    });

    document.addEventListener('lazyloaded', function(e){
        console.log('Lazyloaded image', e.target)

        ScrollTrigger.refresh();
    });



    document.addEventListener('heightchange', () => {
        ScrollTrigger.refresh();
    })

});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    setTimeout(() => document.body.classList.add('animatable'), 300);
});
