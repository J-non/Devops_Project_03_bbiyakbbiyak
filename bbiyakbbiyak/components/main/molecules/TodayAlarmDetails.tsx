import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { GlobalTheme } from '../../../constants/theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { TodayAlarmDetailsStyles } from './TodayAlarmDetails.style';

const TodayAlarmDetails = ({ item, itemsCount, allSpecifiedTakenByTime, count, setCount }: any) => {
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
        if (count >= itemsCount) return itemsCount
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
      [
        TodayAlarmDetailsStyles.rootContainer,
        specifiedTaken && { borderColor: GlobalTheme.colors.primary500 }
      ]
    }>
      <Pressable style={TodayAlarmDetailsStyles.flex1} onPress={takenHandler} >
        <View style={TodayAlarmDetailsStyles.innerContentContainer}>

          <MaterialCommunityIcons
            name='pill'
            size={20}
            color={specifiedTaken ? GlobalTheme.colors.accent500 : '#999'}
            style={TodayAlarmDetailsStyles.iconPill} />

          <View style={TodayAlarmDetailsStyles.flex4}>
            <Text style={{
              color: specifiedTaken ? GlobalTheme.colors.accent500 : '#999'
            }}>
              {item.title}
            </Text>
          </View>

          <Ionicons
            name={specifiedTaken ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={20} color={specifiedTaken ? GlobalTheme.colors.accent500 : '#999'}
            style={TodayAlarmDetailsStyles.flex1} />

        </View>
      </Pressable>
    </View>
  )
}

export default TodayAlarmDetails
