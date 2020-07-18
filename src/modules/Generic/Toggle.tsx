//Core
import * as React 		from "react";

//Helpers
import dig 				from "../../helpers/dig";
import filters			from "../../helpers/filters";

//Interface
import { iInputProps }	from "../../interfaces/iInput";

//Contexts
import FormContext 		from "../../contexts/FormContext";
import GroupContext		from "../../contexts/GroupContext";

//Toggle class
export default function Toggle (props : iInputProps) {
	//-------------------------------------------------
	// Properties
	//-------------------------------------------------
	const { form, updateForm } 	= React.useContext(FormContext);
	const context				= React.useContext(GroupContext);
	const position 				= context ? (context + "." + props.name):props.name;
	const finalvalue 			= dig(form, position);

	//-------------------------------------------------
	// Functions
    //-------------------------------------------------

	const onChange = React.useCallback((node) => {
		//Get raw value
		let value = filters(!finalvalue, props.filters);

		//Check if the user wants to edit it
		if (props.onChange) value = props.onChange(value, node);

		//Update form
		updateForm(value, position);
	}, [form, props]);

	//-------------------------------------------------
	// Render
	//-------------------------------------------------

	return (
		<input {...props} type="checkbox" checked={!!finalvalue} onChange={onChange} />
	);
}
