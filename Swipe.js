
import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';


const Swipe = () => {
  const bottomSheetRef = useRef(null);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <View style={styles.container}>
        <MapView style={styles.map} />
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={['40%', '90%']}
          opacity={1.9}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </View>

    </GestureHandlerRootView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'grey',
    width: '100%',
    // borderRadius: '20'
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '60%',

  }
})

export default Swipe