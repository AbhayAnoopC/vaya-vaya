import { View, Text , TouchableOpacity, Linking} from 'react-native'
import React from 'react'
import tw from 'twrnc'
const Placard = ({place}) => {
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
  return (
    <View>
    <View style={tw` w-92 flex flex-row justify-around align-center`}>
        <View>
      <Text style={tw`font-medium text-xl w-36`}>{place.displayName.text}</Text>
      <Text style={tw`font-light text-xs py-2`}>Away: {getRandomNumber(4, 15)}mins</Text>
      <Text style={tw`font-light text-xs`}>Rec: {place.types[0]}</Text>
      </View>
      <View style={tw`pt-1`}>
      <TouchableOpacity style={tw`bg-black rounded-lg justify-between text-center h-16 w-16`} onPress={() =>{ 
        const mapname = place.displayName.text.split(" ").join("+");
        Linking.openURL(`comgooglemaps://?q=The+Royal+Tandoor`)}}>
      	<Text style={tw`  text-lg pt-4 justify-center text-center text-white`}> Go</Text>
    </TouchableOpacity>
      </View>
    </View>
    <View style={tw`flex flex-row align-center py-4`}>
  <View style={{flex: 1, height: 1, backgroundColor: '#EDEDED'}} />

  <View style={{flex: 1, height: 1, backgroundColor: '#EDEDED'}} />
</View>
    </View>
  )
}

export default Placard