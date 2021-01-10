export default function ShowFooterBg() {
    const showFooterBgBtn = document.querySelector('.js-show-footer-bg');
    const footerBg = document.querySelector('.page-footer__bg');

    if (showFooterBgBtn && footerBg) {
        showFooterBgBtn.addEventListener('mouseenter', () => {
            footerBg.classList.add('active');
        })
        showFooterBgBtn.addEventListener('mouseleave', () => {
            footerBg.classList.remove('active');
        })
    }
}