// Initialize the map
const map = L.map('map').setView([0, 0], 2); // Set the initial view to a world map

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define the USGS Earthquake API URL - Past month (30 Days)
const usgsApiUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

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
        }).addTo(map).bindPopup(`<b>Magnitude:</b> ${mag}<br><b>Depth:</b> ${depth} km<br><b>Location:</b> ${properties.place}`);
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


