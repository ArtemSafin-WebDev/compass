export function loader() {
    const loader = document.querySelector('.loader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 300)
    });


    document.addEventListener('click', event => {
        if (event.target.matches('a') || event.target.closest('a')) {
            const link = event.target.matches('a') ? event.target : event.target.closest('a');
           
            console.log('Catched link', link);

            if (link.hostname !== location.hostname || link.href.match(/^mailto\:/) || link.href.match(/^tel\:/) || link.hash || link.matches("[href^='#']")) {
                console.log('Link not internal', link);
                return;
            } else {
                
                event.preventDefault();
                loader.classList.remove('hidden');
                console.log('Link is internal', link)

                setTimeout(() => {
                    window.location = link.href;
                }, 1000)

            }
        }
    })
}