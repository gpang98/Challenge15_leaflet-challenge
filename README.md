# Challenge15_leaflet-challenge
Module 15 Challenge - UWA/edX Data Analytics Bootcamp

Github repository at: [https://github.com/gpang98/Challenge15_leaflet-challenge.git](https://github.com/gpang98/Challenge15_leaflet-challenge.git)

## Table of Contents
1. [Introduction](https://github.com/gpang98/Challenge15_leaflet-challenge#introduction)
    1. [Objective](https://github.com/gpang98/Challenge15_leaflet-challenge#objective)
    2. [Repository Structure](https://github.com/gpang98/Challenge15_leaflet-challenge#repository-structure)
    3. [Dataset](https://github.com/gpang98/Challenge15_leaflet-challenge#dataset)
2. [Workflow](https://github.com/gpang98/Challenge15_leaflet-challenge#workflow)
    1. [Part 1](https://github.com/gpang98/Challenge15_leaflet-challenge#part_1)
    2. [Part 2](https://github.com/gpang98/Challenge15_leaflet-challenge#part_2)
3. [References](https://github.com/gpang98/Challenge15_leaflet-challenge#references)


## Introduction

### Objective
The main onjective of the project is to visualise USGS Earthquake data, such as location, magnitude, and depth, in a meaningful way.

### Repository Structure
- [`Leaflet_Part1`](https://github.com/gpang98/Challenge15_leaflet-challenge/tree/main/Leaflet_Part1) contains the source code [(`logic.js`)](https://github.com/gpang98/Challenge15_leaflet-challenge/blob/main/Leaflet_Part1/static/js/logic.js) for the basic earthquake visualisation.
- [`Leaflet_Part2`](https://github.com/gpang98/Challenge15_leaflet-challenge/tree/main/Leaflet_Part2) contains the source code [(`bonus.js`)](https://github.com/gpang98/Challenge15_leaflet-challenge/blob/main/Leaflet_Part2/static/js/bonus.js) for the extended visualisation, which includes tectonic plates.

### Dataset
1. "All Earthquakes" from the "Past 7 Days" - USGS Earthquake Hazards Program [https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)

2. Tectonic Plates - Boundaries [https://github.com/fraxen/tectonicplates](https://github.com/fraxen/tectonicplates)

## Workflow
### Part 1
1. Define map with `.setView` to a world map.
2. Define the `.tileLayer` to openstreetmap.
3. Define the url which contains the geojson data (Past 30 days): ["https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"]("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")

4. Build the `getMarkerSize()` function.
    - using the magnitude property and multiply with 2.

5. Build the `getMarkerColor()` function.
    - colors are assigned based on the dpeth parameter

6. Get the data using `fetch()`` function and then using `d3.json()` to get the response.

7. Build the `displayEarthquakeData()` function.
    - store the geometry and properties
    - store the coordinates
    - store the magnitude
    - store the depth

    - use `L.circleMarker()` to specify the radius size and color and other parameters.

8. Define the legend using `L.control()` function.
    - Use `onAdd` to build the legend elements.
    - Assign the color per ranges
    - display the legend Title.
    - use `.map()` and div class to arrange the color and text.
    - Use `.addTo()` to add legend to the map.

9. The `style.css` is modified.
    - `.legend-container` is styled such that background is white and position is absulute.
    - `z-index` is set to 100 to ensure it is always plotted as the top layer.


### Part 2
1. Define the url for earthquakes and plate tectonics.

2. Define the streetMaplayer and topoMapLayer.

3. Define baseMaps with streetMaplayer and topoMapLayer.

4. Initialize the map with some parameters.

5. Create the overlay for tectonicPlatesLayer and earthquakeLayer.

6. Define function to `addTectonicPlates()`:
    - fetch the data and use `d3.json` to get the data from url.
    - `.addTo()` layar to the layer group
    - `createLayerControl()` to create the layer control

7. run the `addTectonicPlates()` function.

8. Use the same `getMarkerColor()` and `displayEarthquakeData()` functions from Part 1.

9. Create a `createLayerControl()` function to define the overlaymaps.
    - fetch the url and use d3.json to get the data from earthquake.

10. Use same legend from Part1.

11. Use same `style.css` from Part1.


## References
- Codes are mainly derives from lecture notes and ChatGPT.
