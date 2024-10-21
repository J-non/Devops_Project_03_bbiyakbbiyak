import React, { useRef } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { GlobalTheme } from '../../constants/theme';

// npm i react-native-animatable

const DaysBox = ({ children, isSelected, onPress }: any) => {

    const boxRef = useRef<any>(null); // 참조 생성 마운트되기전까지 참조할 대상이없으므로 null
    const handlePress = () => {
        onPress();
        boxRef.current.pulse(300); // 옵셔닝 체인지 current가 존재할때만 호출(트리거) View컴포에 애니메이션을 적용
    };

    return (
        <Pressable onPress={handlePress}>
            <Animatable.View
                ref={boxRef} // 컴포넌트의 인스턴스를 참조 (받음/ 이거 크기 키울거임). 선택되면 style적용 false면 {}빈객체 적용
                style={[styles.miniBox, isSelected ? styles.selectedBox : {}]} >
                <Text style={styles.daysText}>{children}</Text>
            </Animatable.View>
        </Pressable>
    )
}

export default DaysBox

const styles = StyleSheet.create({
    miniBox: {
        padding: 14,
        backgroundColor: '#eeeeee',
        borderRadius: 30,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    daysText: {
        fontFamily: 'pretendard',
        fontSize: 16,
    },
    selectedBox: {
        backgroundColor: GlobalTheme.colors.primary300
    }
})