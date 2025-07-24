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
  // Fetch pizza restaurant data
  fetch(
    "https://data.cityofnewyork.us/resource/43nn-pn8j.geojson?cuisine_description=Pizza&$limit=10000"
  )
    .then((response) => response.json())
    .then((data) => {
      // Add the data as a source
      console.log(data)
      data.features.forEach((feature) => {
        feature.geometry = {
        type: "Point",
        coordinates: [
            Number(feature.properties.longitude),
            Number(feature.properties.latitude),
    ],
  };
      map.on('load', () => {        
      map.addSource('restaurants', {
          type: 'geojson',
          data: data
      });

      map.addLayer({
          'id': 'restaurants-layer',
          'type': 'circle',
          'source': 'restaurants',
      });
    })
});
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
    })
    .catch((error) => console.error("Error fetching data:", error));
});

    map.on("click", "restaurants-layer", (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.dba
      new maplibregl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });