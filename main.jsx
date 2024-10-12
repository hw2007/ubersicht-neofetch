// ----- CONFIG -----

// Hides username@device.lastname.dom from the widget. [true or false, default false]
const privacyMode = true;
// Alpha value for background of the widget. [0.0-1.0, default 0.0]
const backgroundTransparency = 0.0;
// Position of the widget. If you know how to position something with postion: fixed in CSS, you know how to use this.
const position = {
	"top": 0, // default 0
	"bottom": "auto", // default "auto"
	"left": 0, // default 0
	"right": "auto" //default "auto"
};

// ----- END OF CONFIG -----

import { FancyAnsi } from 'fancy-ansi';

// Create an instance of ansi-to-html with custom colors
const ansiConvert = new FancyAnsi();

export const command = "/opt/homebrew/bin/neofetch || echo 'Error running neofetch :('"

export const refreshFrequency = 1000 // ms

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
		right: position["right"]
	}}
	>
		<div
			style={{
				marginRight: "10px", // Space between logo and stats
			}}
			dangerouslySetInnerHTML={{ __html: styledOutput.split('\n').slice(0, 17).join('\n') }} // First line for logo
		/>
		<div
			
			dangerouslySetInnerHTML={ privacyMode ? 
				{__html: "\n\n" + styledOutput.split('\n').slice(19).join('\n')} :
				{__html: styledOutput.split('\n').slice(17).join('\n')} 
			} // Remaining lines for stats
		/>
	</div>
  );
};
