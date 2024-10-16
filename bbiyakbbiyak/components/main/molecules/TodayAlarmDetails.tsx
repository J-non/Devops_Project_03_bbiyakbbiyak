import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { GlobalTheme } from '../../../constants/theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { TodayAlarmDetailsStyles } from './TodayAlarmDetails.style';
import { useMutation } from '@tanstack/react-query';
import { updateIsTaken, updateLogIsTaken } from '../../../api';

const TodayAlarmDetails = ({ item, itemsCount, allSpecifiedTakenByTime, count, setCount, routeName }: any) => {
  const [specifiedTaken, setSpecifiedTaken] = useState<boolean>(item.isTaken);

  const [initState, setInitState] = useState(0)

  const { data, mutate } = useMutation({
    mutationFn: routeName ? updateLogIsTaken : updateIsTaken,
    onSuccess(data, variables, context) {
    },
    onError(error) {
      console.log(error);
    }
  })

  // 버튼 클릭 시 상태변수 감지 -> 요청
  useEffect(() => {
    if (initState === 0) return
    mutate({ id: item.id, isTaken: specifiedTaken });
  }, [specifiedTaken])

  const takenHandler = () => {
    setInitState(initState + 1)
    setSpecifiedTaken(!specifiedTaken);
  }


  // useEffect(() => {
  //   if (allSpecifiedTakenByTime) {
  //     setSpecifiedTaken(true);
  //   } else if (!allSpecifiedTakenByTime && count === 0) {
  //     setSpecifiedTaken(false);
  //   };
  // }, [allSpecifiedTakenByTime])


  // useEffect(() => {
  //   if (specifiedTaken) {
  //     setInitState(initState + 1)
  //     setCount((count: any) => {
  //       if (count >= itemsCount) return itemsCount
  //       return count + 1
  //     })
  //   } else {
  //     setInitState(initState + 1)
  //     setCount((count: any) => {
  //       if (count === 0) return 0
  //       return count - 1
  //     })
  //   }
  // }, [specifiedTaken])


  return (
    <View style={
      [
        TodayAlarmDetailsStyles.rootContainer,
        specifiedTaken && { borderColor: GlobalTheme.colors.primary500 }
      ]
    }>
      <Pressable style={TodayAlarmDetailsStyles.flex1} onPress={takenHandler} >
        <View style={TodayAlarmDetailsStyles.innerContentContainer}>

          <MaterialCommunityIcons
            name='pill'
            size={20}
            color={specifiedTaken ? GlobalTheme.colors.accent500 : '#999'}
            style={TodayAlarmDetailsStyles.iconPill} />

          <View style={TodayAlarmDetailsStyles.flex4}>
            <Text style={{
              color: specifiedTaken ? GlobalTheme.colors.accent500 : '#999'
            }}>
              {item.itemName}
            </Text>
          </View>

          <Ionicons
            name={specifiedTaken ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={20} color={specifiedTaken ? GlobalTheme.colors.accent500 : '#999'}
            style={TodayAlarmDetailsStyles.flex1} />

        </View>
      </Pressable>
    </View>
  )
}

export default TodayAlarmDetails
