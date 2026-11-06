import React from "react";

const SearchInput = () => {
	return (
		<input
			type="text"
			placeholder="Search"
			onChange={(e) => console.log(e.target.value)}
			id="search-input"
		/>
	);
};

export default SearchInput;
