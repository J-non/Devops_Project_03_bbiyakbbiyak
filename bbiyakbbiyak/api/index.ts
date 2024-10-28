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

    const userToken = await AsyncStorage.getItem('@token');

    const { data } = await axios.post('https://sultang.store/alarm/create_logs', { daysDifference, loggedDate },
      {
        headers: {
          Authorization: `bearer ${userToken}`
        }
      }
    );
    return data

  } catch (error) {
    console.error(error)
  }
}




// 오늘 알람 목록 가져오기
export const getAlarm = async ({ category, logDate }: { category: string, logDate: string }) => {
  const userToken = await AsyncStorage.getItem('@token');
  const pushDay = new Date().getDay();
  const { data } = await axios.get(
    `https://sultang.store/alarm/get_alarm_list?category=${category}&pushDay=${pushDay}`,
    {
      headers: {
        Authorization: `bearer ${userToken}`
      }
    }
  );
  return data
}

// 선택된 날짜 알람 목록 가져오기
export const getAlarmLog = async ({ category, logDate }: { category: string, logDate: string }) => {
  const userToken = await AsyncStorage.getItem('@token');
  const { data } = await axios.get(
    `https://sultang.store/alarm-logs/get_alarm_logs?category=${category}&logDate=${logDate}`,
    {
      headers: {
        Authorization: `bearer ${userToken}`
      }
    }
  );
  return data
}


// 복용 기록 달력 알람 존재 여부
export const getMonthLog = async (monthString: string) => {
  try {
    const userToken = await AsyncStorage.getItem('@token');
    const { data } = await axios.get(`https://sultang.store/alarm-logs/get_month_log?monthString=${monthString}`,
      {
        headers: {
          Authorization: `bearer ${userToken}`
        }
      }
    );

    const formattedData = data.reduce((acc, item) => {
      acc[item.logDate] = { marked: true, dotColor: 'blue' };
      return acc;
    }, {});

    return formattedData
  } catch (error) {
    console.error(error);
  }
}


// 오늘 알람 복용여부
export const updateIsTaken = async ({ id, isTaken }: { id: number, isTaken: boolean }) => {
  try {
    const userToken = await AsyncStorage.getItem('@token');
    const data = await axios.put('https://sultang.store/alarm/items/is_takend', { id, isTaken },
      {
        headers: {
          Authorization: `bearer ${userToken}`
        }
      }
    );
    return data
  } catch (error) {
    console.error(error)
  }
}

// 복용 기록 복용 여부
export const updateLogIsTaken = async ({ id, isTaken }: { id: number, isTaken: boolean }) => {
  try {
    const userToken = await AsyncStorage.getItem('@token');
    const data = await axios.put('https://sultang.store/alarm-logs/alarm_log_Items/is_taken', { id, isTaken },
      {
        headers: {
          Authorization: `bearer ${userToken}`
        }
      }
    )
    return data
  } catch (error) {
    console.error(error)
  }
}


// login====================================================login
export const signup = async (data: any) => {
  try {
    const response = await axios.post("https://sultang.store/signup", { data });
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
    const response = await axios.post("https://sultang.store/signup/google", {
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
    const response = await axios.post("https://sultang.store/signup/jwtToken", {
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
    const response = await axios.post("https://sultang.store/login", { data });
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
    const response = await axios.post("https://sultang.store/signup/authCode", {
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
    const response = await axios.post("https://sultang.store/login/findID", {
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
export const findPW = async (data: object) => {
  try {
    const response = await axios.post("https://sultang.store/login/findPW", {
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

export const NavigationPw = async (data: { email: string, phone: string }) => {
  try {
    const response = await axios.post("https://sultang.store/login/NavigationPw", {
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
    const response = await axios.post("https://sultang.store/login/updatePW", {
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
    const url = `https://sultang.store/login/getInfo/${data.token ? data.token : data}`;

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
      "https://sultang.store/login/getInfo/updateGoogle",
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
      "https://sultang.store/signup/deleteUser",
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
