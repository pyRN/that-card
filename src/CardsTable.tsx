import { AgGridReact } from "ag-grid-react";
import {
	themeBalham,
	colorSchemeDarkWarm,
	ModuleRegistry,
	QuickFilterModule,
} from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import type { SetSelectedId, IRowData } from "./types";
import { forwardRef } from "react";
import MagicCollection from "./assets/MagicCollection.json";

ModuleRegistry.registerModules([QuickFilterModule]);
type CardsTableProps = { setSelectedId: SetSelectedId };

const CardsTable = forwardRef<AgGridReact<IRowData>, CardsTableProps>(
	({ setSelectedId }, ref) => {
		const columnDefs: ColDef<IRowData>[] = [
			{ field: "id", hide: true },
			{
				field: "name",
				headerName: "Card Name",
				minWidth: 180,
			},
			{
				field: "set_name",
				headerName: "Set Name",
				minWidth: 100,
			},
			{
				field: "normalamt",
				headerName: "Regular",
				maxWidth: 90,
			},
			{
				field: "foilamt",
				headerName: "Foil",
				maxWidth: 90,
			},
		];

		return (
			<div
				style={{ height: "calc(100%)", width: "100%" }}
				id="cards-table"
			>
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
					columnDefs={columnDefs}
					theme={themeBalham
						.withPart(colorSchemeDarkWarm)
						.withParams({
							fontFamily: `"Press Start 2P", system-ui`, // Default font for the whole grid
							fontSize: "7pt",
							backgroundColor: "#1a1a1a",
							accentColor: "slateblue",
							textColor: "slateblue",
							headerTextColor: "slateblue",
						})}
					onRowClicked={(params) => {
						if (params.data?.id !== undefined) {
							setSelectedId(params.data.id);
						}
					}}
				/>
			</div>
		);
	},
);

export default CardsTable;
