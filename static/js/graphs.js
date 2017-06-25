$.getJSON('data/records.json', function (data) {
	makeGraphs(data);
});

function makeGraphs(recordsJson) {
	var records = recordsJson;
	console.log(records);
	records.forEach(function(d) {
    d["POPULACAO"] = +d["POPULACAO"];
    d["PORC_BF"] = +d["PORC_BF"];
	d["SUM_PARCELAS"] = +d["SUM_PARCELAS"];
	});
	//Create a Crossfilter instance
	var ndx = crossfilter(records);
	//Define Dimensions
	var cityDim = ndx.dimension(function(d) { return d["NOME_MUNICIPIO"]; });
	var ufDim = ndx.dimension(function(d) { return d["UF"]; });
	var valueDim = ndx.dimension(function(d) { return d["SUM_PARCELAS"]; });
	var yearDim = ndx.dimension(function(d) { return d["ANO_PAGAMENTO"]; });
	var monthDim = ndx.dimension(function(d) { return d["MES_PAGAMENTO"]; });
	var allDim = ndx.dimension(function(d) {return d;});
	
	//Group Data
	var cityGroup = cityDim.group().reduceSum(function(d) {return d["SUM_PARCELAS"];});
	var ufGroup = ufDim.group().reduceSum(function(d) {return d["SUM_PARCELAS"];});
	var yearGroup = yearDim.group().reduceSum(function(d) {return d["SUM_PARCELAS"];});
	var monthGroup = monthDim.group().reduceSum(function(d) {return d["SUM_PARCELAS"];});
	var valueGroup = valueDim.group();
	var parcelas = ndx.groupAll().reduceSum(function(d) {return d["SUM_PARCELAS"];});
    var populacao = ndx.groupAll().reduceSum(function(d) {return d["COUNT_BENEFICIADOS"];});
	
	function getTops(source_group) {
    return {
        all: function () {
            return source_group.top(5);
        }
    };
	};
	cityGroup5 = getTops(cityGroup);

	//Define values (to be used in charts)
	var minDate = yearDim.bottom(1)[0]["ANO_PAGAMENTO"];
	var maxDate = yearDim.top(1)[0]["ANO_PAGAMENTO"];
	var minMonth = monthDim.bottom(1)[0]["MES_PAGAMENTO"];
	var maxMonth = monthDim.top(1)[0]["MES_PAGAMENTO"];

    //Charts
	var timeChart = dc.barChart("#time-chart");
	var timeMonthChart = dc.barChart("#time-month-chart");
	var ufChart = dc.rowChart("#uf-row-chart");
	var parcelasChart = dc.numberDisplay("#number-amount");
	var populacaoChart = dc.numberDisplay("#population-amount");
	var topCityChart = dc.pieChart("#top-5-cities");
	
	populacaoChart
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(populacao);
	
	timeChart
		.width(450)
		.height(250)
		.margins({top: 10, right: 50, bottom: 30, left: 80})
		.dimension(yearDim)
		.group(yearGroup)
		.transitionDuration(500)
		.x(d3.time.scale().domain([2011,2017]))
		.filter(dc.filters.RangedFilter(2016,2017))
		.elasticY(true)
		.yAxis().ticks(6);
		
		
	timeChart.xAxis().tickFormat(d3.format('f'));
		
	timeMonthChart
		.width(450)
		.height(250)
		.margins({top: 10, right: 50, bottom: 30, left: 80})
		.dimension(monthDim)
		.group(monthGroup)
		.transitionDuration(500)
		.x(d3.time.scale().domain([01,12]))
		.filter(dc.filters.RangedFilter(11,12))
		.elasticY(true)
		.yAxis().ticks(6);
	
	timeMonthChart.xAxis().tickFormat(d3.format('f'));
	
	ufChart
        .width(400)
        .height(555)
        .dimension(ufDim)
        .group(ufGroup)
		.colors("#7F97E0")
        .ordering(function(d) { return -d.value })
        .elasticX(true)
        .xAxis().ticks(4);
	
	topCityChart
		.width(550)
		.height(320)
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

	parcelasChart
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(parcelas);

	$(".se-pre-con").fadeOut("slow");
	
	dcCharts = [timeChart, ufChart, topCityChart, parcelasChart, timeMonthChart, populacaoChart];
	
	dc.renderAll();
};