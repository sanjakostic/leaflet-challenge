import { MAPBOX_ACCESS_TOKEN } from "./config.js";
// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer (the background map image) to my map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: "mapbox/streets-v11",
  accessToken: MAPBOX_ACCESS_TOKEN
}).addTo(myMap);

// Function to set marker color based on depth
function getColor(depth) {
  return depth >= 90 ? "#FF0000" :
         depth >= 70 ? "#FF4500" :
         depth >= 50 ? "#FFA500" :
         depth >= 30 ? "#FFFF00" :
         depth >= 10 ? "#ADFF2F" :
                       "#00FF00";
}

// Function to set marker radius based on magnitude
function getRadius(magnitude) {
  return magnitude * 5;
}

// Load the earthquake data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Create a GeoJSON layer with the retrieved data
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
      // Create a circle marker for each earthquake
      return L.circleMarker(latlng, {
        radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2] + "</p>");
    }
  }).addTo(myMap);

  // Create a legend
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend'),
        depths = [-10, 10, 30, 50, 70, 90],
        labels = [];

    // Loop through depth intervals and generate a label with a colored square for each interval
    for (var i = 0; i < depths.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
          depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }
    return div;
  };

  // Add legend to the map
  legend.addTo(myMap);
});
