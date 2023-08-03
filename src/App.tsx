import {
  StyleSheet,
  View,
  Platform,
  Alert,
  Linking,
  PermissionsAndroid,
  ToastAndroid
} from 'react-native'
import React, { createContext, useState, useEffect, useRef } from 'react'
import { RootNavigation } from '../src/navigations'
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';

export const AppStateContext = createContext<any>(null);

const App = () => {
  const setGeoData = (_geoData: any) => {
    setGeo(_geoData)
  }

  const [geo, setGeo] = useState<any>({
    geoData: null,
    setGeoData
  })

  const [observing, setObserving] = useState(false);

  const watchId = useRef<number | null>(null);

  const stopLocationUpdates = () => {

    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setObserving(false);
    }
  };

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow GreatSaddle to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => { } },
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setGeoData(position);
        // console.log("[=====Geolocation.getCurrentPosition position=====]", position);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setGeoData(null);
        console.log("[=====Geolocation.getCurrentPosition error=====]", error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
      },
    );
  };

  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    setObserving(true);

    watchId.current = Geolocation.watchPosition(
      position => {
        setGeoData(position);
        // console.log("[=====Geolocation.watchPosition position=====]", position);
      },
      error => {
        setGeoData(null);
        console.log("[=====Geolocation.watchPosition error=====]", error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 240000,
        fastestInterval: 240000,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
        useSignificantChanges: false,
      },
    );
  };

  useEffect(() => {
    getLocationUpdates()
    return () => {
      stopLocationUpdates();
    };
  }, []);

  return (
    <AppStateContext.Provider value={geo}>
      <View style={Styles.container}>
        <RootNavigation />
      </View>
    </AppStateContext.Provider>
  )
}

export default App

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
})