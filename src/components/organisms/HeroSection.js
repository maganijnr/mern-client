import React from "react";
import HeroImage from "../../assets/hero.svg";

const HeroSection = () => {
	return (
		<div className="w-full py-5 flex flex-col-reverse md:flex-row xl:min-h-[500px]">
			<div className="w-full md:w-1/2">
				<h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-secondary-600">
					Welcome to Eubond shop
				</h2>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. It has survived not only five centuries, but also the
					leap into electronic typesetting, remaining essentially
					unchanged.
				</p>
				<button>Start shopping</button>
			</div>
			<div className="w-full md:w-1/2 min-h-[300px] flex items-center justify-center">
				<img src={HeroImage} alt="hero" />
			</div>
		</div>
	);
};

export default HeroSection;
