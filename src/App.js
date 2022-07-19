import React, { useEffect } from "react";
import { useState } from "react";
import Card from "./components/Card";
import "./App.css";
const cardImages = [
	{ src: "/img/helmet-1.png", matched: false },
	{ src: "/img/potion-1.png", matched: false },
	{ src: "/img/ring-1.png", matched: false },
	{ src: "/img/scroll-1.png", matched: false },
	{ src: "/img/shield-1.png", matched: false },
	{ src: "/img/sword-1.png", matched: false },
];

const App = () => {
	//storing cards in a state
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	//creating a function to shuffle the cards
	const shuffleCards = () => {
		//duplicating every card
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));
		//updating the state of the cards after shuffling
		setCards(shuffledCards);
		setTurns(0);
	};
	//choice handle
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};
	//compare the cards
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			if (choiceOne.src === choiceTwo.src) {
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiceOne.src) {
							// returning the object we want in the array if the match is successful
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				resetTurns();
			} else {
				console.log("not match");
				resetTurns();
			}
		}
	}, [choiceOne, choiceTwo]);
	const resetTurns = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns(turns + 1);
	};
	console.log(cards);
	return (
		<div className="App">
			<h1>Memory Game</h1>
			<button className="btn" onClick={shuffleCards}>
				New Game
			</button>
			<div className="card-grid">
				{cards.map((card) => (
					<Card
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
					/>
				))}
			</div>
		</div>
	);
};

export default App;
