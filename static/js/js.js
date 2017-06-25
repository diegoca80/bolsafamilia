var map;
var censusMin = Number.MAX_VALUE;
var censusMax = -Number.MAX_VALUE;
var loadCensusCount = 0;
var len_feature = 0;

var sigla = 'br';
var map_zoom = 4;

var year_select_box = document.getElementById('year_select');
var month_select_box = document.getElementById('month_select');
var year;
var month;

var layer;
var features;

var infoWindow;

window.initMap = function() {
//function initMap(){
  var mapStyle = [
    {
      'stylers': [{'visibility': 'off'}]
    },
    {
      'featureType': 'landscape',
      'elementType': 'geometry',
      'stylers': [{'visibility': 'on'},
                  {'color': '#fcfcfc'}]
    },
    {
      'featureType': 'water',
      'elementType': 'geometry',
      'stylers': [{'visibility': 'on'},
                  {'color': '#bfd4ff'}]
    }
  ];

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -20, lng: -45},
    zoom: map_zoom,
    styles: mapStyle
  });

  jQuery(document).ready(function( $ ) {
    console.log('Ready!');

    //year = year_select_box.options[year_select_box.selectedIndex].value;
    //month = month_select_box.options[month_select_box.selectedIndex].value;
	year = "2016";
	month = "Jan";
    loadShapes('data/bfp-br.geojson');
  });

  // set up the style rules and events for google.maps.Data
  map.data.setStyle(styleFeature);
  map.data.addListener('addfeature', loadCensus);
  map.data.addListener('mouseover', mouseInToRegion);
  map.data.addListener('mouseout', mouseOutOfRegion);
  map.data.addListener('click', clickRegion);

  google.maps.event.addDomListener(year_select_box, 'change', function() {
    year = year_select_box.options[year_select_box.selectedIndex].value;
    updateCensus();
  });

  google.maps.event.addDomListener(month_select_box, 'change', function() {
    month = month_select_box.options[month_select_box.selectedIndex].value;
    updateCensus();
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


function styleFeature(e) {
  console.log('[styleFeature] start');

  var soma_parcelas = e.getProperty('bfp')[year][month]['soma_parcelas']

  //if(loadCensusCount == len_feature) {}

  console.log('[styleFeature] end');

  return {
    strokeWeight: 0.5,
    strokeColor: '#fff',
    zIndex: 1,
    fillColor: getColor(soma_parcelas),
    fillOpacity: 0.75,
    visible: true
  };

  function getColor(ref_value) {
    //console.log('[getColor] start > ref_value=' + ref_value);

    var low = [151, 83, 34];  // color of smallest datum
    var high = [5, 69, 54];   // color of largest datum

    //console.log('[getColor] censusMin=' + censusMin + ' censusMax=' + censusMax);
    var delta = (ref_value - censusMin) / (censusMax - censusMin);

    var color = [];
    for (var i = 0; i < 3; i++) {
      // calculate an integer color based on the delta
      color[i] = (high[i] - low[i]) * delta + low[i];
    }

    //console.log('[getColor] end > hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)');

    return 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)';
  }

}


function loadCensus(e) {
  loadCensusCount = loadCensusCount + 1;

  console.log('[loadCensus] start > loadCensusCount=' + loadCensusCount);
  console.log('[loadCensus] feature.length=' + e.length);

  var soma_parcelas = e.feature.getProperty('bfp')[year][month]['soma_parcelas']
  console.log('[loadCensus] soma_parcelas=' + soma_parcelas);

  if (soma_parcelas < censusMin) {
    censusMin = soma_parcelas;
  }
  if (soma_parcelas > censusMax) {
    censusMax = soma_parcelas;
  }

  setupCensus();

  console.log('[loadCensus] end > censusMin=' + censusMin + ' censusMax=' + censusMax);
}


function loadCensusFeature(e) {
  loadCensusCount = loadCensusCount + 1;

  console.log('[loadCensusFeature] start > loadCensusCount=' + loadCensusCount);
  console.log('[loadCensusFeature] feature.length=' + e.length);

  var soma_parcelas = e.getProperty('bfp')[year][month]['soma_parcelas']
  console.log('[loadCensus] soma_parcelas=' + soma_parcelas);

  if (soma_parcelas < censusMin) {
    censusMin = soma_parcelas;
  }
  if (soma_parcelas > censusMax) {
    censusMax = soma_parcelas;
  }

  if(loadCensusCount == len_feature) {
    setupCensus();
  }

  console.log('[loadCensusFeature] end > censusMin=' + censusMin + ' censusMax=' + censusMax);
}


function mouseInToRegion(e) {
  console.log('[mouseInToRegion] start');

  sigla = e.feature.getProperty('uf').toLowerCase();
  console.log('[mouseInToRegion] sigla =' + sigla);

  updateBox();
  updateCensusBar();

  map.data.overrideStyle(e.feature, {
    strokeWeight: 2,
    zIndex: 2
  });

  function updateBox() {
    //console.log('[updateBox] start');

    document.getElementById('data-box').style.display = 'block';
    document.getElementById('data-caret').style.display = 'block';
    document.getElementById('data-label').textContent = 'Local';
    document.getElementById('data-value').textContent =  e.feature.getProperty('nome') + ' (' + e.feature.getProperty('uf') + ')';

    document.getElementById('data-label-2').textContent = 'Beneficiários';
    document.getElementById('data-value-2').textContent = e.feature.getProperty('bfp')[year][month]['porcentagem_bf'] + '%';
    console.log(' porcentagem_bf=' + e.feature.getProperty('bfp')[year][month]['porcentagem_bf']);

    document.getElementById('data-label-3').textContent = 'Pagamentos';
    document.getElementById('data-value-3').textContent = 'R$' + e.feature.getProperty('bfp')[year][month]['soma_parcelas'].toLocaleString() + ',00';

    //console.log('[updateBox] end');
  }

  function updateCensusBar() {
    //console.log('[updateCensusBar] start');

    var soma_parcelas = e.feature.getProperty('bfp')[year][month]['soma_parcelas'];
    var percent = (soma_parcelas - censusMin) / (censusMax - censusMin) * 100;
    document.getElementById('data-caret').style.paddingLeft = percent + '%';

    //console.log('[updateCensusBar] end');
  }

  console.log('[mouseInToRegion] end');
}


function mouseOutOfRegion(e) {
  console.log('[mouseOutOfRegion] start');

  map.data.overrideStyle(e.feature, {
    strokeWeight: 0.5,
    zIndex: 1
  });

  console.log('[mouseOutOfRegion] end');
}


function clickRegion(e) {
  if (map_zoom == 4) {
    map_zoom = 7;
  } else {
    sigla = 'br'
    console.log('[mouseInToRegion] sigla =' + sigla);
    map_zoom = 4;
  }

  var geojson_file = 'data/bfp-' + sigla + '.geojson';
  loadShapes(geojson_file)
  map.setZoom(map_zoom);
  map.panTo(e.latLng);
}


function getFeatureLength(e) {
  len_feature = e.length;

  console.log('[getFeatureLength] len_feature=' + len_feature);

  map.data.forEach(function(feature) {
    map.data.overrideStyle(feature, styleFeature);
  });
}


function updateCensus() {
  console.log('[updateCensus] len_feature=' + len_feature);

  clearCensus();
  map.data.forEach(loadCensusFeature);

  // Force update colors
  map.data.forEach(function(feature) {
    map.data.overrideStyle(feature, styleFeature);
  });
}


function loadShapes(geojson_file) {
  console.log('[loadShapes] start > geojson_file=' + geojson_file);

  clearData();
  clearCensus();
  map.data.loadGeoJson(geojson_file, null, getFeatureLength);
  //map.data.forEach(loadCensusFeature);

  console.log('[loadShapes] end');
}


function setupCensus() {
  console.log('[setupCensus] start');

  document.getElementById('census-min').textContent = 'R$' + censusMin.toLocaleString() + ',00';
  document.getElementById('census-max').textContent = 'R$' + censusMax.toLocaleString() + ',00';

  console.log('[setupCensus] end');
}


function clearCensus() {
  console.log('[clearCensus] start');
  censusMin = Number.MAX_VALUE;
  censusMax = -Number.MAX_VALUE;
  loadCensusCount = 0;

  //document.getElementById('data-box').style.display = 'none';
  //document.getElementById('data-caret').style.display = 'none';
  console.log('[clearCensus] end');
}

function clearData() {
  map.data.forEach(function(feature) {
    map.data.remove(feature);
  });
}
