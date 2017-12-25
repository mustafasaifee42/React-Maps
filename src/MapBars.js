import React, { Component } from 'react';
import './App.css';
import { select } from 'd3-selection';
import * as topojson from 'topojson';
import * as d3GeoProjection from 'd3-geo-projection';
import { csv } from 'd3-request';
import * as d3 from 'd3';

class MapBars extends Component {
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
          barHeightScale: (this.props.barHeightScale == null ? 'Linear' : this.props.barHeightScale),
          barHeightColumn: this.props.barHeightColumn,
          barHeightDomain: this.props.barHeightDomain,
          barHeightRange: this.props.barHeightRange,
          barWidth: (this.props.barWidth == null ? 5 : this.props.barWidth),
          barOpacity: (this.props.barOpacity == null ? 1 : this.props.barOpacity),
          barFill: (this.props.barFill == null ? '#000' : this.props.barFill),
          barFillOpacity: (this.props.barFillOpacity == null ? 1 : this.props.barFillOpacity),
          barStrokeWidth: (this.props.barStrokeWidth == null ? 0 : this.props.barStrokeWidth),
          barStroke: (this.props.barStroke == null ? 'none' : this.props.barStroke),
          barStrokeOpacity: (this.props.barStrokeOpacity == null ? 1 : this.props.barStrokeOpacity),
        }
      this.createMapBars = this.createMapBars.bind(this)
    }
  componentWillMount() {
    csv(this.state.dataFile, (error, data) => {
      data = data.map(d => {
        if(this.state.choropleth)
          d[this.state.choroplethColumn] = +d[this.state.choroplethColumn];
        d[this.state.barHeightColumn] = +d[this.state.barHeightColumn];
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
            d.properties[this.state.barHeightColumn] = 'NA';
          }
          else{
            if(this.state.choropleth)
              d.properties[this.state.choroplethColumn] = data[countryTemp.indexOf(d.properties[this.state.countryIdentifier])][this.state.choroplethColumn]
            d.properties[this.state.barHeightColumn] = data[countryTemp.indexOf(d.properties[this.state.countryIdentifier])][this.state.barHeightColumn]
          }
        })

        this.state.mapData.objects.countries.geometries.sort((x, y) => {
          return d3.ascending(x.properties[this.state.barHeightColumn], y.properties[this.state.barHeightColumn]);
        })
        let domain = this.props.choroplethDomain, heightDomain = this.props.barHeightDomain;
        if(this.state.choropleth){
          if(this.props.choroplethDomain == null){
            domain =  [(d3.min(data.map(d =>  d[this.state.choroplethColumn]))),(d3.max(data.map(d =>  d[this.state.choroplethColumn])))]
          }
        }
        if(this.props.barHeightDomain == null){
          heightDomain =  [(d3.min(data.map(d =>  d[this.state.barHeightColumn]))),(d3.max(data.map(d =>  d[this.state.barHeightColumn])))]
        }
        this.setState({
          data: data,
          choroplethDomain: domain,
          barHeightDomain: heightDomain,
        });
      }
    });
  }
  componentDidUpdate() {
      this.createMapBars()
    }
  createMapBars(){
    const node = this.node;
    let data = this.state.mapData, projection, scale, barHeightScale;
    let features = topojson.feature(this.state.mapData, this.state.mapData.objects.countries).features;
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
    switch(this.state.barHeightScale){   
      case ('Linear'): barHeightScale = d3.scaleLinear().domain(this.state.barHeightDomain).range(this.state.barHeightRange);
      case ('Log'): barHeightScale = d3.scaleLog().domain(this.state.barHeightDomain).range(this.state.barHeightRange);
      default: barHeightScale = d3.scaleLinear().domain(this.state.barHeightDomain).range(this.state.barHeightRange);
    }
    let projection_scale = projection
      .scale(this.state.mapScale)
      .translate([this.state.width / 2, this.state.height / 2]);

    let Zoom = d3.zoom().scaleExtent([0.8, 8]).on('zoom', zoomed);

    let path = d3.geoPath().projection(projection_scale);
    let mapSVG = select(node).call(Zoom);
    let zoomGroup = mapSVG.append('g');


    console.log(features)
    data.objects.countries.geometries.forEach((d, i) => {
      console.log(features[i])
      d.properties.centroid = path.centroid(features[i]);
    });

    data.objects.countries.geometries.sort((a, b) => {
      return d3.ascending(a.properties.centroid[1], b.properties.centroid[1]);
    });

    console.log(data);

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
      .data(topojson.feature(data, data.objects.countries).features)
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
      .selectAll('.bar')
      .data(topojson.feature(data, data.objects.countries).features)
      .enter()
      .append('rect')
      .attr('class', d => `${d.properties[this.state.countryIdentifier]}bar bar`)
      .attr('x',d => path.centroid(d)[0] - this.state.barWidth / 2)
      .attr('y',d => {
        if(d.properties[this.state.barHeightColumn] != 'NA')
          return path.centroid(d)[1] - barHeightScale(d.properties[this.state.barHeightColumn])
        else
          return path.centroid(d)[1]
      })
      .attr('fill',this.state.barFill)
      .attr('opacity',this.state.barOpacity)
      .attr('stroke',this.state.barStroke)
      .attr('stroke-width',this.state.barStrokeWidth)
      .attr('fill-opacity',this.state.barFillOpacity)
      .attr('stroke-opacity',this.state.barStrokeOpacity)
      .attr('height', d => {
        if(d.properties[this.state.barHeightColumn] != 'NA')
          return barHeightScale(d.properties[this.state.barHeightColumn])
        else
          return 0
      })
      .attr('width', this.state.barWidth)
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
        return <div>couldn't load file</div>;
      }
      if (!this.state.data) {
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
export default MapBars
