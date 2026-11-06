import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import csvToJson from "convert-csv-to-json";

function csvToJSONPlugin() {
	//Convert magic collection csv to json for use in the app
	return {
		name: "vite-plugin-csv-to-json",
		buildStart() {
			const csvFilePath = path.resolve(
				import.meta.dirname,
				"./src/assets/MagicCollection.csv",
			);
			const jsonOutputPath = path.resolve(
				import.meta.dirname,
				"./src/assets/MagicCollection.json",
			);

			// Convert CSV to JSON
			const jsonResult = csvToJson
				.fieldDelimiter(",")
				.supportQuotedField(true)
				.formatValueByType(true)
				.getJsonFromCsv(csvFilePath);

			fs.writeFileSync(
				jsonOutputPath,
				JSON.stringify(jsonResult, null, 2),
			);
			console.log("✅ CSV converted to JSON for Vite build");
		},
	};
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [csvToJSONPlugin(), react()],
	base: "/",
});
