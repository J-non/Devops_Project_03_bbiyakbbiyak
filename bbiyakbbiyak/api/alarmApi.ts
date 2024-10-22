import axios from 'axios';

////////////////////// 유저 아이디로 조회 함수
export const fetchAlarms = async ({ userId }: { userId: number }) => {
  const { data } = await axios.post('http://192.168.0.82:3000/alarm/getall', { userId });
  return data;
};

////////////////////// 알람 생성 함수
export const createAlarms = async ({ alarmData }: any) => {
  return await axios.post('http://192.168.0.82:3000/alarm/register', alarmData);
};


////////////////////// 알람 수정 함수
export const updateAlarms = async ({ alarmId, alarmData }: { alarmId?: number, alarmData?: any }) => {
  // console.log(alarmData)
  return await axios.put(`http://192.168.0.82:3000/alarm/update/${alarmId}`, alarmData);
};

////////////////////// 알람 삭제 함수
export const delAlarms = async ({ alarmId, userIdFromToken }: { alarmId: number, userIdFromToken: any }) => {
  return await axios.delete(`http://192.168.0.82:3000/alarm/delete/${alarmId}`, { data: { userIdFromToken } });
}

////////////////////// 알람 토글 함수 (유저가 작성한)
export const toggleAlarms = async ({ alarmId, userToken }: any) => {
  console.log(alarmId)
  console.log(userToken)
  return await axios.put(`http://192.168.0.82:3000/alarm/toggle/${alarmId}`, { userToken },
    // { headers: { Authorization: `bearer ${userToken}` } }
  )
}