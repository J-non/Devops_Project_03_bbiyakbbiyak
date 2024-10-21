import React, { useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import { CategoryButtonStyles } from './CategoryButton.style'
import { GlobalTheme } from '../../constants/theme'

const CategoryButton = ({ buttonSelectedHandler, category, selectedCategory, setSelectedCategory, routeName, buttonText }: any) => {

  useEffect(() => {
    if (routeName === 'main') {
      setSelectedCategory('medicine')
    } else if (routeName === 'logCalendar') {
      setSelectedCategory('medicineCalendar')
    }
  }, [])


  return (
    <>
      <View style={[CategoryButtonStyles.buttonContainer, category === selectedCategory && CategoryButtonStyles.buttonSelected]}>
        <Pressable
          style={CategoryButtonStyles.button}
          onPress={buttonSelectedHandler(category)}
          android_ripple={{ color: GlobalTheme.colors.primary300, }}
        >
          <View style={CategoryButtonStyles.button}>
            <Text style={CategoryButtonStyles.buttonText}>{buttonText}</Text>
          </View>
        </Pressable>
      </View>
    </>
  )
}

export default CategoryButton
