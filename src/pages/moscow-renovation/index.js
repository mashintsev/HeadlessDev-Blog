import 'mapbox-gl/dist/mapbox-gl.css';

import React from 'react';
import { graphql } from 'gatsby'
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Page from '@atlaskit/page'
import PageHeader from '@atlaskit/page-header';
import MapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';

import Layout from '../../components/layout'
import Pin from './components/Pin';
import Info from './components/Info';

const Wrapper = styled.div`
  width: 1200px;
  min-width: 1200px;
  margin: 0 auto;
  padding: 0 18px;
`;

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};

class Index extends React.Component {
    state = {
        viewport: {
            width: 1200,
            height: 600,
            latitude: 55.76521282448719,
            longitude: 37.60353979769497,
            zoom: 9.2,
            altitude: 1.5,
            bearing: 0,
            pitch: 0,
        },
        popupInfo: null
    };

    _updateViewport = (viewport) => {
        this.setState({ viewport });
    };

    _renderMarker = (construction, index) => {
        const coords = JSON.parse(construction.coords);
        const popupInfo = {
            longitude: coords && coords[0],
            latitude: coords && coords[1],
            ...construction
        };
        return (
            <Marker
                key={`marker-${index}`}
                longitude={coords && coords[0]}
                latitude={coords && coords[1]}
            >
                <Pin size={20} onClick={() => this.setState({ popupInfo: popupInfo })} />
            </Marker>
        );
    };

    _renderPopup() {
        const { popupInfo } = this.state;

        return popupInfo && (
            <Popup tipSize={5}
                   anchor="top"
                   longitude={popupInfo.longitude}
                   latitude={popupInfo.latitude}
                   onClose={() => this.setState({ popupInfo: null })}>
                <Info info={popupInfo} />
            </Popup>
        );
    }

    render() {
        const { data } = this.props;
        return (
            <Layout>
                <Page>
                    <Helmet>
                        <title>Стартовые площадки</title>
                        <meta name="description" content="Карта со стартовыми объектам для реновации в Москве" />
                    </Helmet>
                    <Wrapper>
                        <PageHeader>Стартовые площадки реновации в Москве</PageHeader>
                        <MapGL
                            {...this.state.viewport}
                            mapStyle={'mapbox://styles/mapbox/streets-v9?optimize=true'}
                            onViewportChange={this._updateViewport}
                            mapboxApiAccessToken={'pk.eyJ1IjoibWFzaGludHNldiIsImEiOiJjamtpM3VobGUwYnQxM3BwaDRqeWh3bnJ1In0.SoGp8UVhutW2fNZ-gCzMAg'}
                        >
                            {data.allStroiMosRenovation.edges
                                .map(item => item.node)
                                .filter(node => node.id !== 'dummy' && node.coords !== null)
                                .map(this._renderMarker)}
                            {this._renderPopup()}
                            <div className="nav" style={navStyle}>
                                <NavigationControl onViewportChange={this._updateViewport} />
                            </div>
                        </MapGL>
                    </Wrapper>
                </Page>
            </Layout>
        );
    }
}

export default Index


export const query = graphql`
   query MoscowRenovation {
      allStroiMosRenovation {
        edges {
          node {
            id
            coords
            end_year
            address
            url
            status
          }
        }
      }
    }
`;
