import { useState, useEffect } from "react";
import type { Card, SelectedId, Titles, Legalities } from "./types";

const CardModal = ({ selectedId }: { selectedId: SelectedId }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [side, setSide] = useState(true);
	const [data, setData] = useState<Partial<Card>>({});

	const titles: Partial<Titles> = {
		commander: "EDH",
		paupercommander: "PEDH",
		legacy: "Legacy",
		modern: "Modern",
		pauper: "Pauper",
		vintage: "Vintage",
	};

	const legalities: Partial<Legalities> = {
		legal: "Legal",
		not_legal: "Illegal",
		restricted: "Restricted",
		banned: "Banned",
	};

	useEffect(() => {
		console.log(selectedId);
		if (selectedId && selectedId.length) {
			setData({});
			fetch(`https://api.scryfall.com/cards/${selectedId}`, {
				method: "GET",
				headers: {
					"User-Agent": "MyMtgProject/1.0",
					Accept: "application/json",
				},
			})
				.then((response) => {
					if (response.status === 200) {
						return response.json();
					}
					return null;
				})
				.then((results) => {
					if (results) {
						setData(results);
					}
				})
				.catch((err) => {
					console.error("Error fetching card: ", err);
				});

			setIsOpen(true);
		}
	}, [selectedId]);

	return isOpen && Object.keys(data).length ? (
		<div id="card-modal">
			<div className="flex-column center ">
				<h2
					style={{
						fontSize: "12pt",
					}}
				>
					{data.name}
				</h2>
				<img
					src={
						data.layout === "transform" ||
						data.layout === "modal_dfc" ||
						data.layout === "reversible_card" ||
						data.layout === "double_faced_token"
							? side
								? (data.card_faces?.[0]?.image_uris?.normal ??
									undefined)
								: (data.card_faces?.[1]?.image_uris?.normal ??
									undefined)
							: data.image_uris?.normal
					}
					alt={data.name ?? ""}
					loading="lazy"
					// 2.5 x 3.5 inches or 5:7 ratio for actual card size
					style={{
						height: "350px",
						width: "250px",
					}}
				/>

				<div className="flex-column center">
					{data.layout === "transform" ||
					data.layout === "modal_dfc" ||
					data.layout === "reversible_card" ||
					data.layout === "double_faced_token" ? (
						<button
							className="btn"
							onClick={() => setSide((prev) => !prev)}
						>
							Flip
						</button>
					) : null}
					<div className="flex center m-5 wrap">
						<p className="card-text">{`Rarity: ${data.rarity}`}</p>
						<p className="card-text">{`Set: ${data.set_name}`}</p>
					</div>

					<p className="card-text m-10">
						{`Prices: $${data.prices?.usd || 0} / $${data.prices?.usd_foil || 0} (Foil) / $${data.prices?.usd_etched || 0} (Etched)`}
					</p>
					<div className="flex-column center m-5">
						<p className="card-text">{`Legality:`}</p>
						<div className="flex centetwrap">
							<div className="flex-column m-5">
								<p className="card-text">
									{`${titles["commander" as keyof Titles]}: ${data.legalities !== undefined ? legalities[data.legalities["commander" as keyof typeof data.legalities] as keyof Legalities] : ""}`}
								</p>
								<p className="card-text">
									{`${titles["legacy" as keyof Titles]}: ${data.legalities !== undefined ? legalities[data.legalities["legacy" as keyof typeof data.legalities] as keyof Legalities] : ""}`}
								</p>
								<p className="card-text">
									{`${titles["modern" as keyof Titles]}: ${data.legalities !== undefined ? legalities[data.legalities["modern" as keyof typeof data.legalities] as keyof Legalities] : ""}`}
								</p>
							</div>
							<div className="flex-column m-5">
								<p className="card-text">
									{`${titles["pauper" as keyof Titles]}: ${data.legalities !== undefined ? legalities[data.legalities["pauper" as keyof typeof data.legalities] as keyof Legalities] : ""}`}
								</p>
								<p className="card-text">
									{`${titles["paupercommander" as keyof Titles]}: ${data.legalities !== undefined ? legalities[data.legalities["paupercommander" as keyof typeof data.legalities] as keyof Legalities] : ""}`}
								</p>
								<p className="card-text">
									{`${titles["vintage" as keyof Titles]}: ${data.legalities !== undefined ? legalities[data.legalities["vintage" as keyof typeof data.legalities] as keyof Legalities] : ""}`}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button onClick={() => setIsOpen(false)} className="btn">
				Close
			</button>
		</div>
	) : null;
};

export default CardModal;
