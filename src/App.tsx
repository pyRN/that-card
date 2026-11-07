import { useState, useRef } from "react";
import CardsTable from "./CardsTable";
import SearchInput from "./SearchInput";
import { AgGridReact } from "ag-grid-react";
import type { IRowData, SelectedId } from "./types";
import CardModal from "./CardModal";

function App() {
	const [selectedId, setSelectedId] = useState<SelectedId>("");
	const tableRef = useRef<AgGridReact<IRowData>>(null);
	return (
		<>
			<div
				className="flex-column w-100 h-100 flex-grow"
				id="app-container"
			>
				<div
					className="flex justify-between align-center wrap"
					id="header"
				>
					<p
						style={{
							margin: "5px 10px",
							fontSize: "7pt",
						}}
					>
						Do I Have That Card?
					</p>
					<SearchInput ref={tableRef} />
				</div>

				<div
					style={{
						borderBottom: "1px solid slateblue",
						margin: "0px 10px 10px 10px",
					}}
				></div>
				<div
					className="flex"
					id="content-container"
					style={{
						height: "calc(100vh - 80px)",
						margin: "5px 10px",
					}}
				>
					<CardsTable setSelectedId={setSelectedId} ref={tableRef} />
				</div>
				<CardModal selectedId={selectedId} />
			</div>
		</>
	);
}

export default App;
