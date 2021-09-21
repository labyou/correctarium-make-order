import React, { useState } from 'react';
import dowArrow from "../images/arrow_down.svg";

function ServiceDropdown({ property, setService }) {
	const services = ["Переклад", "Редагування"];
	const [isActive, setIsActive] = useState(false);
	const [selectedService, setSelectedService] = useState("");
	return (
		<fieldset className="selector">
			<legend>{property}</legend>
			<label
				htmlFor="service"
				className="opener"
				onClick={(e) => setIsActive(!isActive)}
			>
				{selectedService.length !== 0 ? selectedService : property}
				<img src={dowArrow} alt="#" className="arrow-down" />
			</label>
			{isActive && (
				<div className="selector-content">
					{services.map((val) => {
						return (
							<div
								onClick={() => {
									setService(val);
									setSelectedService(val);
									setIsActive(false);
								}}
								className="selector-item"
								key={val}
							>
								{val}
							</div>
						);
					})}
				</div>
			)}
		</fieldset>
	);
}

export default ServiceDropdown;
