// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("countries.csv",
	function(d){ return {Country: d.Country, Value: +d.Value}}
).then( function(data) {

	data.sort(function(x, y){return d3.descending(x.Value, y.Value);})

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 13000])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.Country; }))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))

  //Bars
  svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(50) )
    .attr("y", function(d) { return y(d.Country); })
    .attr("width", function(d) { return x(d.Value); })
    .attr("height", y.bandwidth() )
    .attr("fill", function(d){ if (d.Country == 'Nevada') return "#00008B" ; else return "#a3a3c2"})


	svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("States in USA ");
	
	
    // Features of the annotation
	const annotations = [
    {
    note: {
      label: "Nevada's profits were due to the sudden increase in demand for home renovations",
      title: "Nevada overall profit",
      wrap: 200,  // try something smaller to see text split in several lines
      padding: 10   // More = text lower
      
    },
    color: ["#00008B"],
    x: x(2500),
    y: 100,
    dy: 100,
    dx: 100
  }
]

// Add annotation to the chart
const makeAnnotations = d3.annotation()
  .annotations(annotations)

  svg.append("g")
  .call(makeAnnotations)


})
