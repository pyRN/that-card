import { useState, useEffect } from "react";

const CardModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	// Close if the background overlay is clicked
	const handleOverlayClick = (e) => {
		if (e.target.classList.contains("modal")) {
			setIsOpen(false);
		}
	};
	return (
		<div className="app-container">
			{/* Trigger Button */}
			<button onClick={() => setIsOpen(true)}>Open Modal</button>

			{/* Conditional Rendering based on state */}
			{isOpen && (
				<div className="modal" onClick={handleOverlayClick}>
					<div className="modal-content">
						<span
							className="close-btn"
							onClick={() => setIsOpen(false)}
						>
							&times;
						</span>
						<h2>React Modal</h2>
						<p>
							This is a standard modal built with state tracking.
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default CardModal;
