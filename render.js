var pyChart0 = PyramidChart();
pyChart0.data(data);
pyChart0.barColor({"left":"green","right":"purple"});
pyChart0.draw();

var pyChart1 = PyramidChart();
pyChart1.data(data);
pyChart1.barColor({"left":"pink","right":"black"});
pyChart1.height(400);
pyChart1.width(400);
pyChart1.draw();

var pyChart2 = PyramidChart();
pyChart2.data(data);
pyChart2.height(200);
pyChart2.width(200);
pyChart2.draw();