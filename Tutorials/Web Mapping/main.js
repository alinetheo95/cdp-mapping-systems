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

const { createClient } = window.supabase;
const supabaseUrl = 'https://uuqmawxoxhphnjyjtjup.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1cW1hd3hveGhwaG5qeWp0anVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzOTM4MTMsImV4cCI6MjA2ODk2OTgxM30.z4wuwDK4Svjk2Ck7G5N3YhIJB_R6--ZfTkBjJ35aSOc';
const supabaseClient = createClient(supabaseUrl, supabaseKey);

async function querySupabase() {
    const { data, error } = await supabaseClient
        .from("web-mapping-tutorial")
        .select("*")
        .limit(100);

    if (error) {
        console.error("Error fetching data:", error);
    } else {
        console.log("Data fetched successfully:", data);
    }
}

async function querySupabase() {
    const { data, error } = await supabaseClient
        .from("web-mapping-tutorial")
        .select("*")
        .limit(100);

    if (error) {
        console.error("Error fetching data:", error);
    } else {
        console.log("Data fetched successfully:", data);
    }
}

async function queryWithinDistance(point, n = 1000) {
        const { data, error } = await supabaseClient.rpc(
          "find_nearest_n_restaurants",
          {
            lat: point[1],
            lon: point[0],
            n: n,
          }
        );

        if (error) {
          console.error("Error fetching nearest points:", error);
        } else {
          console.log("Nearest points fetched successfully:", data);
          // do other stuff here later...
        }
      }

document.addEventListener("DOMContentLoaded", () => {
    querySupabase();
});
      
map.on("click", (e) => {
    const point = [e.lngLat.lng, e.lngLat.lat];
    queryWithinDistance(point, 1000); 
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