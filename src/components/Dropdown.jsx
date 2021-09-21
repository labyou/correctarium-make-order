import React, { useState } from 'react';
import downArrow from '../images/arrow_down.svg'

function Dropdown({ setProp, property, properties }) {
	const [isActive, setIsActive] = useState(false);
	const [selectedVal, setSelectedVal] = useState('');
	const [legendController, setLegendController] = useState('unactive')
	return (
		<fieldset
			className={`selector`}
			onClick={() => {
				setIsActive(!isActive);
				setLegendController("active");
			}}
			onBlur={() => {
				setIsActive(!isActive);
				setLegendController("unactive");
			}}
		>
			<legend
				className={(selectedVal.length === 0 ? "" : "chosen", legendController)}
			>
				{selectedVal.length === 0 ? "" : property}
			</legend>
			<input
				id="dropdown"
				type="checkbox"
				className="opener"
				checked={isActive}
			/>
			<label htmlFor="dropdown" className="opener">
				{selectedVal.length === 0 ? property : selectedVal}
				<img src={downArrow} alt="#" className="arrow-down" />
			</label>
			{isActive && (
				<label className="selector-content">
					{properties.map((val) => {
						return (
							<label
								key={val.id}
								value={val.name}
								onClick={() => {
									console.log(val);
									setSelectedVal(val.name);
									setIsActive("unactive");
									setProp(val);
								}}
								className="selector-item"
							>
								{val.name}
							</label>
						);
					})}
				</label>
			)}
		</fieldset>
	);
}

export default Dropdown;
