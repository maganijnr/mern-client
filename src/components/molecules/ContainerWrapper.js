import styled from "styled-components";

const ConatinerWrapper = ({ children, className }) => {
	return <Conatiner className={`${className}`}>{children}</Conatiner>;
};

export default ConatinerWrapper;

const Conatiner = styled.div`
	width: 100%;
	max-width: 1240px;
	margin: 0px auto;
	padding: 0px 20px;
	height: 100%;
	@media screen and (max-width: 768px) {
		padding: 0px 20px;
	}
	@media screen and (max-width: 640px) {
		padding: 0px 30px;
	}
`;
