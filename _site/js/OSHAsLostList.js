/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 *
 * Organization and style inspired by:
 * https://bost.ocks.org/mike/chart/
 *
 */
function bubbleChart() {
  // Constants for sizing
  var width = 1200;
  var height = 1050;

  // tooltip for mouseover functionality
  var tooltip = floatingTooltip('gates_tooltip', 240);

  // Locations to move bubbles towards, depending
  // on which view mode is selected.
  var center = {
    x: width / 2,
    y: height / 2.95
  };

  var yearCenters = {
    safety: {
      x: width / 1.5,
      y: height / 2
    },
    health: {
      x: width / 3,
      y: height / 2
    }
  };

  var unionCenters = {
    union: {
      x: width / 1.5,
      y: height / 2
    },
    nonunion: {
      x: width / 3,
      y: height / 2
    }
  };

  var yearTwoCenters = {
    aass: {
      x: 200,
      y: 180
    },
    agari: {
      x: 400,
      y: 180
    },
    bmageasd: {
      x: 600,
      y: 180
    },
    cm: {
      x: 800,
      y: 180
    },
    cob: {
      x: 1000,
      y: 180
    },
    eeaacm: {
      x: 100,
      y: 300
    },
    fmpm: {
      x: 200,
      y: 660
    },
    fabs: {
      x: 500,
      y: 320
    },
    fm: {
      x: 700,
      y: 300
    },
    farpm: {
      x: 900,
      y: 300
    },
    gms: {
      x: 1100,
      y: 300
    },
    hacec: {
      x: 100,
      y: 450
    },
    mm: {
      x: 300,
      y: 450
    },
    mwdg: {
      x: 500,
      y: 450
    },
    mmtwo: {
      x: 700,
      y: 450
    },
    nr: {
      x: 900,
      y: 450
    },
    pm: {
      x: 1100,
      y: 450
    },
    pt: {
      x: 300,
      y: 330
    },
    parpm: {
      x: 400,
      y: 660
    },
    ps: {
      x: 600,
      y: 660
    },
    pmm: {
      x: 800,
      y: 660
    },
    rm: {
      x: 1000,
      y: 660
    },
    stc: {
      x: 200,
      y: 900
    },
    safm: {
      x: 400,
      y: 900
    },
    saft: {
      x: 600,
      y: 900
    },
    tem: {
      x: 800,
      y: 900
    },
    wmars: {
      x: 1000,
      y: 900
    }
  };

  var states = {
    AL: {
      x: 140,
      y: 200
    },
    AR: {
      x: 300,
      y: 200
    },
    AZ: {
      x: 500,
      y: 200
    },
    CA: {
      x: 700,
      y: 200
    },
    CT: {
      x: 900,
      y: 200
    },
    DE: {
      x: 1050,
      y: 200
    },
    FL: {
      x: 150,
      y: 400
    },
    GA: {
      x: 350,
      y: 400
    },
    IL: {
      x: 900,
      y: 380
    },
    KS: {
      x: 700,
      y: 400
    },
    LA: {
      x: 500,
      y: 400
    },

    MA: {
      x: 1050,
      y: 400
    },
    MD: {
      x: 140,
      y: 610
    },
    MO: {
      x: 330,
      y: 610
    },
    NJ: {
      x: 500,
      y: 610
    },
    NV: {
      x: 700,
      y: 610
    },
    NY: {
      x: 900,
      y: 610
    },
    OH: {
      x: 1050,
      y: 610
    },
    PA: {
      x: 130,
      y: 850
    },
    RI: {
      x: 320,
      y: 850
    },
    TX: {
      x: 500,
      y: 850
    },
    VI: {
      x: 700,
      y: 850
    },
    WI: {
      x: 900,
      y: 850
    },
    WV: {
      x: 1050,
      y: 830
    }

  };

  var emphasis = {
    Amputate: {
      x: 200,
      y: 310
    },
    Chemnep: {
      x: 400,
      y: 270
    },
    Chrome6: {
      x: 600,
      y: 250
    },
    Dustexpl: {
      x: 800,
      y: 250
    },
    Lead: {
      x: 1000,
      y: 270
    },
    none: {
      x: -5000,
      y: 220
    },
    Silica: {
      x: 400,
      y: 520
    },
    Svep: {
      x: 600,
      y: 520
    },
    Trench: {
      x: 800,
      y: 550
    }
  };
  // X locations of the year titles.
  var yearsTitleX = {
    Safety: width / 1.5,
    Health: width / 3,

  };

  var unionTitleX = {
    union: width / 1.5,
    nonunion: width / 3,

  };

  var emphasisdata = [{
    label: "Amputation",
    x: 200,
    y: 150
  }, {
    label: "Hazardous chemicals  greater than threshold",
    x: 400,
    y: 150
  }, {
    label: " Exposure to  hexavalent chromium",
    x: 600,
    y: 150
  }, {
    label: "Dust explosions",
    x: 800,
    y: 150
  }, {
    label: "Exposure to lead",
    x: 1000,
    y: 150
  }, {
    label: "Exposure to  crystalline silica",
    x: 400,
    y: 450
  }, {
    label: "Severe Violator  Enforcement Program*",
    x: 600,
    y: 450
  }, {
    label: "*Demonstrated indifference to their OSHA obligations by willful, repeated,  or failure-to-abate violations.",
    x: 600,
    y: 650
  }, {
    label: "Trench/ excavations  (in relation to collapses)",
    x: 800,
    y: 450
  }];
  var emphasisnumdata = [{
    label: "$1,465,355",
    x: 200,
    y: 190
  }, {
    label: "$173,832",
    x: 400,
    y: 210
  }, {
    label: "$63,375",
    x: 600,
    y: 210
  }, {
    label: "$42,772",
    x: 800,
    y: 190
  }, {
    label: "$245,923",
    x: 1000,
    y: 190
  }, {
    label: "$42,779",
    x: 400,
    y: 510
  }, {
    label: "$42,773",
    x: 600,
    y: 510
  }, {
    label: "$128,312",
    x: 800,
    y: 510
  }];
  var unionnumdata = [{
    label: "$5,818,604",
    x: width / 3,
    y: 170
  }, {
    label: "$852,061",
    x: width / 1.5,
    y: 170
  }];
  var safetynumdata = [{
    label: "$1,959,914",
    x: width / 3,
    y: 170
  }, {
    label: "$4,808,719",
    x: width / 1.5,
    y: 170
  }];
  var statedata = [{
    label: "Alabama",
    x: 100,
    y: 50
  }, {
    label: "Arkansas",
    x: 300,
    y: 50
  }, {
    label: "Arizona",
    x: 500,
    y: 50
  }, {
    label: "California",
    x: 700,
    y: 50
  }, {
    label: "Connecticut",
    x: 900,
    y: 50
  }, {
    label: "Delaware",
    x: 1100,
    y: 50
  }, {
    label: "Florida",
    x: 100,
    y: 250
  }, {
    label: "Georgia",
    x: 300,
    y: 250
  }, {
    label: "Illinois",
    x: 900,
    y: 250
  }, {
    label: "Kansas",
    x: 700,
    y: 250
  }, {
    label: "Louisiana",
    x: 500,
    y: 250
  }, {
    label: "Massachusetts",
    x: 1100,
    y: 250
  }, {
    label: "Maryland",
    x: 100,
    y: 500
  }, {
    label: "Missouri",
    x: 300,
    y: 500
  }, {
    label: "New Jersey",
    x: 500,
    y: 500
  }, {
    label: "Nevada",
    x: 700,
    y: 500
  }, {
    label: "New York",
    x: 900,
    y: 500
  }, {
    label: "Ohio",
    x: 1100,
    y: 500
  }, {
    label: "Pennsylvania",
    x: 100,
    y: 750
  }, {
    label: "Rhode Island",
    x: 300,
    y: 750
  }, {
    label: "Texas",
    x: 500,
    y: 750
  }, {
    label: "Virginia",
    x: 700,
    y: 750
  }, {
    label: "Wisconsin",
    x: 900,
    y: 750
  }, {
    label: "West Virginia",
    x: 1100,
    y: 750
  }];
  var statenumdata = [{
    label: "$122,220",
    x: 100,
    y: 50
  }, {
    label: "$63,374",
    x: 300,
    y: 50
  }, {
    label: "$231,773",
    x: 500,
    y: 50
  }, {
    label: "$143,385",
    x: 700,
    y: 50
  }, {
    label: "$68,321",
    x: 900,
    y: 50
  }, {
    label: "$199,541",
    x: 1100,
    y: 50
  }, {
    label: "$353,558",
    x: 100,
    y: 250
  }, {
    label: "$550,119",
    x: 300,
    y: 250
  }, {
    label: "$1,118,840",
    x: 900,
    y: 250
  }, {
    label: "$44,003",
    x: 700,
    y: 250
  }, {
    label: "$46,900",
    x: 500,
    y: 250
  }, {
    label: "$55,770",
    x: 1100,
    y: 250
  }, {
    label: "$99,594",
    x: 100,
    y: 500
  }, {
    label: "$76,050",
    x: 300,
    y: 500
  }, {
    label: "$63,1922",
    x: 500,
    y: 500
  }, {
    label: "$60,000",
    x: 700,
    y: 500
  }, {
    label: "$384,426",
    x: 900,
    y: 500
  }, {
    label: "$718,451",
    x: 1100,
    y: 500
  }, {
    label: "$25,223",
    x: 100,
    y: 750
  }, {
    label: "$54,976",
    x: 300,
    y: 750
  }, {
    label: "$1,095,207",
    x: 500,
    y: 750
  }, {
    label: "$51,400",
    x: 700,
    y: 750
  }, {
    label: "$207,146",
    x: 900,
    y: 750
  }, {
    label: "$139,426",
    x: 1100,
    y: 750
  }];

  var data = [{
    label: "Administrative and  Support Services",
    x: 200,
    y: 50
  }, {
    label: "Amusement, Gambling,  and Recreation Industries",
    x: 400,
    y: 50
  }, {
    label: "Building Material and  Garden Equipment and  Supplies Dealers",
    x: 600,
    y: 50
  }, {
    label: "Chemical Manufacturing",
    x: 800,
    y: 50
  }, {
    label: "Construction of Buildings",
    x: 1000,
    y: 50
  }, {
    label: "Electrical Equipment, Appliance,  and Component Manufacturing",
    x: 100,
    y: 200
  }, {
    label: "Fabricated Metal  Product Manufacturing",
    x: 200,
    y: 500
  }, {
    label: "Food and  Beverage Stores",
    x: 500,
    y: 200
  }, {
    label: "Food Manufacturing",
    x: 700,
    y: 200
  }, {
    label: "Furniture and Related  Product Manufacturing",
    x: 900,
    y: 200
  }, {
    label: "General Merchandise Stores",
    x: 1100,
    y: 200
  }, {
    label: "Heavy and  Civil Engineering Construction",
    x: 100,
    y: 350
  }, {
    label: "Machinery Manufacturing",
    x: 300,
    y: 350
  }, {
    label: "Merchant Wholesalers,  Durable Goods",
    x: 500,
    y: 350
  }, {
    label: "Miscellaneous  Manufacturing",
    x: 700,
    y: 350
  }, {
    label: "Nonstore Retailers",
    x: 900,
    y: 350
  }, {
    label: "Paper Manufacturing",
    x: 1100,
    y: 350
  }, {
    label: "Pipeline Transportation",
    x: 300,
    y: 200
  }, {
    label: "Plastics and Rubber  Products Manufacturing",
    x: 400,
    y: 500
  }, {
    label: "Postal Service",
    x: 600,
    y: 500
  }, {
    label: "Primary Metal  Manufacturing",
    x: 800,
    y: 500
  }, {
    label: "Repair and  Maintenance",
    x: 1000,
    y: 500
  }, {
    label: "Specialty Trade  Contractors",
    x: 200,
    y: 750
  }, {
    label: "Support Activities  for Mining",
    x: 400,
    y: 750
  }, {
    label: "Support Activities  or Transportation",
    x: 600,
    y: 750
  }, {
    label: "Transportation Equipment  Manufacturing",
    x: 800,
    y: 750
  }, {
    label: "Waste Management  and Remediation Services",
    x: 1000,
    y: 750
  }];
  var datanum = [{
    label: "$45,270",
    x: 200,
    y: 60
  }, {
    label: "$50,700",
    x: 400,
    y: 60
  }, {
    label: "$76,050",
    x: 600,
    y: 80
  }, {
    label: "$157,713",
    x: 800,
    y: 40
  }, {
    label: "$141,238",
    x: 1000,
    y: 40
  }, {
    label: "$46,899",
    x: 100,
    y: 210
  }, {
    label: "$705,051",
    x: 200,
    y: 510
  }, {
    label: "$209,933",
    x: 500,
    y: 210
  }, {
    label: "$160,792",
    x: 700,
    y: 190
  }, {
    label: "$142,815",
    x: 900,
    y: 210
  }, {
    label: "$74,240",
    x: 1100,
    y: 190
  }, {
    label: "$161,388",
    x: 100,
    y: 360
  }, {
    label: "$173,058",
    x: 300,
    y: 340
  }, {
    label: "$48,167",
    x: 500,
    y: 360
  }, {
    label: "$49,435",
    x: 700,
    y: 360
  }, {
    label: "$57,040",
    x: 900,
    y: 340
  }, {
    label: "$142,144",
    x: 1100,
    y: 340
  }, {
    label: "$152,099",
    x: 300,
    y: 200
  }, {
    label: "$527,390",
    x: 400,
    y: 510
  }, {
    label: "$338,650",
    x: 600,
    y: 490
  }, {
    label: "$133,381",
    x: 800,
    y: 510
  }, {
    label: "$438,177",
    x: 1000,
    y: 510
  }, {
    label: "$1,846,592",
    x: 200,
    y: 760
  }, {
    label: "$70,619",
    x: 400,
    y: 760
  }, {
    label: "$125,301",
    x: 600,
    y: 760
  }, {
    label: "$178,173",
    x: 800,
    y: 760
  }, {
    label: "$418,350",
    x: 1000,
    y: 760
  }];
  // @v4 strength to apply to the position forces
  var forceStrength = 0.03;

  // These will be set in create_nodes and create_vis
  var svg = null;
  var bubbles = null;
  var nodes = [];

  // Charge function that is called for each node.
  // As part of the ManyBody force.
  // This is what creates the repulsion between nodes.
  //
  // Charge is proportional to the diameter of the
  // circle (which is stored in the radius attribute
  // of the circle's associated data.
  //
  // This is done to allow for accurate collision
  // detection with nodes of different sizes.
  //
  // Charge is negative because we want nodes to repel.
  // @v4 Before the charge was a stand-alone attribute
  //  of the force layout. Now we can use it as a separate force!
  function charge(d) {
    return -Math.pow(d.radius, 2.0) * forceStrength;
  }

  // Here we create a force layout and
  // @v4 We create a force simulation now and
  //  add forces to it.
  var simulation = d3.forceSimulation()
    .velocityDecay(0.2)
    .force('x', d3.forceX().strength(forceStrength).x(center.x))
    .force('y', d3.forceY().strength(forceStrength).y(center.y))
    .force('charge', d3.forceManyBody().strength(charge))
    .on('tick', ticked);

  // @v4 Force starts up automatically,
  //  which we don't want as there aren't any nodes yet.
  simulation.stop();

  // Nice looking colors - no reason to buck the trend
  // @v4 scales now have a flattened naming scheme
  var fillColor = d3.scaleOrdinal()
    .domain([])
    .range(['#a2727e', '#ffe56a', '#f7b883', '#ec8080', '#b6afd2']);

  /*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
  function createNodes(rawData) {
    // Use the max total_amount in the data as the max in the scale's domain
    // note we have to ensure the total_amount is a number.
    var maxAmount = d3.max(rawData, function(d) {
      return +d.Initial_Penalty_num;
    });

    // Sizes bubbles based on area.
    // @v4: new flattened scale names.
    var radiusScale = d3.scalePow()
      .exponent(0.5)
      .range([42000, 500000])
      .domain([42000, maxAmount]);

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
    var myNodes = rawData.map(function(d) {
      return {
        id: d.id,
        radius: radiusScale(+d.Initial_Penalty_num) * 0.00015,
        value: +d.Initial_Penalty_num,
        name: d.Establishment_Name,
        safety: d.ltwo,
        states: d.State,
        City: d.City,
        State: d.State,
        type: d.Inspection_Type,
        office: d.Office,
        open: d.Open_Date,
        close: d.Close_Date,
        scope: d.Scope,
        status: d.Case_Status,
        emphasis: d.Emphasis_N,
        union: d.ustat,
        year: d.test,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
    });

    // sort them to prevent occlusion of smaller nodes.
    myNodes.sort(function(a, b) {
      return b.value - a.value;
    });

    return myNodes;
  }

  /*
   * Main entry point to the bubble chart. This function is returned
   * by the parent closure. It prepares the rawData for visualization
   * and adds an svg element to the provided selector and starts the
   * visualization creation process.
   *
   * selector is expected to be a DOM element or CSS selector that
   * points to the parent element of the bubble chart. Inside this
   * element, the code will add the SVG continer for the visualization.
   *
   * rawData is expected to be an array of data objects as provided by
   * a d3 loading function like d3.csv.
   */
  var chart = function chart(selector, rawData) {
    // convert raw data into nodes data
    nodes = createNodes(rawData);

    // Create a SVG element inside the provided selector
    // with desired size.
    svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Bind nodes data to what will become DOM elements to represent them.
    bubbles = svg.selectAll('.bubble')
      .data(nodes, function(d) {
        return d.id;
      });

    // Create new circle elements each with class `bubble`.
    // There will be one circle.bubble for each object in the nodes array.
    // Initially, their radius (r attribute) will be 0.
    // @v4 Selections are immutable, so lets capture the
    //  enter selection to apply our transtition to below.
    var bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', function(d) {
        return fillColor(d.status);
      })
      .attr('stroke', function(d) {
        return d3.rgb(fillColor(d.status)).darker();
      })
      .attr('stroke-width', 2)

    .on('mouseover', showDetail)
      .on('mouseout', hideDetail);

    // @v4 Merge the original empty selection and the enter selection
    bubbles = bubbles.merge(bubblesE);

    // Fancy transition to make bubbles appear, ending with the
    // correct radius
    bubbles.transition()
      .duration(2000)
      .attr('r', function(d) {
        return d.radius;
      });

    // Set the simulation's nodes to our newly created nodes array.
    // @v4 Once we set the nodes, the simulation will start running automatically!
    simulation.nodes(nodes);

    // Set initial layout to single group.
    groupBubbles();
  };

  /*
   * Callback function that is called after every tick of the
   * force simulation.
   * Here we do the acutal repositioning of the SVG circles
   * based on the current x and y values of their bound node data.
   * These x and y values are modified by the force simulation.
   */
  function ticked() {
    bubbles
      .attr('cx', function(d) {
        return d.x;
      })
      .attr('cy', function(d) {
        return d.y;
      });
  }

  /*
   * Provides a x value for each node to be used with the split by year
   * x force.
   */
  function nodeYearPos(d) {
    return yearCenters[d.year].x;
  }

  function nodeYearPosY(d) {
    return yearCenters[d.year].y;
  }

  function nodeYearTwoPos(d) {
    return yearTwoCenters[d.safety].x;
  }

  function nodeYearTwoPosY(d) {
    return yearTwoCenters[d.safety].y;
  }

  function nodeYearThreePos(d) {
    return unionCenters[d.union].x;
  }

  function nodeYearThreePosY(d) {
    return unionCenters[d.union].y;
  }

  function nodeYearFourPos(d) {
    return states[d.states].x;
  }

  function nodeYearFourPosY(d) {
    return states[d.states].y;
  }

  function nodeYearFivePos(d) {
    return emphasis[d.emphasis].x;
  }

  function nodeYearFivePosY(d) {
    return emphasis[d.emphasis].y;
  }

  /*
   * Sets visualization in "single group mode".
   * The year labels are hidden and the force layout
   * tick function is set to move all nodes to the
   * center of the visualization.
   */
  function groupBubbles() {
    hideYearTitles();
    showAllTitles();
    hideCategoryTitles();
    drawLegend();
    hideStateTitles();
    hideUnionTitles();
    hideEmphasisTitles();
    showChartDesc();
    // @v4 Reset the 'x' force to draw the bubbles to the center.
    simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
    simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  /*
   * Sets visualization in "split by year mode".
   * The year labels are shown and the force layout
   * tick function is set to move nodes to the
   * yearCenter of their data's year.
   */
  function splitBubbles() {
    showYearTitles();
    hideAllTitles();
    hideCategoryTitles();
    hideStateTitles();
    hideUnionTitles();
    hideEmphasisTitles();
    hidedescTitles();
    // @v4 Reset the 'x' force to draw the bubbles to their year centers
    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeYearPos));
    simulation.force('y', d3.forceY().strength(forceStrength).y(nodeYearPosY));
    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  function splitTwoBubbles() {
    showCategoryTitles();
    hideAllTitles();
    hideYearTitles();
    hideStateTitles();
    hideUnionTitles();
    hideEmphasisTitles();
    hidedescTitles();
    // @v4 Reset the 'x' force to draw the bubbles to their year centers
    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeYearTwoPos));
    simulation.force('y', d3.forceY().strength(forceStrength).y(nodeYearTwoPosY));
    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  function splitUnionBubbles() {
    hideCategoryTitles();
    hideAllTitles();
    hideYearTitles();
    hideStateTitles();
    showUnionTitles();
    hidedescTitles();
    hideEmphasisTitles();
    // @v4 Reset the 'x' force to draw the bubbles to their year centers
    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeYearThreePos));
    simulation.force('y', d3.forceY().strength(forceStrength).y(nodeYearThreePosY));
    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  function splitStateBubbles() {
    hideCategoryTitles();
    hideAllTitles();
    hideYearTitles();
    showStateTitles();
    hideUnionTitles();
    hidedescTitles();
    hideEmphasisTitles();
    // @v4 Reset the 'x' force to draw the bubbles to their year centers
    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeYearFourPos));
    simulation.force('y', d3.forceY().strength(forceStrength).y(nodeYearFourPosY));
    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  function splitEmphasisBubbles() {
    hideCategoryTitles();
    hideYearTitles();
    hideAllTitles();
    hideStateTitles();
    hideUnionTitles();
    hidedescTitles();
    showEmphasisTitles();
    // @v4 Reset the 'x' force to draw the bubbles to their year centers
    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeYearFivePos));
    simulation.force('y', d3.forceY().strength(forceStrength).y(nodeYearFivePosY));
    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }
  /*
   * Hides Year title displays.
   */
  function hideYearTitles() {
    svg.selectAll('.year').remove();
    svg.selectAll('.safetynum').remove();
  }

  function hidedescTitles() {
    svg.selectAll().remove();
    svg.selectAll('.dec').remove();

  }

  function hideUnionTitles() {
    svg.selectAll('.union').remove();
    svg.selectAll('.unionnum').remove();
  }

  function hideCategoryTitles() {
    svg.selectAll('.category').remove();
    svg.selectAll('.categorynum').remove();
  }

  function hideStateTitles() {
    svg.selectAll('.state').remove();
    svg.selectAll('.statenum').remove();
  }

  function hideEmphasisTitles() {
    svg.selectAll('.emphasis').remove();
    svg.selectAll('.emphasisnum').remove();
  }

  function hideAllTitles() {
    svg.selectAll('.all').remove();
    svg.selectAll('.allnum').remove();
    svg.selectAll('g').remove();
  }
  /*
   * Shows Year title displays.
   */
  function showYearTitles() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var yearsData = d3.keys(yearsTitleX);
    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year')
      .attr('x', function(d) {
        return yearsTitleX[d];
      })

    .attr('y', 140)
      .attr('text-anchor', 'middle')
      .text(function(d) {
        return d;
      });

    var category = svg.selectAll('.safetynum')
      .data(safetynumdata);

    category.enter().append('text')
      .attr('class', 'safetynum')
      .attr('x', function(d) {
        return d.x;
      })
      .attr('y', function(d) {
        return d.y;
      })
      .attr('text-anchor', 'middle')

    .each(function(d) {
      var arr = d.label.split("  ");
      for (i = 0; i < arr.length; i++) {
        d3.select(this).append("tspan")
          .text(arr[i])
          .attr("dy", i ? "1.2em" : 0)
          .attr("x", d.x)
          .attr("text-anchor", "middle")
          .attr("class", "tspan" + i);
      }

    });
  }

  function showUnionTitles() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var unionData = d3.keys(unionTitleX);
    var years = svg.selectAll('.union')
      .data(unionData);

    years.enter().append('text')
      .attr('class', 'union')
      .attr('x', function(d) {
        return unionTitleX[d];
      })

    .attr('y', 140)
      .attr('text-anchor', 'middle')
      .text(function(d) {
        return d;
      });

    var categoryData = d3.keys(unionnumdata);
    var category = svg.selectAll('.unionnum')
      .data(unionnumdata);

    category.enter().append('text')
      .attr('class', 'unionnum')
      .attr('x', function(d) {
        return d.x;
      })
      .attr('y', function(d) {
        return d.y;
      })
      .attr('text-anchor', 'middle')

    .each(function(d) {
      var arr = d.label.split("  ");
      for (i = 0; i < arr.length; i++) {
        d3.select(this).append("tspan")
          .text(arr[i])
          .attr("dy", i ? "1.2em" : 0)
          .attr("x", d.x)
          .attr("text-anchor", "middle")
          .attr("class", "tspan" + i);
      }

    });

  }

  function showChartDesc() {
    var legend = svg.append("g"),
      legW = 40;

    legend.append('circle')
      .attr("cx", 1100)
      .attr("cy", 380)
      .attr("r", 80)
      .style("stroke-dasharray", "5")
      .style("fill", 'none').style("stroke", 'black');
    legend.append('circle')
      .attr("cx", 1100)
      .attr("cy", 410)
      .attr("r", 50)
      .style("stroke-dasharray", "5")
      .style("fill", 'none').style("stroke", 'black');
    legend.append('circle')
      .attr("cx", 1100)
      .attr("cy", 440)
      .attr("r", 20)
      .style("stroke-dasharray", "5")
      .style("fill", 'none').style("stroke", 'black');
    legend.append('line')
      .style("stroke", "black")
      .attr("x1", 1000)
      .attr("y1", 300)
      .attr("x2", 1100)
      .attr("y2", 300);
    legend.append('line')
      .style("stroke", "black")
      .attr("x1", 1000)
      .attr("y1", 420)
      .attr("x2", 1100)
      .attr("y2", 420);

    var myText = svg.append("text")
      .attr("y", 425) //magic number here
      .attr("x", 950)
      .attr('text-anchor', 'middle')
      .attr("class", "dec") //easy to style with CSS
      .text("$80,000");
    var myText = svg.append("text")
      .attr("y", 305) //magic number here
      .attr("x", 950)
      .attr('text-anchor', 'middle')
      .attr("class", "dec") //easy to style with CSS
      .text("$200,000");
    var myText = svg.append("text")
      .attr("y", 235) //magic number here
      .attr("x", 1000)
      .attr('text-anchor', 'middle')
      .attr("class", "dec") //easy to style with CSS
      .text("Circles sized according to proposed penalty");
  }

  function showStateTitles() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var categoryData = d3.keys(statedata);
    var category = svg.selectAll('.state')
      .data(statedata);

    category.enter().append('text')
      .attr('class', 'state')
      .attr('x', function(d) {
        return d.x;
      })
      .attr('y', function(d) {
        return d.y;
      })
      .attr('text-anchor', 'middle')

    .each(function(d) {
      var arr = d.label.split("  ");
      for (i = 0; i < arr.length; i++) {
        d3.select(this).append("tspan")
          .text(arr[i])
          .attr("dy", i ? "1.2em" : 0)
          .attr("x", d.x)
          .attr("text-anchor", "middle")
          .attr("class", "tspan" + i);
      }

    });
    var categoryDatatwo = d3.keys(statenumdata);
    var categorytwo = svg.selectAll('.statenum')
      .data(statenumdata);

    categorytwo.enter().append('text')
      .attr('class', 'statenum')
      .attr('x', function(d) {
        return d.x;
      })
      .attr('y', function(d) {
        return d.y + 30;
      })
      .attr('text-anchor', 'middle')

    .each(function(d) {
      var arr = d.label.split("  ");
      for (i = 0; i < arr.length; i++) {
        d3.select(this).append("tspan")
          .text(arr[i])
          .attr("dy", i ? "1.2em" : 0)
          .attr("x", d.x)
          .attr("text-anchor", "middle")
          .attr("class", "tspan" + i);
      }

    });

  }

  function showEmphasisTitles() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var categoryData = d3.keys(emphasisdata);
    var category = svg.selectAll('.emphasis')
      .data(emphasisdata);

    category.enter().append('text')
      .attr('class', 'emphasis')
      .attr('x', function(d) {
        return d.x;
      })
      .attr('y', function(d) {
        return d.y;
      })
      .attr('text-anchor', 'middle')

    .each(function(d) {
      var arr = d.label.split("  ");
      for (i = 0; i < arr.length; i++) {
        d3.select(this).append("tspan")
          .text(arr[i])
          .attr("dy", i ? "1.2em" : 0)
          .attr("x", d.x)
          .attr("text-anchor", "middle")
          .attr("class", "tspan" + i);
      }
    });
    var categorynumData = d3.keys(emphasisnumdata);
    var categorynum = svg.selectAll('.emphasisnum')
      .data(emphasisnumdata);

    categorynum.enter().append('text')
      .attr('class', 'emphasisnum')
      .attr('x', function(d) {
        return d.x;
      })
      .attr('y', function(d) {
        return d.y;
      })
      .attr('text-anchor', 'middle')

    .each(function(d) {
      var arr = d.label.split("  ");
      for (i = 0; i < arr.length; i++) {
        d3.select(this).append("tspan")
          .text(arr[i])
          .attr("dy", i ? "1.2em" : 0)
          .attr("x", d.x)
          .attr("text-anchor", "middle")
          .attr("class", "tspan" + i);
      }
    });

  }

  function showCategoryTitles() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var categoryData = d3.keys(data);
    var category = svg.selectAll('.category')
      .data(data);

    category.enter().append('text')
      .attr('class', 'category')
      .attr('x', function(d) {
        return d.x;
      })
      .attr('y', function(d) {
        return d.y;
      })
      .attr('text-anchor', 'middle')

    .each(function(d) {
      var arr = d.label.split("  ");
      for (i = 0; i < arr.length; i++) {
        d3.select(this).append("tspan")
          .text(arr[i])
          .attr("dy", i ? "1.2em" : 0)
          .attr("x", d.x)
          .attr("text-anchor", "middle")
          .attr("class", "tspan" + i);
      }
    });;
  var categorynumData = d3.keys(datanum);
    var categorynum = svg.selectAll('.categorynum')
      .data(datanum);

    categorynum.enter().append('text')
      .attr('class', 'categorynum')
      .attr('x', function(d) {
        return d.x;
      })
      .attr('y', function(d) {
        return d.y +30;
      })
      .attr('text-anchor', 'middle')

    .each(function(d) {
      var arr = d.label.split("  ");
      for (i = 0; i < arr.length; i++) {
        d3.select(this).append("tspan")
          .text(arr[i])
          .attr("dy", i ? "1.2em" : 0)
          .attr("x", d.x)
          .attr("text-anchor", "middle")
          .attr("class", "tspan" + i);
      }
    });;
  }

  function showAllTitles() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.

    svg.append('text')
      .attr('class', 'all')
      .attr('x', width / 2)

    .attr('y', 40)
      .attr('text-anchor', 'middle')
      .html('From January 18th to February 14th OSHA has issued ');

    svg.append('text')
      .attr('class', 'allnum')
      .attr('x', width / 2)

    .attr('y', 82.5)
      .attr('text-anchor', 'middle')
      .text('$6,768,633');

    svg.append('text')
      .attr('class', 'all')
      .attr('x', width / 2)

    .attr('y', 110)
      .attr('text-anchor', 'middle')
      .text('in proposed penalties');

  }

  function drawLegend() {
    var legend = svg.append("g"),
      legW = 40;

    legend.selectAll('rect')
      .attr('class', 'all')
      .data(fillColor.range())
      .enter()
      .append('rect')
      .attr('width', legW)
      .attr('x', 10)
      .attr('y', function(d, i) {
        return (i + 5.7) * legW;
      })
      .attr('height', 20)
      .style('fill', function(d) {
        return d;
      });

    legend.selectAll('text')
      .data(fillColor.domain())
      .enter()
      .append('text')
      .attr('x', 55)
      .attr('y', function(d, i) {
        return (i + 6.10) * legW;
      })
      .text(function(d) {
        return d;
      })
      .style('fill', 'black')
      .style('font-size', 18)
      .style('stroke', 'none');
  }
  /*
   * Function called on mouseover to display the
   * details of a bubble in the tooltip.
   */
  function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr('stroke', 'black');

    var content = '<div><p>' + d.type + '</p><p class="name">' + d.name + '</p>' +
      '<p>' +
      d.City + ', ' + d.State +
      '</p>' +
      '<p class="amount" style="color:' + d3.rgb(fillColor(d.status)) + ';">$' +
      addCommas(d.value) +
      '</p>' +
      '</div>' + '<div class="half"><p>Opened: ' + d.open + '</br>Closed: ' + d.close + '</p></div>' + '<div class="half"><p>Scope: ' + d.scope + '</p></div>';

    tooltip.showTooltip(content, d3.event);
  }

  /*
   * Hides tooltip
   */
  function hideDetail(d) {
    // reset outline
    d3.select(this)
      .attr('stroke', d3.rgb(fillColor(d.status)).darker());

    tooltip.hideTooltip();
  }

  /*
   * Externally accessible function (this is attached to the
   * returned chart function). Allows the visualization to toggle
   * between "single group" and "split by year" modes.
   *
   * displayName is expected to be a string and either 'year' or 'all'.
   */
  chart.toggleDisplay = function(displayName) {
    if (displayName === 'year') {
      splitBubbles();
    } else if (displayName === 'totals') {
      splitTwoBubbles();
    } else if (displayName === 'union') {
      splitUnionBubbles();
    } else if (displayName === 'state') {
      splitStateBubbles();
    } else if (displayName === 'emphasis') {
      splitEmphasisBubbles();
    } else {
      groupBubbles();
    }
  };

  // return the chart function from closure.
  return chart;
}

/*
 * Below is the initialization code as well as some helper functions
 * to create a new bubble chart instance, load the data, and display it.
 */

var myBubbleChart = bubbleChart();

/*
 * Function called once data is loaded from CSV.
 * Calls bubble chart function to display inside #vis div.
 */
function display(error, data) {
  if (error) {
    console.log(error);
  }

  myBubbleChart('#vis', data);
}

/*
 * Sets up the layout buttons to allow for toggling between view modes.
 */
function setupButtons() {
  d3.select('#toolbar')
    .selectAll('.button')
    .on('click', function() {
      // Remove active class from all buttons
      d3.selectAll('.button').classed('active', false);
      // Find the button just clicked
      var button = d3.select(this);

      // Set it as the active button
      button.classed('active', true);

      // Get the id of the button
      var buttonId = button.attr('id');

      // Toggle the bubble chart based on
      // the currently clicked button.
      myBubbleChart.toggleDisplay(buttonId);
    });
}

/*
 * Helper function to convert a number into a string
 * and add commas to it to improve presentation.
 */
function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}

// Load the data.
d3.csv('https://gist.githubusercontent.com/JesseCHowe/02bc608cbd7fe47a4a78741b8dde04df/raw/84d586cd1be3a63d82fe589c010a8958a618cd8e/OSHA.csv', display);

// setup the buttons.
setupButtons();

/*
 * Creates tooltip with provided id that
 * floats on top of visualization.
 * Most styling is expected to come from CSS
 * so check out bubble_chart.css for more details.
 */
function floatingTooltip(tooltipId, width) {
  // Local variable to hold tooltip div for
  // manipulation in other functions.
  var tt = d3.select('#tooltip_contain')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', tooltipId)
    .style('pointer-events', 'none');

  // Set a width if it is provided.
  if (width) {
    tt.style('width', width);
  }

  // Initially it is hidden.
  hideTooltip();

  /*
   * Display tooltip with provided content.
   *
   * content is expected to be HTML string.
   *
   * event is d3.event for positioning.
   */
  function showTooltip(content, event) {
    tt.style('opacity', 1)
      .html(content);

    updatePosition(event);
  }

  /*
   * Hide the tooltip div.
   */
  function hideTooltip() {
    tt.style('opacity', 0.0);
  }

  /*
   * Figure out where to place the tooltip
   * based on d3 mouse event.
   */
  function updatePosition(event) {
    var xOffset = 20;
    var yOffset = 30;

    var ttw = tt.style('width');
    var tth = tt.style('height');

    var wscrY = window.scrollY;
    var wscrX = window.scrollX;

    var curX = (document.all) ? event.clientX + wscrX : event.pageX;
    var curY = (document.all) ? event.clientY + wscrY : event.pageY;
    var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > window.innerWidth) ?
      curX - ttw - xOffset * 2 : curX + xOffset;

    if (ttleft < wscrX + xOffset) {
      ttleft = wscrX + xOffset;
    }

    var tttop = ((curY - wscrY + yOffset * 2 + tth) > window.innerHeight) ?
      curY - tth - yOffset * 2 : curY + yOffset;

    if (tttop < wscrY + yOffset) {
      tttop = curY + yOffset;
    }

    tt
      .style('top', tttop + 'px')
      .style('left', ttleft + 'px');
  }

  return {
    showTooltip: showTooltip,
    hideTooltip: hideTooltip,
    updatePosition: updatePosition
  };

}

var obama_margin = {top: 20, right: 20, bottom: 30, left: 50},
    obama_width = 700 - obama_margin.left - obama_margin.right,
    obama_height = 260 - obama_margin.top - obama_margin.bottom;

  var obama_tooltip = d3.select(".obama").append("div")
    .attr("class", "obama_tooltip")
    .style("opacity", 0);
// parse the date / time
var obama_parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var obama_x = d3.scaleTime().range([0, obama_width]);
var obama_y = d3.scaleLinear().range([obama_height, 0]);
  var obama_r = d3.scaleLinear().range([obama_height, 256562]);
// define the line
var obama_valueline = d3.line()
    .x(function(d) { return obama_x(d.date); })
    .y(function(d) { return obama_y(d.close); });

  var obama_color = d3.scaleOrdinal().range(['blue','gray','red']);
// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var obama_svg = d3.select(".obama").append("svg")
    .attr("width", obama_width + obama_margin.left + obama_margin.right)
    .attr("height", obama_height + obama_margin.top + obama_margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + obama_margin.left + "," + obama_margin.top + ")");

// Get the data
d3.csv("https://gist.githubusercontent.com/JesseCHowe/f32ba6040eb1a23682477e92b1c41484/raw/d068bb9ebdf12bba9e5eb7725897d7edb556cbb1/obamas100.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.date = obama_parseTime(d.date);
      d.close = +d.proposed_penalties;
    	d.penalties = +d.proposed_penalties;
    d.who = d.who;
  });

  // Scale the range of the data
  obama_x.domain(d3.extent(data, function(d) { return d.date; }));
  obama_y.domain([0, d3.max(data, function(d) { return d.close; })]);
    obama_r.domain([0, d3.max(data, function(d) { return d.close; })]);
  // Add the valueline path.


  // Add the scatterplot
  obama_svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r",function(d) { return obama_r(d.penalties)/3000; })
      .attr("cx", function(d) { return obama_x(d.date); })
  .style("fill", function(d) {
        return obama_color(d.who);
      })
  .attr('stroke', 'black')
  .attr('opacity',0.5)
      .attr("cy", 100)
         /*.on("mouseover", function(d) {
           d3.select(this)
      	  .transition()
      	  .duration(1000)
      	  .style('stroke','black')
     .attr('stroke-width',2);
          obama_tooltip.transition()
               .duration(200)
               .style("opacity", 1);
          obama_tooltip.html('<div><p>'+ d.date+'</p><p>'+ d.title +'</p><p>proposed penalties: $'+d.proposed_penalties+'<div>')
     .style("left", (d3.event.pageX) + "px")
     .style("top", (d3.event.pageY + 30) + "px");
      })
    .on('mouseout',function () {
       d3.select(this)
      	  .transition()
      	  .duration(1000)
      	  .style('stroke','none');
      })*/;

  // Add the X Axis
  obama_svg.append("g")
      .attr("transform", "translate(0," + obama_height + ")")
      .call(d3.axisBottom(obama_x));

  // Add the Y Axis
  /*svg.append("g")
      .call(d3.axisLeft(y));*/
});
var trump_margin = {top: 20, right: 20, bottom: 30, left: 50},
    trump_width = 700 - trump_margin.left - trump_margin.right,
    trump_height = 140 - trump_margin.top - trump_margin.bottom;

// parse the date / time
var trump_parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var trump_x = d3.scaleTime().range([0, trump_width]);
var trump_y = d3.scaleLinear().range([trump_height, 0]);
  var trump_r = d3.scaleLinear().range([trump_height, 18000]);
// define the line
var trump_valueline = d3.line()
    .x(function(d) { return trump_x(d.date); })
    .y(function(d) { return trump_y(d.close); });

  var trump_color = d3.scaleOrdinal().range(['gray','red']);
// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var trump_svg = d3.select(".trump").append("svg")
    .attr("width", trump_width + trump_margin.left + trump_margin.right)
    .attr("height", trump_height + trump_margin.top + trump_margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + trump_margin.left + "," + trump_margin.top + ")");

// Get the data
d3.csv("https://gist.githubusercontent.com/JesseCHowe/ab28a401445d1400febb2f0e5f2ed0b6/raw/5ead0de8fb05f5a4c2acf1e6d966e4428b6cedbd/trumps100.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.date = trump_parseTime(d.date);
      d.close = +d.proposed_penalties;
    	d.penalties = +d.proposed_penalties;
    d.who = d.who;
  });

  // Scale the range of the data
  trump_x.domain(d3.extent(data, function(d) { return d.date; }));
  trump_y.domain([0, d3.max(data, function(d) { return d.close; })]);
    trump_r.domain([0, d3.max(data, function(d) { return d.close; })]);
  // Add the valueline path.


  // Add the scatterplot
  trump_svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r",function(d) { return trump_r(d.penalties)/3000; })
      .attr("cx", function(d) { return trump_x(d.date); })
  .style("fill", function(d) {
        return trump_color(d.who);
      })
  .attr('stroke', 'black')
  .attr('opacity',0.7)
      .attr("cy", 50);

  // Add the X Axis
  trump_svg.append("g")
      .attr("transform", "translate(0," + trump_height + ")")
      .call(d3.axisBottom(trump_x));

  // Add the Y Axis
  /*svg.append("g")
      .call(d3.axisLeft(y));*/
trump_svg.append("g")
    .append("text")
      .attr("class", "disChart_label")
      .attr("y", 42)
  		.attr("x",120)
      .attr("dy", ".71em")
      .style("text-anchor", "middle")
      .text("No posts for over a month")
});

$('a#all').click(function(e)
{
    // Cancel the default action
    e.preventDefault();
});
$('a#state').click(function(e)
{
    // Cancel the default action
    e.preventDefault();
});
$('a#emphasis').click(function(e)
{
    // Cancel the default action
    e.preventDefault();
});
$('a#totals').click(function(e)
{
    // Cancel the default action
    e.preventDefault();
});
$('a#year').click(function(e)
{
    // Cancel the default action
    e.preventDefault();
});
$('a#union').click(function(e)
{
    // Cancel the default action
    e.preventDefault();
});
