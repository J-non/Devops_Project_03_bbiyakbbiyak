import React, { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { TodayAlarmContainerStyles } from './TodayAlarmContainer.style'
import TodayAlarmHeader from './TodayAlarmHeader'
import TodayAlarmList from './TodayAlarmList'
import TodayAlarmEmpty from './TodayAlarmEmpty'
import AlarmLogEmpty from '../../alarmLogCalendar/molecules/AlarmLogEmpty'
import { useQuery } from '@tanstack/react-query'
import { getAlarm, getAlarmLog } from '../../../api'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useAtom } from 'jotai'
import { selectedCalendarDateAtom } from '../../../store/selectedCalendarDateAtom'
import { categoryAtom, logCategoryAtom } from '../../../store/categoryAtom'


const TodayAlarmContainer = ({ title, routeName }: any) => {
  const route = useRoute<any>();

  const [selectedDate, setSelectedDate] = useAtom(selectedCalendarDateAtom);
  const [queryCategory, setQueryCategory] = useAtom(categoryAtom)
  const [queryLogCategory, setQueryLogCategory] = useAtom(logCategoryAtom);

  let logDate = selectedDate.dateString;

  // let category: string;

  const { data: alarmLogData, isSuccess: alarmLogIsSuccess, refetch: alarmLogRefetch, } = useQuery({
    queryKey: ['alarmLogList'],
    queryFn: async () => await getAlarmLog({ category: queryLogCategory, token: '', logDate }),
  })
  const { data: alarmData, isSuccess: alarmIsSuccess, refetch: alarmRefetch, } = useQuery({
    queryKey: ['alarmList'],
    queryFn: async () => await getAlarm({ category: queryCategory, token: '', logDate }),
  })


  // useEffect(() => {
  // if (!route.params?.category) {
  //   category = 'medicine'
  // } else {
  //   category = route.params?.category;
  // }
  // }, [queryLogCategory, queryCategory])

  // 화면이 포커스될 때마다 refetch를 호출
  useFocusEffect(
    useCallback(() => {
      if (!routeName) {
        alarmRefetch();
      }
      if (routeName) {
        alarmLogRefetch()
      }
    }, [alarmRefetch, selectedDate])
  );



  const [allSpecifiedTakenByTime, setAllSpecifiedTakenByTime] = useState(false);
  const [specifiedTaken, setSpecifiedTaken] = useState(false);




  // 모든 알람 완료 체크하는 상태변수 추가해야 함

  // const allTakenHandler = () => {
  //   setAllSpecifiedTakenByTime(!allSpecifiedTakenByTime);
  //   if (allSpecifiedTakenByTime) {
  //     setSpecifiedTaken(true);
  //   } else {
  //     setSpecifiedTaken(false);
  //   };
  // }

  // const takenHandler = () => {
  //   setSpecifiedTaken(!specifiedTaken);
  // }

  if (!alarmIsSuccess || !alarmLogIsSuccess) {
    return (
      <View>
        <ActivityIndicator size="large" color="#999" />
      </View>
    )
  }

  return (
    <>
      <FlatList
        data={routeName ? alarmLogData : alarmData}
        keyExtractor={(item) => item.id}

        style={TodayAlarmContainerStyles.container}

        ListHeaderComponent={(
          <TodayAlarmHeader
            title={title}
            routeName={routeName}
            alarmLength={routeName ? alarmLogData?.length : alarmData?.length}
          />
        )}
        ListHeaderComponentStyle={
          TodayAlarmContainerStyles.header
        }

        // 알람이 있을 때
        renderItem={({ item }) => {
          return <TodayAlarmList item={item} routeName={routeName} />
        }}


        // 알람이 없을 때
        ListEmptyComponent={(title ? <TodayAlarmEmpty /> : <AlarmLogEmpty />)}



        ListFooterComponent={(
          <View></View>
        )}

        ListFooterComponentStyle={
          TodayAlarmContainerStyles.footer
        }

        showsVerticalScrollIndicator={false}
      />
    </>
  )
}

export default TodayAlarmContainer
