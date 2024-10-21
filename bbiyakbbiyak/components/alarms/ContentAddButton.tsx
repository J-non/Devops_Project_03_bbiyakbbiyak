import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const ContentAddButton = ({ onPress }: any) => {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.addButton}>
                <Text>항목 추가하기</Text>
            </View>
        </Pressable>
    )
}

export default ContentAddButton

const styles = StyleSheet.create({
    addButton: {
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ccc'
    }
})