function drawScatterplot(data, x, y, c, boxModel, innerPadding, r, alpha){

        // filter: array distinct 
        function onlyUnique(value, index, self) { 
            return self.indexOf(value) === index;
        }

        // create species array to map colors
        var species = [];

        data.forEach(element => {
            species.push(element[c]);
        });

        var species = species.filter(onlyUnique);

        // calculate max and min of x and y for scaling
        var xMin = d3.min(data, function(d){
            return d[x];
        });

        var xMax = d3.max(data, function(d){
            return d[x];
        });

        var yMin = d3.min(data, function(d){
            return d[y];
        });

        var yMax = d3.max(data, function(d){
            return d[y];
        });

        // define space between axes and data (as CoefDiff% of the range)
        var xDiff = xMax - xMin;
        var yDiff = yMax - yMin;

        
        var axisXPadding = xDiff*(innerPadding/100);
        var axisYPadding = yDiff*(innerPadding/100);

        // define x and y ranges
        var minXRange = boxModel.margin.left + boxModel.padding.left;

        var maxXRange = boxModel.w - boxModel.margin.right - boxModel.padding.right;
        
        var minYRange = boxModel.h - boxModel.margin.bottom - boxModel.padding.bottom;
        
        var maxYRange = boxModel.margin.top + boxModel.padding.top;

        // create scale
        var xScale = d3.scaleLinear().domain([xMin-axisXPadding, xMax+axisXPadding])
                .range([minXRange, maxXRange]);

        var yScale = d3.scaleLinear().domain([yMin-axisYPadding, yMax+axisYPadding])
                .range([minYRange, maxYRange]);

        // create axes
        var xAxis = d3.axisBottom(xScale);
        
        var yAxis = d3.axisLeft(yScale);

        // color array for species
        var c10 = d3.schemeCategory10;

        // create SVG Element
        var svg = d3.select("body").append("svg")
        .attr("width", boxModel.w)
        .attr("height", boxModel.h)
        .append("g")
        .attr("transform", "translate(" + boxModel.margin.left + "," + boxModel.margin.top + ")");

        // add circles elements
        var circles = svg.selectAll("circle")
            .data(data)
            .enter()
            .append('circle');
        
        // attr for circles
        circles.attr("cx", function(d){
           return xScale(d[x]);
       })
        .attr("cy", function(d){
            return yScale(d[y]);
        })
        .attr("fill", function(d){
            return c10[species.indexOf(d.species)];
        })
        .attr("r", r)
        .attr("opacity", alpha);

        // add x axis
        svg.append("g")
            .attr("class", "axis")
            .call(xAxis)
            .attr("transform", "translate(0," + (boxModel.h - boxModel.margin.bottom - boxModel.padding.bottom) + ")");
        
        // add y axis
        svg.append("g")
            .attr("class", "axis")
            .call(yAxis)
            .attr("transform", "translate(" + (boxModel.margin.left) + ", 0)");

    }