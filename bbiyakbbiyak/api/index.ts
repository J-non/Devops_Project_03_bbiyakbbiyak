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

    if (isNaN(daysDifference)) {
      return null;
    }

    console.log(`과거 날짜로부터 ${daysDifference}일이 지났습니다.`);

    const { data } = await axios.post('http://192.168.0.82:3000/alarm/create_logs/1', { daysDifference, loggedDate });
    return data

  } catch (error) {
    console.error(error)
  }
}




// 오늘 알람 목록 가져오기
export const getAlarm = async ({ category, logDate }: { category: string, logDate: string }) => {
  const token = await AsyncStorage.getItem('@token');
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

// 선택된 날짜 알람 목록 가져오기
export const getAlarmLog = async ({ category, logDate }: { category: string, logDate: string }) => {
  const token = await AsyncStorage.getItem('@token');
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
  const id = 1;
  const { data } = await axios.get(`http://192.168.0.82:3000/alarm-logs/get_month_log?fk_userId=${id}&monthString=${monthString}`)

  const formattedData = data.reduce((acc, item) => {
    acc[item.logDate] = { marked: true, dotColor: 'blue' };
    return acc;
  }, {});
  return formattedData
}


// 오늘 알람 복용여부
export const updateIsTaken = async ({ id, isTaken }: { id: number, isTaken: boolean }) => {
  try {
    const data = await axios.put('http://192.168.0.82:3000/alarm/items/is_takend', { id, isTaken });
    return data
  } catch (error) {
    console.error(error)
  }
}

// 복용 기록 복용 여부
export const updateLogIsTaken = async ({ id, isTaken }: { id: number, isTaken: boolean }) => {
  try {
    const data = await axios.put('http://192.168.0.82:3000/alarm-logs/alarm_log_Items/is_taken', { id, isTaken })
    return data
  } catch (error) {
    console.error(error)
  }
}


// login====================================================login
export const signup = async (data: any) => {
  try {
    const response = await axios.post("http://192.168.0.82:3000/signup", { data });
    const _data = response.data;
    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const signupGoogle = async (data: any) => {
  try {
    const response = await axios.post("http://192.168.0.82:3000/signup/google", {
      data,
    });
    const _data = response.data;

    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const jwtToken = async (data: any) => {
  try {
    const response = await axios.post("http://192.168.0.82:3000/signup/jwtToken", {
      data,
    });
    const _data = response.data;

    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const loginAPI = async (data: any) => {
  try {
    const response = await axios.post("http://192.168.0.82:3000/login", { data });
    const _data = response.data;
    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const emailAPI = async (data: object) => {
  try {
    const response = await axios.post("http://192.168.0.82:3000/signup/authCode", {
      data,
    });
    const _data = response.data;
    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const findID = async (data: { phone: string } | null) => {
  try {
    const response = await axios.post("http://192.168.0.82:3000/login/findID", {
      data,
    });
    const _data = response.data;
    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};
export const findPW = async (data: { email: string; phone: string }) => {
  try {
    const response = await axios.post("http://192.168.0.82:3000/login/findPW", {
      data,
    });
    const _data = response.data;
    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const updatePW = async (data: any) => {
  try {
    const response = await axios.post("http://192.168.0.82:3000/login/updatePW", {
      data,
    });
    const _data = response.data;
    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const getInfo = async (data: any) => {
  try {
    const url = `http://192.168.0.82:3000/login/getInfo/${data.token ? data.token : data}`;

    const response = await axios.get(url);

    return response.data; // 필요한 데이터 반환
  } catch (error) {
    console.error("Error in getInfo:", error);
    throw error; // 오류를 호출한 곳으로 던짐
  }
};

export const updateGoogleUserName = async (data: any) => {
  try {
    const response = await axios.post(
      "http://192.168.0.82:3000/login/getInfo/updateGoogle",
      { data }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const deleteUser = async (data: string) => {
  try {
    const config = {
      headers: {
        Authorization: `bearer ${data}`,
        "Content-Type": "application/json", // 필요에 따라 추가
      },
    };
    const response = await axios.post(
      "http://192.168.0.82:3000/signup/deleteUser",
      {},
      config
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};
