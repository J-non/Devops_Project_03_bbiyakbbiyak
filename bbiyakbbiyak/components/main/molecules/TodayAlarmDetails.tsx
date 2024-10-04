import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { GlobalTheme } from '../../../constants/theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const TodayAlarmDetails = ({ item, allSpecifiedTakenByTime, count, setCount }: any) => {
  const [specifiedTaken, setSpecifiedTaken] = useState(false);

  const takenHandler = () => {
    setSpecifiedTaken(!specifiedTaken);
  }


  useEffect(() => {
    if (allSpecifiedTakenByTime) {
      setSpecifiedTaken(true);
    } else if (!allSpecifiedTakenByTime && count === 0) {
      setSpecifiedTaken(false);
    };
  }, [allSpecifiedTakenByTime])


  useEffect(() => {
    if (specifiedTaken) {
      setCount((count: any) => {
        if (count === 5) return 5
        return count + 1
      })
    } else {
      setCount((count: any) => {
        if (count === 0) return 0
        return count - 1
      })
    }
  }, [specifiedTaken])


  return (
    <View style={
      [{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#999',
        // minWidth: 190,
        height: 32,
        marginBottom: 10,
        overflow: 'hidden'
      }, specifiedTaken && { borderColor: GlobalTheme.colors.primary500 }]

    }>
      <Pressable style={{ flex: 1 }} onPress={takenHandler} >
        <View style={
          {
            // flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            // minWidth: 190,
            // maxWidth: 190,
            height: 32,
          }
        }>

          <MaterialCommunityIcons name='pill' size={20} color={specifiedTaken ? GlobalTheme.colors.accent500 : '#999'} style={{
            flex: 1,
            paddingLeft: 10
          }} />

          <View style={
            { flex: 4 }
          }>
            <Text style={
              {
                color: specifiedTaken ? GlobalTheme.colors.accent500 : '#999'
              }
            }>{item.title}</Text>
          </View>

          <Ionicons name={specifiedTaken ? 'checkmark-circle' : 'checkmark-circle-outline'} size={20} color={specifiedTaken ? GlobalTheme.colors.accent500 : '#999'} style={
            { flex: 1 }
          } />

        </View>
      </Pressable>
    </View>
  )
}

export default TodayAlarmDetails
