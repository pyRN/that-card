import { useState, useRef, useEffect } from "react";
import CardsTable from "./CardsTable";
import SearchInput from "./SearchInput";

function App() {
	const [selectedCard, setSelectedCard] = useState(null);
	const tableRef = useRef<HTMLInputElement>(null);
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
					<h4
						style={{
							margin: "5px 10px",
							fontFamily:
								"'Lucida Console', 'Courier New', monospace",
						}}
					>
						Do I Have That Card?
					</h4>
					<SearchInput />
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
					<CardsTable
						setSelectedCard={setSelectedCard}
						ref={tableRef}
					/>
				</div>
			</div>
		</>
	);
}

export default App;
