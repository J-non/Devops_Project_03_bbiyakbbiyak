import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { TodayAlarmEmptyStyles } from './TodayAlarmEmpty.style';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { GlobalTheme } from '../../../constants/theme';

const TodayAlarmEmpty = () => {
  const navigation = useNavigation<any>();

  const goToSetAlarmHandler = () => {
    navigation.navigate('Alarm')
  }

  return (
    <>
      <View style={TodayAlarmEmptyStyles.rootContainer}>

        <View style={TodayAlarmEmptyStyles.innerContainer}>

          <View style={TodayAlarmEmptyStyles.descriptionContainer}>
            <Text style={TodayAlarmEmptyStyles.descriptionText}>
              오늘은 등록된 알람이 없어요.
            </Text>
            <Text style={TodayAlarmEmptyStyles.descriptionText}>
              새로운 알람을 추가 할까요?
            </Text>
          </View>


          <View style={TodayAlarmEmptyStyles.iconCalendarAddContainer}>
            <Pressable onPress={goToSetAlarmHandler}>
              <View style={TodayAlarmEmptyStyles.iconCalenderAddPressble}>
                <MaterialCommunityIcons name='calendar-clock-outline' color={GlobalTheme.colors.accent500} size={40} />
              </View>
            </Pressable>
          </View>

        </View>



        <Pressable onPress={goToSetAlarmHandler}>
          <View>
            <Text style={TodayAlarmEmptyStyles.addAlarmText}>알람 추가하기 {'>'}</Text>
          </View>
        </Pressable>

      </View>
    </>
  )
}

export default TodayAlarmEmpty
