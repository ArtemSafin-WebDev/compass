import axios from 'axios';

export function loader() {
    const loader = document.querySelector('.loader');
    const loaderMessage = document.querySelector('.loader__message');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
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
                link.matches("[href^='#']")
            ) {
                // console.log('Link not internal', link);
                return;
            } else {
                event.preventDefault();

                if (loader.hasAttribute('data-get-loader-text')) {
                   
                    axios
                        .get(link.href)
                        .then(response => {
                            

                            const parser = new DOMParser();
                            const nextPageHtml = parser.parseFromString(response.data, 'text/html');

                            const nextPageLoaderMessage = nextPageHtml.querySelector('.loader__message');

                            

                            if (nextPageLoaderMessage) {
                                loaderMessage.textContent = nextPageLoaderMessage.textContent;

                                loader.classList.remove('hidden');

                                setTimeout(() => {
                                    window.location = link.href;
                                }, 1000);
                            } else {
                                console.error('No next page loader message');
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        });
                } else {
                    // console.log('Loader does not have attribute');
                    loader.classList.remove('hidden');
                   

                    setTimeout(() => {
                        window.location = link.href;
                    }, 1000);
                }
            }
        }
    });
}
