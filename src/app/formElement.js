import React, { Fragment } from 'react';

export default ({ 
	formElementKey, 
	value: { 
		label = "", 
		type = "", 
		value = "", 
		validation = [], 
		options = [],
		id,
		placeholder = ""
	},
	handleInput
}) => {
	const renderDateInput = () => {
		return (
			<input 
				value={value}
				onChange={(event) => handleInput(event, id)}
				required={validation.includes("required")} 
				className="form-element"
				type="date" />
		)
	};

	const renderTextInput = () => {
		return (
			<input 
				placeHolder={placeholder}
				value={value}
				onChange={(event) => handleInput(event, id)}
				required={validation.includes("required")} 
				className="form-element"
				type={type} /> 
		)
	};

	const renderSelectDropDown = () => {
		return (
			<select 
				onChange={(event) => handleInput(event, id)} 
				name={formElementKey} 
				required={validation.includes("required")} 
				className="form-element">
				{
					options.map(option => (
						<option key={option} value={option}  >
							{option}
						</option>
					))
				}
			</select>
		)
	};

	const renderRadioButton = () => {
		return (
			<Fragment>
				{
					options.map(option => (
						<Fragment key={option}>
							<label>{option}</label>
							<input 
								onChange={(event) => handleInput(event, id)}
								required={validation.includes("required")} 
								type="radio" 
								name={formElementKey} 
								value={option}
								className="form-element" />
						</Fragment>		
					))
				}
			</Fragment>
		)
	};

	const renderInputField = () => {
		return type === "date" 
			? renderDateInput() : !options.length 
			? renderTextInput() : options.length > 2 
			? renderSelectDropDown() : options.length === 2 
			? renderRadioButton() : null
	};

	return (
		<div className="form-group" key={formElementKey}>
			{
				label && <label className="label">{label}</label>
			}
			{renderInputField()}
		</div>
	)
};