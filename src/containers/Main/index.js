import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import Map from '~/components/Map';

Geocoder.init('AIzaSyAAFz7wsoEsvZOY24eqBigX57ZdcUT-RbA');

const Main = () => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
    location: null,
  });
  const [destination, setDestination] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const options = {
      timeout: 2000,
      enableHighAccuracy: true,
      maximumAge: 1000,
    };

    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const shortAddress = address.substring(0, address.indexOf(','));

        setRegion({
          ...region,
          latitude,
          longitude,
        });
        setLocation(shortAddress);
      },
      error => Alert.alert(error.message),
      options,
    );
  }, []);

  const handleOnLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude },
    } = geometry;
    setDestination({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });
  };

  const handleOnBackPress = () => {
    setDestination(null);
  };

  return (
    <Map
      region={region}
      destination={destination}
      location={location}
      onPressBackButton={handleOnBackPress}
      onLocationSelected={handleOnLocationSelected}
    />
  );
};

export default Main;
