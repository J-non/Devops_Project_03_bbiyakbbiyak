import React from 'react'
import { Text, View } from 'react-native'
import { TodayAlarmHeaderStyles } from './TodayAlarmHeader.style'
import { dummyData } from '../dummyData'

const TodayAlarmHeader = ({ title }: any) => {
  return (
    <>
      <View style={TodayAlarmHeaderStyles.alarmCategoryContainer}>
        <Text style={TodayAlarmHeaderStyles.alarmCategory}>{title}</Text>
      </View>

      <View style={TodayAlarmHeaderStyles.dateContainer}>
        <Text style={TodayAlarmHeaderStyles.date}>2024년 10월 2일 <Text style={TodayAlarmHeaderStyles.days}>수요일</Text></Text>
      </View>

      <View>
        <Text style={TodayAlarmHeaderStyles.countText}>총 0/{dummyData.length}개</Text>
      </View>
    </>
  )
}

export default TodayAlarmHeader
