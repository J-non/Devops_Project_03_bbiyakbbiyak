import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const createAlarmLogs = async () => {
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

    const { data } = await axios.post('http://192.168.0.82:3000/alarm/create_logs/1', { daysDifference, loggedDate });
    // console.log(1, data);
    return data

  } catch (error) {
    console.log(error)
  }
}




// 오늘 알람 목록 가져오기
export const getAlarm = async ({ category, token, logDate }: { category: string, token: string, logDate: string }) => {
  console.log(123, category)
  const pushDay = new Date().getDay();
  const { data } = await axios.get(
    `http://192.168.0.82:3000/alarm/get_alarm_list?category=${category}&pushDay=${pushDay}`,
    {
      headers: {
        Authorization: `bearer ${token}`
      }
    });
  return data
}

// 오늘 알람 목록 가져오기
// export const getAlarm = async ({ category, token, logDate }: { category: string, token: string, logDate: string }) => {
//   const pushDay = new Date().getDay();
//   const { data } = await axios.post(
//     `http://192.168.0.82:3000/alarm/get_alarm_list?category=${category}&pushDay=${pushDay}`,
//     {
//       headers: {
//         Authorization: `bearer ${token}`
//       }
//     });
//   return data
// }

// 선택된 날짜 알람 목록 가져오기
// export const getAlarmLog = async ({ category, token, logDate }: { category: string, token: string, logDate: string }) => {
//   console.log(3, logDate)

//   const { data } = await axios.post(
//     `http://192.168.0.82:3000/alarm-logs/get_alarm_logs?category=${category}&logDate=${logDate}`,
//     {
//       headers: {
//         Authorization: `bearer ${token}`
//       }
//     });
//   return data
// }


export const getAlarmLog = async ({ category, token, logDate }: { category: string, token: string, logDate: string }) => {
  console.log(3, logDate)

  const { data } = await axios.get(
    `http://192.168.0.82:3000/alarm-logs/get_alarm_logs?category=${category}&logDate=${logDate}`,
    {
      headers: {
        Authorization: `bearer ${token}`
      }
    });
  return data
}



// 복용 기록 달력 알람 존재 여부
export const getMonthLog = async (monthString: string) => {
  console.log(monthString)
  const id = 1;
  const { data } = await axios.post('http://192.168.0.82:3000/alarm-logs/get_month_log', { id, monthString })
  return data
}




// 오늘 알람 복용여부
export const updateIsTaken = async ({ id, isTaken }: { id: number, isTaken: boolean }) => {
  try {
    // console.log(isTaken)
    const data = await axios.put('http://192.168.0.82:3000/alarm/items/is_takend', { id, isTaken });
    return data
  } catch (error) {
    console.error(error)
  }
}

// 복용 기록 복용 여부
export const updateLogIsTaken = async ({ id, isTaken }: { id: number, isTaken: boolean }) => {
  try {
    console.log(123123123)
    const data = await axios.put('http://192.169.0.82:3000/alarm-logs/alarm_log_Items/is_taken', { id, isTaken })
    return data
  } catch (error) {
    console.error(error)
  }
}