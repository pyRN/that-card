import type { Dispatch, SetStateAction } from "react";

export interface Card {
	id: string;
	card_faces: ImageUris[];
	color_identity: string[];
	colors: string[];
	cmc: number;
	foilamt: bigint | string;
	image_uris: ImageUris;
	layout: string;
	legalities: Legality;
	mana_cost: string;
	normalamt: bigint | string;
	prices: Prices;
	name: string;
	rarity: string;
	set_name: string;
	type_line: string;
}

export interface IRowData {
	id: string;
	name: string;
	set_name: string;
	normalamt: number;
	foilamt: number;
	created_at: string;
}

export interface ImageUris {
	image_uris: Normal;
}
export interface Normal {
	normal: string;
}

export interface Legality {
	commander: string;
	standard: string;
	historic: string;
	modern: string;
	legacy: string;
	pauper: string;
	vintage: string;
}

export interface Prices {
	usd: string | null | undefined;
	usd_foil: string | null | undefined;
	usd_etched: string | null | undefined;
	eur: string | null | undefined;
	eur_foil: string | null | undefined;
	tix: string | null | undefined;
}

export interface ImageUris {
	normal: string;
}
export type SelectedId = string;

export type SetSelectedId = Dispatch<SetStateAction<SelectedId>>;
