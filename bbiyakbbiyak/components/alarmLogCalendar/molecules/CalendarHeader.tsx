import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { CalendarHeaderStyles } from './CalendarHeader.style';
import { useAtom } from 'jotai';
import { selectedCalendarDateAtom } from '../../../store/selectedCalendarDateAtom';

const CalendarHeader = ({ currentDate, setCurrentDate, today, calendarDataMutate }: any) => {

  const [selectedDate, setSelectedDate] = useAtom(selectedCalendarDateAtom);
  const month = currentDate.month;
  const year = currentDate.year;

  // 이전 달로 이동
  const decreaseMonth = () => {
    setCurrentDate((prevData: any) => {
      let tempMonth = prevData.month - 1;
      let tempYear = prevData.year;
      if (tempMonth == 0) {
        tempMonth = 12
        tempYear--
      }
      // calendarDataMutate(`${tempYear}-${tempMonth.toString().padStart(2, '0')}`);
      return { ...prevData, month: tempMonth, year: tempYear }
    })
  };

  // 다음 달로 이동
  const increaseMonth = () => {
    setCurrentDate((prevData: any) => {
      let tempMonth = prevData.month + 1;
      let tempYear = prevData.year;
      if ((prevData.month + 1) === 13) {
        tempMonth = 1
        tempYear++
      }
      // calendarDataMutate(`${tempYear}-${tempMonth.toString().padStart(2, '0')}`);
      return { ...prevData, month: tempMonth, year: tempYear }
    })
  };

  const gotToToday = () => {
    setCurrentDate(today);
    setSelectedDate(today);
  };

  return (
    <>
      <View style={CalendarHeaderStyles.rootContainer}>

        <View style={CalendarHeaderStyles.leftContainer}>

          <View style={CalendarHeaderStyles.yearMonthTextWrap}>
            <Text style={CalendarHeaderStyles.yearMonthText}>
              {`${year}년 ${month}월`}
            </Text>
          </View>

          {/* <View style={CalendarHeaderStyles.todayButtonWrap}>
            <Pressable
              onPress={gotToToday}
              style={CalendarHeaderStyles.todayButton}
            >
              <Text style={CalendarHeaderStyles.todayText}>오늘</Text>
            </Pressable>
          </View> */}

        </View>

        <View style={CalendarHeaderStyles.buttonContainer}>

          <Pressable onPress={decreaseMonth} style={CalendarHeaderStyles.backwardContainer}>
            <Ionicons name='chevron-back-outline' size={20} />
          </Pressable>

          <Pressable onPress={increaseMonth} style={CalendarHeaderStyles.forwardContainer}>
            <Ionicons name='chevron-forward-outline' size={20} />
          </Pressable>

        </View>

      </View >
    </>
  )
}

export default CalendarHeader
