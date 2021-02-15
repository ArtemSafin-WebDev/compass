
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

export default function blogLayout() {
    const blogGrids = Array.from(document.querySelectorAll('.js-blog-layout'));

    blogGrids.forEach(element => {
        const imgLoaded = imagesLoaded(element);
        const instance = new Masonry(element, {
            itemSelector: '.blog-page__posts-list-item',
            percentPosition: true,
            columnWidth: '.blog-page__posts-list-item',
            gutter: '.blog-page__gutter-sizer',
        });

        imgLoaded.on('progress', () => {
            instance.layout();
        });
    })
}