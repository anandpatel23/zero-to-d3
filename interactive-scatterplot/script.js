circle_data = [
  {
    "x": 100,
	  "y": 300,
	  "r": 10
  },
  {
    "x": 200,
	  "y": 250,
	  "r": 10
  },
  {
    "x": 300,
	  "y": 180,
	  "r": 10
  }
]

svg = d3.select("svg");

// empty container for all circles
diag_circles = svg.selectAll("circle")

// chaining
// 1. start with empty diag_circles container
// 2. apply enter aka creates a new object
// 3. create svg circles within object
// 4. set attributes
diag_circles.data(circle_data)
.enter()
.append("circle")
.attr("cx", function(d){return d.x})
.attr("cy", function(d){return d.y})
.attr("r", function(d){return d.r});
