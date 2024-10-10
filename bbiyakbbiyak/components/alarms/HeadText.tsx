import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HeadText = ({ children }: any) => {
    return (
        <View style={styles.style}>
            <Text style={styles.headTextStyle}>{children}</Text>
        </View>
    )
}

export default HeadText

const styles = StyleSheet.create({
    headTextStyle: {
        // padding: 4, // 임시
        // fontFamily: 'pretendard',
        // fontSize: 16
    },
    style: {
        // backgroundColor: '#ccc'
    }
})