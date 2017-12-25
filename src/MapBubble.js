import React, { Component } from 'react';
import './App.css';
import { select } from 'd3-selection';
import { csv } from 'd3-request';
import * as topojson from 'topojson';
import * as d3GeoProjection from 'd3-geo-projection';
import * as d3 from 'd3';

class MapBubble extends Component {
   constructor(props){
      super(props)
      this.state = {
          mapData: this.props.mapData,
          width: (this.props.width == null ? window.innerWidth : this.props.width),
          height: (this.props.height == null ? window.innerHeight : this.props.height),
          dataFile: this.props.dataFile,
          countryIdentifier: (this.props.countryIdentifier == null ? 'alpha-3' : this.props.countryIdentifier),
          projection: (this.props.projection == null ? 'Robinson' : this.props.projection),
          mapScale: (this.props.mapScale == null ? 100 : this.props.mapScale),
          mapStroke: (this.props.mapStroke == null ? '#fff' : this.props.mapStroke),
          mapStrokeWidth: (this.props.mapStrokeWidth == null ? 1 : this.props.mapStrokeWidth),
          mapFill: (this.props.mapFill == null ? '#000' : this.props.mapFill),
          mapOpacity: (this.props.mapOpacity == null ? 1 : this.props.mapOpacity),
          mapFillOpacity: (this.props.mapFillOpacity == null ? 1 : this.props.mapFillOpacity),
          mapStrokeOpacity: (this.props.mapStrokeOpacity == null ? 1 : this.props.mapStrokeOpacity),
          choropleth: (this.props.choropleth == null ? false : this.props.choropleth),
          choroplethColorScaleType: (this.props.choroplethColorScaleType == null ? 'Linear' : this.props.choroplethColorScaleType),
          choroplethColumn: this.props.choroplethColumn,
          choroplethDomain: this.props.choroplethDomain,
          choroplethColors: (this.props.choroplethColors == null ? ['#ecf8e6','#1b6ba7'] : this.props.choroplethColors),
          bubbleSizeColumn: this.props.bubbleSizeColumn,
          bubbleSizeDomain: this.props.bubbleSizeDomain,
          bubbleSizeRange: this.props.bubbleSizeRange,
          bubbleOpacity: (this.props.bubbleOpacity == null ? 1 : this.props.bubbleOpacity),
          bubbleFill: (this.props.bubbleFill == null ? '#000' : this.props.bubbleFill),
          bubbleFillOpacity: (this.props.bubbleFillOpacity == null ? 1 : this.props.bubbleFillOpacity),
          bubbleStrokeWidth: (this.props.bubbleStrokeWidth == null ? 0 : this.props.bubbleStrokeWidth),
          bubbleStroke: (this.props.bubbleStroke == null ? 'none' : this.props.bubbleStroke),
          bubbleStrokeOpacity: (this.props.bubbleStrokeOpacity == null ? 1 : this.props.bubbleStrokeOpacity),
        }
      this.createMapBubble = this.createMapBubble.bind(this)
    }
  componentWillMount() {
    csv(this.state.dataFile, (error, data) => {
      data = data.map(d => {
        if(this.state.choropleth)
          d[this.state.choroplethColumn] = +d[this.state.choroplethColumn];
        d[this.state.bubbleSizeColumn] = +d[this.state.bubbleSizeColumn];
        return d
      })
      if (error) {
        this.setState({
          error: true,
        });
      } else {
        let countryTemp = [];
        for(let i = 0; i < data.length; i++){
          countryTemp.push(data[i][this.state.countryIdentifier])
        }
        this.state.mapData.objects.countries.geometries.forEach(d => {
          if(countryTemp.indexOf(d.properties[this.state.countryIdentifier]) == -1){
            if(this.state.choropleth)
              d.properties[this.state.choroplethColumn] = 'NA';
            d.properties[this.state.bubbleSizeColumn] = 'NA';
          }
          else{
            if(this.state.choropleth)
              d.properties[this.state.choroplethColumn] = data[countryTemp.indexOf(d.properties[this.state.countryIdentifier])][this.state.choroplethColumn]
            d.properties[this.state.bubbleSizeColumn] = data[countryTemp.indexOf(d.properties[this.state.countryIdentifier])][this.state.bubbleSizeColumn]
          }
        })
        this.state.mapData.objects.countries.geometries.sort((x, y) => {
          return d3.descending(x.properties[this.state.bubbleSizeColumn], y.properties[this.state.bubbleSizeColumn]);
        })
        let domain = this.props.choroplethDomain, radiusDomain = this.props.bubbleSizeDomain;
        if(this.state.choropleth){
          if(this.props.choroplethDomain == null){
            domain =  [(d3.min(data.map(d =>  d[this.state.choroplethColumn]))),(d3.max(data.map(d =>  d[this.state.choroplethColumn])))]
          }
        }
        if(this.props.bubbleSizeDomain == null){
          radiusDomain = [(d3.min(data.map(d =>  d[this.state.bubbleSizeColumn]))),(d3.max(data.map(d =>  d[this.state.bubbleSizeColumn])))]
        }
        this.setState({
          data: data,
          choroplethDomain: domain,
          bubbleSizeDomain: radiusDomain,
        });
      }
    });
  }
  componentDidUpdate() {
      this.createMapBubble()
    }
  createMapBubble(){
    const node = this.node;
    let projection, scale;
    console.log(this.state);
    switch(this.state.projection){   
      case ('Mercator'): projection = d3.geoMercator(); break;
      case ('Robinson'): projection = d3GeoProjection.geoRobinson(); break;
      case ('Gall-Peter'): projection = d3GeoProjection.geoCylindricalEqualArea.parallel(45); break;
      case ('Winkel-Tripel'): projection = d3GeoProjection.geoWinkel3(); break;
      case ('Equirectangular'): projection = d3.geoEquirectangular(); break;
      case ('Natural Earth1'): projection = d3.geoNaturalEarth1(); break; 
      default: projection = d3GeoProjection.geoRobinson(); break;
    }
    if(this.state.choropleth){
      switch(this.state.choroplethColorScaleType){   
        case ('Linear'): scale = d3.scaleLinear().domain(this.state.choroplethDomain).range(this.state.choroplethColors); break;
        case ('Log'): scale = d3.scaleLog().domain(this.state.choroplethDomain).range(this.state.choroplethColors); break;
        case ('Ordinal'): scale = d3.scaleOrdinal().domain(this.state.choroplethDomain).range(this.state.choroplethColors); break;
        case ('Threshold'): scale = d3.scaleThreshold().domain(this.state.choroplethDomain).range(this.state.choroplethColors); break;
        default: scale = d3.scaleLinear().domain(this.state.choroplethDomain).range(this.state.choroplethColors); break;
      }
    }
    let bubbleRadius = d3.scaleSqrt().domain(this.state.bubbleSizeDomain).range(this.state.bubbleSizeRange);
    let projection_scale = projection
      .scale(this.state.mapScale)
      .translate([this.state.width / 2, this.state.height / 2]);

    let Zoom = d3.zoom().scaleExtent([0.8, 8]).on('zoom', zoomed);

    let path = d3.geoPath().projection(projection_scale);
    let mapSVG = select(node).call(Zoom);
    let zoomGroup = mapSVG.append('g');

    zoomGroup.append('rect')
      .attr('class', 'bg')
      .attr('x',0)
      .attr('y',0)
      .attr('width', this.state.width)
      .attr('height', this.state.height)
      .attr('opacity', 0)
      .on('click', () => {
        mapSVG.transition().duration(500).call(Zoom.transform, d3.zoomIdentity);
      })

    function zoomed() {
      zoomGroup.attr('transform', d3.event.transform); // updated for d3 v4
    }
    zoomGroup
      .selectAll('.country')
      .data(topojson.feature(this.state.mapData, this.state.mapData.objects.countries).features)
      .enter()
      .append('path')
      .attr('class', d => `${d.properties[this.state.countryIdentifier]} country`)
      .attr('d', path)
      .attr('fill', d => {
        if(this.state.choropleth){
          if(d.properties[this.state.choroplethColumn] != 'NA')
            return scale(d.properties[this.state.choroplethColumn])
          else
            return this.state.mapFill
        }
        else 
          return this.state.mapFill
      })
      .attr('stroke',this.state.mapStroke)
      .attr('stroke-width', this.state.mapStrokeWidth)
      .attr('fill-opacity', this.state.mapFillOpacity)
      .attr('stroke-opacity', this.state.mapStrokeOpacity)
      .attr('opacity',this.state.mapOpacity)
      .on('click',d => {
          let bounds = path.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            zoomScale = Math.max(
              1,
              Math.min(8, 0.9 / Math.max(dx / this.state.width, dy / this.state.height)),
            ),
            translate = [this.state.width / 2 - zoomScale * x, this.state.height / 2 - zoomScale * y];

          mapSVG
            .transition()
            .duration(500)
            .call(
              Zoom.transform,
              d3.zoomIdentity
                .translate(translate[0], translate[1])
                .scale(zoomScale),
            );
      });
    zoomGroup
      .selectAll('.bubble')
      .data(topojson.feature(this.state.mapData, this.state.mapData.objects.countries).features)
      .enter()
      .append('circle')
      .attr('class', d => `${d.properties[this.state.countryIdentifier]}Bubble bubble`)
      .attr('cx',d => path.centroid(d)[0])
      .attr('cy',d => path.centroid(d)[1])
      .attr('fill',this.state.bubbleFill)
      .attr('stroke',this.state.bubbleStroke)
      .attr('opacity',this.state.bubbleOpacity)
      .attr('stroke-width',this.state.bubbleStrokeWidth)
      .attr('fill-opacity',this.state.bubbleFillOpacity)
      .attr('stroke-opacity',this.state.bubbleStrokeOpacity)
      .attr('r', d => {
        if(d.properties[this.state.bubbleSizeColumn] != 'NA')
          return bubbleRadius(d.properties[this.state.bubbleSizeColumn])
        else
          return 0
      })
      .on('click',d => {
          let bounds = path.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            zoomScale = Math.max(
              1,
              Math.min(8, 0.9 / Math.max(dx / this.state.width, dy / this.state.height)),
            ),
            translate = [this.state.width / 2 - zoomScale * x, this.state.height / 2 - zoomScale * y];

          mapSVG
            .transition()
            .duration(500)
            .call(
              Zoom.transform,
              d3.zoomIdentity
                .translate(translate[0], translate[1])
                .scale(zoomScale),
            );
      });
  }
  
  render() {
      if (this.state.loadError) {
        console.log(this.state.data);
        return <div>couldn't load file</div>;
      }
      if (!this.state.data) {
        console.log(this.state.data);
        return <svg />;
      }
      else {
        return <g
          ref={node => this.node = node}
          id = {'mapG'}
          >
        </g>
      }
  }
}
export default MapBubble
