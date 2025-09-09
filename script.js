
        const cardArray = [
            { name: 'fries', img: 'images/fries.png' },
            { name: 'cheeseburger', img: 'images/cheeseburger.png' },
            { name: 'hotdog', img: 'images/hotdog.png' },
            { name: 'ice-cream', img: 'images/ice-cream.png' },
            { name: 'milkshake', img: 'images/milkshake.png' },
            { name: 'pizza', img: 'images/pizza.png' },
            { name: 'fries', img: 'images/fries.png' },
            { name: 'cheeseburger', img: 'images/cheeseburger.png' },
            { name: 'hotdog', img: 'images/hotdog.png' },
            { name: 'ice-cream', img: 'images/ice-cream.png' },
            { name: 'milkshake', img: 'images/milkshake.png' },
            { name: 'pizza', img: 'images/pizza.png' }
        ];

        // Shuffle the cards
        cardArray.sort(() => 0.5 - Math.random());

        const gridDisplay = document.querySelector('#grid');
        const resultDisplay = document.querySelector('#result');
        let cardsChosen = [];
        let cardsChosenIds = [];
        const cardsWon = [];

        function createBoard() {
            for (let i = 0; i < cardArray.length; i++) {
                const card = document.createElement('img');
                card.setAttribute('src', 'images/blank.png');
                card.setAttribute('data-id', i);
                card.addEventListener('click', flipCard);
                gridDisplay.appendChild(card);
            }
        }

        function flipCard() {
            const cardId = this.getAttribute('data-id');
            
            // Prevent clicking the same card twice
            if (cardsChosenIds.includes(cardId)) {
                return;
            }
            
            // Show the card image
            this.setAttribute('src', cardArray[cardId].img);
            
            // Add to chosen cards
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenIds.push(cardId);
            
            // Check for match if two cards are selected
            if (cardsChosen.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }

        function checkMatch() {
            const cards = document.querySelectorAll('img');
            const optionOneId = cardsChosenIds[0];
            const optionTwoId = cardsChosenIds[1];
            
            // Check if the same card was clicked twice
            if (optionOneId === optionTwoId) {
                cards[optionOneId].setAttribute('src', 'images/blank.png');
                alert('You have clicked the same image!');
            } 
            // Check if it's a match
            else if (cardsChosen[0] === cardsChosen[1]) {
                // Match found
                cards[optionOneId].setAttribute('src', 'images/white.png');
                cards[optionTwoId].setAttribute('src', 'images/white.png');
                cards[optionOneId].removeEventListener('click', flipCard);
                cards[optionTwoId].removeEventListener('click', flipCard);
                cardsWon.push(cardsChosen);
            } else {
                // Not a match - flip cards back
                cards[optionOneId].setAttribute('src', 'images/blank.png');
                cards[optionTwoId].setAttribute('src', 'images/blank.png');
            }
            
            // Update score
            resultDisplay.textContent = cardsWon.length;
            
            // Reset for next turn
            cardsChosen = [];
            cardsChosenIds = [];
            
            // Check if game is complete
            if (cardsWon.length === cardArray.length / 2) {
                resultDisplay.textContent = 'Congratulations! You found them all!';
            }
        }

        // Initialize the game
        createBoard();