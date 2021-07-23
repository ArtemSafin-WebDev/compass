import detectIt from 'detect-it';

export default function clientsAndFriends() {
    if (window.matchMedia("(max-width: 640px)").matches || detectIt.hasTouch) {
        const cards = Array.from(document.querySelectorAll('.about__clients-and-friends-card'));

        cards.forEach(card => {
            const btn = card.querySelector('.about__clients-and-friends-card-link');
            const closeBtn = card.querySelector('.about__clients-and-friends-card-dropdown-close');
    
            console.log('Close btn', closeBtn)
    
    
            if (btn) {
                btn.addEventListener('click', event => {
                    event.preventDefault();

                    cards.forEach(otherCard => {
                        if (otherCard !== card) otherCard.classList.remove('active');
                    })
                    card.classList.toggle('active')
        
                    console.log('Toggled active')
                })
            }
    
           
    
            if (closeBtn) {
                closeBtn.addEventListener('click', event => {
                    event.preventDefault();
                    card.classList.remove('active')
                })
            }
    
           
        })
    }

 
}