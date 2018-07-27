var width = 800,
    height = 500,
    radius = (Math.min(width, height) / 2),
    pi = Math.PI * 2;

var ring = [],
    n_ring = 0,
    border_ring = [],
    extreme_ring = null;

var event = [],
    n_event = 0;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


var border_rings = svg.selectAll(".border_ring"),
    extreme_rings = svg.selectAll(".extreme_ring");

var events = svg.selectAll(".events");


/*==========*/

function to_h(n){
    return n * pi;
}


function h_n_m(h,m){
    return (h + (m/60));
}

/*==========*/


function set_extreme_ring(){
    extreme_ring = d3.svg.arc()
	.startAngle(0)
	.endAngle(pi)
	.innerRadius(ring[0].inner)
	.outerRadius(ring[n_ring-1].outer);

}

function set_border_ring(){
    border_ring.length = 0;
    if (n_ring != 1){
	for (var i = 0 ; i < n_ring ; i++){
    	    let arc = d3.svg.arc()
    		.startAngle(0)
    		.endAngle(pi)
    		.innerRadius(ring[i].inner)
    		.outerRadius(ring[i].outer);
    	    border_ring.push(arc)
    	}
    }
}

function set_ring(start, endAngle){
    ring.length = 0;
    if (n_ring == 1){
	let inner = (radius * 0.6);
	let outer = (radius * 0.9);
	ring.push({"inner": inner, "outer": outer});
    }else if (n_ring != 0) {
	for (var i = 0 ; i < n_ring ; i++){
	    let delta = 0.6 / n_ring;
	    let inner = (radius * (0.3 + (i * delta)));
	    let outer = (radius * (0.3 + ((i+1) * delta)));
	    ring.push({"inner": inner, "outer": outer});
	}
    }
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
    update_border_ring();
    update_extreme_ring();
    update_events();
}

function change_ring(){
    set_ring();
    set_extreme_ring();
    set_border_ring();
    update_rings(); 
}

function inc_ring(){
    if (n_ring < 6){
	n_ring++;
	change_ring();
    }
}

function dec_ring(){
    if (n_ring > 1){
	n_ring--;
	change_ring();
    }
}

inc_ring();



/*================*/

function d_radius(){
    return 0.01 * radius;
}

function create_event(start, end, lane){
    if ((lane >= 0) && (lane < n_ring)){
	let arc = {
	    "arc": d3.svg.arc()
		.startAngle(to_h(start/24))
		.endAngle(to_h(end/24))
		.innerRadius(ring[lane].inner * 1.02) 
		.outerRadius(ring[lane].outer * 0.98),
	    "start": start,
	    "end": end,
	    "lane": lane
	};
	return arc
    }
}

function add_event(start, end, lane){
    let arc = create_event(start, end, lane);
    if (typeof arc != undefined){
	event.push(arc)
    }
}


function update_event(){
    event = event.map(function(d){
	return create_event(d.start, d.end, d.lane);
    })
}

function add_events(){
    events = events.data(event);
    events.enter()
	.append("path")
	.attr("class","event")
	.attr("d", function(d){
	    return d.arc()
	});
}


function update_events(){
    update_event();
    events[0].forEach(function(d){
	d.remove();
    });
    events[0].length = 0;
    events = events.data(event);
    events.enter()
	.append("path")
	.attr("class","event")
	.attr("d", function(d){
	    return d.arc()
	});
}

function add_e3(){
    add_event(21,24,0); // core
    add_event(h_n_m(4,10),h_n_m(4,30),0); // nap 1
    add_event(h_n_m(8,10),h_n_m(8,30),0); // nap 2
    add_event(h_n_m(14,40),15,0); // nap 3
    add_events();
}

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
