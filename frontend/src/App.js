import React, {Component} from 'react';
import {connect} from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from 'kepler.gl';
import {toggleModal} from 'kepler.gl/actions/';
import './App.css';
import {MAPS_MODAL_OPTIONS} from './constants/settings';

class App extends Component {
  state = {
    loaded: false
  }

  componentDidMount() {
    this.showMapsModal()
  }

  showMapsModal() {
    const options = {...MAPS_MODAL_OPTIONS}
    console.log(toggleModal)
    this.props.dispatch(toggleModal(options))
  }

  render () {
    return (
      <div style={{
        transition: 'margin 1s, height 1s',
        position: 'absolute',
        width: '100%',
        height: '100%',
        minHeight: `calc(100% - 30px)`,
        marginTop: 0
      }}>
        <AutoSizer>
          {({ height, width }) => (
            <KeplerGl
              id="map"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              width={width}
              height={height}
              version="v2.5.4"
            />
          )}
        </AutoSizer>
      </div>
    )
  }
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(App);
