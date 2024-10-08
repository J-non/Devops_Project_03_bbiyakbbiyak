import React, { useEffect, useState } from 'react'
import CategoryTabs from '../components/categoryTabs/CategoryTabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { CalendarTabs } from '../components/main/screens/MainScreenCategories';
import CalendarHeader from '../components/alarmLogCalendar/molecules/CalendarHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { formatDate } from '../dateFormat/formatDate';
import { useAtom } from 'jotai';
import { selectedCalendarDateAtom } from '../store/selectedCalendarDateAtom';


const Stack = createNativeStackNavigator();

LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘'
};

LocaleConfig.defaultLocale = 'ko';



const LogClaendar = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();

  const today = new Date();

  const initDate = formatDate(today);


  const [currentDate, setCurrentDate] = useState(initDate);
  const [selectedDate, setSelectedDate] = useAtom(selectedCalendarDateAtom);


  const formattedToday = today.toISOString().split('T')[0]; // '2024-10-07' 형태로 변환


  return (
    <>
      <Calendar
        onDayPress={(day: any) => { setSelectedDate(day), setCurrentDate(day) }} // 누를시 날짜 선택
        onDayLongPress={(day: any) => { setSelectedDate(day), setCurrentDate(day) }} // 누를시 날짜 선택
        maxDate={formattedToday} // 오늘 날짜까지 선택 가능
        // 커스텀 헤더 렌더링
        renderHeader={() =>
          <CalendarHeader
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            today={initDate}
          />
        } // 커스텀 헤더 렌더링
        hideArrows={true}
        initialDate={`${currentDate.year}-${currentDate.month}`}
        theme={{
          textSectionTitleColor: '#000',
          dotStyle: { marginTop: 8 },
          textDayFontFamily: 'pretendard',
          textDayHeaderFontFamily: 'pretendard',
        }}
        firstDay={0} // 일요일부터 시작 (0이 일요일, 1이 월요일)

        // markingType={'multi-dot'} // 카테고리별 도트
        markedDates={{
          '2024-10-01': { marked: true, dotColor: 'red', activeOpacity: 0 },
          '2024-10-12': { marked: true, dotColor: 'blue' },
          '2024-10-15': { marked: true, dotColor: 'green' },
          [selectedDate.dateString]: { selected: true, marked: true, dotColor: true && 'red', disableTouchEvent: true },
        }}
      />
      <CategoryTabs />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='medicineCalendar' component={CalendarTabs} initialParams={{ routeName: route.name }} />
        <Stack.Screen name='drinkCalendar' component={CalendarTabs} initialParams={{ routeName: route.name }} />
        <Stack.Screen name='etcCalendar' component={CalendarTabs} initialParams={{ routeName: route.name }} />
      </Stack.Navigator>
    </>
  )
}

export default LogClaendar
