import * as d3 from 'd3';


// Mapping of step names to colors.
const colors = {
  "AWM": "#5687d1",
  "CCB": "#7b615c",
  "CIB": "#de783b",
  "CT": "#6ab975",
  "Development": "#a173d1",
  "Ideation": "#bbbbbb",
  "Production": "#98abc5",
  "Retired": "#8a89a6"
};


export default class D3SunBurstChart {
    constructor(element, width, height) {
        console.log(element);
        const vis = this;
        vis.width = width;
        vis.height = height;

        vis.radius = Math.min(width, height) / 2;
        // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
        vis.b = {
          w: 68, h: 30, s: 3, t: 10
        };

        vis.svg = d3.select(element).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("id", "container")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        vis.partition = d3.partition()
            .size([2 * Math.PI, vis.radius * vis.radius])

        vis.arc = d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .innerRadius(d => Math.sqrt(d.y0))
            .outerRadius(d => Math.sqrt(d.y1));
   
    }

    update = (json) => {
      const vis = this;

      // Total size of all segments; we set this later, after loading the data.
      let totalSize = 0;
      
      // Creating the visualisation for sunburst chart.
        const createVisualization = (json) => {

          // Basic setup of page elements.
          initializeBreadcrumbTrail();
        
          // Bounding circle underneath the sunburst, to make it easier to detect
          // when the mouse leaves the parent g.
          vis.svg.append("circle")
              .attr("r", vis.radius)
              .style("opacity", 0);
        
          // Turn the data into a d3 hierarchy and calculate the sums.
          var root = d3.hierarchy(json)
              .sum(function(d) { return d.size; })
              .sort(function(a, b) { return b.value - a.value; });
          
          // For efficiency, filter nodes to keep only those large enough to see.
          var nodes = vis.partition(root).descendants()
              .filter(d => {
                  return (d.x1 - d.x0 > 0.005); // 0.005 radians = 0.29 degrees
              });
        
          var path = vis.svg.data([json]).selectAll("path")
              .data(nodes)
              .enter().append("path")
              .attr("display", function(d) { return d.depth ? null : "none"; })
              .attr("d", vis.arc)
              .attr("fill-rule", "evenodd")
              .style("fill", d => colors[d.data.name])
              .style("opacity", 1)
              .on("mouseover", mouseover);
        
          // Add the mouseleave handler to the bounding circle.
          d3.select("#container").on("mouseleave", mouseleave);
        
          // Get total size of the tree = value of root node from partition.
          totalSize = path.datum().value; //error should be equal to 40 but somehow is equal to 13
          // console.log("total size", totalSize);
         };

         // mouse over function
        const mouseover = (d) => {

          // console.log("d.value", d.value);
          // console.log(vis.totalSize);

          var percentage = (100 * d.value / totalSize).toPrecision(3);
          var percentageString = percentage + "%";
          if (percentage < 0.1) {
            percentageString = "< 0.1%";
          }
        
          d3.select("#percentage")
              .text(percentageString);
        
          d3.select("#explanation")
              .style("visibility", "");
        
          let sequenceArray = d.ancestors().reverse();
          sequenceArray.shift(); // remove root node from the array
          updateBreadcrumbs(sequenceArray, percentageString);
        
          // Fade all the segments.
          d3.selectAll("path")
              .style("opacity", 0.3);
        
          // Then highlight only those that are an ancestor of the current segment.
          vis.svg.selectAll("path")
              .filter(function(node) {
                        return (sequenceArray.indexOf(node) >= 0);
                      })
              .style("opacity", 1);
        }


        //  mouse leave function
        const mouseleave = (d) => {

          // Hide the breadcrumb trail
          d3.select("#trail")
              .style("visibility", "hidden");

          // Deactivate all segments during transition.
          d3.selectAll("path").on("mouseover", null);

          // Transition each segment to full opacity and then reactivate it.
          d3.selectAll("path")
              .transition()
              .duration(1000)
              .style("opacity", 1)
              .on("end", function() {
                      d3.select(this).on("mouseover", mouseover);
                    });

          d3.select("#explanation")
              .style("visibility", "hidden");
        }


        //  initial breadcrum function
         const initializeBreadcrumbTrail = () => {
          // Add the svg area.
          var trail = d3.select("#sequence").append("svg")
              .attr("width", vis.width)
              .attr("height", 50)
              .attr("id", "trail");
          // Add the label at the end, for the percentage.
          // trail.append("text")
          //   .attr("id", "endlabel")
          //   .style("fill", "#000");
        }


        // breadcrumb points function

        const breadcrumbPoints = (d, i) => {
          var points = [];
          points.push("0,0");
          points.push(vis.b.w + ",0");
          points.push(vis.b.w + vis.b.t + "," + (vis.b.h / 2));
          points.push(vis.b.w + "," + vis.b.h);
          points.push("0," + vis.b.h);
          if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
            points.push(vis.b.t + "," + (vis.b.h / 2));
          }
          return points.join(" ");
        }

        
        // update breadcrumb function
        const updateBreadcrumbs = (nodeArray, percentageString) => {

          // Data join; key function combines name and depth (= position in sequence).
          var trail = d3.select("#trail")
              .selectAll("g")
              .data(nodeArray, function(d) { return d.data.name + d.depth; });
        
          // Remove exiting nodes.
          trail.exit().remove();
        
          // Add breadcrumb and label for entering nodes.
          var entering = trail.enter().append("svg:g");
        
          entering.append("polygon")
              .attr("points", breadcrumbPoints)
              .style("fill", d => colors[d.data.name]);
        
          entering.append("text")
              .attr("x", (vis.b.w + vis.b.t) / 2)
              .attr("y", vis.b.h / 2)
              .attr("dy", "0.35em")
              .attr("text-anchor", "middle")
              .text(d => d.data.name);
        
          // Merge enter and update selections; set position for all nodes.
          entering.merge(trail).attr("transform", function(d, i) {
            return "translate(" + i * (vis.b.w + vis.b.s) + ", 0)";
          });
        
          // Now move and update the percentage at the end.
          d3.select("#trail").select("#endlabel")
              .attr("x", (nodeArray.length + 0.3) * (vis.b.w + vis.b.s))
              .attr("y", vis.b.h / 2)
              .attr("dy", "0.35em")
              .attr("text-anchor", "middle")
              .text(percentageString);
        
          // Make the breadcrumb trail visible, if it's hidden.
          d3.select("#trail")
              .style("visibility", "");
        
        }


        

        createVisualization(json);



    }
}