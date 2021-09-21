import React, { useState } from 'react'

function TextField({ name, placeholderValue, stateSetter }) {
	const [value, setValue] = useState('')
	const [legendController, setlegendController] = useState('unactive')
    return (
		<fieldset className="text-field" >
			<legend className={ legendController }>{ value.length === 0 ? '' : placeholderValue }</legend>
			<input
				required
				name={name}
				type="text"
				className="text-box"
				onChange={(e) => {
					stateSetter(e.target.value);
					setValue(e.target.value);
				}
				}
				onFocus={(e) => setlegendController('active')}
				onBlur={(e) => setlegendController('unactive')}
				placeholder={placeholderValue}
				value={value}
			/>
		</fieldset>
		);
}

export default TextField
