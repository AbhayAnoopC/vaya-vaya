import { View, Text , TouchableOpacity} from 'react-native'
import React from 'react'
import tw from 'twrnc'
const Placard = () => {
  return (
    <View>
    <View style={tw` w-92 flex flex-row justify-around align-center`}>
        <View>
      <Text style={tw`font-medium text-xl`}>Tim Hortons</Text>
      <Text style={tw`font-light text-xs py-2`}>Away: 4mins</Text>
      <Text style={tw`font-light text-xs`}>Rec: Bagel with CreamCheese</Text>
      </View>
      <View style={tw`pt-1`}>
      <TouchableOpacity style={tw`bg-black rounded-lg justify-between text-center h-16 w-16`} >
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