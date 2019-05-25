// Plot the default route once the page loads
var defaultURL = "/Top_organs";
d3.json(defaultURL).then(function(data) {
  var data = [data];
  var layout = { margin: { t: 30, b: 100 } };
  Plotly.plot("bar", data, layout);
});