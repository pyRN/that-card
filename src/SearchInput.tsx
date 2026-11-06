import type { IRowData } from "./types";
import { AgGridReact } from "ag-grid-react";
import { forwardRef } from "react";

const SearchInput = forwardRef<AgGridReact<IRowData>, {}>((_, ref) => {
	return (
		<input
			type="text"
			placeholder="Search"
			onChange={(e) => {
				if (ref && typeof ref !== "function" && ref.current) {
					ref.current.api.setGridOption(
						"quickFilterText",
						e.target.value,
					);
				}
			}}
			id="search-input"
		/>
	);
});

export default SearchInput;
