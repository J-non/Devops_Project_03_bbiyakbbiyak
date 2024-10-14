import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// 헤더 + 아이콘
const IconButton = ({ icon, size, color, onPress }: any) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => { return pressed && styles.pressedStyle }}>
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    )
}

export default IconButton

const styles = StyleSheet.create({
    buttonContainer: {
        paddingRight: 10,
    },
    pressedStyle: {
        opacity: 0.5
    }
})