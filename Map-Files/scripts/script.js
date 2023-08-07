
let injury2020 = 0
let injury2021 = 0
let injury2022 = 0

let prop2020 = 0
let prop2021 = 0
let prop2022 = 0

let fatal2020 = 0
let fatal2021 = 0
let fatal2022 = 0


latitude = 0
longitude = 0


crashInfo = []
async function getData() {
const response = await fetch('Map-Files/data/crashes.geojson');
const data = await response.json();
console.log('got data')

let year_2020 = []
let year_2021 = []
let year_2022 = []


//filters crashes into objects
populateCrashInfo = () => {
	for(i = 0; i < data.features.length; i++)
	if(data.features[i].properties.crashdate >= startDate && data.features[i].properties.crashdate <= endDate){
    crashInfo.push({'date': data.features[i].properties.date.substring(5,16), 'year': data.features[i].properties.year , 'report_typ':data.features[i].properties.report_typ, "surf_cond_":data.features[i].properties.surf_cond_, "light_desc":data.features[i].properties.light_desc, 'crashdate':data.features[i].properties.crashdate, "longitude":data.features[i].properties.longitude, "latitude":data.features[i].properties.latitude});
	}
}

populateCrashInfo()


clearCrashInfo = () => {
	crashInfo.length = 0
}



console.log('got crashinfo')

//seperates each object into seperate arrays by year

for(i = 0; i < crashInfo.length; i++)
if(crashInfo[i].year === 2020){
    year_2020.push({'date': data.features[i].properties.date.substring(5,16), 'year': data.features[i].properties.year , 'report_typ':data.features[i].properties.report_typ});

} else if (crashInfo[i].year === 2021){
    year_2021.push({'date': data.features[i].properties.date.substring(5,16), 'year': data.features[i].properties.year , 'report_typ':data.features[i].properties.report_typ});

} else if (crashInfo[i].year === 2022){
    year_2022.push({'date': data.features[i].properties.date.substring(5,16), 'year': data.features[i].properties.year , 'report_typ':data.features[i].properties.report_typ});
}

//seperates years by report type and counts each instance of report type

for(i = 0; i < year_2020.length; i++)
if(year_2020[i].report_typ === 'Injury Crash'){
    injury2020++
    } else if(year_2020[i].report_typ === 'Property Damage Crash'){
    prop2020++
    } else if(year_2020[i].report_typ === 'Fatal Crash'){
    fatal2020++
    }

for(i = 0; i < year_2021.length; i++)
if(year_2021[i].report_typ === 'Injury Crash'){
    injury2021++
    } else if(year_2021[i].report_typ === 'Property Damage Crash'){
    prop2021++
    } else if(year_2021[i].report_typ === 'Fatal Crash'){
    fatal2021++
    }

for(i = 0; i < year_2022.length; i++)
if(year_2022[i].report_typ === 'Injury Crash'){
    injury2022++
    } else if(year_2022[i].report_typ === 'Property Damage Crash'){
    prop2022++
    } else if(year_2022[i].report_typ === 'Fatal Crash'){
    fatal2022++
    }
console.log('report count')
return(data)



}


getData();




//function that clears chart before updating when new date is selected
function clearChart() {
	
injury2020 = 0
injury2021 = 0
injury2022 = 0

prop2020 = 0
prop2021 = 0
prop2022 = 0

fatal2020 = 0
fatal2021 = 0
fatal2022 = 0
}



var map = L.map('map').setView([38.364985, -75.595503], 13);
var Jawg_Streets = L.tileLayer('https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 0,
	maxZoom: 22,
	subdomains: 'abcd',
	accessToken: 'NxNgrI5AU11c4F47OvmaZLAvn196WlejCqMJmnl39szle5XauLfpAqESiB714ebR'
}).addTo(map);

var markerGroup = L.layerGroup().addTo(map)


//loads geojson file and displays it on the map
function displayInjuryPoints() {

	for(i = 0; i < crashInfo.length; i++){
		
		if(crashInfo[i].report_typ == "Injury Crash"){
			var injuries = L.circleMarker([crashInfo[i].latitude, crashInfo[i].longitude],
				{
					color: "orange",
					radius: 2,
					
					
				}).bindPopup(label_reportType.bold() + crashInfo[i].report_typ + "<br>" + label_date.bold() + crashInfo[i].date.substring(0,16) + "<br>" + label_lightDesc.bold() + crashInfo[i].light_desc + "<br>" + label_surfCond.bold() + crashInfo[i].surf_cond_)
				.addTo(markerGroup)	
		} 
	}
  }

function displayPropertyDamagePoints() {
	for(i = 0; i < crashInfo.length; i++){

		if(crashInfo[i].report_typ == "Property Damage Crash"){
			var propertyDamage = L.circleMarker([crashInfo[i].latitude, crashInfo[i].longitude],
				{
					color: "blue",
					radius: 2,
					
				}).bindPopup(label_reportType.bold() + crashInfo[i].report_typ + "<br>" + label_date.bold() + crashInfo[i].date.substring(0,16) + "<br>" + label_lightDesc.bold() + crashInfo[i].light_desc + "<br>" + label_surfCond.bold() + crashInfo[i].surf_cond_).addTo(markerGroup)
		}}
	}

function displayFatalPoints() {
	for(i = 0; i < crashInfo.length; i++){

		if(crashInfo[i].report_typ == "Fatal Crash"){
			var fatalities = L.circleMarker([crashInfo[i].latitude, crashInfo[i].longitude],
				{
					color: "red",
					radius: 8,
					
				}).bindPopup(label_reportType.bold() + crashInfo[i].report_typ + "<br>" + label_date.bold() + crashInfo[i].date.substring(0,16) + "<br>" + label_lightDesc.bold() + crashInfo[i].light_desc + "<br>" + label_surfCond.bold() + crashInfo[i].surf_cond_).addTo(markerGroup)
		}} 			
	}
		
	


//function to remove points so new points can populate the map
function removePoints() {
	markerGroup.clearLayers()

}

function removeInjuryPoints() {
	injury.clearLayers()
}

//labels for popups (to make them bold)
let label_reportType = new String("Report Type: ");
let label_date = new String("Date: ");
let label_lightDesc = new String("Light Description: ");
let label_surfCond = new String("Surface Condition: ");




//function for displaying total number of crashes by report type
setTimeout(displayTotals,300)

function displayTotals() {
	let totalInjury = document.getElementById('injury-number-indicator').innerText = injury2020 + injury2021 + injury2022

	let totalProperty = document.getElementById('property-number-indicator').innerText = prop2020 + prop2021 + prop2022

	let totalFatality = document.getElementById('fatal-number-indicator').innerText = fatal2020 + fatal2021 + fatal2022

	console.log("displayed totals")
}



//function for checkboxes

let injuryCheckbox = document.getElementById('injury-checkbox')
let damageCheckbox = document.getElementById('damage-checkbox')
let fatalCheckbox = document.getElementById('fatal-checkbox')


injuryCheckbox.addEventListener("click", injuryCheckboxFunction)
damageCheckbox.addEventListener("click", damageCheckboxFunction)
fatalCheckbox.addEventListener("click", fatalCheckboxFuntion)


function injuryCheckboxFunction() {
	if (injuryCheckbox.checked == false) {
			let totalInjury = document.getElementById('injury-number-indicator').innerText = 0;
				injuryPlaceHolder2020 = injury2020
				injuryPlaceHolder2021 = injury2021
				injuryPlaceHolder2022 = injury2022
				injury2020 = 0
				injury2021 = 0
				injury2022 = 0
			removePoints()
			if(damageCheckbox.checked == true) {
				displayPropertyDamagePoints()
			}
			if(fatalCheckbox.checked == true) {
				displayFatalPoints()
			}
            resetCanvas()
            createDiv()
            createChart()

	}else if (injuryCheckbox.checked == true){
			console.log('checked')

			injury2020 = injuryPlaceHolder2020
			injury2021 = injuryPlaceHolder2021
			injury2022 = injuryPlaceHolder2022

			removePoints()
			displayInjuryPoints()
			if(damageCheckbox.checked == true) {
				displayPropertyDamagePoints()
			}
			if(fatalCheckbox.checked == true) {
				displayFatalPoints()
			}
			
			resetCanvas()
            createDiv()
            createChart()
			let totalInjury = document.getElementById('injury-number-indicator').innerText = injury2020 + injury2021 + injury2022
			
		}
}

function damageCheckboxFunction(){
	if (damageCheckbox.checked == false) {
		console.log('damage check')
		let totalProperty = document.getElementById('property-number-indicator').innerText = 0;
			propPlaceHolder2020 = prop2020
			propPlaceHolder2021 = prop2021
			propPlaceHolder2022 = prop2022
			prop2020 = 0
			prop2021 = 0
			prop2022 = 0
		removePoints()
		if(injuryCheckbox.checked == true) {
			displayInjuryPoints()
		}
		if(fatalCheckbox.checked == true) {
			displayFatalPoints()
		}
		resetCanvas()
		createDiv()
		createChart()

}else if (damageCheckbox.checked == true){
		console.log('damage check')


		prop2020 = propPlaceHolder2020
		prop2021 = propPlaceHolder2021
		prop2022 = propPlaceHolder2022
		
	
		removePoints()
		if(injuryCheckbox.checked == true) {
			displayInjuryPoints()
		}
		displayPropertyDamagePoints()
		if(fatalCheckbox.checked == true) {
			displayFatalPoints()
		}
		resetCanvas()
		createDiv()
		createChart()
		let totalProperty = document.getElementById('property-number-indicator').innerText = prop2020 + prop2021 + prop2022
		
	}
}
	
function fatalCheckboxFuntion(){
	if (fatalCheckbox.checked == false) {
		let totalFatality = document.getElementById('fatal-number-indicator').innerText = 0;
			fatalPlaceHolder2020 = fatal2020
			fatalPlaceHolder2021 = fatal2021
			fatalPlaceHolder2022 = fatal2022
			fatal2020 = 0
			fatal2021 = 0
			fatal2022 = 0
		removePoints()
		if(injuryCheckbox.checked == true) {
			displayInjuryPoints()
		}
		if(damageCheckbox.checked == true) {
			displayPropertyDamagePoints()
		}
		resetCanvas()
		createDiv()
		createChart()
	
	}else if (fatalCheckbox.checked == true){
		fatal2020 = fatalPlaceHolder2020
		fatal2021 = fatalPlaceHolder2021
		fatal2022 = fatalPlaceHolder2022

		removePoints()
		if(injuryCheckbox.checked == true) {
			displayInjuryPoints()
		}
		if(damageCheckbox.checked == true) {
			displayPropertyDamagePoints()
		}
		displayFatalPoints()
	
		resetCanvas()
		createDiv()
		createChart()
		let totalFatality = document.getElementById('fatal-number-indicator').innerText = fatal2020 + fatal2021 + fatal2022

	}
}
	






function chartUpdate() {
	let injuryCheckbox = document.getElementById('injury-checkbox')
		if (injuryCheckbox.checked == false) {
			console.log('clicked')
			for(i = 0; i < crashInfo.length; i++)
				if(crashInfo[i].report_typ === 'Injury Crash'){
					crashInfo.shift([i])
				}
				else{
					
				}

		}else if (injuryCheckbox.checked == true){

		}

	/*let damageCheckbox = document.getElementById('damage-checkbox')
		if (damageCheckbox.checked == false) {
		
		}else if (damageCheckbox.checked == true){
		}

	let fatalCheckbox = document.getElementById('fatal-checkbox')
	if (fatalCheckbox.checked == false) {
	
	}else if (fatalCheckbox.checked == true){
	}*/

}




setTimeout(displayInjuryPoints, 1000)
setTimeout(displayPropertyDamagePoints, 1000)
setTimeout(displayFatalPoints, 1000)


