import React from "react";

const FormInput = ({ placeholder, onHandleChange, name, value, type }) => {
	return (
		<div className="w-full">
			<label
				htmlFor={"email"}
				className="capitalize text-xl font-medium mb-2 text-secondary-600"
			>
				{name}
			</label>
			<input
				className="w-full border-[1.5px] px-2 font-medium text-secondary-600 border-secondary-600 rounded-lg h-[45px] outline-none"
				placeholder={placeholder}
				value={value}
				name={name}
				onChange={onHandleChange}
				autoComplete="off"
				type={type}
			/>
		</div>
	);
};

export default FormInput;
