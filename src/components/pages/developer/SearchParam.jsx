import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchParam = ({ handleSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
		handleSearch(e.target.value); // Pass the search term to the parent component
	};

	return (
		<form className='w-full'>
			<input
				className='w-full p-2 px-2 pl-10  border  bg-content/10 border-content/20 rounded-md placeholder:text-search placeholder:opacity-90 focus:outline-accent'
				type='text'
				placeholder='Search by name or email'
				value={searchTerm}
				onChange={handleChange}
			/>
		</form>
	);
};

export default SearchParam;
