var mapStyle = [{
  'stylers': [{'visibility': 'off'}]
}, {
  'featureType': 'landscape',
  'elementType': 'geometry',
  'stylers': [{'visibility': 'on'}, {'color': '#fcfcfc'}]
}, {
  'featureType': 'water',
  'elementType': 'geometry',
  'stylers': [{'visibility': 'on'}, {'color': '#bfd4ff'}]
}];
var map;
var censusMin = Number.MAX_VALUE, censusMax = -Number.MAX_VALUE;
var layer;
var features;

var infoWindow;

window.initMap = function() {
//function initMap(){
	
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -20, lng: -45},
    zoom: 4,
    styles: mapStyle
  });

  // set up the style rules and events for google.maps.Data
  map.data.setStyle(styleFeature);
  map.data.addListener('mouseover', mouseInToRegion);
  map.data.addListener('mouseout', mouseOutOfRegion);
  map.data.addListener('click',clickRegion);

  // wire up the button
  var selectBox = document.getElementById('census-variable');
  google.maps.event.addDomListener(selectBox, 'change', function() {
	clearCensusData();
    loadCensusData(selectBox.options[selectBox.selectedIndex].value);
  });
jQuery(document).ready(function( $ ) {
  loadMapShapes();
});
	
var center;
google.maps.event.addDomListener(map, 'idle', function() {
	center = map.getCenter();
});

google.maps.event.addDomListener(window, 'resize', function() {
    google.maps.event.trigger(map, "resize");
	map.setCenter(center);
});

}

function loadMapShapes() {
	$.getJSON('static/js/estados.js', function (data) {
	features = map.data.addGeoJson(data, { idPropertyName: 'sigla' });
	});
	
	// wait for the request to complete by listening for the first feature to be
	// added
	google.maps.event.addListenerOnce(map.data, 'addfeature', function() {
	google.maps.event.trigger(document.getElementById('census-variable'),
		'change');
	});
}

function loadCitiesShapes(state) {
  clearCensusData();
  layer = new google.maps.Data();
  layer.loadGeoJson(state);
  
  
  layer.setStyle(function(feature) {
	var sum_payment;
	document.getElementById('data-box').style.display = 'block';
    document.getElementById('data-caret').style.display = 'block';
	document.getElementById('data-label').textContent = feature.getProperty('uf');
	document.getElementById('data-value').textContent =	feature.getProperty('nome');
	for(var p in feature.getProperty('bfp')){
		if(p == '2006'){
			for(e in feature.getProperty('bfp')[p]){
				if(e == "count_beneficiados"){
					document.getElementById('data-label-2').textContent = "Beneficiários";
					document.getElementById('data-value-2').textContent = feature.getProperty('bfp')[p][e];
				}
				if(e == "sum_pagamentos"){
					console.log(' name=' + e + ' value=' + feature.getProperty('bfp')[p][e]);
					sum_payment = feature.getProperty('bfp')[p][e];
					document.getElementById('data-label-3').textContent = "Pagamentos";
					document.getElementById('data-value-3').textContent = feature.getProperty('bfp')[p][e];
					
					if (sum_payment < censusMin) {
						censusMin = sum_payment;
					}
					if (sum_payment > censusMax) {
						censusMax = sum_payment;
					}
					document.getElementById('census-min').textContent = censusMin.toLocaleString();
					document.getElementById('census-max').textContent = censusMax.toLocaleString();
					var percent = (sum_payment - censusMin) / (censusMax - censusMin) * 100;
					document.getElementById('data-caret').style.paddingLeft = percent + '%';
				}
			}
		}
	}
	return {	
      fillColor: colorStyle(sum_payment), // call function to get color
      fillOpacity: 0.8,
      strokeColor: '#b3b3b3',
      strokeWeight: 1,
      zIndex: 1
    };
  });
  
  
  layer.addListener('mouseover', function(e) {
    layer.overrideStyle(e.feature, {
      strokeColor: '#fff',
      strokeWeight: 2,
      zIndex: 2
    });
  });

  layer.addListener('mouseout', function(e) {
    layer.revertStyle();
  });
  
  
  layer.addListener('click', function(e) {
	/*
	if(infoWindow != null){
		infoWindow.close();
	}
	drawChart(this,e);  
	*/
	//test(e);
	initMap();
  });
  
  layer.setMap(map);	
  
	// returns a color based on the value given when the function is called
	function getColor(coli) {
	var colors = [
	  '#d1ccad',
	  '#c2c083',
	  '#cbd97c',
	  '#acd033',
	  '#89a844'
	];
	return coli >= 2000000 ? colors[4] :
	  coli > 1000000 ? colors[3] :
	  coli > 500000 ? colors[2] :
	  coli > 200000 ? colors[1] :
	  colors[0];
	}
  
	function colorStyle(sum_payment) {
	  var low = [151, 83, 34];  // color of smallest datum
	  var high = [5, 69, 54];   // color of largest datum
	  // delta represents where the value sits between the min and max
	  var delta = (sum_payment - censusMin) /
		  (censusMax - censusMin);
	  
	  var color = [];
	  for (var i = 0; i < 3; i++) {
		// calculate an integer color based on the delta
		color[i] = (high[i] - low[i]) * delta + low[i];
	  }
	  if(sum_payment == 4260899){
		console.log(delta + " min = " + censusMin + " max = " + censusMax);
		console.log('hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)');
	  }
	  
	  return 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)';
	}
  
}

//var csv is the CSV file with headers
function csvJSON(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(";");

  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split(";");
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  console.log(JSON.stringify(result));
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

function loadCSVData(csv){
	var lines=csv.split("\n");
	for(var i=1;i<lines.length;i++){
		var row=lines[i].split(";");
		var stateId = row[0];
		var count_cities = row[1];
		var count_people = row[2];
		var censusVariable = parseFloat(row[3]);
		// keep track of min and max values
      if (censusVariable < censusMin) {
        censusMin = censusVariable;
      }
      if (censusVariable > censusMax) {
        censusMax = censusVariable;
      }

      // update the existing row with the new data
      map.data
        .getFeatureById(stateId)
        .setProperty('census_variable', censusVariable);
	  map.data
        .getFeatureById(stateId)
        .setProperty('count_people', count_people);
	  map.data
        .getFeatureById(stateId)
        .setProperty('count_cities', count_cities);
    };

    // update and display the legend
    document.getElementById('census-min').textContent =
        censusMin.toLocaleString();
    document.getElementById('census-max').textContent =
        censusMax.toLocaleString();
}

function loadCensusData(variable) {
  $.ajax({
	  url: 'data/BFTotais_' + variable + '.csv',
	  dataType: 'text',
	}).done(loadCSVData);
}

function clearCensusData() {
  censusMin = Number.MAX_VALUE;
  censusMax = -Number.MAX_VALUE;
  map.data.forEach(function(row) {
    row.setProperty('census_variable', undefined);
  });
  document.getElementById('data-box').style.display = 'none';
  document.getElementById('data-caret').style.display = 'none';
}

function styleFeature(feature) {
  var low = [151, 83, 34];  // color of smallest datum
  var high = [5, 69, 54];   // color of largest datum

  // delta represents where the value sits between the min and max
  var delta = (feature.getProperty('census_variable') - censusMin) /
      (censusMax - censusMin);

  var color = [];
  for (var i = 0; i < 3; i++) {
    // calculate an integer color based on the delta
    color[i] = (high[i] - low[i]) * delta + low[i];
  }

  // determine whether to show this shape or not
  var showRow = true;
  if (feature.getProperty('census_variable') == null ||
      isNaN(feature.getProperty('census_variable'))) {
    showRow = false;
  }

  var outlineWeight = 0.5, zIndex = 1;
  if (feature.getProperty('state') === 'hover') {
    outlineWeight = zIndex = 2;
  }

  return {
    strokeWeight: outlineWeight,
    strokeColor: '#fff',
    zIndex: zIndex,
    fillColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)',
    fillOpacity: 0.75,
    visible: showRow
  };
}

function mouseInToRegion(e) {
  // set the hover state so the setStyle function can change the border
  e.feature.setProperty('state', 'hover');

  var percent = (e.feature.getProperty('census_variable') - censusMin) /
      (censusMax - censusMin) * 100;

  // update the label
  document.getElementById('data-label').textContent =
      e.feature.getProperty('sigla');
  document.getElementById('data-value').textContent =
      e.feature.getProperty('census_variable').toLocaleString();
  document.getElementById('data-box').style.display = 'block';
  document.getElementById('data-caret').style.display = 'block';
  document.getElementById('data-caret').style.paddingLeft = percent + '%';
  
  document.getElementById('data-label-2').textContent = "Beneficiários";
  document.getElementById('data-value-2').textContent = e.feature.getProperty('count_people').toLocaleString();
  
  document.getElementById('data-label-3').textContent = "Municípios";
  document.getElementById('data-value-3').textContent = e.feature.getProperty('count_cities').toLocaleString();
 
}

function clickRegion(e){
  switch(e.feature.getProperty('sigla')){
  case "AC":
	loadCitiesShapes('data/municipios-ac.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "AL":
	loadCitiesShapes('data/municipios-al.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "AM":
	loadCitiesShapes('data/municipios-am.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "AP":
	loadCitiesShapes('data/municipios-ap.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "BA":
	loadCitiesShapes('data/municipios-ba.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "CE":
	loadCitiesShapes('data/municipios-ce.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "DF":
	loadCitiesShapes('data/municipios-df.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "ES":
	loadCitiesShapes('data/municipios-es.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "GO":
	loadCitiesShapes('data/municipios-go.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "MA":
	loadCitiesShapes('data/municipios-ma.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "MG":
	loadCitiesShapes('data/municipios-mg.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "MS":
	loadCitiesShapes('data/municipios-ms.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "MT":
	loadCitiesShapes('data/municipios-mt.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "PA":
	loadCitiesShapes('data/municipios-pa.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "PB":
	loadCitiesShapes('data/municipios-pb.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "PE":
	loadCitiesShapes('data/municipios-pe.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "PI":
	loadCitiesShapes('data/municipios-pi.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "PR":
	loadCitiesShapes('data/municipios-pr.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "RJ":
	loadCitiesShapes('data/municipios-rj.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "RN":
	loadCitiesShapes('data/municipios-rn.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "RO":
	loadCitiesShapes('data/municipios-ro.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "RR":
	loadCitiesShapes('data/municipios-rr.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "RS":
	loadCitiesShapes('data/municipios-rs.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "SC":
	loadCitiesShapes('data/municipios-sc.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "SE":
	loadCitiesShapes('data/municipios-se.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  case "SP":
	loadCitiesShapes('data/municipios-sp.geojson');
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  default:
	loadCitiesShapes('data/municipios-to.geojson');	
	map.setZoom(7);
	map.panTo(e.latLng);
	break;
  }
}

function mouseOutOfRegion(e) {
  // reset the hover state, returning the border to normal
  e.feature.setProperty('state', 'normal');
}

function drawChart(marker, e) {
	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Topping');
	data.addColumn('number', 'Slices');
	data.addRows([
	  ['Mushrooms', 3],
	  ['Onions', 1],
	  ['Olives', 1],
	  ['Zucchini', 1],
	  ['Pepperoni', 2]
	]);

	// Set chart options
	var options = {'title':'Pizza sold @ '+
						   e.feature.getProperty("nome").toString(),
				   'width':400,
				   'height':150};
				   
	var node        = document.createElement('div'),
		chart       = new google.visualization.PieChart(node);
	infoWindow  = new google.maps.InfoWindow();	
	chart.draw(data, options);
	infoWindow.setContent(node);
	infoWindow.open(marker.getMap(),marker);
}


function test(e){
	result = [];
	for(var p in e.feature.getProperty('bfp')){
		var dict = {}
		dict[e.feature.getProperty('nome')] = e.feature.getProperty('bfp')[p];
		console.log(e.feature.getProperty('bfp')[p]);
		result.push(e.feature.getProperty('bfp')[p]);
	}
	var ndx = crossfilter(result);
	console.log(result);
	console.log(ndx.size());
	//Define Dimensions
	//Define Dimensions
	var cityDim = ndx.dimension(function(d) { return(d["sum_pagamentos"]); });
	
	var cityGroup = cityDim.group().reduceSum(function(d) {return d["sum_pagamentos"];});
	
	var ufChart = dc.rowChart("#uf-row-chart");
	
	ufChart
        .width(400)
        .height(250)
        .dimension(cityDim)
        .group(cityGroup)
		.colors("#7F97E0")
        .ordering(function(d) { return -d.value })
        .elasticX(true)
        .xAxis().ticks(4);
		
	dcCharts = [ufChart];
	
	dc.renderAll();
}
