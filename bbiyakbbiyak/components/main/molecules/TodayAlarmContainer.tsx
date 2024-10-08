import React, { useState } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { TodayAlarmContainerStyles } from './TodayAlarmContainer.style'
import { dummyData } from '../dummyData'
import TodayAlarmHeader from './TodayAlarmHeader'
import { Ionicons } from '@expo/vector-icons'
import { GlobalTheme } from '../../../constants/theme'
import TodayAlarmList from './TodayAlarmList'
import TodayAlarmEmpty from './TodayAlarmEmpty'
import AlarmLogEmpty from '../../alarmLogCalendar/molecules/AlarmLogEmpty'

const TodayAlarmContainer = ({ title, routeName }: any) => {

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

  return (
    <>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}

        style={TodayAlarmContainerStyles.container}

        ListHeaderComponent={(<TodayAlarmHeader title={title} routeName={routeName} />)}
        ListHeaderComponentStyle={
          TodayAlarmContainerStyles.header
        }

        // 알람이 있을 때
        renderItem={({ item }) => (
          <TodayAlarmList item={item} />
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
