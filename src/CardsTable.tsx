import { AgGridReact } from "ag-grid-react";
import {
	themeBalham,
	colorSchemeDarkWarm,
	ModuleRegistry,
	QuickFilterModule,
} from "ag-grid-community";
import type { SetSelectedCard, Card } from "./types";

ModuleRegistry.registerModules([QuickFilterModule]);
import MagicCollection from "./assets/MagicCollection.json";
const CardsTable = ({
	setSelectedCard,
	ref,
}: {
	setSelectedCard: SetSelectedCard;
	ref: React.RefObject<AgGridReact<Partial<Card>>[]>;
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
						maxWidth: 70,
					},
					{
						field: "foilamt",
						headerName: "Foil",
						maxWidth: 50,
					},
				]}
				theme={themeBalham.withPart(colorSchemeDarkWarm).withParams({
					fontFamily: "Lucida Console, 'Courier New', monospace", // Default font for the whole grid
					backgroundColor: "black",
					accentColor: "slateblue",
					textColor: "slateblue",
					headerTextColor: "slateblue",
				})}
				onRowClicked={(params) => {
					setSelectedCard(params.data);
				}}
			/>
		</div>
	);
};

export default CardsTable;
