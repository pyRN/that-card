import type { Card } from "./types";
import { AgGridReact } from "ag-grid-react";

const SearchInput = ({
	ref,
}: {
	ref: React.RefObject<AgGridReact<Partial<Card>>[]>;
}) => {
	return (
		<input
			type="text"
			placeholder="Search"
			onChange={(e) => {
				ref.current.api.setGridOption(
					"quickFilterText",
					e.target.value,
				);
			}}
			id="search-input"
		/>
	);
};

export default SearchInput;
