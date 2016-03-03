$(document).ready(function(){
  // Making the Data
  var fields;

  fields = function() {
    var currentTime, hour, minute, second;
    currentTime = new Date();
    second = currentTime.getSeconds();
    // smooth-sweeping minute and hour hands
    minute = currentTime.getMinutes() + second / 60;
    hour = currentTime.getHours() + minute / 60;

    return data = [
      {
          "unit": "seconds",
          "numeric": second
      }, {
        "unit": "minutes",
        "numeric": minute
      }, {
        "unit": "hours",
        "numeric": hour
      }
    ];
  }


  // D3 Scales
  var width, height, offSetX, offSetY, pi, scaleSecs, scaleMins, scaleHours;
  width = 400;
  height = 200;
  offSetX = 150;
  offSetY = 100;

  pi = Math.PI;
  // domain - smoothing for input range of units
  // range - scale onto which data will be plotted
  // scale's range is in radians
  scaleSecs = d3.scale.linear().domain([0, 59 + 999/1000]).range([0, 2 * pi]);
  scaleMins = d3.scale.linear().domain([0, 59 + 59/60]).range([0, 2 * pi]);
  scaleHours = d3.scale.linear().domain([0, 11 + 59/60]).range([0, 2 * pi]);


  // Putting Down the SVG
  var vis, clockGroup;

  vis = d3.selectAll(".chart")
    .append("svg:svg")
    .attr("width", width)
    .attr("height", height);

  clockGroup = vis.append("svg:g")
    .attr("transform", "translate(" + offSetX + "," + offSetY + ")");

  clockGroup.append("svg:circle")
    .attr("r", 80).attr("fill", "none")
    .attr("class", "clock outercircle")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  clockGroup.append("svg:circle")
    .attr("r", 4)
    .attr("fill", "black")
    .attr("class", "clock innercircle")


    // Rendering the hands
    var render;

    render = function(data){
      var hourArc, minuteArc, secondArc;

      clockGroup.selectAll(".clockhand").remove();

      secondArc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(70)
        .startAngle(function(d) {
          return scaleSecs(d.numeric);
        })
        .endAngle(function(d){
          return scaleSecs(d.numeric);
        });

      minuteArc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(70)
        .startAngle(function(d) {
          return scaleMins(d.numeric);
        })
        .endAngle(function(d) {
          return scaleMins(d.numeric);
        });

      hourArc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(50)
        .startAngle(function(d) {
          return scaleHours(d.numeric % 12);
        })
        .endAngle(function(d) {
          return scaleHours(d.numeric % 12);
        });

      clockGroup.selectAll(".clockhand")
        .data(data)
        .enter()
        .append("svg:path")
        .attr("d", function(d) {
          if (d.unit === "seconds") {
            return secondArc(d);
          } else if (d.unit === "minutes") {
            return minuteArc(d);
          } else if (d.unit === "hours") {
            return hourArc(d);
          }
        })
        .attr("class", "clockhand")
        .attr("stroke", "black")
        .attr("stroke-width", function(d) {
          if (d.unit === "seconds") {
            return 2;
          } else if (d.unit === "minutes") {
            return 3;
          } else if (d.unit === "hours") {
            return 3;
          }
        })
        .attr("fill", "none");
    }

    // Render Hands Every second
    setInterval(function() {
      var data;
      data = fields();
      return render(data);
    }, 1000);

});
