import React from 'react'
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

////////////////////////////// 알람 개별 컴포넌트 입니다 //////////////////////////////
const OneAlarm = ({ alarmData, onToggle }: any) => {
    const navigation = useNavigation<any>();

    ////////////////////////////// 클릭시 실행 함수
    const alarmPressHandler = () => {
        navigation.navigate('ManageAlarm', {
            alarmId: alarmData.id, // 클릭시 수정화면 보내면서 DB 아이디를 같이 보냄
            alarmCategory: alarmData.category,
            alarmTime: alarmData.time,
            alarmDays: alarmData.days,
            alarmName: alarmData.name
            // 카테고리, 시간, 요일, 먹는항목
        })
    }

    return (
        <Pressable style={styles.container} onPress={alarmPressHandler}>
            {/* *************************알람 시간/요일/토글************************* */}
            <View style={styles.information}>
                <View>
                    <Text style={styles.time}>{alarmData.time}</Text>
                    <Text style={styles.days}>{alarmData.days.join(', ')}</Text>
                </View>
                <Switch value={alarmData.active} onValueChange={onToggle} />
            </View>
            {/* *************************약 리스트************************* */}
            <View style={styles.medicinesContainer}>
                {alarmData.name.map((el: string, index: number) => {
                    return <View style={styles.medicineOneLine} key={index}>
                        <MaterialCommunityIcons name='pill' size={18} /><Text style={styles.medicineName}>{el}</Text>
                    </View>
                })}
            </View>
        </Pressable>
    )
}

export default OneAlarm

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        paddingHorizontal: 12,
        paddingBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 32,

    },
    information: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: '#ccc',
        padding: 12,
    },
    time: {
        fontSize: 36,
        fontFamily: 'pretendard-bold'
    },
    days: {
        fontFamily: 'pretendard',
        paddingTop: 2
    },
    medicinesContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 24,
        padding: 8,
    },
    medicineOneLine: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    medicineName: {
        fontFamily: 'pretendard',
        paddingLeft: 4
    },
})