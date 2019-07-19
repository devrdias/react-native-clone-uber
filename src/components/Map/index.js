import React, { useState, useRef, Fragment } from 'react';
import MapView, { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Back,
  Container,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
} from './styles';
import SearchInput from '~/components/SearchInput';
import Directions from '~/components/Directions';
import { getPixelSize } from '~/components/utils';
import Details from '~/components/Details';

import markerImage from '~/assets/marker.png';
import backImage from '~/assets/back.png';

const Map = ({
  region,
  destination,
  location,
  onLocationSelected,
  onPressBackButton,
}) => {
  const [timeToDestination, setTimeToDestination] = useState(0);

  const inputEl = useRef(null);

  const handleOnReady = ({ coordinates, duration }) => {
    setTimeToDestination(Math.floor(duration));

    inputEl.current.fitToCoordinates(coordinates, {
      edgePadding: {
        right: getPixelSize(50),
        left: getPixelSize(50),
        top: getPixelSize(50),
        bottom: getPixelSize(350),
      },
    });
  };

  return (
    <Container>
      <MapView
        ref={inputEl}
        style={{ flex: 1 }}
        region={region}
        showsUserLocation
        loadingEnabled
      >
        {destination && (
          <Fragment>
            <Directions
              origin={region}
              destination={destination}
              onReady={handleOnReady}
            />
            <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
              <LocationBox>
                <LocationText>{destination.title}</LocationText>
              </LocationBox>
            </Marker>

            <Marker
              coordinate={destination}
              anchor={{ x: 0, y: 0 }}
              image={markerImage}
            >
              <LocationBox>
                <LocationTimeBox>
                  <LocationTimeText>{timeToDestination}</LocationTimeText>
                  <LocationTimeTextSmall>min</LocationTimeTextSmall>
                </LocationTimeBox>
                <LocationText>{location}</LocationText>
              </LocationBox>
            </Marker>
          </Fragment>
        )}
      </MapView>

      {destination ? (
        <Fragment>
          <Back onPress={onPressBackButton}>
            <Image source={backImage} />
          </Back>
          <Details />
        </Fragment>
      ) : (
        <SearchInput onLocationSelected={onLocationSelected} />
      )}
    </Container>
  );
};

Map.propTypes = {
  region: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }),
  onLocationSelected: PropTypes.func,
  onPressBackButton: PropTypes.func,
  destination: PropTypes.object,
  location: PropTypes.string,
};

Map.defaultProps = {
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
  },
  onLocationSelected: () => undefined,
  onPressBackButton: () => undefined,
  destination: undefined,
  location: null,
};

export default Map;
