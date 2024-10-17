import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { TodayAlarmContainerStyles } from './TodayAlarmContainer.style'
import { dummyData } from '../dummyData'
import TodayAlarmHeader from './TodayAlarmHeader'
import TodayAlarmList from './TodayAlarmList'
import TodayAlarmEmpty from './TodayAlarmEmpty'
import AlarmLogEmpty from '../../alarmLogCalendar/molecules/AlarmLogEmpty'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getAlarm, getAlarmLog } from '../../../api'
import { useRoute } from '@react-navigation/native'
import { useAtom } from 'jotai'
import { selectedCalendarDateAtom } from '../../../store/selectedCalendarDateAtom'


const TodayAlarmContainer = ({ title, routeName }: any) => {
  const route = useRoute<any>();
  // console.log(routeName)

  const [selectedDate, setSelectedDate] = useAtom(selectedCalendarDateAtom);

  let logDate = selectedDate.dateString;

  const { data, mutate, isSuccess } = useMutation({
    mutationFn: routeName ? getAlarmLog : getAlarm,
    onSuccess(data) {
    },
    onError(error) {
      console.error(error)
    }
  })

  let category: 'medicine';

  // const { data, isSuccess, refetch, } = useQuery({
  //   queryKey: ['alarmLogList'],
  //   queryFn: async () => routeName ? await getAlarmLog(category) : await getAlarm(category, '1')
  // })

  useEffect(() => {
    if (!route.params?.category) {
      category = 'medicine'
    } else {
      category = route.params?.category;
    }
    console.log(1, category)
    mutate({ category, token: '', logDate })
    // refetch();
  }, [route.params, title, selectedDate])

  // if (data) {
  //   console.log('alarmData', data[0])
  // }


  const [allSpecifiedTakenByTime, setAllSpecifiedTakenByTime] = useState(false);
  const [specifiedTaken, setSpecifiedTaken] = useState(false);

  // 모든 알람 완료 체크하는 상태변수 추가해야 함




  const allTakenHandler = () => {
    setAllSpecifiedTakenByTime(!allSpecifiedTakenByTime);
    if (allSpecifiedTakenByTime) {
      setSpecifiedTaken(true);
    } else {
      setSpecifiedTaken(false);
    };
  }

  const takenHandler = () => {
    setSpecifiedTaken(!specifiedTaken);
  }

  if (!isSuccess) {
    return (
      <View>
        <ActivityIndicator size="large" color="#999" />
      </View>
    )
  }

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}

        style={TodayAlarmContainerStyles.container}

        ListHeaderComponent={(<TodayAlarmHeader title={title} routeName={routeName} alarmLength={data?.length} />)}
        ListHeaderComponentStyle={
          TodayAlarmContainerStyles.header
        }

        // 알람이 있을 때
        renderItem={({ item }) => (
          <TodayAlarmList item={item} routeName={routeName} />
        )}


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
