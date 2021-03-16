import axios from 'axios';
import gsap from 'gsap';

export function loader() {
    const loader = document.querySelector('.loader');
    const loaderMessage = document.querySelector('.loader__message');

    

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('hidden');
            }
           
        }, 300);
    });

    document.addEventListener('click', event => {
        if (document.body.classList.contains('is-admin')) return;
        if (event.target.matches('a') || event.target.closest('a')) {
            const link = event.target.matches('a') ? event.target : event.target.closest('a');

            // console.log('Catched link', link);

            if (
                link.hostname !== location.hostname ||
                link.href.match(/^mailto\:/) ||
                link.href.match(/^tel\:/) ||
                link.matches('[data-fancybox]') ||
                link.hash ||
                link.matches("[href^='#']") ||
                link.matches('.case__content-quote-detail-link')
            ) {
                // console.log('Link not internal', link);
                return;
            } else {
                event.preventDefault();

                if (loader && loader.hasAttribute('data-get-loader-text')) {
                    axios
                        .get(link.href)
                        .then(response => {
                            const parser = new DOMParser();
                            const nextPageHtml = parser.parseFromString(response.data, 'text/html');

                            const nextPageLoaderMessage = nextPageHtml.querySelector('.loader__message');
                            const initialLoader = nextPageHtml.querySelector('.initial-loader');

                            if (initialLoader && !initialLoader.classList.contains('initially-hidden')) {
                                const currentInitialLoader = document.querySelector('.initial-loader');

                                gsap.to(currentInitialLoader, {
                                    autoAlpha: 1,
                                    duration: 0.3,
                                    onComplete: () => {
                                        setTimeout(() => {
                                            window.location = link.href;
                                        }, 200);
                                    }
                                })
                            } else {
                                if (nextPageLoaderMessage) {
                                    loaderMessage.textContent = nextPageLoaderMessage.textContent;
                                    loader.classList.remove('initially-hidden');
                                    loader.classList.remove('hidden');
                                    
    
                                    setTimeout(() => {
                                        window.location = link.href;
                                    }, 500);
                                } else {
                                    console.error('No next page loader message');
                                }
                            }

                            
                        })
                        .catch(err => {
                            console.error(err);
                        });
                } else {
                    // console.log('Loader does not have attribute');

                    if (loader) {
                        loader.classList.remove('initially-hidden');
                        loader.classList.remove('hidden');

                        setTimeout(() => {
                            window.location = link.href;
                        }, 500);
                    } else {
                        window.location = link.href;
                    }
                  

                   
                }
            }
        }
    });
}
