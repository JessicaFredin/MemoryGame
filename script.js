// const cardValues = [];
// const cards = document.querySelectorAll(".card");
// const flipCounter = document.querySelector(".flip-counter");
// const timeCounter = document.querySelector(".time-counter");
// let firstCard = null;
// let secondCard = null;
// let matchedCards = 0;
// let flipCount = 0;
// let startTime = null;
// let endTime = null;

// // Create pairs of numbers from 1 to 20
// for (let i = 1; i <= 20; i++) {
// 	cardValues.push(i);
// 	cardValues.push(i);
// }

// // Shuffle the array
// for (let i = cardValues.length - 1; i > 0; i--) {
// 	const j = Math.floor(Math.random() * (i + 1));
// 	[cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]];
// }

// for (let i = 0; i < cards.length; i++) {
// 	cards[i].innerHTML = '<span class="card-number">' + cardValues[i] + '</span>';
//     cards[i].setAttribute("data-value", cardValues[i]); // add data-value attribute
// 	cards[i].addEventListener("click", function () {
// 		// If the first card has not been selected yet
// 		if (firstCard === null) {
// 			firstCard = this;
// 			this.classList.toggle("flip");
// 		}
// 		// If the first card has already been selected, but the second card has not
// 		else if (secondCard === null) {
// 			secondCard = this;
// 			this.classList.toggle("flip");
//             flipCount++
// 			// Check if the two cards match
// 			if (firstCard.dataset.value === secondCard.dataset.value) {
// 				firstCard = null;
// 				secondCard = null;
// 				matchedCards += 2;
// 				// Check if all cards have been matched
// 				if (matchedCards === cards.length) {
// 					alert(`Congratulations! You have won the game in ${flipCount} flips.`);
// 				}
// 			}
// 			// If two cards have already been selected, but they don't match
// 			else {
// 				setTimeout(function () {
// 					firstCard.classList.remove("flip");
// 					secondCard.classList.remove("flip");
// 					firstCard = null;
// 					secondCard = null;
// 				}, 1000);
// 			}
// 		}
// 	});
// }

// console.log(flipCount)

const cardValues = [];
const cards = document.querySelectorAll(".card");
const flipCounter = document.querySelector(".flip-counter");
const timeCounter = document.querySelector(".time-counter");
const rulesLink = document.querySelectorAll('.rules-link');
const popup = document.querySelector('.pop-up');
const closePopup = document.querySelector('.xmark');
const restartGame = document.querySelector(".restart-btn")
let firstCard = null;
let secondCard = null;
let matchedCards = 0;
let flipCount = 0;
let startTime = null;
let endTime = null;

// Create pairs of numbers from 1 to 20
for (let i = 1; i <= 20; i++) {
	cardValues.push(i);
	cardValues.push(i);
}

// Shuffle the array
for (let i = cardValues.length - 1; i > 0; i--) {
	const j = Math.floor(Math.random() * (i + 1));
	[cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]];
}

function startGame() {
	// Reset counters
	flipCount = 0;
	startTime = null;
	endTime = null;
	flipCounter.textContent = "Flipped: 0";
	timeCounter.textContent = "Time: 0s";

	// Shuffle the cards
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		cards[i].style.order = j;
	}

	// Add event listeners to the cards
	for (let i = 0; i < cards.length; i++) {
		cards[i].innerHTML =
			'<span class="card-number">' + cardValues[i] + "</span>";
		cards[i].setAttribute("data-value", cardValues[i]); // add data-value attribute
		cards[i].classList.remove("flip");
		cards[i].addEventListener("click", flipCard);
	}
}

function flipCard() {
	// Start the timer if this is the first flip
	if (startTime === null) {
		startTime = new Date();
		setInterval(updateTimeCounter, 1000);
	}

	// If the card is already flipped, don't do anything
	if (this.classList.contains("flip")) {
		return;
	}

	// If the first card has not been selected yet
	if (firstCard === null) {
		firstCard = this;
		this.classList.toggle("flip");
	}
	// If the first card has already been selected, but the second card has not
	else if (secondCard === null) {
		secondCard = this;
		this.classList.toggle("flip");
		flipCount++;

		// Update the flip counter
		flipCounter.textContent = `Flipped: ${flipCount}`;

		// Check if the two cards match
		if (firstCard.dataset.value === secondCard.dataset.value) {
			firstCard = null;
			secondCard = null;
			matchedCards += 2;
			// Check if all cards have been matched
			if (matchedCards === cards.length) {
				endTime = new Date();
				setTimeout(function () {
					alert(
						`Congratulations! You have won the game in ${flipCount} flips and ${Math.floor(
							(endTime - startTime) / 1000
						)}s`
					);
					startGame();
				}, 500);
			}
		}
		// If two cards have already been selected, but they don't match
		else {
			setTimeout(function () {
				firstCard.classList.remove("flip");
				secondCard.classList.remove("flip");
				firstCard = null;
				secondCard = null;
			}, 1000);
		}
	}
}

function updateTimeCounter() {
	if (startTime !== null && endTime === null) {
		const timeElapsed = new Date() - startTime;
		const secondsElapsed = Math.floor(timeElapsed / 1000);
		timeCounter.textContent = `Time: ${secondsElapsed}s`;
	}
}

startGame();


rulesLink.forEach(function(link) {
  link.addEventListener('click', function() {
    popup.classList.add('active');
  });
});

closePopup.addEventListener('click', function() {
  popup.classList.remove('active');
});



restartGame.addEventListener("click", startGame)
