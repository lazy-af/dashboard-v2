import * as d3 from 'd3';

export default class D3PieChart {
    constructor(element, width, height, colorScheme, legend, legendLength) {
        const vis = this;
        if (legend) {
            vis.width = width + legendLength;
        } else {
            vis.width = width;
        }
        
        vis.legend = legend;
        const radius = Math.min(width, height)/2;
        vis.colorScheme = colorScheme;
        console.log(element);
        console.log(legend);

        //svg container defined
        vis.svg = d3.select(element)
            .append('svg')
                .attr('width', vis.width)
                .attr('height', height)
                    .append('g')
                        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        // pie defined
        vis.pie = d3.pie()
            .sort(null)
            .value((d) => d.value)

        // arc defined
        vis.arc = d3.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.4)

        vis.key = d => d.data.label;


        // appending the group with a class slices
        vis.svg.append("g")
            .attr("class", "slices");

    }
    update = (data) => {
        const vis = this;
        
        // setting scale ordinal
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.label))
            .range(vis.colorScheme)

        // data join for slices
        const slice = vis.svg.select(".slices").selectAll("path.slice")
            .data(vis.pie(data), vis.key);
    
        // appending path for each data in the array
        slice.enter()
            .insert("path")
            .style("fill", function(d) { return color(d.data.label); })
            .attr("class", "slice")
            .transition().duration(1000)
            .attrTween('d', function(d) {
                vis._current = vis._current || d;
                let i = d3.interpolate(vis._current, d);
                vis._current = i(0);
                return function(t) {
                    return vis.arc(i(t));
                };
            })
    
        // update
        slice		
            .transition().duration(1000)
            .attrTween("d", function(d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    return vis.arc(interpolate(t));
                };
            })
    
        // exit
        slice.exit()
            .remove();

        if (vis.legend) {
            // data join for legend
            const legend = vis.svg.selectAll(".legend")
                .data(vis.pie(data))

            // enter
            const legendG = legend.enter()
                .append("g")
                .attr("class", "legend")
                .attr("transform", (d, i) =>"translate(" + (170) +"," + (i * 15 - 140) + ")")

            legendG
                .append("rect") 
                .attr("width", 10)
                .attr("height", 10)
                .attr("fill", (d, i) =>  color(i))

            legendG
                .append("text") // add the text
                .text(d => d.data.label)
                .style("font-size", 12)
                .attr("y", 10)
                .attr("x", 11);
                        }

        
    }

}