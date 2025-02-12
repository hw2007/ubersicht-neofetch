// ----- CONFIG -----

// Hides somewhat sensitive info from the widget.
const privacyMode = false;
// Alpha value for background of the widget.
const backgroundTransparency = 0.0;
// Position of the widget. If you know how to position something with postion: fixed in CSS, you know how to use this.
const position = {
	top: 0,
	bottom: "auto",
	left: 0,
	right: "auto",
};

// ----- END OF CONFIG -----

import { FancyAnsi } from "fancy-ansi";

// Create an instance of ansi-to-html with custom colors
const ansiConvert = new FancyAnsi();

export const command =
	"ubersicht-neofetch/node_modules/neofetch/neofetch || echo 'Error running neofetch :('";

export const refreshFrequency = 10000; // ms

export const render = ({ output }) => {
	const styledOutput = ansiConvert.toHtml(output);

	return (
		<div
			style={{
				display: "flex", // Use flexbox for layout
				alignItems: "flex-start", // Align items at the start
				fontFamily: "Menlo",
				whiteSpace: "pre-wrap",
				fontSize: 14,
				textShadow: "0px 1px 4px rgba(0, 0, 0, 0.8)",
				color: "white",
				borderRadius: 12,
				backgroundColor: `rgba(0, 0, 0, ${backgroundTransparency})`,
				position: "fixed",
				width: 585,
				height: 280,
				margin: 20,
				overflow: "hidden",
				top: position["top"],
				bottom: position["bottom"],
				left: position["left"],
				right: position["right"],
			}}
		>
			<div
				style={{
					marginRight: "10px", // Space between logo and stats
				}}
				dangerouslySetInnerHTML={{
					__html: styledOutput.split("\n").slice(0, 17).join("\n"),
				}} // First line for logo
			/>
			<div
				dangerouslySetInnerHTML={
					privacyMode
						? { __html: "\n\n" + styledOutput.split("\n").slice(19).join("\n") }
						: { __html: styledOutput.split("\n").slice(17).join("\n") }
				} // Remaining lines for stats
			/>
		</div>
	);
};
