import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { TodayAlarmHeaderStyles } from './TodayAlarmHeader.style'
import { dummyData } from '../dummyData'
import { useAtom } from 'jotai'
import { selectedCalendarDateAtom } from '../../../store/selectedCalendarDateAtom'

const TodayAlarmHeader = ({ title, routeName }: any) => {
  const [selectedDate, setSelectedDate] = useAtom(selectedCalendarDateAtom);
  const [selectedDay, setSelectedDay] = useState<number>(0);

  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  useEffect(() => {
    const dateTemp = new Date(selectedDate?.dateString);
    const dayTemp = dateTemp.getDay();
    setSelectedDay(dayTemp)
  }, [selectedDate])

  const todayDate = new Date();
  const todaysDay = todayDate.getDay();

  const formattedDate = `${selectedDate.year}년 ${selectedDate.month}월 ${selectedDate.day}일 `

  return (
    <>
      {
        title &&
        <View style={TodayAlarmHeaderStyles.alarmCategoryContainer}>
          <Text style={TodayAlarmHeaderStyles.alarmCategory}>{title}</Text>
        </View>
      }

      <View style={TodayAlarmHeaderStyles.dateContainer}>
        <Text style={routeName ? TodayAlarmHeaderStyles.dateTextOfCalendar : TodayAlarmHeaderStyles.dateText}>
          {routeName ? formattedDate : '2024년 10월 2일 '}
          <Text style={routeName ? TodayAlarmHeaderStyles.daysTextOfCalendar : TodayAlarmHeaderStyles.daysText}>
            {routeName ? days[selectedDay] : days[todaysDay]}
          </Text>
        </Text>
      </View>


      {
        dummyData.length > 0 &&
        <View>
          <Text style={TodayAlarmHeaderStyles.countText}>총 0/{dummyData.length}개</Text>
        </View>
      }
    </>
  )
}

export default TodayAlarmHeader
