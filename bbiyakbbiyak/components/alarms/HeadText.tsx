import React from 'react'
import { Text, View } from 'react-native'

const HeadText = ({ children }: any) => {
    return (
        <View >
            <Text>{children}</Text>
        </View>
    )
}

export default HeadText