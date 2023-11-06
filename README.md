# Challenge15_leaflet-challenge
Module 15 Challenge - UWA/edX Data Analytics Bootcamp

Github repository at: [https://github.com/gpang98/Challenge15_leaflet-challenge.git](https://github.com/gpang98/Challenge15_leaflet-challenge.git)

## Table of Contents
1. [Introduction](https://github.com/gpang98/Challenge15_leaflet-challengee#introduction)
    1. [Goal](https://github.com/gpang98/Challenge15_leaflet-challenge#goal)
    2. [Repository Structure](https://github.com/gpang98/Challenge15_leaflet-challenge#repository-structure)
    3. [Dataset](https://github.com/gpang98/Challenge15_leaflet-challenge#dataset)
2. [Approach](https://github.com/gpang98/Challenge15_leaflet-challenge#approach)
    1. [Part 1](https://github.com/gpang98/Challenge15_leaflet-challenge#part-1)
    2. [Part 2](https://github.com/gpang98/Challenge15_leaflet-challenge#part-2)
3. [References](https://github.com/gpang98/Challenge15_leaflet-challenge#references)


## Introduction

### Goal
The goal of the project is to visualise USGS Earthquake data, such as location, magnitude, and depth, in a meaningful way.

### Repository Structure
- [`Leaflet-Part-1`](https://github.com/gpang98/Challenge15_leaflet-challenge/tree/main/Leaflet-Part-1) contains the source code [(`logic.js`)](https://github.com/gpang98/Challenge15_leaflet-challenge/blob/main/Leaflet-Part-1/static/js/logic.js) for the basic earthquake visualisation.
- [`Leaflet-Part-2`](https://github.com/gpang98/Challenge15_leaflet-challenge/tree/main/Leaflet-Part-2) contains the source code [(`bonus.js`)](https://github.com/gpang98/Challenge15_leaflet-challenge/blob/main/Leaflet-Part-2/static/js/bonus.js) for the extended visualisation, which includes tectonic plates.

### Dataset
1. "All Earthquakes" from the "Past 7 Days" - USGS Earthquake Hazards Program [https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)

2. Tectonic Plates - Boundaries [https://github.com/fraxen/tectonicplates](https://github.com/fraxen/tectonicplates)

## Approach
### Part 1
1. Define the url which contains the geojson data: ["https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"]("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")

2. Get the data from the URL using `d3.json()`.

3. Build the `create_markers()` function.
    - Initialise the variables to assign the depth as the marker colour.
        - Create an array of depths using `map()`.
        - The "Digital Colour Meter" was used to identify three colours to define the colour scale range.
        - Use `chroma.scale()` from `chroma.js` to build the colour scale.
        - Use `chroma.limits()` to define the corresponding labels for the scale.
        - Use `Math.floor()` to achieve a more consistent numbering.
    - Use a for-loop over each "feature" property.
        - Parse the coordinates property, ensuring the correct latitude and longitude values are selected.
        - Get `magnitude` and `place` from `properties`.
        - Build the marker using `L.circleMarker()`
        - Add the popup for: magnitude, location, and depth.
        - Adjust the marker colour using values from the `colour_limits` array.
    - Create a layer group from the markers.
    - Pass the layer group, colour scale, and colour limits to the `create_map()` function.

4. Build the `create_map()` function.
    - Create the tile layer.
    - Create the base maps object.
    - Create the overlay maps object.
    - Use `L.map` to create the map.
        - Deine the `center` and `zoom` parameters.
        - Set the default layers using `layers`.
        - Set `worldCopyJump` to `true` to map the layers when panning.
    - Use `L.control` to add the layers to the map.
    - Build the legend.
        - Create the labels by using the colour limits provided to the function.
        - Use `onAdd` to build the legend elements.
    - Legend styling:
        - Separate the colours from the text by defining a `<span>` with style parameters:
            - `width: 20px`
            - `height: 20px`
            - `background-color` as per the colour scale
            - `margin-right: 5px` to create the gap between the colour block and the text
        - Apply the following style to the unordered list:
            - `list-style: none` will remove the dot points
            - `padding: 0` and `margin: 0` will remove the padding around everything
        - Style the `div` itself:
            - Set the `backgroundColor` to `mintcream`
            - Set the `border-radius` to round off the edges
            - Return a consistent padding by changing the `padding` parameter

### Part 2
1. Copy the code from Part 1.

2. Nest another `d3.json()` to get the tectonic data from the url.

3. Add code to the `create_map()` function that will draw the lines.
    - Get the correct latitude and longitude using `map()` and `reverse()`.
    - Use `L.polyline()` to build each feature.

4. Create the layer group as before, and add this as a new parameter to the `create_map()` function.

5. Add the `tectonic_layer` to the overlay maps object for display.


## References
- Codes are mainly derives from lecture notes and ChatGPT.

- [2] Leaflet Documentation - LatLngBounds [https://leafletjs.com/reference.html#latlngbounds](https://leafletjs.com/reference.html#latlngbounds)