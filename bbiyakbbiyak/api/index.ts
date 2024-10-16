import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const test = async () => {
  try {
    const loggedDate = await AsyncStorage.getItem('@loggedDate')
    const pastDate = new Date(`${loggedDate}T22:00:00`); // 과거 날짜
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    if (loggedDate === formattedCurrentDate) {
      return null;
    }

    await AsyncStorage.setItem('@loggedDate', formattedCurrentDate);

    // 연, 월, 일을 기준으로 두 날짜를 비교
    const pastDateOnly = new Date(pastDate.getFullYear(), pastDate.getMonth(), pastDate.getDate());
    const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    // 두 날짜의 차이를 ms로 계산하고, 1일로 나누기
    const timeDifference = currentDateOnly.getTime() - pastDateOnly.getTime();
    const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

    console.log(`과거 날짜로부터 ${daysDifference}일이 지났습니다.`);

    // 시작요일
    const logStartDay = pastDate.getDay();

    const { data } = await axios.post('http://192.168.0.82:3000/notification/createLogs/1', { daysDifference, loggedDate }, {});
    // console.log(1, data);
    return data

  } catch (error) {
    console.log(error)
  }
}

export const getAlarm = async (category: string) => {
  const { data } = await axios.post('http://192.168.0.82:3000/notification/get_alarm_list/1', { category }, {});
  return data
}

export const getAlarmLog = async () => {
  console.log(123)
  return null
}

export const updateIsTaken = async ({ id, isTaken }: { id: number, isTaken: boolean }) => {
  try {
    // console.log(isTaken)
    const data = await axios.post('http://192.168.0.82:3000/notification/items/istakend', { id, isTaken }, {});
    return data
  } catch (error) {
    console.error(error)
  }
}

export const updateLogIsTaken = async ({ id, isTaken }: { id: number, isTaken: boolean }) => {
  return null
}