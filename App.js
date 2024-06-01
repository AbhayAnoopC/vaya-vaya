
import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import Swipe from './Swipe.js'

const App = () => {

  return (
    <Swipe/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '60%',
  }
});

export default App;
