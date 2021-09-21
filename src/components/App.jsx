import React, { useState, useEffect } from 'react';
import '../App.css';
import {
	letterCounter,
	costCounter,
	timeCounter,
	deadlineCouter,
} from '../countingAlgorithm';
import { languages, services } from "../../src/countingAlgorithm";
import Dropdown from './Dropdown';
import TextField from './TextField';
import logo from '../images/footer_logo.png'

function App() {
	// const docTypes = ['none', 'doc', 'docx', 'rtf'];
	const [text, setText] = useState('');
	const [lang, setLang] = useState();
	const [cost, setCost] = useState(0);
	const [time, setTime] = useState('');
	const [deadline, setDeadline] = useState('');
	const [service, setService] = useState('');
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [comment, setComment] = useState('');
	
	useEffect(() => {
		setCost(costCounter('none', lang, letterCounter(text)));
		setTime(timeCounter(lang, letterCounter(text)));
		setDeadline(deadlineCouter(time));
	}, [text, lang, time]);

	// const [disabledStatus, setStatus] = useState(true)

	// useEffect(() => {
	// 		setDeadline(deadlineCouter(time));
	// }, [text, lang, time]);

	return (
		<>
			<main className="make-order">
				<div className="make-order-form">
					<div className="form-item inputs">
						<h1>Замовити переклад або редагування</h1>
						<Dropdown
							property="Послуга"
							setProp={setService}
							properties={services}
						/>
						<textarea
							className="form-text-area"
							placeholder="Введіть текст"
							onChange={(e) => {
								setText(e.target.value);
							}}
						></textarea>
						<div className="form-inputs">
							<TextField
								name="email"
								placeholderValue="Ваша електронна пошта"
								stateSetter={setEmail}
							/>
							<TextField
								name="name"
								placeholderValue="Ваше ім'я"
								stateSetter={setName}
							/>
							<TextField
								name="comment"
								placeholderValue="Кометар або покликання"
								stateSetter={setComment}
							/>
							<Dropdown
								property="Мова"
								setProp={setLang}
								properties={languages}
							/>
						</div>
					</div>
					<div className="form-item">
						<div className="make-order__submition">
							<div className="submit-order">
								<div className="close-button">
									<img
										src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/OOjs_UI_icon_close.svg/1200px-OOjs_UI_icon_close.svg.png"
										alt=""
									/>
								</div>
								<div className="price-content">
									<div className="price">{cost}</div>
									<div className="currency">грн</div>
								</div>
								<div className="deadline-content">
									{text.length === 0 ? "" : `Термін здавання: ${deadline}`}
								</div>
								<button
									className="order-button"
									type="submit"
									disabled={!name || !email || !text || !lang}
								>
									Замовити
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
			<footer className="footer">
				<div className="footer-container">
					<div className="rights">
						<a href="https://correctarium.com/ua/terms">
							Договір публічної оферти
						</a>
						<p>© Correctarium</p>
						<p>2015–2021</p>
					</div>
                    <img src={ logo } alt="#" />
					<div className="contact-us">
						<p>Надіслати текст на&nbsp;переклад:</p>
						<a href="mailto:manager@correctarium.com">
							manager@correctarium.com
						</a>
					</div>
				</div>
			</footer>
		</>
	);
};

export default App;
