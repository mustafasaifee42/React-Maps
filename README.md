# React-Maps
React-Maps is collection of reusable map visualization components. It combines d3 with react to generate map visualizations.

#### Supported Visualization
* Choropleth Map
* Bubble Map
* Bar Chart Map
* Dot Distribution Map
* Flow Map (Coming Soon)

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
