import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GlobalTheme } from '../../constants/theme'

const CategoryButton = ({ name, label, onPress, isSelected }: any) => {
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          styles.category,
          // pressed && styles.pressed,
          isSelected && styles.selected]
      }}
      onPress={() => { onPress(label) }}>
      <Text style={styles.buttonName}>{name}</Text>
    </Pressable>
  )
}

export default CategoryButton

const styles = StyleSheet.create({
  category: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    height: 60,
  },
  buttonName: {
    fontFamily: 'pretendard',
    fontSize: 16
  },
  // pressed: {
  // backgroundColor: '#ccc'
  // },
  selected: {
    backgroundColor: GlobalTheme.colors.primary500
  }
})