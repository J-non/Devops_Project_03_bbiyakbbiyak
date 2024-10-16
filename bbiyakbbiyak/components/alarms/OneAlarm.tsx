import React from 'react'
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { timeConvert } from '../../util/timeConvert';
import { GlobalTheme } from '../../constants/theme';

////////////////////////////// 알람 개별 컴포넌트 입니다 //////////////////////////////
const OneAlarm = ({ alarmData, onToggle }: any) => {
    const navigation = useNavigation<any>();
    ////////////////////////////// 클릭시 실행 함수
    const alarmPressHandler = () => {
        // console.log(alarmData.id, alarmData.category, alarmData.targetTime, alarmData.alarmDay, alarmData.alarmItem)
        navigation.navigate('ManageAlarm', {
            alarmId: alarmData.id, // 클릭시 수정화면 보내면서 DB 아이디를 같이 보냄
            alarmCategory: alarmData.category,
            alarmTime: alarmData.targetTime,
            alarmDays: alarmData.alarmDay.map((el: any) => { return el.pushDay }),
            alarmName: alarmData.alarmItem.map((el: any) => { return el.itemName }),
            // 카테고리, 시간, 요일, 먹는항목
        })
    }

    const { hh, mm, amPm } = timeConvert(alarmData.targetTime)

    // 요일 변환
    const dayMap: { [key: number]: string } = { 0: '일', 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토' };
    const formattedDays = alarmData.alarmDay.map((el: any) => { return dayMap[el.pushDay] }).join(', ');
    // 항목 이름 변환
    const itemNames = alarmData.alarmItem.map((el: any) => { return el.itemName });

    return (
        <Pressable style={styles.container} onPress={alarmPressHandler}>
            {/* *************************알람 시간/요일/토글************************* */}
            <View style={styles.information}>
                <View>
                    <View style={styles.timeContainer}>
                        <View style={styles.amPmContainer}>
                            <Text style={styles.amPmText}>{amPm}</Text>
                        </View>
                        <Text style={styles.time}>{hh}:</Text>
                        <Text style={styles.time}>{mm}</Text>
                    </View>
                    <Text style={styles.days}>{formattedDays}</Text>
                </View>
                <Switch value={alarmData.isActive} onValueChange={onToggle} />
            </View>
            {/* *************************약 리스트************************* */}
            <View style={styles.medicinesContainer}>
                {itemNames.map((el: string, index: number) => {
                    return <View style={styles.medicineOneLine} key={index}>
                        {
                            alarmData.category === 'medicine'
                                ?
                                <View style={styles.iconContainer}>
                                    <MaterialCommunityIcons name='pill' size={18} /><Text style={styles.medicineName}>{el}</Text>
                                </View>
                                :
                                alarmData.category === 'drink' ?
                                    <View style={styles.iconContainer}>
                                        <MaterialCommunityIcons name='beer-outline' size={18} /><Text style={styles.medicineName}>{el}</Text>
                                    </View>
                                    :
                                    <View style={styles.iconContainer}>
                                        <MaterialCommunityIcons name='clock-outline' size={18} /><Text style={styles.medicineName}>{el}</Text>
                                    </View>
                        }
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
    timeContainer: {
        flexDirection: 'row'
    },
    time: {
        fontSize: 40,
        fontFamily: 'pretendard-bold'
    },
    amPmContainer: {
        justifyContent: 'flex-end',
        paddingBottom: 8,
        paddingRight: 8
    },
    amPmText: {
        fontSize: 16,
        fontFamily: 'pretendard-bold',
    },
    days: {
        fontFamily: 'pretendard',
    },
    medicinesContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 24,
        padding: 8,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    medicineOneLine: {
        flexDirection: 'row',
        padding: 8,
    },
    medicineName: {
        fontFamily: 'pretendard',
        paddingLeft: 8
    },
})