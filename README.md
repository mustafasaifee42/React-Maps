# React-Maps
[![Sponsored](https://img.shields.io/badge/chilicorn-sponsored-brightgreen.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAMAAADjyg5GAAABqlBMVEUAAAAzmTM3pEn%2FSTGhVSY4ZD43STdOXk5lSGAyhz41iz8xkz2HUCWFFhTFFRUzZDvbIB00Zzoyfj9zlHY0ZzmMfY0ydT0zjj92l3qjeR3dNSkoZp4ykEAzjT8ylUBlgj0yiT0ymECkwKjWqAyjuqcghpUykD%2BUQCKoQyAHb%2BgylkAyl0EynkEzmkA0mUA3mj86oUg7oUo8n0k%2FS%2Bw%2Fo0xBnE5BpU9Br0ZKo1ZLmFZOjEhesGljuzllqW50tH14aS14qm17mX9%2Bx4GAgUCEx02JySqOvpSXvI%2BYvp2orqmpzeGrQh%2Bsr6yssa2ttK6v0bKxMBy01bm4zLu5yry7yb29x77BzMPCxsLEzMXFxsXGx8fI3PLJ08vKysrKy8rL2s3MzczOH8LR0dHW19bX19fZ2dna2trc3Nzd3d3d3t3f39%2FgtZTg4ODi4uLj4%2BPlGxLl5eXm5ubnRzPn5%2Bfo6Ojp6enqfmzq6urr6%2Bvt7e3t7u3uDwvugwbu7u7v6Obv8fDz8%2FP09PT2igP29vb4%2BPj6y376%2Bu%2F7%2Bfv9%2Ff39%2Fv3%2BkAH%2FAwf%2FtwD%2F9wCyh1KfAAAAKXRSTlMABQ4VGykqLjVCTVNgdXuHj5Kaq62vt77ExNPX2%2Bju8vX6%2Bvr7%2FP7%2B%2FiiUMfUAAADTSURBVAjXBcFRTsIwHAfgX%2FtvOyjdYDUsRkFjTIwkPvjiOTyX9%2FAIJt7BF570BopEdHOOstHS%2BX0s439RGwnfuB5gSFOZAgDqjQOBivtGkCc7j%2B2e8XNzefWSu%2BsZUD1QfoTq0y6mZsUSvIkRoGYnHu6Yc63pDCjiSNE2kYLdCUAWVmK4zsxzO%2BQQFxNs5b479NHXopkbWX9U3PAwWAVSY%2FpZf1udQ7rfUpQ1CzurDPpwo16Ff2cMWjuFHX9qCV0Y0Ok4Jvh63IABUNnktl%2B6sgP%2BARIxSrT%2FMhLlAAAAAElFTkSuQmCC)](http://spiceprogram.org/oss-sponsorship)

React-Maps is collection of reusable map visualization components. It combines d3 with react to generate map visualizations.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Installation

This project uses yarn. Install it as described here [https://yarnpkg.com/lang/en/](https://yarnpkg.com/lang/en/) if you haven't already.

To install this project, simply clone the repo and run yarn;

### Local Development
In the project directory, you can run:
```
yarn start
```
Runs the app in the development mode.

#### Supported Visualization
* Choropleth Map
* Bubble Map
* Bar Chart Map
* Dot Distribution Map

**To-Do**
* Flow Map
* Donut Charts Map
* Stacked Bar Chart Map
* Add mouse over functionality

Choropleth Map
------
```
<Choropleth
  width={window.innerWidth}
  height={window.innerHeight}
  mapData = {mapFile}
  dataFile = {'/data/gdp.csv'}
  countryIdentifier = {'alpha-3'}
  mapScale = {200}
  projection = {'Robinson'}
  mapStrokeWidth = {1}
  mapStroke = {'#fff'}
  mapFill = {'#aaa'}
  mapOpacity =  {1}
  mapFillOpacity = {1}
  mapStrokeOpacity = {1}
  choroplethColumn = {'2016'}
/>
```

#### Properties

Name|Default|Type|Description
--- | --- | --- | ---
mapData||Object|GeoJSON/TopoJSON features **(Required)**
width|`window.innerWidth`|Float|Width of the map
height|`window.innerHeight`|Float|Height of the map
dataFile||String|Path to the data file **File should be in csv format (Required)**
countryIdentifier|`alpha-3`|String|Country code type which is used to match countries in topojson and data file
mapScale|`100`|Float|Projection scale of the map
projection|`Robinson`|String|Projection of the map. **Available values: `Mercator`,`Robinson`,`Gall-Peter`,`Winkel-Tripel`,`Equirectangular`,`Natural Earth1`**
mapStrokeWidth|`1`|Float|Stroke width of the country shapes
mapStroke|`#fff`|String|Stroke color of the country shapes
mapFill|`#000`|String|Default fill color of the country shapes
mapOpacity|`1`|Float|Opacity of the map **Value must be between 0 and 1**
mapFillOpacity|`1`|Float|Fill opacity of the map **Value must be between 0 and 1**
mapStrokeOpacity|`1`|Float|Stroke opacity of the map **Value must be between 0 and 1**
choroplethColorScaleType|'Linear'|String|Type of scale to be used for coloring of countries - continuous or discrete. **Available values: `Linear`,`Threshold`,`Ordinal`,`Log`**
choroplethColumn||String|Column title from which the data that needs to be used for coloring is taken **(Required)**
choroplethDomain|Min and Max values in the data|Array|Range of possible input data values
choroplethColors|`['#ecf8e6','#1b6ba7']`|Array|Range of possible output colors

Bubble Map
------
```
<MapBubble
  width={window.innerWidth}
  height={window.innerHeight}
  mapData = {mapFile}
  dataFile = {'/data/gdp.csv'}
  countryIdentifier = {'alpha-3'}
  mapScale = {200}
  projection = {'Robinson'}
  mapStrokeWidth = {1}
  mapStroke = {'#fff'}
  mapFill = {'#ddd'}
  mapOpacity =  {1}
  mapFillOpacity = {1}
  mapStrokeOpacity = {1}
  choroplethColumn = {'2016'}
  bubbleSizeColumn = {'2016'}
  bubbleSizeRange = {[1,10]}
  bubbleFill = {'#9CC3BF'}
  bubbleStroke = {'#fff'}
  bubbleStrokeWidth = {1}
  bubbleOpacity = {0.5}
/>
```

#### Properties

Name|Default|Type|Description
--- | --- | --- | ---
mapData||Object|GeoJSON/TopoJSON features **(Required)**
width|`window.innerWidth`|Float|Width of the map
height|`window.innerHeight`|Float|Height of the map
dataFile||String|Path to the data file **File should be in csv format (Required)**
countryIdentifier|`alpha-3`|String|Country code type which is used to match countries in topojson and data file
mapScale|`100`|Float|Projection scale of the map
projection|`Robinson`|String|Projection of the map. **Available values: `Mercator`,`Robinson`,`Gall-Peter`,`Winkel-Tripel`,`Equirectangular`,`Natural Earth1`**
mapStrokeWidth|`1`|Float|Stroke width of the country shapes
mapStroke|`#fff`|String|Stroke color of the country shapes
mapFill|`#000`|String|Fill color of the country shapes
mapOpacity|`1`|Float|Opacity of the map **Value must be between 0 and 1**
mapFillOpacity|`1`|Float|Fill opacity of the map **Value must be between 0 and 1**
mapStrokeOpacity|`1`|Float|Stroke opacity of the map **Value must be between 0 and 1**
choropleth|`false`|Boolean|`true` or `false` depending upon if choropleth in background is required
choroplethColorScaleType|`Linear`|String|Type of scale to be used for coloring of countries - continuous or discrete. **Available values: `Linear`,`Threshold`,`Ordinal`,`Log`.** *Only applicable if `choropleth` is `true`* 
choroplethColumn||String|Column title from which the data that needs to be used for coloring is taken **(Required only if `choropleth` is `true`)**
choroplethDomain|Min and Max values in the data|Array|Range of possible input data values. *Only applicable if `choropleth` is `true`* 
choroplethColors|`['#ecf8e6','#1b6ba7']`|Array|Range of possible output colors. *Only applicable if `choropleth` is `true`* 
bubbleSizeColumn||String|Column title from which the data that needs to be used for bubble area is taken **(Required)**
bubbleSizeDomain|Min and Max values in the data|Array|Range of possible input data values for bubble area
bubbleSizeRange||Array|Range of possible output values for bubble area **(Required)**
bubbleOpacity|`1`|Float|Opacity of the bubbles **Value must be between 0 and 1**
bubbleFill|`#000`|String|Fill color of the bubbles
bubbleFillOpacity|`1`|Float|Opacity of the bubbles **Value must be between 0 and 1**
bubbleStroke|`none`|String|Stroke color of the bubbles
bubbleStrokeWidth|`1`|Float|Stroke width of the bubbles
bubbleStrokeOpacity|`1`|Float|Stroke opacity of the bubbles **Value must be between 0 and 1**

Bar Chart Map
------
```
<MapBars
  width={window.innerWidth}
  height={window.innerHeight}
  mapData = {mapFile}
  dataFile = {'/data/gdp.csv'}
  countryIdentifier = {'alpha-3'}
  mapScale = {200}
  projection = {'Robinson'}
  mapStrokeWidth = {1}
  mapStroke = {'#fff'}
  mapFill = {'#ddd'}
  mapOpacity =  {1}
  mapFillOpacity = {1}
  mapStrokeOpacity = {1}
  choroplethColumn = {'2016'}
  barHeightColumn = {'2016'}
  barHeightRange = {[5,50]}
  barFill = {'#9CC3BF'}
  barStroke = {'#fff'}
  barStrokeWidth = {1}
  barOpacity = {0.7}
/>
```

#### Properties

Name|Default|Type|Description
--- | --- | --- | ---
mapData||Object|GeoJSON/TopoJSON features **(Required)**
width|`window.innerWidth`|Float|Width of the map
height|`window.innerHeight`|Float|Height of the map
dataFile||String|Path to the data file **File should be in csv format (Required)**
countryIdentifier|`alpha-3`|String|Country code type which is used to match countries in topojson and data file
mapScale|`100`|Float|Projection scale of the map
projection|`Robinson`|String|Projection of the map. **Available values: `Mercator`,`Robinson`,`Gall-Peter`,`Winkel-Tripel`,`Equirectangular`,`Natural Earth1`**
mapStrokeWidth|`1`|Float|Stroke width of the country shapes
mapStroke|`#fff`|String|Stroke color of the country shapes
mapFill|`#000`|String|Fill color of the country shapes
mapOpacity|`1`|Float|Opacity of the map **Value must be between 0 and 1**
mapFillOpacity|`1`|Float|Fill opacity of the map **Value must be between 0 and 1**
mapStrokeOpacity|`1`|Float|Stroke opacity of the map **Value must be between 0 and 1**
choropleth|`false`|Boolean|`true` or `false` depending upon if choropleth in background is required
choroplethColorScaleType|`Linear`|String|Type of scale to be used for coloring of countries - continuous or discrete. **Available values: `Linear`,`Threshold`,`Ordinal`,`Log`.** *Only applicable if `choropleth` is `true`* 
choroplethColumn||String|Column title from which the data that needs to be used for coloring is taken **(Required only if `choropleth` is `true`)**
choroplethDomain|Min and Max values in the data|Array|Range of possible input data values. *Only applicable if `choropleth` is `true`* 
choroplethColors|`['#ecf8e6','#1b6ba7']`|Array|Range of possible output colors. *Only applicable if `choropleth` is `true`* 
barHeightScale|`Linear`|String|Type of scale to be used for height of the bars. **Available values: `Linear`,`Log`.**
barHeightColumn||String|Column title from which the data that needs to be used for height of the bars is taken **(Required)**
barHeightDomain|Min and Max values in the data|Array|Range of possible input data values for bars' height
barHeightRange||Array|Range of possible output values for bars' height **(Required)**
barOpacity|`1`|Float|Opacity of the bars **Value must be between 0 and 1**
barFill|`#000`|String|Fill color of the bars
barFillOpacity|`1`|Float|Opacity of the bars **Value must be between 0 and 1**
barStroke|`none`|String|Stroke color of the bars
barStrokeWidth|`1`|Float|Stroke width of the bars
barStrokeOpacity|`1`|Float|Stroke opacity of the bars **Value must be between 0 and 1**

Dot Distribution Map
------
```
<MapDot
  width={window.innerWidth}
  height={window.innerHeight}
  mapData = {mapFile}
  dataFile = {'/data/latlong.csv'}
  countryIdentifier = {'alpha-3'}
  mapScale = {200}
  projection = {'Robinson'}
  mapStrokeWidth = {1}
  mapStroke = {'#fff'}
  mapFill = {'#ddd'}
  mapOpacity =  {1}
  mapFillOpacity = {1}
  mapStrokeOpacity = {1}
  dotFill ={'#4468B0'}
/>
```
Name|Default|Type|Description
--- | --- | --- | ---
mapData||Object|GeoJSON/TopoJSON features **(Required)**
width|`window.innerWidth`|Float|Width of the map
height|`window.innerHeight`|Float|Height of the map
dataFile||String|Path to the data file **File should be in csv format (Required)**
mapScale|`100`|Float|Projection scale of the map
projection|`Robinson`|String|Projection of the map. **Available values: `Mercator`,`Robinson`,`Gall-Peter`,`Winkel-Tripel`,`Equirectangular`,`Natural Earth1`**
mapStrokeWidth|`1`|Float|Stroke width of the country shapes
mapStroke|`#fff`|String|Stroke color of the country shapes
mapFill|`#000`|String|Fill color of the country shapes
mapOpacity|`1`|Float|Opacity of the map **Value must be between 0 and 1**
mapFillOpacity|`1`|Float|Fill opacity of the map **Value must be between 0 and 1**
mapStrokeOpacity|`1`|Float|Stroke opacity of the map **Value must be between 0 and 1**
dotStrokeWidth|`1`|Float|Stroke width of the dots
dotStroke|`none`|String|Stroke color of the dots
dotFill|`#fff`|String|Color of the dots
dotOpacity|`1`|Float|Opacity of the dots **Value must be between 0 and 1**
dotFillOpacity|`1`|Float|Fill opacity of the dots **Value must be between 0 and 1**
dotStrokeOpacity|`1`|Float|Stroke opacity of the dots **Value must be between 0 and 1**
dotRadius|`3`|Float|Radius of the dots
dotColorScale|`false`|Boolean|`true` or `false` depending upon if coloring of the dots, based on data is required
dotColorScaleType|`Linear`|String|Type of scale to be used for scaling of the dots - continuous or discrete. **Available values: `Linear`,`Threshold`,`Ordinal`,`Log`.** *Only applicable if `dotColorScale` is `true`* 
dotColorColumn||String|Column title from which the data that needs to be used for coloring of dots is taken **(Required only if `dotColorScale` is `true`)**
dotColorDomain|Min and Max values in the data|Array|Range of possible input data values for dots' color
dotColorRange||Array|Range of possible output values for dots' color **(Required only if `dotColorScale` is `true`)**
dotRadiusScale|`false`|Boolean|`true` or `false` depending upon if scaling of the dots based on data is required
dotRadiusColumn||String|Column title from which the data that needs to be used for scaling of dots is taken **(Required only if `dotRadiusScale` is `true`)**
dotRadiusDomain|Min and Max values in the data|Array|Range of possible input data values for dots' radius
dotRadiusRange||Array|Range of possible output values for dots' radius **(Required only if `dotRadiusScale` is `true`)*
