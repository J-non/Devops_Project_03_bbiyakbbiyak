import React from 'react'
import { Text, View } from 'react-native'
import { AlarmLogEmptyStyles } from './AlarmLogEmpty.style'

const AlarmLogEmpty = () => {
  return (
    <View style={AlarmLogEmptyStyles.container}>
      <Text>알람 없음</Text>
    </View>
  )
}

export default AlarmLogEmpty
