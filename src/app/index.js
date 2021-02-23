import React, { Component, Fragment } from 'react';
import FormJson from "../form.json";

import FormElement from "./formElement";


class App extends Component {
	state = {
		form: { ...FormJson.properties },
		formIsValid: false,
	};

	getSplittedId = (id) => id.split("-");

	getFormElementById = (id, form) => {
		const splittedID = this.getSplittedId(id);
		let formElement = null;
		splittedID.forEach(id => {
			formElement = formElement 
				? formElement[id] 
				: form[id];
		});
		return formElement;
	};

	handeleValidations = (formElement, validation) => {
		if (validation.includes("required")) {

		}
	};

	// handleInput = ({ target: { value } }, formElementId) => {
	// 	this.setState(({ 
	// 		form: prevStateForm, 
	// 		formIsValid: prevStateFormIsValid 
	// 	}) => {
	// 		const formElement = this.getFormElementById(
	// 			formElementId, 
	// 			prevStateForm
	// 		);
	// 		const { validation = [] } = formElement;
	// 		if (validation.length) { 
	// 			this.handeleValidations(formElement, validation)
	// 		}
	// 	});
	// };

	handleInput = ({ target: { value } }, formElementId) => {
		this.setState(({
			form: prevStateForm,
		}) => {
			const formElement = this.getFormElementById(
				formElementId,
				prevStateForm
			);
			formElement.value = value;
			return {
				form: this.updateFormValue(
					prevStateForm, 
					formElementId, 
					formElement
				)
			}
		}, () => console.log(this.state));
	};

	updateFormValue = (form, id, currentFormElement) => {
		const splittedIDS = this.getSplittedId(id);
		const { length: splittedIDSLength } = splittedIDS;
		let traversedFormInstance = { ...form };
		let temp = null;
		splittedIDS.forEach((id, index) => {
			temp = traversedFormInstance[id];
			traversedFormInstance = {
				...traversedFormInstance,
				[id]: splittedIDSLength === (index + 1) 
					? currentFormElement 
					: temp
			};
		});
		return traversedFormInstance
	};

	handleSubmission = () => {
		const { formIsValid } = this.state;
		if (!formIsValid) {
			alert("Form is in valid");
			return;
		}
		alert("Submitted");
	}


	renderNestedForm = (key, value) => {
		return (
			<Fragment key={key}>
				{
					!value.hasOwnProperty("properties") ?
						<FormElement formElementKey={key} value={value} handleInput={this.handleInput} />
					: 
						<div className="aggregatedFormGroup">
							{
								Object.entries(value["properties"]).map(([key, value], index) => {
									return this.renderNestedForm(key, value)
								})
							}
						</div>	
				}
			</Fragment>
		)
	};

	render = () => {
		const { form } = this.state;
		return (
			<div className="container">
				<div className="form-container">
					{
						Object.entries(form).map(([key, value], index) => {
							return this.renderNestedForm(key, value)
						})
					}
					<div className="submit-button-container">
						<button className="submit-button" onClick={this.handleSubmission}>Submit</button>
					</div>
				</div>
			</div>
		);
	};	

};	


export default App;	