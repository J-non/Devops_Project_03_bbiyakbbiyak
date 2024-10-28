import React, { useEffect, useState } from 'react'
import CategoryTabs from '../components/categoryTabs/CategoryTabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { CalendarTabs } from '../components/main/screens/MainScreenCategories';
import CalendarHeader from '../components/alarmLogCalendar/molecules/CalendarHeader';
import { useRoute } from '@react-navigation/native';
import { formatDate } from '../dateFormat/formatDate';
import { useAtom } from 'jotai';
import { selectedCalendarDateAtom } from '../store/selectedCalendarDateAtom';
import { View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { GlobalTheme } from '../constants/theme';
import { getMonthLog } from '../api';


const Stack = createNativeStackNavigator();

LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘'
};

LocaleConfig.defaultLocale = 'ko';



const LogCalendar = () => {
  const route = useRoute<any>();
  const today = new Date();
  const initDate = formatDate(today);


  const [currentDate, setCurrentDate] = useState(initDate);
  const [selectedDate, setSelectedDate] = useAtom(selectedCalendarDateAtom);


  const { data: calendarData, refetch: calendarDataRefetch, isSuccess } = useQuery({
    queryKey: [],
    queryFn: async () => await getMonthLog(`${currentDate.year}-${currentDate.month.toString().padStart(2, '0')}`)
  })


  useEffect(() => {
    calendarDataRefetch();
  }, [currentDate.month])


  // 선택된 날짜에 기록이 있는지 여부
  let isSelectedDateInCalendarData: boolean;
  if (isSuccess) {
    isSelectedDateInCalendarData = calendarData[selectedDate.dateString] !== undefined;
  }


  today.setDate(today.getDate() - 1);
  const formattedMaxDate = (today).toISOString().split('T')[0]; // '2024-10-07' 형태로 변환


  return (
    <>
      <Calendar
        onDayPress={(day: any) => { setSelectedDate(day), setCurrentDate(day) }} // 누를시 날짜 선택
        onDayLongPress={(day: any) => { setSelectedDate(day), setCurrentDate(day) }} // 누를시 날짜 선택
        maxDate={formattedMaxDate} // 오늘 날짜까지 선택 가능
        // 커스텀 헤더 렌더링
        renderHeader={() =>
          <CalendarHeader
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            today={initDate}
            calendarDataRefetch={calendarDataRefetch}
          />
        } // 커스텀 헤더 렌더링
        hideArrows={true}
        initialDate={`${currentDate.year}-${currentDate.month}`}
        theme={{
          todayTextColor: '#999',
          textSectionTitleColor: '#000',
          dotStyle: { marginTop: 8 },
          textDayFontFamily: 'pretendard',
          textDayHeaderFontFamily: 'pretendard',
        }}
        firstDay={0} // 일요일부터 시작 (0이 일요일, 1이 월요일)

        markedDates={{
          ...calendarData,
          [selectedDate.dateString]: {
            selected: true,
            selectedColor: GlobalTheme.colors.primary300,
            selectedTextColor: '#000',
            marked: isSelectedDateInCalendarData,
            dotColor: 'blue',
            disableTouchEvent: true
          }
        }}
      />
      <View style={{ height: 12, backgroundColor: '#fff' }}></View>
      <CategoryTabs />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='medicineCalendar' component={CalendarTabs} initialParams={{ routeName: route.name }} />
        <Stack.Screen name='drinkCalendar' component={CalendarTabs} initialParams={{ routeName: route.name }} />
        <Stack.Screen name='etcCalendar' component={CalendarTabs} initialParams={{ routeName: route.name }} />
      </Stack.Navigator>
    </>
  )
}

export default LogCalendar
