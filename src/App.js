import React, { Component } from 'react';
import mapFile from './data/world-110m.json';
import Choropleth from './Choropleth';
import MapBubble from './MapBubble';
import MapBars from './MapBars';
import MapDot from './MapDot';
import './App.css';

class React_Map extends Component {
   constructor(props){
      super(props)
      this.state = {};
   }
  render() {
        return <svg
        width={window.innerWidth} height={window.innerHeight}>
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
        </svg>
  }
}

export default React_Map;
