// Define the USGS Earthquake API URL - Past month (30 Days)
const usgsApiUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Define the Tectonic Plates URL -  from github repo
const tectonicPlatesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Define the base layers
const streetMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const topoMapLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Define the base layers
const baseMaps = {
    "Street Map": streetMapLayer,
    "Topo Map": topoMapLayer,
};

// Initialize the map
const map = L.map('map', {
    center: [0, 0],
    zoom: 2,
    layers: [streetMapLayer], // Set the default base layer
});

// Create the overlay layers
const tectonicPlatesLayer = L.layerGroup(); // Create an empty layer group
const earthquakeLayer = L.layerGroup(); // Create an empty layer group for earthquakes

// Function to add tectonic plates as yellow polylines
function addTectonicPlates() {
    fetch(tectonicPlatesUrl)
        .then(response => response.json())
        .then(data => {
            const plateLayer = L.geoJSON(data, {
                style: {
                    color: "yellow", // Set the color to yellow
                    weight: 2
                }
            });

            plateLayer.addTo(tectonicPlatesLayer); // Add the tectonic plates to the layer group

            // After adding the tectonic plates to the layer group, create the layer control
            createLayerControl();
        })
        .catch(error => {
            console.error("Error fetching tectonic plates data:", error);
        });
}

addTectonicPlates(); // Call the function to load tectonic plates



// Function to set marker size based on magnitude
function getMarkerSize(magnitude) {
    return magnitude * 2; // magnitude is scaled to 2x.
}

// Function to set marker color based on depth
function getMarkerColor(depth) {
    if (depth >= -10 && depth <= 10) {
        return "#FFD700"; // Light orange for -10-10 km depth range
    } else if (depth > 10 && depth <= 30) {
        return "#FFA500"; // Orange for 10-30 km depth range
    } else if (depth > 30 && depth <= 50) {
        return "#FF6347"; // Tomato for 30-50 km depth range
    } else if (depth > 50 && depth <= 70) {
        return "#FF0000"; // Red for 50-70 km depth range
    } else if (depth > 70 && depth <= 90) {
        return "#800000"; // Maroon for 70-90 km depth range
    } else {
        return "#000000"; // Black for 90+ km depth range
    }
}

// Function to display earthquake data on the map
function displayEarthquakeData(earthquakes) {
    earthquakes.forEach(earthquake => {
        const { geometry, properties } = earthquake;
        const coordinates = geometry.coordinates;
        const mag = properties.mag;
        const depth = coordinates[2];

        // Create a marker with a popup for each earthquake
        L.circleMarker([coordinates[1], coordinates[0]], {
            radius: getMarkerSize(mag),
            fillColor: getMarkerColor(depth),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(earthquakeLayer).bindPopup(`<b>Magnitude:</b> ${mag}<br><b>Depth:</b> ${depth} km<br><b>Location:</b> ${properties.place}`);
    });
}

function createLayerControl() {
    // Define overlay maps
    let overlayMaps = {
        "Tectonic Plates": tectonicPlatesLayer,
        "Earthquakes": earthquakeLayer, // Add the earthquake layer to the layer control
    };

    // Create layer control and add it to the map
    L.control.layers(baseMaps, overlayMaps).addTo(map);

    // Fetch earthquake data from the USGS API
    fetch(usgsApiUrl)
        .then(response => response.json())
        .then(data => {
            // Process and display the earthquake data on the map
            displayEarthquakeData(data.features);
        })
        .catch(error => {
            console.error("Error fetching earthquake data:", error);
        });
}


// Set up the legend.
let legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let depthRanges = [
        { from: -10, to: 10, color: "#FFD700" },
        { from: 10, to: 30, color: "#FFA500" },
        { from: 30, to: 50, color: "#FF6347" },
        { from: 50, to: 70, color: "#FF0000" },
        { from: 70, to: 90, color: "#800000" },
        { from: 90, to: Infinity, color: "#000000" }
    ];

    // Add a title for the legend
    let legendInfo = "<h3>Earthquake Depth</h3>";

    // Create the legend content
    let legendContent = depthRanges.map(range => {
        return `<div class="legend-item">
                    <div class="legend-color" style="background-color: ${range.color};"></div>
                    <div class="legend-text">${range.from}${range.to === Infinity ? '+' : ' - ' + range.to} km</div>
                </div>`;
    });

    div.innerHTML = legendInfo + '<div class="legend-items">' + legendContent.join('') + '</div>';
    return div;
};

// Add the legend to the map
legend.addTo(map);



