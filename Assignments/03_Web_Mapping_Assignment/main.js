// Initialize the map
var map = new maplibregl.Map({
  container: 'map',
  style: 'style.json',
  center: [-73.97144, 40.70491],
  zoom: 6,
});

// Add navigation controls
map.addControl(new maplibregl.NavigationControl());

// Wait for the map to load before fetching data
map.on('load', () => {
  // Fetch data from local GeoJSON file
  fetch('ip_locations.geojson')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      
      // Transform data if needed (only if your GeoJSON doesn't have proper geometry)
      data.features.forEach((feature) => {
        // Only do this transformation if your GeoJSON has longitude/latitude properties
        // instead of proper geometry. Remove this if your GeoJSON is already properly formatted.
        if (!feature.geometry && feature.properties.longitude && feature.properties.latitude) {
          feature.geometry = {
            type: "Point",
            coordinates: [
              Number(feature.properties.longitude),
              Number(feature.properties.latitude),
            ],
          };
        }
      });

      // Add the data as a source
      map.addSource('restaurants', {
        type: 'geojson',
        data: data,
      });

      // Add a circle layer to visualize the data
      map.addLayer({
        id: 'restaurants-layer',
        type: 'circle',
        source: 'restaurants',
        paint: {
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-color': '#ff7800',
          'circle-stroke-color': 'white',
        },
      });

      // Add click handler for popups
      map.on("click", "restaurants-layer", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.dba || 'No description available';
        new maplibregl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});