import React, { Component } from 'react';
import './App.css';
import { select } from 'd3-selection';
import * as topojson from 'topojson';
import { csv } from 'd3-request';
import * as d3GeoProjection from 'd3-geo-projection';
import * as d3 from 'd3';

class Choropleth extends Component {
   constructor(props){
      super(props)
      this.state = {
          mapData: this.props.mapData,
          width: (this.props.width == null ? window.innerWidth : this.props.width),
          height: (this.props.height == null ? window.innerHeight : this.props.height),
          dataFile: this.props.dataFile,
          countryIdentifier: (this.props.countryIdentifier == null ? 'alpha-3' : this.props.countryIdentifier),
          mapScale: (this.props.mapScale == null ? 100 : this.props.mapScale),
          projection: (this.props.projection == null ? 'Robinson' : this.props.projection),
          mapStroke: (this.props.mapStroke == null ? '#fff' : this.props.mapStroke),
          mapStrokeWidth: (this.props.mapStrokeWidth == null ? 1 : this.props.mapStrokeWidth),
          mapFill: (this.props.mapFill == null ? '#000' : this.props.mapFill),
          choroplethColorScaleType: (this.props.choroplethColorScaleType == null ? 'Linear' : this.props.choroplethColorScaleType),
          mapOpacity: (this.props.mapOpacity == null ? 1 : this.props.mapOpacity),
          mapFillOpacity: (this.props.mapFillOpacity == null ? 1 : this.props.mapFillOpacity),
          mapStrokeOpacity: (this.props.mapStrokeOpacity == null ? 1 : this.props.mapStrokeOpacity),
          choroplethColumn: this.props.choroplethColumn,
          choroplethColors: (this.props.choroplethColors == null ? ['#ecf8e6','#1b6ba7'] : this.props.choroplethColors), 
          choroplethDomain: this.props.choroplethDomain,
      }
      this.createMap = this.createMap.bind(this)
    }
  componentWillMount() {
    csv(this.state.dataFile, (error, data) => {
      data = data.map(d => {
        d[this.state.choroplethColumn] = +d[this.state.choroplethColumn];
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
            d.properties[this.state.choroplethColumn] = 'NA';
          }
          else{
            d.properties[this.state.choroplethColumn] = data[countryTemp.indexOf(d.properties[this.state.countryIdentifier])][this.state.choroplethColumn]
          }
        })
        let domain = this.props.choroplethDomain;
        if(this.props.choroplethDomain == null){
          domain =  [(d3.min(data.map(d =>  d[this.state.choroplethColumn]))),(d3.max(data.map(d =>  d[this.state.choroplethColumn])))]
        }
        this.setState({
          data: data,
          choroplethDomain: domain,
        });
      }
    });
  }
  componentDidUpdate() {
      this.createMap()
    }
  createMap(){
    console.log(this.state)
    const node = this.node;
    let projection, scale;
    switch(this.state.projection){   
      case ('Mercator'): projection = d3.geoMercator(); break;
      case ('Robinson'): projection = d3GeoProjection.geoRobinson(); break;
      case ('Gall-Peter'): projection = d3GeoProjection.geoCylindricalEqualArea.parallel(45); break;
      case ('Winkel-Tripel'): projection = d3GeoProjection.geoWinkel3(); break;
      case ('Equirectangular'): projection = d3.geoEquirectangular(); break;
      case ('Natural Earth1'): projection = d3.geoNaturalEarth1(); break; 
      default: projection = d3GeoProjection.geoRobinson(); break;
    }
    switch(this.state.choroplethColorScaleType){   
      case ('Linear'): scale = d3.scaleLinear().domain(this.state.choroplethDomain).range(this.state.choroplethColors); break;
      case ('Log'): scale = d3.scaleLog().domain(this.state.choroplethDomain).range(this.state.choroplethColors); break;
      case ('Ordinal'): scale = d3.scaleOrdinal().domain(this.state.choroplethDomain).range(this.state.choroplethColors); break;
      case ('Threshold'): scale = d3.scaleThreshold().domain(this.state.choroplethDomain).range(this.state.choroplethColors); break;
      default: scale = d3.scaleLinear().domain(this.state.choroplethDomain).range(this.state.choroplethColors); break;
    }
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
        if(d.properties[this.state.choroplethColumn] != 'NA')
          return scale(d.properties[this.state.choroplethColumn])
        else
          return this.state.mapFill
      })
      .attr('opacity',this.state.mapFillOpacity)
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
export default Choropleth
