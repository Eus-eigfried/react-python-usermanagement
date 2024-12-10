import React from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaMoon, FaSun } from "react-icons/fa";

const Theme = () => {
	function handleChangeColorTheme() {
		if (
			localStorage.getItem("theme") !== null &&
			localStorage.getItem("theme") === "dark"
		) {
			localStorage.setItem("theme", "light");
			document.querySelector("body").setAttribute("class", "");
			document.querySelector("body").setAttribute("class", "light");
		} else {
			localStorage.setItem("theme", "dark");
			document.querySelector("body").setAttribute("class", "");
			document.querySelector("body").setAttribute("class", "dark");
		}
	}
	React.useEffect(() => {
		if (localStorage.getItem("theme") !== null) {
			document.querySelector("body").setAttribute("class", "");
			document
				.querySelector("body")
				.setAttribute("class", localStorage.getItem("theme"));
		}
	}, [localStorage.getItem("theme")]);
	const readTheme = localStorage.getItem("theme");

	const handleModeInfo = () => {
		setModeInfo(!showMode);
	};
	const [theme, setTheme] = React.useState(false);

	function handleReadTheme() {
		setTheme(!theme);
	}

	return (
		<>
			<button
				className='btn-add bg-accent '
				onClick={() => {
					handleChangeColorTheme();
					handleReadTheme();
				}}>
				{theme === false ? (
					<>
						<FaMoon
							className='my-[3px] mx-[7px] rotate-20 text-primary transition-all
				duration-500'
						/>
					</>
				) : (
					<>
						<FaSun
							className='my-[3px] mx-[7px] rotate-20 text-primary transition-all
				duration-500'
						/>
					</>
				)}
			</button>
		</>
	);
};

export default Theme;
