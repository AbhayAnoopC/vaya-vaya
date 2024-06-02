import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Map from './Map.jsx'
import * as Notifications from 'expo-notifications';
import Placard from './Placard.jsx';
import tw from 'twrnc';
const Swipe = () => {
  const bottomSheetRef = useRef(null);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <Button title="do someting" /> */}
        <View style={styles.container}>
          <Map />

        </View>
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={['40%', '90%']}
          //overDragResistanceFactor = {10}
          opacity={1.9}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={tw`pb-4`}>Top Places For You :</Text>
            {/* <Button title="notification make" onPress={schedulePushNotification}></Button> */}
            <Placard/>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here', test: { test1: 'more data' } },
    },
    trigger: { seconds: 5 },
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

