import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import Slider from '@react-native-community/slider'
import { gray } from '../utils/colors'

import { FontAwesome, Entypo } from '@expo/vector-icons'
// Slider is deprecated from 'react-native'. instead, use yarn add @react-native-community/slider to import that package
// and then use import Slider from '@react-native-community/slider' at the top of the Slider.js

export default function USlider ({ max, unit, step, value, onChange}) {
  return (
//     <View>
    
//       <Slider
//         step={step}
//         value={value}
//         maximumValue={max}
//         minimumValue={0}
//         onValueChange={onChange}
//       /> 
 
    

//       <View>
//         <Text>{value}</Text>
//         <Text>{unit}</Text>
//       </View>
    
//     </View>
//   )
// } 

<View style={styles.row}>
      <Slider
        style={{flex: 1}}
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View style={styles.metricCounter}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
})