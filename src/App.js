import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import { useState } from "react";


const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";



const rounded = num => {
	if (num > 1000000000) {
	  return Math.round(num / 100000000) / 10 + "Bn";
	} else if (num > 1000000) {
	  return Math.round(num / 100000) / 10 + "M";
	} else if(num === 0) {
	  return "0";
	} else {
	  return Math.round(num / 100) / 10 + "K";
	}
  };

function App() {

	const [tooltipContent, setTooltipContent] = useState("");
	const [totalPopulation, setTotalPopulation] = useState(0);
	const [addedCountries, setaddedCountries] = useState("");

  	return (
	<>
		<div className="map">

			<ComposableMap data-tip="">
				<ZoomableGroup zoom={1}>
					<Geographies geography={geoUrl}>
						{ ({ geographies }) => geographies.map(geo => <Geography key={geo.rsmKey} 
							geography={geo} 
							style={
								{
									hover: {
										fill: "#F53",
										outline: "none",
									},
									pressed: {
										fill: "#0000ff",
										outline: "none",
									},
									default: {
										fill: "#D6D6DA",
										outline: "#000"
									},
							}
							}
							onMouseEnter = {
								() => {
									const {NAME, POP_EST} = geo.properties;
									setTooltipContent(`${NAME} - ${rounded(POP_EST)}`)
								}
							}
							onClick={
								() => {
									const regex = new RegExp(geo.properties.NAME);
									if( regex.test(addedCountries) == false ) {
										setTotalPopulation((prevTotalPopulation) => prevTotalPopulation + geo.properties.POP_EST)
										setaddedCountries(prevCountries => prevCountries + ` ${geo.properties.NAME}`)
									}
								}
							}
							onMouseLeave = { () => setTooltipContent('') }
						/>) }
					</Geographies>
				</ZoomableGroup>
			</ComposableMap>
		</div>
		<ReactTooltip>{tooltipContent}</ReactTooltip>
		<h4>Click on Countries to add populations</h4>
		<h6>Current Population: {rounded(totalPopulation)}</h6>
		<h6>Countries: {addedCountries}</h6>
		<button onClick={() => {
			setTotalPopulation(0);
			setaddedCountries('');
		}}>Reset</button>
		
		
	</>
  	);
}

export default App;
