import PropTypes from 'prop-types';
import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    origin={origin}
    destination={destination}
    onReady={onReady}
    apikey="AIzaSyAAFz7wsoEsvZOY24eqBigX57ZdcUT-RbA"
    strokeWidth={3}
    strokeColor="#222"
  />
);

Directions.propTypes = {
  destination: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  origin: PropTypes.object,
  onReady: PropTypes.func,
};

Directions.defaultProps = {
  destination: {
    latitude: 0,
    longitude: 0,
  },
  origin: {},
  onReady: () => undefined,
};

export default Directions;
