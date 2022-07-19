import React, { useEffect } from "react";
import { useState } from "react";
import Card from "./components/Card";
import "./App.css";
import { GoMarkGithub } from "react-icons/go";
import { FaTwitter } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

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
	//disable other cards, will only allow two cards to be flipped at a time
	const [disabled, setDisabled] = useState(false);
	//creating a function to shuffle the cards
	const shuffleCards = () => {
		//duplicating every card
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));
		//updating the state of the cards after shuffling
		setChoiceOne(null);
		setChoiceTwo(null);
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
			setDisabled(true);
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
				//delay after choosing the second card
				setTimeout(() => resetTurns(), 800);
			}
		}
	}, [choiceOne, choiceTwo]);
	// automatic start game
	const resetTurns = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns(turns + 1);
		setDisabled(false);
	};
	useEffect(() => {
		shuffleCards();
	}, []);

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
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns:{turns}</p>
			<div className="footer">
				<div className="name">
					<p>Abhinav Modi</p>
				</div>
				<div className="links">
					<a
						className="footer-link"
						href="https://github.com/Abhinav-Modi"
						target="blank"
					>
						<GoMarkGithub />
					</a>
					<a
						className="footer-link"
						href="https://www.linkedin.com/in/abhinav-modi-5312221b5/"
						target="blank"
					>
						<BsLinkedin />
					</a>
					<a
						className="footer-link"
						target="blank"
						href="https://twitter.com/Abhinav45529123"
					>
						<FaTwitter />
					</a>
				</div>
			</div>
		</div>
	);
};

export default App;
