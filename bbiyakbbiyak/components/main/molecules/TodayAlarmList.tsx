import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { dummyData } from '../dummyData'
import { GlobalTheme } from '../../../constants/theme'
import TodayAlarmDetails from './TodayAlarmDetails'

const TodayAlarmList = ({ item }: any) => {

  const [allSpecifiedTakenByTime, setAllSpecifiedTakenByTime] = useState(false);

  const [count, setCount] = useState(0);

  const allTakenHandler = () => {
    if (count >= 0 && count !== 5) {
      setCount(5);
    } else if (count === 5) {
      setCount(0)
    }
  }

  useEffect(() => {
    // console.log(count === (item.titles.length))
    // console.log(count)
    if (count === (item.titles.length)) {
      setAllSpecifiedTakenByTime(true)
    } else if (count < 5) {
      setAllSpecifiedTakenByTime(false)
    }
  }, [count])


  return (
    <>
      <View style={{
        backgroundColor: '#fff',
        paddingHorizontal: 18,
        flexDirection: 'row',
      }}>

        <View style={{ flex: 22, paddingTop: 4 }}>
          <Pressable onPress={allTakenHandler}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <View style={
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                }
              }>
                {/* 시계 아이콘 */}
                <Ionicons name='alarm' size={20} color={GlobalTheme.colors.accent500} style={{
                  paddingRight: 4,
                }} />

                {/* 시간 */}
                <Text style={{
                  fontSize: 14,
                  fontFamily: 'pretendard',
                }}>
                  {item.time}
                </Text>
              </View>

              {/* 전체 선택 */}
              <View style={
                {
                  paddingHorizontal: 20,
                }
              }>
                <Ionicons name='radio-button-on' size={20} color={allSpecifiedTakenByTime ? GlobalTheme.colors.primary500 : '#999'} />
              </View>
            </View>
          </Pressable>

        </View>



        {/* 세부 알람 컴포넌트 */}
        <FlatList
          data={dummyData[parseInt(item.id)]?.titles}

          style={{
            flex: 30
          }}

          renderItem={({ item }) =>
          (
            <TodayAlarmDetails
              item={item}
              count={count}
              setCount={setCount}
              allSpecifiedTakenByTime={allSpecifiedTakenByTime} />
          )
          } />

      </View>


      {/* 구분선 */}
      <View style={{
        alignItems: 'flex-end',
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
      }}>
        <View style={{
          width: '100%',
          borderBottomWidth: 2,
          borderColor: GlobalTheme.colors.primary700,
          flexDirection: 'row',
        }}>
        </View>
      </View>
    </>
  )
}

export default TodayAlarmList
