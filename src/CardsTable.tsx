import { AgGridReact } from "ag-grid-react";
import { themeBalham, colorSchemeDarkWarm } from "ag-grid-community";
import type { SetSelectedCard } from "./types";
import MagicCollection from "./assets/MagicCollection.json";
const CardsTable = ({
	setSelectedCard,
	ref,
}: {
	setSelectedCard: SetSelectedCard;
	ref: React.RefObject<AgGridReact>;
}) => {
	return (
		<div style={{ height: "calc(100%)", width: "100%" }} id="cards-table">
			<AgGridReact
				rowData={MagicCollection}
				ref={ref}
				gridOptions={{
					defaultColDef: {
						resizable: false,
						flex: 1,
					},
					cellSelection: false,
					suppressCellFocus: true,
				}}
				columnDefs={[
					{ field: "id", hide: true },
					{
						field: "name",
						headerName: "Card Name",
					},
					{
						field: "set_name",
						headerName: "Set Name",
					},
					{
						field: "normalamt",
						headerName: "Regular",
					},
					{
						field: "foilamt",
						headerName: "Foil",
					},
				]}
				theme={themeBalham.withPart(colorSchemeDarkWarm).withParams({
					fontFamily: "Lucida Console, 'Courier New', monospace", // Default font for the whole grid
					backgroundColor: "black",
					accentColor: "slateblue",
					textColor: "slateblue",
					headerTextColor: "slateblue",
				})}
				onFirstDataRendered={(params) => {
					params.api.sizeColumnsToFit();
				}}
				onRowClicked={(params) => {
					setSelectedCard(params.data);
				}}
			/>
		</div>
	);
};

export default CardsTable;
