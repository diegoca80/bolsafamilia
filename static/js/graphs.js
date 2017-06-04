queue()
    .defer(d3.json, "/data")
    .await(makeGraphs);

function makeGraphs(error, recordsJson) {
	var records = recordsJson;
	console.log(records);
	records.forEach(function(d) {
    d["longitude"] = +d["longitude"];
    d["latitude"] = +d["latitude"];
	d["sum"] = +d["SUM_PARCELAS"];
	});
	//Create a Crossfilter instance
	var ndx = crossfilter(records);
	//Define Dimensions
	var cityDim = ndx.dimension(function(d) { return d["city"]; });
	var ufDim = ndx.dimension(function(d) { return d["uf"]; });
	var valueDim = ndx.dimension(function(d) { return d["SUM_PARCELAS"]; });
	var yearmonthDim = ndx.dimension(function(d) { return d["ANO_MES_PAGAMENTO"]; });
	var allDim = ndx.dimension(function(d) {return d;});

	//Group Data
	var cityGroup = cityDim.group().reduceSum(function(d) {return d["SUM_PARCELAS"];});
	var ufGroup = ufDim.group().reduceSum(function(d) {return d["SUM_PARCELAS"];});
	var yearmonthGroup = yearmonthDim.group().reduceSum(function(d) {return d["SUM_PARCELAS"];});
	var valueGroup = valueDim.group();
	var numbers = ndx.groupAll().reduceSum(function(d) {return d["SUM_PARCELAS"];});
    
	function getTops(source_group) {
    return {
        all: function () {
            return source_group.top(5);
        }
    };
	};
	cityGroup5 = getTops(cityGroup);

	//Define values (to be used in charts)
	var minDate = yearmonthDim.bottom(1)[0]["ANO_MES_PAGAMENTO"];
	var maxDate = yearmonthDim.top(1)[0]["ANO_MES_PAGAMENTO"];


    //Charts
	var timeChart = dc.barChart("#time-chart");
	var ufChart = dc.rowChart("#uf-row-chart");
	var numberChart = dc.numberDisplay("#number-amount");
	var topCityChart = dc.pieChart("#top-5-cities");
	
	timeChart
		.width(650)
		.height(250)
		.margins({top: 10, right: 50, bottom: 30, left: 80})
		.dimension(yearmonthDim)
		.group(yearmonthGroup)
		.transitionDuration(500)
		.x(d3.time.scale().domain([2004,2016]))
		.elasticY(true)
		.yAxis().ticks(6);

	ufChart
        .width(400)
        .height(250)
        .dimension(ufDim)
        .group(ufGroup)
		.colors("#7F97E0")
        .ordering(function(d) { return -d.value })
        .elasticX(true)
        .xAxis().ticks(4);
	
	topCityChart
		.width(600)
		.height(240)
		.slicesCap(5)
		.innerRadius(30)
		.drawPaths(true)
		.colors(d3.scale.category10())
		.externalRadiusPadding(30)
		.dimension(cityDim)
		.group(cityGroup5)
		.legend(dc.legend())
		.on('pretransition', function(chart) {
			chart.selectAll('text.pie-slice').text(function(d) {
				return d.data.key;
			})
		});
			
	topCityChart.on('pretransition', function(chart) {
          chart.selectAll('.dc-legend-item text')
              .text('')
            .append('tspan')
              .text(function(d) { return d.name; })
            .append('tspan')
              .attr('x', 150)
              .attr('text-anchor', 'end')
              .text(function(d) { return d.data; });
    });

	numberChart
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(numbers);

	var map = L.map('map');
	var drawMap = function(){
		map.setView([-23.5475, -46.63611], 3);
		mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
		L.tileLayer(
			'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; ' + mapLink + ' Contributors',
				maxZoom: 15,
			}).addTo(map);

		//HeatMap
		var geoData = [];
		_.each(allDim.top(Infinity), function (d) {
			geoData.push([d["latitude"], d["longitude"], d["SUM_PARCELAS"]]);
		});
		var heat = L.heatLayer(geoData,{
			radius: 10,
			blur: 20, 
			max: 1000000,
			maxZoom: 1,
		}).addTo(map);
	};
	drawMap();
		
	dcCharts = [timeChart, ufChart, topCityChart, numberChart];
	
	_.each(dcCharts, function (dcChart) {
    dcChart.on("filtered", function (chart, filter) {
        map.eachLayer(function (layer) {
          map.removeLayer(layer)
        }); 
    drawMap();
    });
	});

	dc.renderAll();
	
    //map listeners
    map.on('moveend', function() {
      updateMapFilter()
    })
    map.on('zoomend', function() {
      updateMapFilter()
    })


	function updateMapFilter() {
  
      var bounds = map.getBounds(),
        n=bounds._northEast.lat,
        e=bounds._northEast.lng,
        s=bounds._southWest.lat,
        w=bounds._southWest.lng;
      var boundsFeature = {
        type: 'Feature',
        geometry: {
          type:'Polygon',
          coordinates: [
            [
              [
                w,
                s
              ],
              [
                w,
                n
              ],
              [
                e,
                n
              ],
              [
                e,
                s
              ],
              [
                w,
                s
              ]
            ]
          ]
        }
      }
      allDim.filter(function(d) {
        //make feature
        var point = {
          type: 'Feature',
          geometry: {
			  type: 'Point',
			  coordinates: [ +d["longitude"], +d["latitude"] ]
		  }
        }
  
        return turf.inside(point, boundsFeature)
      })
      dc.redrawAll();
    }
	
};