import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'

const ContentDetail = ({ children, onPress, id }: any) => {
  return (
    <Pressable onPress={() => { onPress(id) }}>
      <View style={styles.detail}>
        <Text>{children}</Text>
        <FontAwesome6 name='xmark' size={18} />
      </View>
    </Pressable>
  )
}

export default ContentDetail

const styles = StyleSheet.create({
  detail: {
    backgroundColor: '#e6e6e6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})