import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const WhiteButton = ({ title, styles, link }) => {
	return (
		<Link
			className={`${styles} text-secondary-600 bg-white font-medium`}
			to={link}
		>
			{title}
		</Link>
	);
};

export default WhiteButton;

WhiteButton.propTypes = {
	title: PropTypes.string.isRequired,
	styles: PropTypes.string,
};
