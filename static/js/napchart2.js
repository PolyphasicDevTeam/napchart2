var width = 800,
    height = 500,
    radius = (Math.min(width, height) / 2),
    pi = Math.PI * 2;

var ring = [],
    n_ring = 0,
    border_ring = [],
    extreme_ring = null;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


var rings = svg.selectAll(".ring"),
    border_rings = svg.selectAll(".border_ring"),
    extreme_rings = svg.selectAll(".extreme_ring");



/*==========*/


function set_extreme_ring(){
    if (n_ring == 1){
	extreme_ring = d3.svg.arc()
	    .startAngle(0)
	    .endAngle(pi)
	    .innerRadius(radius * 0.6)
	    .outerRadius(radius * 0.9);
    }else if (n_ring != 0) {
	extreme_ring = d3.svg.arc()
	    .startAngle(0)
	    .endAngle(pi)
	    .innerRadius(radius * 0.3)
	    .outerRadius(radius * 0.9)
    }
}

function set_border_ring(){
    border_ring.length = 0;
    if (n_ring != 1){
	for (var i = 0 ; i < n_ring ; i++){
	    let delta = 0.6 / n_ring
	    let arc = d3.svg.arc()
		.startAngle(0)
		.endAngle(pi)
		.innerRadius(radius * (0.3 + (i * delta)))
		.outerRadius(radius * (0.3 + ((i+1) * delta)));
	    border_ring.push(arc)
	}
    }
}

function set_ring(){
    /*     ring.length = 0;
     *     if (n_ring == 1){
     * 	let arc = d3.svg.arc()
     * 		    .startAngle(0)
     * 		    .endAngle(pi)
     * 		    .innerRadius(radius * (0.6 + 0.015))
     * 		    .outerRadius(radius * (0.9 - 0.015));
     * 	ring.push(arc)
     * 
     *     } else {
     * 	for (var i = 0 ; i < n_ring ; i++){
     * 	    let delta = 0.6 / n_ring
     * 	    let arc = d3.svg.arc()
     * 			.startAngle(0)
     * 			.endAngle(pi)
     * 			.innerRadius(radius * ((0.3 + 0.015 + (i * delta))))
     * 			.outerRadius(radius * ((0.3 - 0.015 + ((i+1) * delta))));
     * 	    ring.push(arc)
     * 	}
     *     }*/
} 

function update_ring(){
    rings[0].forEach(function(d){
	d.remove();
    });
    rings[0].length = 0;
    rings = rings.data(ring);
    rings.enter()
	.append("path")
	.attr("class","ring")
	.attr("d", function(d){
	    return d()
	});
}
function update_border_ring(){
    border_rings[0].forEach(function(d){
	d.remove();
    });
    border_rings[0].length = 0;
    border_rings = border_rings.data(border_ring);
    border_rings.enter()
	.append("path")
	.attr("class","border_ring")
	.attr("d", function(d){
	    return d()
	});
}

function update_extreme_ring(){
    extreme_rings[0].forEach(function(d){
	d.remove();
    });
    extreme_rings[0].length = 0;
    extreme_rings = extreme_rings.data([extreme_ring]);
    extreme_rings.enter()
	.append("path")
	.attr("class","extreme_ring")
	.attr("d", function(d){
	    return d()
	});
}

function update_rings(){
    update_ring();
    update_border_ring();
    update_extreme_ring();
}

function change_ring(){
    set_extreme_ring();
    set_border_ring();
    set_ring();
    update_rings(); 
}

function inc_ring(){
    if (n_ring < 6){
	n_ring++;
    }
    change_ring();
}

function dec_ring(){
    if (n_ring > 0){
	n_ring--;
    }
    change_ring();
}

inc_ring();



/* let arc = d3.svg.arc()
 * 	    .startAngle(0)
 * 	    .endAngle((6/24) * pi)
 * 	    .innerRadius(radius * 0.6)
 * 	    .outerRadius(radius * 0.9);
 * 
 * svg.append("path")
 *    .attr("class","ring")
 *    .attr("d",arc);
 * 
 * 
 * let arc2 = d3.svg.arc()
 * 	    .startAngle(0.5 * pi)
 * 	    .endAngle((18/24) * pi)
 * 	    .innerRadius(radius * 0.6)
 * 	    .outerRadius(radius * 0.9);
 * 
 * svg.append("path")
 *    .attr("class","ring")
 *    .attr("d",arc2); */
