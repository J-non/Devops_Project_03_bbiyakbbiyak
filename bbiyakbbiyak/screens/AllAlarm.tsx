import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import OneAlarm from '../components/alarms/OneAlarm'
import { useAtom } from 'jotai'
import { alarmCountAtom } from '../store/alarmCountAtom'
import { useQuery } from '@tanstack/react-query'
import { fetchAlarms } from '../api/alarmApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

// 개별 Pressable 알람 한덩이 !~
const renderAlarm = ({ item }: any) => {
  return (
    <OneAlarm alarmData={item} /> // onToggle수정
  )
}

const AllAlarm = () => {
  // 알람 전체 개수 전역 상태
  const [alarmCount, setAlarmCount] = useAtom(alarmCountAtom)
  const [userToken, setUserToken] = useState('')

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('@token') // 토큰 가져오기
      setUserToken(token);
    }
    getToken()
  }, [])

  const { data: alarms, refetch } = useQuery({
    queryKey: ['alarms', userToken], // 토큰이 변경될 때도 refetch
    queryFn: () => fetchAlarms({ userToken }),
  });

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [userToken, refetch])
  )

  useEffect(() => {
    if (alarms) {
      setAlarmCount(alarms.length);
    }
  }, [alarms]);


  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={alarmCount === 10 ? styles.alertText : styles.normalText}>등록된 알람이 {alarmCount}/10 개 있어요</Text>
      </View>
      <FlatList
        style={styles.flatList}
        data={alarms} // 데이터 객체의 배열
        keyExtractor={(el) => { return el.id.toString() }}
        renderItem={renderAlarm} />
    </View>
  )
}

export default AllAlarm


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
    flex: 1
  },
  topBar: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#fff'
  },
  alertText: {
    color: 'red',
    fontFamily: 'pretendard-bold'
  },
  normalText: {
    fontFamily: 'pretendard'
  },
  flatList: {
    flex: 1,
  },
})

