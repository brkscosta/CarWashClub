import React, { useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid } from 'react-native';
import { useAuth } from '../../../contexts/auth';
// import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// import { Container } from './styles';

import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYnJrc2Nvc3RhIiwiYSI6ImNrbDE0a3FqdTBzNGYycHBlZXYycXF0ZmoifQ.5j-ApJDBQj47xiZ3yE2SbA'
);

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: wp('156%'),
    width: hp('56%'),
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

const Map = () => {
  const [currentLatLong, setCurrentLatLong] = useState([
    -8.113255899408557,
    39.573504405365924,
  ]);

  useEffect(() => {
    const getPermitions = async () => {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
    };

    const getGeolocation = () => {};

    getPermitions();
    getGeolocation();
  }, []);

  const getCurrentCoordinates = (feature) => {
    console.log('Coords:', feature.geometry.coordinates);
    setCurrentLatLong(feature.geometry.coordinates);
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          logoEnabled={false}
          showUserLocation={true}
          styleURL={MapboxGL.StyleURL.Street}
          onPress={(feature) => getCurrentCoordinates(feature)}
          localizeLabels={true}
          initialCenterCoordinate={currentLatLong}
        >
          <MapboxGL.PointAnnotation
            id="1"
            title="Porto"
            onSelected={() => <MapboxGL.Camera zoomLevel={15} />}
            coordinate={[-8.42025987448747, 40.20334188453535]}
          />
          <MapboxGL.PointAnnotation
            id="2"
            title="Coimbra"
            onSelected={() => <MapboxGL.Camera zoomLevel={15} />}
            coordinate={[-9.171266659327415, 38.710659835835116]}
          />
          <MapboxGL.PointAnnotation
            id="3"
            title="Setúbal"
            onSelected={() => <MapboxGL.Camera zoomLevel={15} />}
            coordinate={[-8.848607405133635, 38.52273225730033]}
          />

          <MapboxGL.PointAnnotation
            id="3"
            title="Portimão"
            onSelected={() => alert('Portimão')}
            coordinate={[-8.539388644286788, 37.14124063317642]}
          />
          <MapboxGL.UserLocation
            visible={true}
            renderMode="normal"
            androidRenderMode="normal"
          />
          <MapboxGL.Camera zoomLevel={6} centerCoordinate={currentLatLong} />
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

export default Map;
