import axios from 'axios';

////////////////////// 조회 함수
export const fetchAlarms = async ({ userId }: { userId: number }) => {
    const { data } = await axios.post('http://192.168.0.252:3000/alarm/getall', { userId });
    return data;
};

////////////////////// 생성 함수
export const createAlarms = async ({ alarmData }: any) => {
    return await axios.post('http://192.168.0.252:3000/alarm/register', alarmData);
};


////////////////////// 수정 함수
export const updateAlarms = async ({ alarmId, alarmData }: { alarmId?: number, alarmData?: any }) => {
    // console.log(alarmData)
    return await axios.put(`http://192.168.0.252:3000/alarm/update/${alarmId}`, alarmData);
};

////////////////////// 삭제 함수
export const delAlarms = async ({ alarmId, userIdFromToken }: { alarmId: number, userIdFromToken: any }) => {
    return await axios.delete(`http://192.168.0.252:3000/alarm/delete/${alarmId}`, { data: { userIdFromToken } });
}