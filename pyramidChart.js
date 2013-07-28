// Descending sort
data.sort(function(a,b)
{
	return a.percentage < b.percentage ? -1 : a.percentage > b.percentage ? 1: 0;
});

var margin = {top: 0, right: 50, bottom: 20, left: 50};
var width  = 500 - margin.right - margin.left; 
var height = 650 - margin.top   - margin.bottom;

var highestMagnitude = d3.max(data.map(function(d){return Math.abs(d.percentage);}));

var xScaleLeft  = d3.scale.linear().domain([-highestMagnitude,0]).range([width/2,0]);
var xScaleRight = d3.scale.linear().domain([0,highestMagnitude]).range([0,width/2]);

var yScale      = d3.scale.ordinal().domain(data.map(function(d){return d.state;})).rangeRoundBands([margin.top,height - margin.bottom],.3);

var yAxis       = d3.svg.axis().scale(yScale).orient("left");

var svg = d3.select("body")
			.append("svg")
				.attr("height",height + margin.top  + margin.bottom)
				.attr("width",width   + margin.left + margin.right)
			.append("g")
				.attr("transform","translate(" + margin.left + "," + margin.top + ")");

svg.selectAll("rect").data(data).enter().append("rect")
	.attr({
		"x":function(d)
		{
			if(d.percentage < 0)
			{
				return width/2 - xScaleLeft(d.percentage);
			}
			else
			{
				return width/2;
			}
		},
		"y":function(d)
		{
			return yScale(d.state);
		},
		"width":function(d)
		{
			if(d.percentage < 0)
			{
				return xScaleLeft(d.percentage);
			}
			else
			{
				console.log(xScaleRight(d.percentage) + width/2)
				return xScaleRight(d.percentage);
			}
		} ,
		"height":yScale.rangeBand(),
		"fill":function(d)
		{
			if(d.percentage < 0)
			{
				return "#c33";
			}
			else
			{
				return "#16a";
			}
		}
	})
	.on("mouseover",function(d)
		{
			console.log(d.state);
		});
	
var gy 	= svg.append("g")
			.attr("class", "y axis")
			.attr("transform","translate(" + width/2 + ", 0)")
			.call(yAxis)
			.selectAll("text")
				.style("text-anchor",function(d,i)
				{
					if(data[i].percentage < 0)
					{
						return "start";
					}
					else
					{
						return "end";
					}
				})
				.attr("dx",function(d,i)
				{
					if(data[i].percentage < 0)
					{
						return 15;
					}
					else
					{
						return 3;
					}

				})
				.style("font-family","sans-serif")
				.style("font-size",yScale.rangeBand() +3)
				.style("renderStyle","crisp-edges");

	svg.selectAll("text.statePercentage")
				.data(data)
				.enter().append("text")
				.attr("class","statePercentage")
				.attr("transform","translate("+width/2+",0)")
				.text(function(d){return d.percentage + "%";})
				.style("text-anchor",function(d,i)
				{
					if(data[i].percentage < 0)
					{
						return "end";
					}
					else
					{
						return "start";
					}
				})
				.attr("x",function(d,i)
				{
					if(data[i].percentage < 0)
					{
						return -xScaleLeft(data[i].percentage);
					}
					else
					{
						return xScaleRight(data[i].percentage);
					}

				})
				.attr("y",function(d,i)
				{
					return yScale(i) + yScale.rangeBand() / 2;
				})
				.attr("dy",3)
				.style("font-family","sans-serif")
				.style("font-size",yScale.rangeBand() + 2)
				.style("renderStyle","crisp-edges");