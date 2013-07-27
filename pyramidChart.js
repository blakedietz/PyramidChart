var data = [
	{
		"state":"Alaska",
		"percentage": -3.2
	},
	{
		"state":"Alabama",
		"percentage": -39.8
	},
	{
		"state":"Arizona",
		"percentage": -50.4
	},
	{
		"state":"Arkansas",
		"percentage":-18.9
	},
	{
		"state":"California",
		"percentage":-29.3
	},
	{
		"state":"Colorado",
		"percentage":-32.3
	},
	{
		"state":"Connecticut",
		"percentage":-23.1
	},
	{
		"state":"Delaware",
		"percentage":-25
	},
	{
		"state":"Florida",
		"percentage": -41.2
	},
	{
		"state":"Georgia",
		"percentage":-29.5
	},
	{
		"state":"Hawaii",
		"percentage":-25.3
	},
	{
		"state":"Idaho",
		"percentage": -39.6
	},
	{
		"state":"Illinois",
		"percentage":-23.3
	},
	{
		"state":"Indiana",
		"percentage":-17.2
	},
	{
		"state":"Iowa",
		"percentage":-27.7
	},
	{
		"state":"Kansas",
		"percentage":-24.5
	},
	{
		"state":"Kentucky",
		"percentage":-26.3
	},
	{
		"state":"Louisiana",
		"percentage": -42
	},
	{
		"state":"Maine",
		"percentage":-15.7
	},
	{
		"state":"Maryland",
		"percentage":-18.3
	},
	{
		"state":"Massachusetts",
		"percentage": -37.4
	},
	{
		"state":"Michigan",
		"percentage": -32.4
	},
	{
		"state":"Minnesota",
		"percentage":-30.4
	},
	{
		"state":"Mississippi",
		"percentage":-32.4
	},
	{
		"state":"Missouri",
		"percentage":-29.7
	},
	{
		"state":"Montana",
		"percentage":-16.6
	},
	{
		"state":"Nebraska",
		"percentage":-16.6
	},
	{
		"state":"Nevada",
		"percentage":-31.2
	},
	{
		"state":"New Hampshire",
		"percentage": -49.9
	},
	{
		"state":"New Jersey",
		"percentage": -27.2
	},
	{
		"state":"New Mexico",
		"percentage": -36.7
	},
	{
		"state":"New York",
		"percentage": -14.7
	},
	{
		"state":"North Carolina",
		"percentage": -14.6
	},
	{
		"state":"North Dakota",
		"percentage": 16.5
	},
	{
		"state":"Ohio",
		"percentage":-28.9
	},
	{
		"state":"Oklahoma",
		"percentage": -26.2
	},
	{
		"state":"Oregon ",
		"percentage": -43.6
	},
	{
		"state":"Pennsylvania",
		"percentage":-29.9
	},
	{
		"state":"Rhode Island",
		"percentage":-24.8
	},
	{
		"state":"South Carolina",
		"percentage": -38.8
	},
	{
		"state":"South Dakota",
		"percentage": -22.1
	},
	{
		"state":"Tennessee",
		"percentage":-30.1
	},
	{
		"state":"Texas",
		"percentage":-22.7
	},
	{
		"state":"Utah",
		"percentage":-30.6
	},
	{
		"state":"Vermont",
		"percentage":-18.6
	},
	{
		"state":"Virginia",
		"percentage":-27.8
	},
	{
		"state":"Washington",
		"percentage": -37.5
	},
	{
		"state":"West Virginia",
		"percentage": -17.8
	},
	{
		"state":"Wisconsin",
		"percentage":-17.5
	},
	{
		"state":"Wyoming",
		"percentage":7
	},
];
var margin = {top: 20, right: 100, bottom: 20, left: 100};
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
				return "red";
			}
			else
			{
				return "blue";
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
						return 9;
					}
					else
					{
						return 9;
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

// d3.select("input").on("change", change);

//   var sortTimeout = setTimeout(function() {
//     d3.select("input").property("checked", true).each(change);
//   }, 2000);

//   function change() 
//   {
//     clearTimeout(sortTimeout);

//     // Copy-on-write since tweens are evaluated after a delay.
//     var x0 = yScale.domain(
//     	data.sort(
// 	    	this.checked
// 			? function(a, b) 
// 			{ 
// 				if(a < 0 && B < 0)
// 				{
// 					return Math.abs(a.percentage) - Math.abs(b.percentage); 
// 				}
// 				return a.percentage - b.percentage;
// 			}
// 	        : function(a, b) 
// 	        { 
// 	        	return d3.ascending(b.percentage,a.percentage); 
// 	        })
// 	        .map(function(d) 
// 	        { 
// 	        	return d.state; 
// 	    	})
// 	)
//     .copy();

//     var transition = svg.transition().duration(750),
//         delay = function(d, i) 
//         { 
//         	return i * 50; 
//         };

//     // transition.selectAll("rect")
//     //     .delay(delay)
//     //     .attr("y", function(d) 
//     //     	{ 
//     //     		return x0(d.percentage); 
//     //     	});

//     transition.select(".y.axis")
//         .call(yAxis)
//       .selectAll("g")
//         .delay(delay);
//   };

