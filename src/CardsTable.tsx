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
							fontFamily:
								"Lucida Console, 'Courier New', monospace", // Default font for the whole grid
							backgroundColor: "black",
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
