//d3 Legend
var linear = d3.scale.linear()
  .domain([0,10,20])
  .range(["#542788","#f7f7f7", "#b35806"]);

var svg = d3.select("#legendChart svg");

svg.append("g")
  .attr("class", "legendLinear")
  .attr("transform", "translate(20,20)");

var legendLinear = d3.legend.color()
  .shapeWidth(25)
 .cells(10)
  .orient('horizontal')
.labelFormat(d3.format(".0f"))
  .scale(linear);

svg.select(".legendLinear")
  .call(legendLinear);
//d3 Chart
var margin = { top: 30, right: 30, bottom: 80, left: 30 },
  width = 340 - margin.left - margin.right,
  height = 340 - margin.top - margin.bottom;

//set dek and head to be as wide as SVG
d3.select("#dek").style("width", width + "px");
d3.select("#headline").style("width", width + "px");

//write out your source text here

// set the type of number here, n is a number with a comma, .2% will get you a percent, .2f will get you 2 decimal points
var NumbType = d3.format(".2f");

// color array
var bluescale4 = ["#8073ac", "#8073ac", "#8073ac", "#8073ac"];

//color function pulls from array of colors stored in color.js
var color = d3.scale.ordinal().range(bluescale4);

//define the approx. number of x scale ticks
var xscaleticks = 2;

//defines a function to be used to append the title to the tooltip.  you can set how you want it to display here.
var maketip = function(d) {
  var tip =
    '<p class="tip3">' +
    Math.round(d.value) +
    ' homicides </p> <p class="tip3">' +
    formatDate(d.date) +
    "</p>";
  return tip;
};

//define your year format here, first for the x scale, then if the date is displayed in tooltips
var parseDate = d3.time.format("%m/%d/%y").parse;
var formatDate = d3.time.format("%Y");

//create an SVG
var svg = d3
  .select("#graphic")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// force data to update when menu is changed

var menu2 = d3.select("#menu2 select").on("change", change);
var yearMenu = d3.select("#yearMenu select").on("change", changeYear);
var ageMenu = d3.select("#ageMenu select").on("change", changeAge);
var raceMenu = d3.select("#raceMenu select").on("change", changeRace);
var sexMenu = d3.select("#sexMenu select").on("change", changeSex);
var gunMenu = d3.select("#gunMenu select").on("change", changeGun);

//suck in the data, store it in a value called formatted, run the redraw function
d3.csv(
  "https://gist.githubusercontent.com/JesseCHowe/7483ebc6d27270f0be8291002674c03c/raw/1e44d1b34eda6325953af2f3565e866306ef5247/neighborhood_homicide_linegraph.csv",
  function(data) {
    formatted = data;
    redraw();
  }
);

d3
  .select(window)
  .on("keydown", function() {
    altKey = d3.event.altKey;
  })
  .on("keyup", function() {
    altKey = false;
  });
var altKey;

// set terms of transition that will take place
// when a new economic indicator is chosen

function change() {
    var selectedRegion = $("#sel1").val();

if(selectedRegion != "all"){
  var selectedRegion = $("#sel1").val();
  var yearSelection = $("#yearSelection").val();
  var randomID = Math.random();
  $("#sel1").change(onSelectChange);
  function onSelectChange() {
    // Get selected class from dropdown
    // Highlight the relevant region
    setRegion(selectedRegion);
  }
  var seriestwo = menu2.property("class");
  //var selectthegraphstwo = $(".thegraph").not("#" + selectedRegion + "-line");
  //var selectednotselectedgraph = $("#" + selectedRegion + "-line"); //select all the rest of the lines, except the one you are hovering on and drop their opacity
              	var selectthegraphstwo = $('.thegraph').not('#'+selectedRegion+'-line');
   var selectthegraphstwopath = $('.thegraph').not('#'+selectedRegion+'-line path');
  var selectednotselectedgraphpath =$('#'+selectedRegion+'-line path');
    var selectednotselectedgraph =$('#'+selectedRegion+'-line');//select all the rest of the lines, except the one you are hovering on and drop their opacity
  d3.selectAll(selectthegraphstwo).style("opacity", 1);
  d3.selectAll(selectednotselectedgraph).style("opacity", 1);

  /*map.flyTo({
        center: [
            -94.518 ,
            39.096],
     zoom: 13
    });*/
  var myJson = $.getJSON(
    "https://gist.githubusercontent.com/JesseCHowe/51d5b605c0264e5d43c53d83dcf4a43a/raw/2c136ecb6767dbc449f745a6279f3b21d9fec1ea/kcneighborhoods.json"
  );
  myJson.then(function(data) {
    var featuredata = $("#sel1").val();
    var bbox2 = turf.extent(data.features[featuredata].geometry);
  d3.selectAll(selectthegraphstwo).style("opacity", 1);
    map.fitBounds(bbox2, {
      padding: 100
    });
      map.removeLayer("neighborghoods-click");
      map.addLayer(
    {
      id: "neighborghoods-click",
      type: "line",
      source: "neighborhoods",
      layout: {},
      paint: {
        "line-color": "#ffffff",
        "line-opacity": 1,


      },
      filter: [
      "==",
      "Name",
      data.features[featuredata].properties.Name
    ]
    },
    "waterway-label"
  );
    /*map.addLayer(
      {
        id: "unclustered-points_highlight",
        type: "circle",
        source: "earthquakes",
        paint: {
          "circle-color": "red",
          "circle-radius": 3,
          "circle-opacity": 1
        },
        filter: ["==", "ID", data.features[featuredata].properties.ID]
      },
      "waterway-label"
    );*/


        	d3.selectAll(selectthegraphstwo)
        		.style("visibility",'hidden');
   d3.selectAll(selectthegraphstwopath)
        		.style("stroke","orange");
   d3.selectAll(selectednotselectedgraphpath)
        		.style("stroke","#e08214")
   .style("stroke-width",'3px');
  d3.selectAll(selectednotselectedgraph)
  .style("visibility","visible");
  $("#sel1").change( $("#sel1").val(newset))
  });}  else{
      	d3.selectAll($('.thegraph'))
        	.style("visibility",'visible');
    d3.selectAll($('.thegraph path'))
        	.style("stroke","rgb(128, 115, 172)");
        map.flyTo({
  center: [-94.6, 39.03],
  zoom: 11
    });
      map.removeLayer("neighborghoods-click");

  }
}

function changeYear() {
  $("#ageSelection").val("all");
  $("#raceSelection").val("all");
  $("#sexSelection").val("all");
  $("#gunSelection").val("all");
  $("#sel1").val("all");
  map.removeLayer("unclustered-points-highlight");
  var yearSelection = $("#yearSelection").val();

  var randomID = Math.random();
  map.addSource("heat" + randomID, {
    type: "geojson",
    data:
      "https://gist.githubusercontent.com/JesseCHowe/ccfccd899e3670f31ee24ce18213db9e/raw/fc0c0c993d31a796755ac50270522de0b3b8cb1d/" +
        yearSelection +
        "_Polys.json"
  });
  map.addSource("age" + randomID, {
    type: "geojson",
    data:
 "https://gist.githubusercontent.com/JesseCHowe/99452ec0b7c85dd3aa94325f79781d3d/raw/fcaac66b7f3d9b5070b78c6e3561c05745586c00/" +
        yearSelection +
        "_homicides.json"
  });

  //Layer removed so opacity doesn't compound on new selection
  map.removeLayer("heat");

  map.addLayer(
    {
      id: "heat",
      type: "fill",
      source: "heat" + randomID,
      layout: {},
      paint: {
        "fill-color": {
          property: "DN",
          stops: [
            [0, "rgba(0,0,0,1)"],
            [1, "#542788"],
            [2, "#8073ac"],
            [4, "#b2abd2"],
            [6, "#d8daeb"],
            [8, "#f7f7f7"],
            [10, "#fee0b6"],
            [12, "#fdb863"],
            [14, "#e08214"],
            [16, "#e08214"],
            [18, "#b35806"]
          ]
        },
        "fill-opacity": 0.3
      }
    },
    "neighborghoods-hover"
  );

  var myJson = $.getJSON(
    "https://gist.githubusercontent.com/JesseCHowe/99452ec0b7c85dd3aa94325f79781d3d/raw/27fab7ba18859d9a30bb16283fd38c4deb0273e1/all_homicides.json"
  );
map.removeLayer("unclustered-points");
  myJson.then(function(data) {
    var yearSelection = $("#yearSelection").val();

    map.addLayer(
      {
        id: "unclustered-points",
        type: "circle",
        source: "age" + randomID,
        paint: {
          "circle-color": "#000",
          "circle-radius": 3,
          "circle-opacity": 1
        },

      },
      "waterway-label"
    );
  });
}

function changeAge() {
  $("#raceSelection").val("all");
  $("#sexSelection").val("all");
  $("#gunSelection").val("all");
  map.removeLayer("unclustered-points-highlight");
  var yearSelection = $("#yearSelection").val();
  var ageSelection = $("#ageSelection").val();
  var randomID = Math.random();
  map.addSource("age" + randomID, {
    type: "geojson",
    data:
      "https://gist.githubusercontent.com/JesseCHowe/99452ec0b7c85dd3aa94325f79781d3d/raw/27fab7ba18859d9a30bb16283fd38c4deb0273e1/" +
        yearSelection +
        "_homicides.json"
  });

  map.addLayer(
    {
      id: "unclustered-points-highlight",
      type: "circle",
      source: "age" + randomID,
      paint: {
        "circle-color": "#fff",
        "circle-radius": 3,
        "circle-opacity": 1
      },
      filter: ["==", "ageCat", "" + ageSelection + ""]
    },
    "waterway-label"
  );
}

//Highlights race of victim
function changeRace() {
  $("#ageSelection").val("all");
  $("#sexSelection").val("all");
  $("#gunSelection").val("all");
  map.removeLayer("unclustered-points-highlight");
  var yearSelection = $("#yearSelection").val();
  var raceSelection = $("#raceSelection").val();
  var randomID = Math.random();

  map.addSource("age" + randomID, {
    type: "geojson",
    data:
      "https://gist.githubusercontent.com/JesseCHowe/99452ec0b7c85dd3aa94325f79781d3d/raw/27fab7ba18859d9a30bb16283fd38c4deb0273e1/" +
        yearSelection +
        "_homicides.json"
  });

  map.addLayer(
    {
      id: "unclustered-points-highlight",
      type: "circle",
      source: "age" + randomID,
      paint: {
        "circle-color": "#fff",
        "circle-radius": 3,
        "circle-opacity": 1
      },
      filter: ["==", "raceCat", "" + raceSelection + ""]
    },
    "waterway-label"
  );
}

function changeSex() {
  $("#ageSelection").val("all");
  $("#raceSelection").val("all");
  $("#gunSelection").val("all");
  map.removeLayer("unclustered-points-highlight");
  var yearSelection = $("#yearSelection").val();
  var randomID = Math.random();
  map.addSource("age" + randomID, {
    type: "geojson",
    data:
      "https://gist.githubusercontent.com/JesseCHowe/99452ec0b7c85dd3aa94325f79781d3d/raw/27fab7ba18859d9a30bb16283fd38c4deb0273e1/" +
        yearSelection +
        "_homicides.json"
  });
  var myJson = $.getJSON(
    "https://gist.githubusercontent.com/JesseCHowe/5e914c69f7d6cfdf072fb4d4c5528743/raw/af2752f1b3d6926d193463c6e7a903343ee7aa7e/Homicides.json"
  );
  myJson.then(function(data) {
    var sexSelection = $("#sexSelection").val();
    map.addLayer(
      {
        id: "unclustered-points-highlight",
        type: "circle",
        source: "age" + randomID,
        paint: {
          "circle-color": "#fff",
          "circle-radius": 3,
          "circle-opacity": 1
        },
        filter: ["==", "sexCat", "" + sexSelection + ""]
      },
      "waterway-label"
    );
  });
}

function changeGun() {
  $("#ageSelection").val("all");
  $("#raceSelection").val("all");
  $("#sexSelection").val("all");
  map.removeLayer("unclustered-points-highlight");
  var yearSelection = $("#yearSelection").val();
  var gunSelection = $("#gunSelection").val();
  var randomID = Math.random();
  map.addSource("age" + randomID, {
    type: "geojson",
    data:
      "https://gist.githubusercontent.com/JesseCHowe/99452ec0b7c85dd3aa94325f79781d3d/raw/27fab7ba18859d9a30bb16283fd38c4deb0273e1/" +
        yearSelection +
        "_homicides.json"
  });

  map.addLayer(
    {
      id: "unclustered-points-highlight",
      type: "circle",
      source: "age" + randomID,
      paint: {
        "circle-color": "#fff",
        "circle-radius": 3,
        "circle-opacity": 1
      },
      filter: ["==", "gun", "" + gunSelection + ""]
    },
    "waterway-label"
  );
}
// all the meat goes in the redraw function
function redraw() {
  // create data nests based on economic indicator (series)
  var nested = d3
    .nest()
    .key(function(d) {
      return d.type;
    })
    .map(formatted);

  // get value from menu selection
  // the option values are set in HTML and correspond
  //to the [type] value we used to nest the data
  var series = "val1";

  // only retrieve data from the selected series, using the nest we just created
  var data = nested[series];

  // for object constancy we will need to set "keys", one for each type of data (column name) exclude all others.
  color.domain(
    d3.keys(data[0]).filter(function(key) {
      return key !== "date" && key !== "type";
    })
  );

  var linedata = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {
          name: name,
          date: parseDate(d.date),
          value: parseFloat(d[name], 10)
        };
      })
    };
  });

  //make an empty variable to stash the last values into so i can sort the legend
  var lastvalues = [];

  //setup the x and y scales
  var x = d3.time
    .scale()
    .domain([
      d3.min(linedata, function(c) {
        return d3.min(c.values, function(v) {
          return v.date;
        });
      }),
      d3.max(linedata, function(c) {
        return d3.max(c.values, function(v) {
          return v.date;
        });
      })
    ])
    .range([0, width]);

  var y = d3.scale
    .linear()
    .domain([
      d3.min(linedata, function(c) {
        return d3.min(c.values, function(v) {
          return v.value;
        });
      }),
      d3.max(linedata, function(c) {
        return d3.max(c.values, function(v) {
          return v.value;
        });
      })
    ])
    .range([height, 0]);

  //will draw the line
  var line = d3.svg
    .line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.value);
    });

  //create and draw the x axis
  var xAxis = d3.svg
    .axis()
    .scale(x)
    .orient("bottom")
    .tickPadding(8)
    .ticks(xscaleticks);

  svg.append("svg:g").attr("class", "x axis");

  //create and draw the y axis
  var yAxis = d3.svg
    .axis()
    .scale(y)
    .orient("left")
    .tickSize(0 - width)
    .tickPadding(8);

  svg.append("svg:g").attr("class", "y axis");

  //bind the data
  var thegraph = svg.selectAll(".thegraph").data(linedata);

  //append a g tag for each line and set of tooltip circles and give it a unique ID based on the column name of the data
  var thegraphEnter = thegraph
    .enter()
    .append("g")
    .attr("clip-path", "url(#clip)")
    .attr("class", "thegraph")
    .attr("id", function(d) {
      return d.name + "-line";
    })
    .style("stroke-width", 1)
    .on("mouseover", function(d) {
      d3.select(this); //on mouseover of each line, give it a nice thick stroke

      var getname = document.getElementById(d.name); //use get element cause the ID names have spaces in them
      var selectlegend = $(".legend").not(getname); //grab all the legend items that match the line you are on, except the one you are hovering on

      d3.select(getname).attr("class", "legend-select"); //change the class on the legend name that corresponds to hovered line to be bolder
    })
    .on("mouseout", function(d) {
      //undo everything on the mouseout
      d3.select(this).style("stroke-width", "2.5px");

      var getname = document.getElementById(d.name);
      var getname2 = $('.legend[fakeclass="fakelegend"]');
      var selectlegend = $(".legend").not(getname2).not(getname);

      d3.selectAll(selectlegend).style("opacity", 1);

      d3.select(getname).attr("class", "legend");
    });

  //actually append the line to the graph
  thegraphEnter
    .append("path")
    .attr("id", function(d) {
      return d.name;
    })
    .attr("class", "line")
    .style("stroke", function(d) {
      return color(d.name);
    })
    .attr("d", function(d) {
      return line(d.values[0]);
    })
    .transition()
    .duration(2000)
    .attrTween("d", function(d) {
      var interpolate = d3.scale
        .quantile()
        .domain([0, 1])
        .range(d3.range(1, d.values.length + 1));
      return function(t) {
        return line(d.values.slice(0, interpolate(t)));
      };
    });

  //then append some 'nearly' invisible circles at each data point
  thegraph
    .selectAll("circle")
    .data(function(d) {
      return d.values;
    })
    .enter()
    .append("circle")
    .attr("class", "tipcircle")
    .attr("cx", function(d, i) {
      return x(d.date);
    })
    .attr("cy", function(d, i) {
      return y(d.value);
    })
    .attr("r", 12)
    .style("opacity", 1e-6) //1e-6
    .attr("title", maketip);

  //append the legend
  var legend = svg.selectAll(".legend").data(linedata);

  var legendEnter = legend
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("id", function(d) {
      return d.name;
    })
    .on("click", function(d) {
      //onclick function to toggle off the lines
      if ($(this).css("opacity") == 1) {
        //uses the opacity of the item clicked on to determine whether to turn the line on or off

        var elemented = document.getElementById(this.id + "-line"); //grab the line that has the same ID as this point along w/ "-line"  use get element cause ID has spaces
        d3
          .select(elemented)
          .transition()
          .duration(1000)
          .style("opacity", 0)
          .style("display", "none");

        d3
          .select(this)
          .attr("fakeclass", "fakelegend")
          .transition()
          .duration(1000)
          .style("opacity", 0.2);
      } else {
        var elemented = document.getElementById(this.id + "-line");
        d3
          .select(elemented)
          .style("display", "block")
          .transition()
          .duration(1000)
          .style("opacity", 1);

        d3
          .select(this)
          .attr("fakeclass", "legend")
          .transition()
          .duration(1000)
          .style("opacity", 1);
      }
    });

  //create a scale to pass the legend items through
  var legendscale = d3.scale
    .ordinal()
    .domain(lastvalues)
    .range([0, 30, 60, 90, 120, 150, 180, 210]);

  //actually add the circles to the created legend container
  /*legendEnter
    .append("circle")
    .attr("cx", width + 20)
    .attr("cy", function(d) {
      return legendscale(d.values[d.values.length - 1].value);
    })
    .attr("r", 7)
    .style("fill", function(d) {
      return color(d.name);
    });*/

  //add the legend text
  legendEnter
    .append("text")
    .attr("x", width + 35)
    .attr("y", function(d) {
      return legendscale(d.values[d.values.length - 1].value);
    })
    .text(function(d) {
      return d.name;
    });

  // set variable for updating visualization
  var thegraphUpdate = d3.transition(thegraph);

  // change values of path and then the circles to those of the new series
  thegraphUpdate.select("path").attr("d", function(d, i) {
    //must be a better place to put this, but this works for now
    lastvalues[i] = d.values[d.values.length - 1].value;
    lastvalues.sort(function(a, b) {
      return b - a;
    });
    legendscale.domain(lastvalues);

    return line(d.values);
  });

  thegraphUpdate
    .selectAll("circle")
    .attr("title", maketip)
    .attr("cy", function(d, i) {
      return y(d.value);
    })
    .attr("cx", function(d, i) {
      return x(d.date);
    });

  // and now for legend items
  var legendUpdate = d3.transition(legend);

  legendUpdate.select("circle").attr("cy", function(d, i) {
    return legendscale(d.values[d.values.length - 1].value);
  });

  legendUpdate.select("text").attr("y", function(d) {
    return legendscale(d.values[d.values.length - 1].value);
  });

  // update the axes,
  d3.transition(svg).select(".y.axis").call(yAxis);

  d3
    .transition(svg)
    .select(".x.axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  //make my tooltips work
  $("circle").tipsy({ opacity: 0.9, gravity: "n", html: true });
}

//--------------------------------------------------------

var my_json;
$.getJSON(
  "https://gist.githubusercontent.com/JesseCHowe/d84f4895a1120478f54957a524a41ef0/raw/bc090cf36a795908e31bf102eb53b3c03d6b4cf6/Version1_2009-2017_Homicides_no2013.json",
  function(json) {
    my_json = json;
  }
);
//window.onload=function(){
mapboxgl.accessToken =
  "pk.eyJ1IjoiamVzc2Vob3dlIiwiYSI6Ikh1aXhQS1EifQ.6rFsZELfOthk6dfak3o6lw";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v9",
  center: [-94.6, 39.03],
  zoom: 11
});
/*map.on("load", function() {

  /*map.addLayer({
          'id': 'pins',
          'type': 'symbol',
          'source': 'pins',
          'layout': {
            "icon-image": "marker-15"
          },
          'filter': ['all',['!has', 'point_count']]
        });*/

  /*map.addLayer({
          'id': 'cluster-pins',
          'type': 'circle',
          'source': 'pins',
          'filter': ['all', ['has', 'point_count']],
          'paint': {
            'circle-color': {
              type: 'interval',
              property: "point_count",
              stops: [
                [0, '#51bbd6'],
                [20, '#f1f075'],
                [150, '#f28cb1']
              ]
            },
            'circle-radius': 18
          }
        });*/

  /*map.addLayer({
          'id': 'cluster-pins-count',
          'type': 'symbol',
          'source': 'pins',
          'layout': {
            'text-field': '{point_count}',
            'text-font': [
              'DIN Offc Pro Medium',
              'Arial Unicode MS Bold'
            ],
            'text-size': 12
          }
        });*/


  //setZoomInfoText();
/*});*/





/*var popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});*/

/*map.on("mouseenter", "pins", function(e) {
  // Change the cursor style as a UI indicator.
  map.getCanvas().style.cursor = "pointer";

  // Populate the popup and set its coordinates
  // based on the feature found.
  popup
    .setLngLat(e.features[0].geometry.coordinates)
    .setHTML(e.features[0].properties.Report_No)
    .addTo(map);
});

map.on("mouseleave", "unclustered-points", function() {
  map.getCanvas().style.cursor = "";
  popup.remove();
});*/

map.on("mousemove", "neighborghoods", function(e) {
  map.setFilter("neighborghoods-hover", [
    "==",
    "Name",
    e.features[0].properties.Name
  ]);
});

map.on("load", function() {
  map.addSource("earthquakes", {
    type: "geojson",
    data:
      "https://gist.githubusercontent.com/JesseCHowe/99452ec0b7c85dd3aa94325f79781d3d/raw/fcaac66b7f3d9b5070b78c6e3561c05745586c00/all_homicides.json",
    cluster: true,
    clusterMaxZoom: 22, // Max zoom to cluster points on
    clusterRadius: 10 // Radius of each cluster when clustering points (defaults to 50)
  });
  map.addSource("neighborhoods", {
    type: "geojson",
    data:
      "https://gist.githubusercontent.com/JesseCHowe/51d5b605c0264e5d43c53d83dcf4a43a/raw/2c136ecb6767dbc449f745a6279f3b21d9fec1ea/kcneighborhoods.json"
  });
  map.addSource("heat", {
    type: "geojson",
    data:
      "https://gist.githubusercontent.com/JesseCHowe/ccfccd899e3670f31ee24ce18213db9e/raw/fc0c0c993d31a796755ac50270522de0b3b8cb1d/all_Polys.json"
  });
  map.addLayer(
    {
      id: "heat",
      type: "fill",
      source: "heat",
      layout: {},
      paint: {
        "fill-color": {
          property: "DN",
          stops: [
            [0, "rgba(0,0,0,0)"],
            [1, "#542788"],
            [2, "#8073ac"],
            [4, "#b2abd2"],
            [6, "#d8daeb"],
            [8, "#f7f7f7"],
            [10, "#fee0b6"],
            [12, "#fdb863"],
            [14, "#e08214"],
            [16, "#e08214"],
            [18, "#b35806"]
          ]
        },
        "fill-opacity": 0.3
      }
    },
    "waterway-label"
  );
  map.addLayer(
    {
      id: "neighborghoods",
      type: "fill",
      source: "neighborhoods",
      layout: {},
      paint: {
        "fill-color": "#fff",
        "fill-opacity": 0.05
      }
    },
    "waterway-label"
  );
  map.addLayer(
    {
      id: "neighborghoods-hover",
      type: "fill",
      source: "neighborhoods",
      layout: {},
      paint: {
        "fill-color": "#fff",
        "fill-opacity": 0.4
      },
      filter: ["==", "Name", ""]
    },
    "waterway-label"
  );
  map.addLayer(
    {
      id: "neighborghoods-click",
      type: "line",
      source: "neighborhoods",
      layout: {},
      paint: {
        "line-color": "#ffffff",
        "line-opacity": 1,


      },
      filter: ["==", "Name", ""]
    },
    "waterway-label"
  );

  map.addLayer({
      id: "unclustered-points",
      type: "circle",
      source: "earthquakes",
      paint: {
        "circle-color": "#000",
        "circle-radius": 3,
        "circle-opacity": 1
      },
    },
    "waterway-label"
  );
        //map.on('mousemove', mouseMove);
        //map.on('click', mouseClick);

      /*function mouseClick(e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['unclustered-points']
          }),
          count,
          markers;

        if (!features.length) {
          //remove old spiderfy
          return;
        } else {
          count = features[0].properties.count
          markers = _.map(_.range(count), function(index) {
            return {id: index};
          });
          spiderfier.spiderfy(features[0].geometry.coordinates, markers);
        }
      }*/
  /*map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "earthquakes",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 14,
          "text-anchor": "bottom"

        },
          "paint": {
            "text-color": '#fff',
        },
    });*/
  /*map.addLayer(
    {
      id: "heat2",
      type: "symbol",
      source: "earthquakes",
      filter: ["has", "point_count"],
      layout: {},
      paint: {
        "text-color": {
          property: "[Firearm Us]",
          stops: [["rgba(0,0,0,0)"], ["#ffffff"]]
        },
        "fill-opacity": 0.5
      }
    },
    "waterway-label"
  );*/

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

  /*ap.on("mouseenter", "pins", function(e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = "pointer";

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup
      .setLngLat(e.features[0].geometry.coordinates)
      .setHTML(e.features[0].properties.Report_No)
      .addTo(map);
  });*/
    map.on('mouseenter', 'unclustered-points', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML("<div class='container'><div class='row'><div class='col-xs-6 bord'>"+e.features[0].properties.Name+"</div><div class='col-xs-6 bord'>"+e.features[0].properties.Date+"</div></div><div class='row'><div class='col-xs-4 bord'> Age:"+e.features[0].properties.Age+" </div><div class='col-xs-4 bord'>Sex:"+e.features[0].properties.Sex+"</div><div class='col-xs-4 bord'> Race:"+e.features[0].properties.Race+"</div></div><div class='row'><div class='col-xs-10 bord'>"+e.features[0].properties.Address+"</div><div class='col-xs-2 "+e.features[0].properties.gun+"'><img class='icon icons8-Crime' width='24' height='24' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABMElEQVRIS+2V4U3DQAyFvzcBbEA3oExAmQAxAR2BDSgTICaATgBsABskEwAbtBMYvaiHQGrqkJL84v3JSXf2Z/vsixhJGonDP6h3pb9KFxEvwGlvT+2GlaSTBhQRC+B6AEhxWSkiDoE3wN/BZNAVcDsYYePYoCfgfGBQbdBQTVBiryVNSzNMgAo4SDJbSpqXMxERXktKB/+37f0OXEhyUO7WXiAbH7dk9Ay4xM7GczGPCFfB3fohyeud+l46G7XpRpJnrdEG8ghMgR/lbHNQQA/AZRbVlv01MJG0ymz3GdglsJDke0tlkOt+n5w8k+Q76i2DupTtT0BO/WhXqF3mJEvVGTWzMAYoy+hV0iwLJtvvckd3kvzC76XS3n7Bt/1da2DWZU6yKNLHMHPQdX800CcM23KsRXnKHgAAAABJRU5ErkJggg=='></div></div></div>")
            .addTo(map);
    });
  map.on("mouseleave", "unclustered-points", function() {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });

  map.on("mousemove", "neighborghoods", function(e) {
    map.setFilter("neighborghoods-hover", [
      "==",
      "Name",
      e.features[0].properties.Name
    ]);
            map.getCanvas().style.cursor = 'pointer'; popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(e.features[0].geometry.coordinates)
            .addTo(map);
  });

  // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
  map.on("mouseleave", "neighborghoods", function() {
    map.setFilter("neighborghoods-hover", ["==", "Name", ""]);
  });
});


//}
/*map.on("click", "neighborghoods", function(e) {
  map
    .setFilter("neighborghoods-hover", [
      "==",
      "Name",
      e.features[0].properties.Name
    ])
    .addTo(map);
});*/

map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());

 map.on('click', 'neighborghoods', function(e) {

        // Geographic coordinates of the LineString
        var coordinates = e.features[0].geometry.coordinates;
   console.log(coordinates);
        // Pass the first coordinates in the LineString to `lngLatBounds` &
        // wrap each coordinate pair in `extend` to include them in the bounds
        // result. A variation of this technique could be applied to zooming
        // to the bounds of multiple Points or Polygon geomteries - it just
        // requires wrapping all the coordinates with the extend method.
        /*var bounds = coordinates.reduce(function(bounds, coord) {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));*/
   var bbox = turf.extent(e.features[0].geometry);

        map.fitBounds(bbox, {
            padding: 100
        });
var newset = e.features[0].properties.ID;
          	var selectthegraphstwo = $('.thegraph').not('#'+newset+'-line');
   var selectthegraphstwopath = $('.thegraph').not('#'+newset+'-line path');
  var selectednotselectedgraphpath =$('#'+newset+'-line path');
    var selectednotselectedgraph =$('#'+newset+'-line');//select all the rest of the lines, except the one you are hovering on and drop their opacity

        	d3.selectAll(selectthegraphstwo)
        		.style("visibility",'hidden');
   d3.selectAll(selectthegraphstwopath)
        		.style("stroke","orange");
   d3.selectAll(selectednotselectedgraphpath)
        		.style("stroke","#e08214")
   .style("stroke-width",'3px');
  d3.selectAll(selectednotselectedgraph)
  .style("visibility","visible");
  $("#sel1").change( $("#sel1").val(newset))
    });


//-----------------------------------------------------------

   map.on('click', 'neighborghoods', function (e) {
     //Convoluted System of Focusing on Kansas City
var pont = JSON.stringify(e.lngLat);
     var splitlat = pont.split(':3')[1];
     var splitlon = pont.split(':-')[1];
     var lat = splitlat.substr(0,5);
     var lon = splitlon.substr(0,6);
     var latnum = Number(lat);
     var lonnum = Number(lon);



    });

// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license

(function($) {
  function maybeCall(thing, ctx) {
    return typeof thing == "function" ? thing.call(ctx) : thing;
  }

  // CAUTION the current implementation does not allow for tipsied elements to stay out of DOM (in between events)
  // i.e. don't remove, store, then re-insert tipsied elements (and why would you want to do that anyway?)
  var garbageCollect = (function() {
    var currentInterval;
    var to = null;
    var tipsies = [];

    function _do() {
      for (var i = 0; i < tipsies.length; ) {
        var t = tipsies[i];
        // FIXME? the 2nd (non-paranoid) check is from the link below, it should be replaced if a better way is found
        // http://stackoverflow.com/questions/4040715/check-if-cached-jquery-object-is-still-in-dom
        if (
          t.options.gcInterval === 0 ||
          t.$element.closest("body").length === 0
        ) {
          t.hoverState = "out";
          t.hide();
          tipsies.splice(i, 1);
        } else {
          i++;
        }
      }
    }
    function _loop() {
      to = setTimeout(function() {
        _do();
        _loop();
      }, currentInterval);
    }

    return function(t) {
      if (t.options.gcInterval === 0) return;

      if (to && t.options.gcInterval < currentInterval) {
        clearTimeout(to);
        to = null;
        currentInterval = t.options.gcInterval;
      }
      tipsies.push(t);
      if (!to) _loop();
    };
  })();

  function Tipsy(element, options) {
    this.$element = $(element);
    this.options = options;
    this.enabled = true;
    this.fixTitle();
    garbageCollect(this);
  }

  Tipsy.prototype = {
    show: function() {
      var title = this.getTitle();
      if (title && this.enabled) {
        var $tip = this.tip();

        $tip.find(".tipsy-inner")[this.options.html ? "html" : "text"](title);
        $tip[0].className = "tipsy"; // reset classname in case of dynamic gravity
        $tip
          .remove()
          .css({ top: 0, left: 0, visibility: "hidden", display: "block" })
          .prependTo(document.body);

        var pos = $.extend({}, this.$element.offset(), {
          width: this.$element[0].offsetWidth || 0,
          height: this.$element[0].offsetHeight || 0
        });

        if (typeof this.$element[0].nearestViewportElement == "object") {
          // SVG
          var el = this.$element[0];
          var rect = el.getBoundingClientRect();
          pos.width = rect.width;
          pos.height = rect.height;
        }

        var actualWidth = $tip[0].offsetWidth,
          actualHeight = $tip[0].offsetHeight,
          gravity = maybeCall(this.options.gravity, this.$element[0]);

        var tp;
        switch (gravity.charAt(0)) {
          case "n":
            tp = {
              top: pos.top + pos.height + this.options.offset,
              left: pos.left + pos.width / 2 - actualWidth / 2
            };
            break;
          case "s":
            tp = {
              top: pos.top - actualHeight - this.options.offset,
              left: pos.left + pos.width / 2 - actualWidth / 2
            };
            break;
          case "e":
            tp = {
              top: pos.top + pos.height / 2 - actualHeight / 2,
              left: pos.left - actualWidth - this.options.offset
            };
            break;
          case "w":
            tp = {
              top: pos.top + pos.height / 2 - actualHeight / 2,
              left: pos.left + pos.width + this.options.offset
            };
            break;
        }

        if (gravity.length == 2) {
          if (gravity.charAt(1) == "w") {
            tp.left = pos.left + pos.width / 2 - 15;
          } else {
            tp.left = pos.left + pos.width / 2 - actualWidth + 15;
          }
        }

        $tip.css(tp).addClass("tipsy-" + gravity);
        $tip.find(".tipsy-arrow")[0].className =
          "tipsy-arrow tipsy-arrow-" + gravity.charAt(0);
        if (this.options.className) {
          $tip.addClass(maybeCall(this.options.className, this.$element[0]));
        }

        if (this.options.fade) {
          $tip
            .stop()
            .css({ opacity: 0, display: "block", visibility: "visible" })
            .animate({ opacity: this.options.opacity });
        } else {
          $tip.css({ visibility: "visible", opacity: this.options.opacity });
        }

        var t = this;
        var set_hovered = function(set_hover) {
          return function() {
            t.$tip.stop();
            t.tipHovered = set_hover;
            if (!set_hover) {
              if (t.options.delayOut === 0 && t.options.trigger != "manual") {
                t.hide();
              } else {
                setTimeout(function() {
                  if (t.hoverState == "out") t.hide();
                }, t.options.delayOut);
              }
            }
          };
        };
        $tip.hover(set_hovered(true), set_hovered(false));
      }
    },

    hide: function() {
      if (this.options.fade) {
        this.tip().stop().fadeOut(function() {
          $(this).remove();
        });
      } else {
        this.tip().remove();
      }
    },

    fixTitle: function() {
      var $e = this.$element;

      if ($e.attr("title") || typeof $e.attr("original-title") != "string") {
        $e.attr("original-title", $e.attr("title") || "").removeAttr("title");
      }
      if (typeof $e.context.nearestViewportElement == "object") {
        if ($e.children("title").length) {
          $e
            .append(
              "<original-title>" +
                ($e.children("title").text() || "") +
                "</original-title>"
            )
            .children("title")
            .remove();
        }
      }
    },

    getTitle: function() {
      var title,
        $e = this.$element,
        o = this.options;
      this.fixTitle();

      if (typeof o.title == "string") {
        var title_name = o.title == "title" ? "original-title" : o.title;
        if ($e.children(title_name).length) {
          title = $e.children(title_name).html();
        } else {
          title = $e.attr(title_name);
          if (typeof title == "undefined") title = "";
        }
      } else if (typeof o.title == "function") {
        title = o.title.call($e[0]);
      }
      title = ("" + title).replace(/(^\s*|\s*$)/, "");
      return title || o.fallback;
    },

    tip: function() {
      if (!this.$tip) {
        this.$tip = $('<div class="tipsy"></div>').html(
          '<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'
        );
      }
      return this.$tip;
    },

    validate: function() {
      if (!this.$element[0].parentNode) {
        this.hide();
        this.$element = null;
        this.options = null;
      }
    },

    enable: function() {
      this.enabled = true;
    },
    disable: function() {
      this.enabled = false;
    },
    toggleEnabled: function() {
      this.enabled = !this.enabled;
    }
  };

  $.fn.tipsy = function(options) {
    if (options === true) {
      return this.data("tipsy");
    } else if (typeof options == "string") {
      $(this).each(function(i, el) {
        if ($(el).data("tipsy")) {
          tipsy = $(el).data("tipsy");
          tipsy[options]();
        }
      });
      return this;
    }

    options = $.extend({}, $.fn.tipsy.defaults, options);

    if (options.hoverlock && options.delayOut === 0) {
      options.delayOut = 100;
    }

    function get(ele) {
      var tipsy = $.data(ele, "tipsy");
      if (!tipsy) {
        tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
        $.data(ele, "tipsy", tipsy);
      }
      return tipsy;
    }

    function enter() {
      var tipsy = get(this);
      tipsy.hoverState = "in";
      if (options.delayIn === 0) {
        tipsy.show();
      } else {
        tipsy.fixTitle();
        setTimeout(function() {
          if (tipsy.hoverState == "in") tipsy.show();
        }, options.delayIn);
      }
    }

    function leave() {
      var tipsy = get(this);
      tipsy.hoverState = "out";
      if (options.delayOut === 0) {
        tipsy.hide();
      } else {
        var to = function() {
          if (!tipsy.tipHovered || !options.hoverlock) {
            if (tipsy.hoverState == "out") tipsy.hide();
          }
        };
        setTimeout(to, options.delayOut);
      }
    }

    if (!options.live)
      this.each(function() {
        get(this);
      });

    if (options.trigger != "manual") {
      var binder = options.live ? "live" : "bind",
        eventIn = options.trigger == "hover" ? "mouseenter" : "focus",
        eventOut = options.trigger == "hover" ? "mouseleave" : "blur";
      this[binder](eventIn, enter)[binder](eventOut, leave);
    }

    return this;
  };

  $.fn.tipsy.defaults = {
    className: null,
    delayIn: 0,
    delayOut: 0,
    fade: false,
    fallback: "",
    gcInterval: 0,
    gravity: "n",
    html: false,
    live: false,
    offset: 0,
    opacity: 0.8,
    title: "title",
    trigger: "hover",
    hoverlock: false
  };

  // Overwrite this method to provide options on a per-element basis.
  // For example, you could store the gravity in a 'tipsy-gravity' attribute:
  // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
  // (remember - do not modify 'options' in place!)
  $.fn.tipsy.elementOptions = function(ele, options) {
    return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
  };

  $.fn.tipsy.autoNS = function() {
    return $(this).offset().top >
      $(document).scrollTop() + $(window).height() / 2
      ? "s"
      : "n";
  };

  $.fn.tipsy.autoWE = function() {
    return $(this).offset().left >
      $(document).scrollLeft() + $(window).width() / 2
      ? "e"
      : "w";
  };

  /**
     * yields a closure of the supplied parameters, producing a function that takes
     * no arguments and is suitable for use as an autogravity function like so:
     *
     * @param margin (int) - distance from the viewable region edge that an
     *        element should be before setting its tooltip's gravity to be away
     *        from that edge.
     * @param prefer (string, e.g. 'n', 'sw', 'w') - the direction to prefer
     *        if there are no viewable region edges effecting the tooltip's
     *        gravity. It will try to vary from this minimally, for example,
     *        if 'sw' is preferred and an element is near the right viewable
     *        region edge, but not the top edge, it will set the gravity for
     *        that element's tooltip to be 'se', preserving the southern
     *        component.
     */
  $.fn.tipsy.autoBounds = function(margin, prefer) {
    return function() {
      var dir = { ns: prefer[0], ew: prefer.length > 1 ? prefer[1] : false },
        boundTop = $(document).scrollTop() + margin,
        boundLeft = $(document).scrollLeft() + margin,
        $this = $(this);

      if ($this.offset().top < boundTop) dir.ns = "n";
      if ($this.offset().left < boundLeft) dir.ew = "w";
      if (
        $(window).width() + $(document).scrollLeft() - $this.offset().left <
        margin
      )
        dir.ew = "e";
      if (
        $(window).height() + $(document).scrollTop() - $this.offset().top <
        margin
      )
        dir.ns = "s";

      return dir.ns + (dir.ew ? dir.ew : "");
    };
  };
})(jQuery);

var asmargin = {top: 80, right: 20, bottom: 20, left: 100},
    aswidth = 660 - asmargin.left - asmargin.right,
    asheight = 400 - asmargin.top - asmargin.bottom;

var asy = d3.scale.ordinal()
    .rangeRoundBands([0, asheight], .3);

var asx = d3.scale.linear()
    .rangeRound([0, aswidth]);

var asxAxis = d3.svg.axis()
    .scale(asx)
    .tickFormat(d3.format(",%"))
    .orient("top");

var asyAxis = d3.svg.axis()
    .scale(asy)
    .tickSize(0)
    .orient("left");

var ascolor = d3.scale.ordinal()
    .range(["#9c83b9","#7855a1","542788","#b35806","#c27b3c","#d19f71"]);

var assvg = d3.select('#agesex svg').append("svg")
    .attr("width", aswidth + asmargin.left + asmargin.right)
    .attr("height", asheight + asmargin.top + asmargin.bottom)
  .append("g")
    .attr("transform", "translate(" + asmargin.left + "," + asmargin.top + ")");

d3.csv("https://gist.githubusercontent.com/JesseCHowe/94f74d35b99820c67667f4910a77de42/raw/c203ba296a71288f885a9322d6ed8ec0078fc02e/agesexchart.csv", function(error, data) {

  var rateNames = d3.keys(data[0]).filter(function(key) { return key !== "rows"; });
  var rowsNames = data.map(function(d) { return d.rows; });
  var neutralIndex = Math.floor(rateNames.length/2);

 ascolor.domain(['MHispanic','MBlack','MWhite','FWhite','FBlack','FHispanic']);

  data.forEach(function(row) {
    row.total = d3.sum(rateNames.map(function(name) { return +row[name]; }));
    rateNames.forEach(function(name) { row['relative'+name] = (row.total !==0 ? +row[name]/row.total : 0); });

    var x0 = -1 * d3.sum(rateNames.map(function(name,i) { return i < neutralIndex ? +row['relative'+name] : 0; }));
    if (rateNames.length & 1) x0 += -1 * row['relative' + rateNames[neutralIndex] ]/2;
    var idx = 0;

    row.boxes = rateNames.map(function(name) {
      return {name: name, x0: x0, x1: x0 += row['relative'+name], total: row.total, absolute: row[name]};
    });
  });

  var min = d3.min(data, function(d) { return d.boxes["0"].x0; });
  var max = d3.max(data, function(d) { return d.boxes[d.boxes.length-1].x1; });

  asx.domain([min, max]).nice();
  asy.domain(rowsNames);

  assvg.append("g")
     .attr("class", "x axis")
     .call(asxAxis);

  assvg.append("g")
     .attr("class", "y axis")
     .call(asyAxis);

  var rows = assvg.selectAll(".row")
      .data(data)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(0," + asy(d.rows) + ")"; })
      .on("mouseover", function(d) {
        assvg.selectAll('.y').selectAll('text').filter(function(text) { return text===d.rows; })
            .transition().duration(100).style('font','15px sans-serif');
      })
      .on("mouseout", function(d) {
        assvg.selectAll('.y').selectAll('text').filter(function(text) { return text===d.rows; })
            .transition().duration(100).style('font','10px sans-serif');
      });

  var bars = rows.selectAll("rect")
      .data(function(d) { return d.boxes; })
      .enter().append("g");

  bars.append("rect")
      .attr("height", asy.rangeBand())
      .attr("x", function(d) { return asx(d.x0); })
      .attr("width", function(d) { return asx(d.x1) - asx(d.x0); })
      .style("fill", function(d) { return ascolor(d.name); });

  bars.append("text")
    .attr("x", function(d) { return asx(d.x0); })
    .attr("y", asy.rangeBand()/2)
    .attr("dy", "0.5em")
    .attr("dx", "0.5em")
  .style("fill",'#000')
    .style("text-anchor", "begin")
    .text(function(d) { return d.absolute !== 0 && (d.x1-d.x0)>0.04 ? d.absolute : "" });

  assvg.append("g")
      .attr("class", "y axis")
    .append("line")
      .attr("x1", asx(0))
      .attr("x2", asx(0))
      .attr("y2", height);

  var legend = assvg.selectAll(".legend")
      .data(rateNames)
    .enter().append("g")
      .attr("class", "legendtwo")
      .attr("transform", function(d, i) { return "translate(" + aswidth/rateNames.length * i + ",-55)"; });

  legend.append("rect")
        .attr("x", 0)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", ascolor);

  legend.append("text")
        .attr("x", 22)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "begin")
        .text(function(d) { return d; });

});

// Set the dimensions of the canvas / graph
var	trend_margin = {top: 30, right: 20, bottom: 30, left: 30},
	trend_width = 1000 - trend_margin.left - trend_margin.right,
	trend_height = 200 - trend_margin.top - trend_margin.bottom;

// Parse the date / time
var	trend_parseDate = d3.time.format("%m/%d/%Y").parse;
var trend_formatTime = d3.time.format("%Y");// Format tooltip date / time

// Set the ranges
var	trend_x = d3.time.scale().range([0, trend_width]);
var	trend_y = d3.scale.linear().range([trend_height, 0]);

// Define the axes
var	trend_xAxis = d3.svg.axis().scale(trend_x)
	.orient("bottom").ticks(5);

var	trend_yAxis = d3.svg.axis().scale(trend_y)
	.orient("left").ticks(5);

var trend_line = d3.svg.line()
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); });

// Define the line
var	trend_valueline = d3.svg.line()
	.x(function(d) { return trend_x(d.date); })
	.y(function(d) { return trend_y(d.close); });

// Define 'div' for tooltips
var trend_div = d3.select("body")
	.append("div")  // declare the tooltip div
	.attr("class", "tooltip")              // apply the 'tooltip' class
	.style("opacity", 0);                  // set the opacity to nil

// Adds the svg canvas
var	trend_svg = d3.select("#trend svg")
	.append("svg")
		.attr("width", trend_width + trend_margin.left + trend_margin.right)
		.attr("height", trend_height + trend_margin.top + trend_margin.bottom)
	.append("g")
		.attr("transform",
		      "translate(" + trend_margin.left + "," + trend_margin.top + ")");

// Get the data
//d3.csv("data.csv", function(error, data) {

var trend_data = [
{date: "01/01/2016", close: 126},
{date: "01/01/2015", close: 110},
{date: "01/01/2014",close: 82},
{date: "01/01/2013",close:100},
{date: "01/01/2012",close:106},
{date: "01/01/2011",close:111},
{date: "01/01/2010",close:102},
{date: "01/01/2009",close:100},
{date: "01/01/2008",close:126},
{date: "01/01/2007",close:94},
{date: "01/01/2006",close:115},
{date: "01/01/2005",close:127},
{date: "01/01/2004", close: 91},
{date: "01/01/2003", close: 82},
{date: "01/01/2002",close: 84},
{date: "01/01/2001",close:104},
{date: "01/01/2000",close:111},
{date: "01/01/1999",close:116},
{date: "01/01/1998",close:130},
{date: "01/01/1997",close:100},
{date: "01/01/1996",close:106},
{date: "01/01/1995",close:107},
{date: "01/01/1994",close:142},
{date: "01/01/1993",close:153},
{date: "01/01/1992",close:152},
{date: "01/01/1991",close:135},
{date: "01/01/1990",close:121},
{date: "01/01/1989",close:140},
{date: "01/01/1988",close:136},
{date: "01/01/1987",close:131},
{date: "01/01/1986",close:116},
{date: "01/01/1985",close:91},
{date: "01/01/1984", close: 89},
{date: "01/01/1983", close: 106},
{date: "01/01/1982",close: 94},
{date: "01/01/1981",close:114},
{date: "01/01/1980",close:139},
{date: "01/01/1979",close:119},
{date: "01/01/1978",close:120},
{date: "01/01/1977",close:101},
{date: "01/01/1976",close:105},
{date: "01/01/1975",close:117},
{date: "01/01/1974",close:115},
{date: "01/01/1973", close: 90},
{date: "01/01/1972",close: 77},
{date: "01/01/1971",close:115},
{date: "01/01/1970",close:134},
{date: "01/01/1969",close:116},
{date: "01/01/1968",close:99},
{date: "01/01/1967",close:66},
{date: "01/01/1966",close:70},
{date: "01/01/1965",close:77},
{date: "01/01/1964",close:55},
{date: "01/01/1963", close: 67},
{date: "01/01/1962",close: 53},
{date: "01/01/1961",close:52},
{date: "01/01/1960",close:40}];



	trend_data.forEach(function(d) {
		d.date = trend_parseDate(d.date);
		d.close = +d.close;
	});

	// Scale the range of the data
	trend_x.domain(d3.extent(trend_data, function(d) { return d.date; }));
	trend_y.domain([0, d3.max(trend_data, function(d) { return d.close; })]);

	// Add the valueline path.
	trend_svg.append("path")
		.attr("class", "line")
		.attr("d", trend_valueline(trend_data));

	// draw the scatterplot

	trend_svg.selectAll("dot")
		.data(trend_data)
	.enter().append("circle")
		.attr("r", 2)
.attr("fill", "rgb(100,100,100)")
		.attr("cx", function(d) { return trend_x(d.date); })
		.attr("cy", function(d) { return trend_y(d.close); })
	// Tooltip stuff after this
	    .on("mouseover", function(d) {
            trend_div.transition()
				.duration(500)
				.style("opacity", 0);
			trend_div.transition()
				.duration(200)
				.style("opacity", .9);
			trend_div	.html(
				'<p>' + // The first <a> tag
				trend_formatTime(d.date) +
				                         // closing </a> tag
				"<br/>"  + d.close)
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
			});

	// Add the X Axis
	trend_svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + trend_height + ")")
		.call(trend_xAxis);

	// Add the Y Axis
	trend_svg.append("g")
		.attr("class", "y axis")
		.call(trend_yAxis);


function make_y_axis() {
    return d3.svg.axis()
        .scale(trend_y)
        .orient("left")
        .ticks(5)
}


    trend_svg.append("g")
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-trend_width, 0, 0)
            .tickFormat("")
        )

//});
