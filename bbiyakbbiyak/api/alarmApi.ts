import axios from 'axios';

////////////////////// 유저 아이디로 조회 함수
export const fetchAlarms = async ({ userToken }: { userToken: string }) => {
  const { data } = await axios.get('https://sultang.store/alarm/getall',
    { headers: { Authorization: `bearer ${userToken}` } }
  );
  return data;
};

////////////////////// 알람 생성 함수
export const createAlarms = async ({ alarmData, userToken }: any) => {
  return await axios.post('https://sultang.store/alarm/register',
    alarmData,
    { headers: { Authorization: `bearer ${userToken}` } });
};


////////////////////// 알람 수정 함수
export const updateAlarms = async ({ alarmId, alarmData, userToken }: { alarmId?: number, alarmData?: any, userToken: string }) => {
  // console.log(alarmData)
  return await axios.put(`https://sultang.store/alarm/update/${alarmId}`,
    alarmData,
    { headers: { Authorization: `bearer ${userToken}` } });
};

////////////////////// 알람 삭제 함수
export const delAlarms = async ({ alarmId, userToken }: { alarmId: number, userToken: string }) => {
  return await axios.delete(`https://sultang.store/alarm/delete/${alarmId}`,
    { headers: { Authorization: `bearer ${userToken}` } });
}

////////////////////// 알람 토글 함수 (유저가 작성한)
export const toggleAlarms = async ({ alarmId, userToken }: { alarmId: number, userToken: string }) => {
  return await axios.put(`https://sultang.store/alarm/toggle/${alarmId}`, {},
    { headers: { Authorization: `bearer ${userToken}` } },
  )
}