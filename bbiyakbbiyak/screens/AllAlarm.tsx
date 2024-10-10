import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import OneAlarm from '../components/alarms/OneAlarm'
import { useAtom } from 'jotai'
import { alarmCountAtom } from '../store/alarmCountAtom'

// 알람 데이터를 서버에서 가져오기 !!!
const fetchAlarms = () => { }

// 활성화 상태 토글 함수
const toggleSwitch = () => { }


// 개별 Pressable 알람 한덩이 !~
const renderAlarm = ({ item }: any) => {
  return (
    <OneAlarm alarmData={item} onToggle={() => { return }} /> // onToggle수정
  )
}

const AllAlarm = () => {
  // 탠스택 쿼리 클라이언트 인스턴스 가져오고


  // 알람 전체 개수 전역 상태
  const [alarmCount, setAlarmCount] = useAtom(alarmCountAtom)

  useEffect(() => {
    setAlarmCount(alarms.length)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={alarmCount === 10 ? styles.alertText : styles.normalText}>등록된 알람이 {alarmCount}/10 개 있어요</Text>
      </View>
      <FlatList
        data={alarms} // 데이터 배열
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
  }
})






const alarms = [
  {
    id: 1,
    category: '약',
    time: "08:00:00",
    active: "true",
    days: ["월", "수", "금"],
    name: ["감기약", "비타민"]
  },
  {
    id: 2,
    category: '물',
    time: "22:00:00",
    active: "true",
    days: ["토", "일"],
    name: ["콜라", "사이다"]
  },
  {
    id: 3,
    category: '기타',
    time: "20:00:00",
    active: "true",
    days: ["토", "일"],
    name: ["운동하기", "러닝하기"]
  },
  {
    id: 4,
    category: '약',
    time: "20:00:00",
    active: "true",
    days: ["토", "일"],
    name: ["오메가3", "마그네슘"]
  },
  {
    id: 5,
    category: '약',
    time: "20:00:00",
    active: "true",
    days: ["토", "일"],
    name: ["오메가3", "마그네슘"]
  },
  {
    id: 6,
    category: '약',
    time: "20:00:00",
    active: "true",
    days: ["토", "일"],
    name: ["오메가3", "마그네슘"]
  },
  {
    id: 7,
    category: '약',
    time: "20:00:00",
    active: "true",
    days: ["토", "일"],
    name: ["오메가3", "마그네슘"]
  },
  {
    id: 8,
    category: '약',
    time: "20:00:00",
    active: "true",
    days: ["토", "일"],
    name: ["오메가3", "마그네슘"]
  },
  {
    id: 9,
    category: '약',
    time: "20:00:00",
    active: "true",
    days: ["토", "일"],
    name: ["오메가3", "마그네슘"]
  },


]
