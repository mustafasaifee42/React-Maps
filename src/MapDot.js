import React, { Component } from 'react';
import './App.css';
import { select } from 'd3-selection';
import { csv } from 'd3-request';
import * as topojson from 'topojson';
import * as d3GeoProjection from 'd3-geo-projection';
import * as d3 from 'd3';

class MapDot extends Component {
   constructor(props){
      super(props)
      this.state = {
          mapData: this.props.mapData,
          width: this.props.width,
          height: this.props.height,
          mapScale: (this.props.mapScale == null ? 100 : this.props.mapScale),
          dataFile: this.props.dataFile,
          mapStrokeWidth: (this.props.mapStrokeWidth == null ? 1 : this.props.mapStrokeWidth),
          mapStroke: (this.props.mapStroke == null ? '#fff' : this.props.mapStroke),
          mapFill: (this.props.mapFill == null ? '#000' : this.props.mapFill),
          projection: (this.props.projection == null ? 'Robinson' : this.props.projection),
          mapOpacity: (this.props.mapOpacity == null ? 1 : this.props.mapOpacity),
          mapFillOpacity: (this.props.mapFillOpacity == null ? 1 : this.props.mapFillOpacity),
          mapStrokeOpacity: (this.props.mapStrokeOpacity == null ? 1 : this.props.mapStrokeOpacity),
          dotStrokeWidth: (this.props.dotStrokeWidth == null ? 0 : this.props.dotStrokeWidth),
          dotColorScale: (this.props.dotColorScale == null ? false : this.props.dotColorScale),
          dotStroke: (this.props.dotStroke == null ? 'none' : this.props.dotStroke),
          dotFill: (this.props.dotFill == null ? '#fff' : this.props.dotFill),
          dotColorColumn: this.props.dotColorColumn,
          dotColorDomain: this.props.dotColorDomain,
          dotColorRange: this.props.dotColorRange,
          dotColorScaleType: (this.props.dotColorScaleType == null ? 'Linear' : this.props.dotColorScaleType),
          dotRadius: (this.props.dotRadius == null ? 3 : this.props.dotRadius),
          dotRadiusScale: (this.props.dotRadiusScale == null ? false : this.props.dotRadiusScale),
          dotRadiusDomain: this.props.dotRadiusDomain,
          dotRadiusRange: this.props.dotRadiusRange,
          dotRadiusColumn: this.props.dotRadiuslColumn,
          dotOpacity: (this.props.dotOpacity == null ? 1 : this.props.dotOpacity),
          dotFillOpacity: (this.props.dotFillOpacity == null ? 1 : this.props.dotFillOpacity),
          dotStrokeOpacity: (this.props.dotStrokeOpacity == null ? 1 : this.props.dotStrokeOpacity),
      }
      this.createMapDot = this.createMapDot.bind(this)
    }
  componentWillMount() {
    csv(this.props.dataFile, (error, data) => {
      data = data.map(d => {
        d['Latitude'] = +d['Latitude'];
        d['Longitude'] = +d['Longitude'];
        return d
      })
      if (error) {
        this.setState({
          error: true,
        });
      } else {
        let domain = this.props.dotColorDomain, radiusDomain = this.props.dotRadiusDomain;
        if(this.state.dotRadiusScale){
          if(this.state.dotRadiusDomain == null){
            radiusDomain =  [(d3.min(data.map(d =>  d[this.state.dotRadiusColumn]))),(d3.max(data.map(d =>  d[this.state.dotRadiusColumn])))]
          }
        }
        if(this.state.dotColorScale){
          if(this.props.dotColorDomain == null){
            domain = [(d3.min(data.map(d =>  d[this.state.dotColorColumn]))),(d3.max(data.map(d =>  d[this.state.dotColorColumn])))]
          }
        }
        this.setState({
          data: data,
          dotRadiusDomain: radiusDomain,
          dotColorDomain: domain,
        });
      }
    });
  }
  componentDidUpdate() {
      this.createMapDot()
    }
  createMapDot(){
    const node = this.node;
    let projection, dotColorScale, dotRadiusScale;
    switch(this.state.projection){   
      case ('Mercator'): projection = d3.geoMercator(); break;
      case ('Robinson'): projection = d3GeoProjection.geoRobinson(); break;
      case ('Gall-Peter'): projection = d3GeoProjection.geoCylindricalEqualArea.parallel(45); break;
      case ('Winkel-Tripel'): projection = d3GeoProjection.geoWinkel3(); break;
      case ('Equirectangular'): projection = d3.geoEquirectangular(); break;
      case ('Natural Earth1'): projection = d3.geoNaturalEarth1(); break; 
      default: projection = d3GeoProjection.geoRobinson(); break;
    }
    if(this.state.dotColorScale){
      switch(this.state.dotColorScaleType){   
        case ('Linear'): dotColorScale = d3.scaleLinear().domain(this.state.dotFillDomain).range(this.state.dotFill); break;
        case ('Ordinal'): dotColorScale = d3.scaleOrdinal().domain(this.state.dotFillDomain).range(this.state.dotFill); break;
        case ('Log'): dotColorScale = d3.scaleLog().domain(this.state.dotFillDomain).range(this.state.dotFill); break;
        default: dotColorScale = d3.scaleLinear().domain(this.state.dotFillDomain).range(this.state.dotFill); break;
      }
    }
    if(this.state.dotRadiusScale)
      dotRadiusScale = d3.scaleSqrt().domain(this.state.dotRadiusDomain).range(this.state.dotRadius);
    
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
      .attr('class', d => `${d.properties['alpha-3']} country`)
      .attr('d', path)
      .attr('fill',this.state.mapFill)
      .attr('opacity',this.state.mapFillOpacity)
      .attr('stroke',this.state.mapStroke)
      .attr('stroke-width', this.state.mapStrokeWidth)
      .attr('fill-opacity', this.state.mapFillOpacity)
      .attr('stroke-opacity', this.state.mapStrokeOpacity)
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
      .selectAll('.dot')
      .data(this.state.data)
      .enter()
      .append('circle')
      .attr('class', d => 'dot')
      .attr('r', d => {
        if(!this.state.dotRadiusScale)
            return this.state.dotRadius;
        else
            return dotRadiusScale(d[this.state.dotRadiusColumn])
      })
      .attr('fill', d => {
        if(!this.state.dotColorScale)
            return this.state.dotFill;
        else
            return dotColorScale(d[this.state.dotFillColumn])
      })
      .attr('stroke-width', this.state.dotStrokeWidth)
      .attr('stroke', this.state.dotStroke)
      .attr('fill-opacity', this.state.dotFillOpacity)
      .attr('stroke-opacity', this.state.dotStrokeOpacity)
      .attr('opacity', this.state.dotOpacity)
      .attr('cx',d => projection_scale([d.Longitude,d.Latitude])[0])
      .attr('cy',d => projection_scale([d.Longitude,d.Latitude])[1])
  }
  
  render() {
      if (this.state.loadError) {
        return <div>couldn't load file</div>;
      }
      if (!this.state.data) {
        return <svg />;
      }
      else{
        return <g
          ref={node => this.node = node}
          id = {'mapG'}
          >
        </g>
      }
  }
}
export default MapDot
