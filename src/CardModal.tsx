import { useState, useEffect } from "react";
import type { Card, SelectedId } from "./types";

const CardModal = ({ selectedId }: { selectedId: SelectedId }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [side, setSide] = useState(true);
	const [data, setData] = useState<Partial<Card>>({});

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
			<div>
				<h2>{data.name}</h2>
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
			</div>
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
			<button onClick={() => setIsOpen(false)} className="btn">
				Close
			</button>
		</div>
	) : null;
};

export default CardModal;
