import React from 'react'
import { View, Text} from 'react-native'
import Slider from '@react-native-community/slider'

import { FontAwesome, Entypo } from '@expo/vector-icons'
// Slider is deprecated from 'react-native'. instead, use yarn add @react-native-community/slider to import that package
// and then use import Slider from '@react-native-community/slider' at the top of the Slider.js

export default function USlider ({ max, unit, step, value, onChange}) {
  return (
    <View>
    
      <Slider
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      /> 
 
    

      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    
    </View>
  )
} 