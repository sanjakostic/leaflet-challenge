# leaflet-challenge


1. **Setup and Configuration:**
   - The project is structured with HTML, CSS, and JavaScript files.
   - Leaflet and D3.js libraries are imported via CDN links in the HTML file.

2. **Map Initialization:**
   - The map object is created using Leaflet with a default center and zoom level.

3. **Tile Layer Addition:**
   - A tile layer is added to the map using a Mapbox tile URL. This provides the background map image.

4. **Marker Generation:**
   - Earthquake data is fetched from the USGS earthquake data feed using D3.json().
   - For each earthquake, a circle marker is created with Leaflet's L.circleMarker() function.
   - The size of the marker represents the earthquake magnitude, and its color reflects the depth.

5. **Popup Information:**
   - Popup windows are added to each marker to display additional information about the earthquake when clicked.
   - Information includes the earthquake location, magnitude, and depth.

6. **Legend Creation:**
   - A legend is added to provide context for the map data.
   - It displays depth intervals with corresponding colors to interpret the marker colors.

## Function Approach

- **getColor(depth):**
  - Determines the color of the marker based on the depth of the earthquake.
  - Uses a conditional statement to assign colors based on depth ranges.

- **getRadius(magnitude):**
  - Calculates the radius of the marker based on the magnitude of the earthquake.
  - Multiplies the magnitude by a scaling factor to determine the size of the marker.

- **pointToLayer Function:**
  - Utilized in the GeoJSON layer to customize the appearance of each earthquake marker.
  - Sets the marker properties such as radius, color, and popup content.

