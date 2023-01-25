import React from "react";
import HeroImage from "../../assets/hero.svg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
	const navigate = useNavigate();
	return (
		<div className="w-full py-5 flex flex-col-reverse md:flex-row xl:min-h-[500px]">
			<div className="w-full md:w-1/2 md:flex md:flex-col md:justify-center md:items-start space-y-5">
				<h2 className="font-semibold text-3xl leading-10 sm:text-4xl sm:leading-[60px] lg:text-5xl lg:leading-[70px] text-secondary-600">
					Welcome to Eubond shop
				</h2>
				<p className="font-medium text-base text-secondary-800 leading-7 md:text-lg">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. It has survived not only five centuries, but also the
					leap into electronic typesetting, remaining essentially
					unchanged.
				</p>
				<button
					className="bg-secondary-600 text-white font-medium rounded-lg cursor-pointer py-3 px-5"
					onClick={() => navigate("/products")}
				>
					Start shopping
				</button>
			</div>
			<div className="w-full md:w-1/2 min-h-[300px] flex items-center justify-center">
				<img src={HeroImage} alt="hero" />
			</div>
		</div>
	);
};

export default HeroSection;
