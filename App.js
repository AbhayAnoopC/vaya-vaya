
import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import Swipe from './Swipe.js'

const App = () => {

  return (
    <Swipe />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    borderRadius: 20,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 20,
  },
});

export default App;
