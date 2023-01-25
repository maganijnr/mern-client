import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

const PageLoading = () => {
	return (
		<LoadingWrapper className="fixed top-0 left-0 w-full h-screen  flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-5">
				<ClipLoader size={30} color="#4c713e" />
			</div>
		</LoadingWrapper>
	);
};

export default PageLoading;

const LoadingWrapper = styled.div`
	background: rgba(76, 113, 62, 1);
`;
