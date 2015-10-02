/**
 * Created by mikeh on 9/17/15.
 */
/*
be sure to bring in the zflowers library as either a submodule or a softlink
*/


define(['raw', 'd3', 'underscore', 'ZFlowerData', 'SimpleZFlower'], function (raw, d3, _, ZFlowerData, ZFlowerVis) {

  "use strict";

  console.log("building a zf chart", raw.version);

  var module = (function() {

    //
    // build the RAW chart, also registers it for usage at this point
    //

    var zdata = raw.model();
    var z_dim = zdata.dimension()
      .title('Visualize (range: [0,1] -1)')
      .types(Number);

    /*
    var cat_dim = zdata.dimension()
      .title('Category (optional)')
      .types(Number, String);
    */

    var id_dim = zdata.dimension()
      .title('Unique ID (optional)')
      .types(Number);

    zdata.map(function(data) {
      return data.map(function(d, i) {
        // d is the incoming record (row from the csv table)
        // i is the row number (zero based)

        var group = "na"; // cat_dim(d);
        if (!group) {
          group = "all";
        }

        var id = id_dim(d);
        if (!id) {
          id = i;
        }

        var zValue = +z_dim(d);

        console.log("Data:", id, group, zValue);

        return {
          group: group,
          id: id,
          z: zValue
        };
      });
    });

    var convertToZData = function(data) {

      var values = [];
      var ids = [];
      data.map(function(d) {
        values.push(d.z);
        ids.push(d.id);
      });
      var zData = {data: values, ids: ids, max: 1.0};
      var flowerData = new ZFlowerData(zData);
      return flowerData;

    };


    var chart = raw.chart()
        .title('zFlower')
        .thumbnail("imgs/zFlower.png")
        .description("A zFlower is a simple visualization that shows a distribution of values between 0 and 1")
        .model(zdata)
        .category('Distributions')
        .template('templates/zflower.html')
      ;

    // options
    var colorMap = {'Red/Yellow/Green  white  [0,1] -1': "RGB",    // default is first
      'Blue/White/Orange yellow [0,1] -1': "BWO" };
    var cValues = _.values(colorMap);
    var cKeys   = _.keys(colorMap);

    var colorModel = chart.list()
        .title("Color Model")
        .values(cKeys)
        .defaultValue(cKeys[0])
      ;
    // size
    var size = chart.number()
        .title('Size')
        .defaultValue(400)
      ;

    // A simple margin
//    var margin = chart.number()
//      .title('margin')
//      .defaultValue(10);

    chart.draw(function (selection, data){

      //
      // data is an array of transformed data
      // {id: <role>, z: <value}
      //

      var flowerData = convertToZData(data);
      var cells = flowerData.getData();
      var stats = flowerData.getStats();
      console.log("draw: flower stats", stats);

      var cm = colorMap[colorModel()];

      var single = true;

      if (single) {
        var config = {
          svg: selection,
          w: size(),
          h: size(),
          cm: cm, // colorModel
          ignoreDispatch: true,
          tooltip: 'zflower-tooltip'
        };

        var vis = new ZFlowerVis(config);
        vis.setData(flowerData);
        // vis.setSelected([])

      }
      else {

        // debugging to draw 2 zflowers

        var xOff = 0;
        var yOff = 0;
        var transform = "translate(" + xOff + "," + yOff + ")";

        var config = {
          svg: selection,
          w: size()/2,
          h: size()/2,
          cm: cm, // colorModel
          transform: transform,
          ignoreDispatch: false,
          tooltip: 'zflower-tooltip'
        };

        var vis1 = new ZFlowerVis(config);
        vis1.setData(flowerData);

        config.transform = "translate(" + 100 + "," + yOff + ")";
        var vis2 = new ZFlowerVis(config);
        vis2.setData(flowerData);

      }

      console.log("request to draw ", selection, data.length);

    });



  })();

  console.log("return zFlower module chart data count:",  raw.charts.values().length);
  return module;
});




/*define(['d3', 'raw'], function (d3, raw) {

 "use strict";

 var module = (function() {

 var zVisConstructor = function() {

 console.log("zFlower const.");

 };


 zVisConstructor.prototype = {
 constructor: zVisConstructor
 };


 console.log("return constructor");
 return zVisConstructor;




 })();

 console.log("return zFlower module");
 return module;
 });
 */
