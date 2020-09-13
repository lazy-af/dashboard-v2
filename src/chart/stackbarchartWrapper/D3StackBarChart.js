import * as d3 from 'd3';

const margin = {top: 20, right: 20, bottom: 40, left: 100};


export default class D3StackBarChart {
    constructor(element, widthPassed, heightPassed, legendShow, legendWidth, colorScheme, xAxisLabel) {
        console.log(element);
        const vis = this;
        const width = widthPassed - margin.left - margin.right;
        const height = heightPassed - margin.top - margin.bottom;

        const svg = d3.select(element)
            .append('svg')
                .attr('width', width + legendWidth + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)

        vis.g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

        // y axis scale
        vis.y = d3.scaleBand()		
        .rangeRound([0, height])	
        .paddingInner(0.05)
        .align(0.1);

        // x axis scale
        vis.x = d3.scaleLinear()		
        .rangeRound([0, width]);

        vis.z = d3.scaleOrdinal()
        .range(colorScheme);

        vis.yAxisGroup = vis.g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,0)") 

        vis.xAxisGroup = vis.g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,"+height+")")

        vis.xAxisText = vis.xAxisGroup
        .append("text")
        .attr("y", 2)				
        .attr("x", vis.x(vis.x.ticks().pop()) + 0.5) 			
        .attr("dy", "3.82em")						
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .text(xAxisLabel)
        .attr("transform", "translate("+ (-width) +",-10)"); 


        // legend
        if (legendShow) {
            const legend = vis.g.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "end")
            .selectAll("g")
            .data(["Retired", "Production", "Ideation", "Development"].reverse())
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(90," + i * 20 + ")"; });
            // .attr("transform", function(d, i) { return "translate(70," + (300 + i * 20) + ")"; });

            legend.append("rect")
                .attr("x", width - 19)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", vis.z);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(d =>  d);
        }
        
        vis.keys = [ "retired", "production", "ideation", "development"].reverse();

    }

    update = (data) => {
        const vis = this;

        
            // need improvement causing the animation probem on update.
            data.forEach(d => {
                // console.log("d:", d);
                d.total = d3.sum(vis.keys, (k, i) => +d[k]);
                console.log("d.total", d.total);
                return d;
            })

            // data.sort(function(a, b) { return b.total - a.total; });
            vis.y.domain(data.map(d=> d.label));
            vis.x.domain([0, d3.max(data, d => d.total)]).nice();	
            vis.z.domain(vis.keys);


            // console.log("d3stack", d3.stack().keys(vis.keys)(data));


            // bars data join
            const bars = vis.g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(vis.keys)(data))

            bars.exit().transition().duration(1000)
            .attr('width', 0)
            .attr('x', 0)
            .remove()

            // bars enter and rects data join
            const rects = bars 
            .enter().append("g")
            .attr("fill", d => vis.z(d.key))
            .attr('class', 'clss')
            .selectAll("rect")
            .data(d => d)

            rects.exit().transition().duration(1000)
            .attr('width', 0)
            .attr('x', 0)
            .remove()

            // rects enter
            rects.enter().append("rect")
            .attr("y", d => vis.y(d.data.label))	 
            .attr('x', 0)
            .attr("height", vis.y.bandwidth())
            .transition().duration(1000)   
            .attr("x", d => vis.x(d[0]))			
            .attr("width", d => vis.x(d[1]) - vis.x(d[0]))	

            console.log("bars:",bars);


            

            


            // bars.transition().duration(1000)
            // .attr("x", d => vis.x(d[0]))
            // .attr("y", d => vis.y(d.data.label))
            // .attr("width", d => vis.x(d[1]) - vis.x(d[0]))
            // .attr("height", vis.y.bandwidth())
            
            
            console.log("rects:", rects);

            // rects.exit().remove();
            


            // appending y axis
            vis.yAxisGroup		
                .transition().duration(1000)			
                .call(d3.axisLeft(vis.y));			

            // appending x axis
            vis.xAxisGroup	
                .transition().duration(1000)
                .call(d3.axisBottom(vis.x).ticks(null, "s"))
                


                




    }
}