import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Map from './Map.jsx'
import * as Notifications from 'expo-notifications';
import Placard from './Placard.jsx';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
const Swipe = () => {
  const bottomSheetRef = useRef(null);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const places = useSelector(state => state.nav.places);
  console.log("SWIPPPY:  ", places)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <Button title="do someting" /> */}
        <View style={styles.container}>
          <Map />

        </View>
        <BottomSheet
          ref={bottomSheetRef}
          onChange={schedulePushNotification}
          snapPoints={['40%', '90%']}
          //overDragResistanceFactor = {10}
          opacity={1.9}
        >
          <BottomSheetView style={styles.contentContainer}>

            {places.map((place) => <Placard place={place} />)}
            {/* <Placard/> */}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "WE FOUND YOU A MATCH 🥵",
      body: 'We found a restraunt you may like based on your prefrences and history😋',
      data: { data: 'goes here', test: { test1: 'more data' } },
    },
    trigger: { seconds: 15 },
  });
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: 'grey',
    width: '100%',
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
  }
});
export default Swipe