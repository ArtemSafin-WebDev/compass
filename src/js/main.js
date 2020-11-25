import polyfills from './polyfills';
import detectTouch from './detectTouch';
import homepageAnimations from './homepageAnimations';
import commonAnimations from './commonAnimations';
import clientsSlider from './clientsSlider';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    commonAnimations();
    homepageAnimations();
    clientsSlider();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300)
})
