import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Alert, Button, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import CategoryButton from '../components/alarms/CategoryButton'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import HeadText from '../components/alarms/HeadText';
import DaysBox from '../components/alarms/DaysBox';
import * as Animatable from 'react-native-animatable';
import ContentAddButton from '../components/alarms/ContentAddButton';
import ContentModal from '../components/alarms/ContentModal';
import ContentDetail from '../components/alarms/ContentDetail';
import { useAtom } from 'jotai';
import { userPushTokenAtom } from '../store/userPushTokenAtom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAlarms, delAlarms } from '../api/alarmApi';
import { updateAlarms } from '../api/alarmApi';
import { stringToDate } from '../util/stringToDate';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { GlobalTheme } from '../constants/theme';

// npm install @react-native-community/datetimepicker react-native-modal-datetime-picker

////////////////////////////// 알람 수정/생성 화면 입니다 //////////////////////////////

const ManageAlarm = ({ route, navigation }: any) => {
  const [userPushToken, setUserPushToken] = useAtom(userPushTokenAtom) // 푸시토큰 전역 상태
  const [category, setCategory] = useState('medicine'); // 선택 카테고리
  const [alarmTime, setAlarmTime] = useState(() => {
    const now = new Date()
    now.setSeconds(0)
    return now
  }); // 타겟 시간

  const [isDatePickerVisible, setDatePickerVisible] = useState(false) // picker 가시성
  const [selectedDays, setSelectedDays] = useState<number[]>([]); // 선택 요일 배열
  const [alarmContent, setAlarmContent] = useState<string[]>([]); // 항목 값들
  const [modalIsVisible, setModalIsVisible] = useState(false) // 모달
  const daysList = ['일', '월', '화', '수', '목', '금', '토']
  const boxRef = useRef<any>(null); // 참조 생성

  const showDatePicker = () => { setDatePickerVisible(true) }
  const hideDatePicker = () => { setDatePickerVisible(false) }
  const openModalHandler = () => { setModalIsVisible(true); }
  const closeModalHandler = () => { setModalIsVisible(false); }

  // 작성 인지 수정 인지 판단 해야함
  const editingAlarmId = route.params?.alarmId; // param이 없으면 undefined
  const isEditing = !!editingAlarmId; // boolean전환

  useEffect(() => {
    if (isEditing) {
      setCategory(route.params.alarmCategory);
      setAlarmTime(stringToDate(route.params.alarmTime));
      setSelectedDays(route.params.alarmDays);
      setAlarmContent(route.params.alarmName);
    }
  }, [isEditing, route.params]);


  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? '알람 수정하기' : '알람 생성하기'
    })
  }, [navigation, isEditing])

  ///////////////////////////////// 카테고리 선택시 함수
  const categoryHandler = (selected: any) => {
    if (alarmContent.length > 0 || selectedDays.length > 0) {
      Alert.alert(
        "경고",
        "카테고리 변경시 현재 작성중인 정보가 사라집니다. 변경하시겠습니까?",
        [
          { text: "취소" },
          {
            text: "변경", onPress: () => {
              setAlarmContent([]) // 항목 초기화
              setSelectedDays([]) // 날짜 초기화
              boxRef.current.pulse(300);
              setCategory(selected)
            }
          }
        ]
      );
    } else {
      setAlarmContent([]) // 항목 초기화
      setSelectedDays([]) // 날짜 초기화
      boxRef.current.pulse(300);
      setCategory(selected)
    }
  }
  ///////////////////////////////// 타임피커 확인시 함수
  const handleTimeConfirm = (time: any) => {
    setAlarmTime(time);
    hideDatePicker();
  }
  ///////////////////////////////// 요일 선택 토글 함수
  const toggleDay = (day: number) => { // 요일 선택/해제 토글
    if (selectedDays.includes(day)) { // 만약 상태에 요일이 들어가있으면
      setSelectedDays(selectedDays.filter((el) => { return el !== day })); // 선택 요일 이랑 같지 않은 요일만 따로 뺴서 set
    } else { // 들어가있지않으면 이전상태에 추가
      setSelectedDays([...selectedDays, day]);
    }
  };
  ///////////////////////////////// 모달에서 항목 등록시 추가 함수
  const modalConfirm = (inputValue: any) => {
    if (alarmContent.length < 10) { // 10개 제한 일단 걸어둠
      setAlarmContent(currentAlarmContent => [...currentAlarmContent, inputValue])
      closeModalHandler();
    } else {
      Alert.alert("경고", "항목은 10개까지 등록 가능합니다."),
        closeModalHandler();
    }
  }
  ///////////////////////////////// 항목 클릭시 제거 함수
  const delAlarmContent = (id: number) => {
    const updatedAlarms = alarmContent.filter((el, index) => index !== id);
    setAlarmContent(updatedAlarms);
  };

  ///////////////////////////////// 알람 삭제
  const delMutation = useMutation({
    mutationFn: delAlarms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alarms'] })
      navigation.goBack();
    }
  })
  const delAlarm = () => {
    Alert.alert(
      "알람 삭제",
      "정말 이 알람을 삭제하시겠습니까?",
      [
        { text: "취소" },
        {
          text: "삭제", onPress: () => {
            const userIdFromToken = 1 // 작성 유저 아이디임(token) @@@@@@@@@@@@@@@@@@@@@
            const alarmId = route.params.alarmId
            delMutation.mutate({ alarmId, userIdFromToken })
          }
        }
      ]
    );
  }

  //////////////////////////// 알람 수정/등록 함수 탠스택쿼리
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: isEditing ? updateAlarms : createAlarms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alarms'] }) // 특정 쿼리의 캐시 무효화, 관련 컴포넌트 데이터 리패치 유도
      navigation.goBack();
    }
  })

  const confirmAlarm = () => {
    const formattedTime = alarmTime.toLocaleTimeString('en-GB', {
      hour12: false,
      timeZone: 'Asia/Seoul',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/:/g, ':');
    // const userIdFromToken = AsyncStorage.getItem('token') // 토큰꺼내서 백에서 토큰풀어야함
    const userIdFromToken = 1 // 작성 유저 아이디임(token) @@@@@@@@@@@@@@@@@@@@@
    const alarmData = {
      category: category,
      targetTime: formattedTime,
      pushDay: selectedDays,
      itemName: alarmContent,
      deviceToken: userPushToken,
      pushMessage: '알림메세지',
      userIdFromToken: userIdFromToken, // 토큰값
    }
    if (isEditing) {
      mutation.mutate({ alarmId: route.params.alarmId, alarmData })
    } else {
      mutation.mutate({ alarmData });
    }
  }

  return (
    <View style={styles.container}>
      {/* **************************카테고리 박스************************** */}
      <View style={styles.categoryContainer}>
        <CategoryButton name={'약'} label={'medicine'} onPress={categoryHandler} isSelected={category === 'medicine'} />
        <CategoryButton name={'물, 음료'} label={'drink'} onPress={categoryHandler} isSelected={category === 'drink'} />
        <CategoryButton name={'기타'} label={'etc'} onPress={categoryHandler} isSelected={category === 'etc'} />
      </View>

      <View style={styles.alarmContainer}>
        {/* **************************시계 박스************************** */}
        <View>
          <Pressable style={styles.timeContainer} onPress={showDatePicker}>
            <Text style={styles.timeText}>
              {`${alarmTime.getHours() % 12 || 12}：${alarmTime.getMinutes().toString().padStart(2, '0')} `}
              <Text style={styles.amPm}>
                {`${alarmTime.getHours() >= 12 ? 'PM' : 'AM'}`}
              </Text>
            </Text>
          </Pressable>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideDatePicker}
            is24Hour={false}
            display='spinner'
            negativeButton={{ label: '취소', textColor: 'red' }}
            positiveButton={{ label: '확인' }}
            minuteInterval={5}
          />
        </View>
        {/* **************************요일 박스************************** */}
        <View style={styles.daysContainer}>
          {daysList.map((el, index) => {
            return <DaysBox
              key={index}
              isSelected={selectedDays.includes(index)} // 요일이 선택되었는지?
              onPress={() => toggleDay(index)}>{el}
            </DaysBox>
          })}
        </View>
      </View>

      {/* **************************최하단 박스************************** */}
      <Animatable.View ref={boxRef} style={styles.bottomContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.summary}>

            <HeadText>
              {category === 'medicine' ? '어떤 약을 드시나요?' :
                category === 'drink' ? '어떤 물을 드시나요?' :
                  '기타 알람을 등록할까요?'}
            </HeadText>
            <Text style={alarmContent.length === 10 ? styles.alertText : styles.normalText}>{alarmContent.length} / 10</Text>

          </View>
          <ScrollView style={styles.scrollView}>
            {alarmContent.map((el, index) => (
              <ContentDetail key={index} id={index} onPress={delAlarmContent}>
                {el}
              </ContentDetail>
            ))}
          </ScrollView>
          <ContentAddButton onPress={openModalHandler} />
          <ContentModal visible={modalIsVisible} modalConfirm={modalConfirm} closeModal={closeModalHandler} />

          <View style={styles.buttonContainer}>
            {isEditing &&
              <Pressable style={[styles.submitButton, styles.submitButtonDel]} onPress={delAlarm}>
                <MaterialCommunityIcons name='trash-can-outline' color={'white'} size={18} />
              </Pressable>
            }
            <Pressable onPress={confirmAlarm} style={styles.submitButton}>
              {isEditing ?
                <Text style={styles.submitButtonText}>
                  알람 수정하기
                </Text>
                :
                <Text style={styles.submitButtonText}>
                  알람 등록하기
                </Text>
              }
            </Pressable>
          </View>

        </View>
      </Animatable.View>
    </View>
  )
}

export default ManageAlarm

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    gap: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 12
  },
  alarmContainer: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 12,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    gap: 12,
  },
  timeContainer: {
    height: 100,
    // backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 24,
    marginHorizontal: 36,
  },
  timeText: {
    fontFamily: 'pretendard-bold',
    fontSize: 52,
  },
  amPm: {
    fontSize: 16,
  },
  daysContainer: {
    // backgroundColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomContainer: {
    flex: 1,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#ccc',
    paddingHorizontal: 12,
    paddingTop: 4
  },
  normalText: {
    fontFamily: 'pretendard'
  },

  alertText: {
    color: 'red',
    fontFamily: 'pretendard-bold'
  },
  scrollView: {
    // backgroundColor: '#666',
    // minHeight: 300,
    // maxHeight: 300,
    paddingHorizontal: 8,
    // flex: 1
  },
  inputContainer: {
    padding: 12,
    borderRadius: 24,
    backgroundColor: '#fff',
    gap: 12,
    flex: 1
  },
  submitButton: {
    flex: 4,
    paddingVertical: 16,
    backgroundColor: GlobalTheme.colors.primary300,
    alignItems: 'center',
    borderRadius: 40,
  },
  submitButtonDel: {
    flex: 1,
    backgroundColor: GlobalTheme.colors.accent500
  },
  submitButtonText: {
    fontFamily: 'pretendard',
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  }
})