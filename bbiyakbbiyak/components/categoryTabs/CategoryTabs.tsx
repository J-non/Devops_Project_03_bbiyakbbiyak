import { useNavigation, useRoute } from '@react-navigation/native'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import { Button, Pressable, Text, View } from 'react-native'
import CategoryTabsStyles from './CategoryTabs.style';
import { GlobalTheme } from '../../constants/theme';


const CategoryTabs = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const [category, setCategory] = useState('medicine');

  const medicineButtonSelected = (selectedCategory: any) => () => {
    setCategory(selectedCategory);
    navigation.navigate(selectedCategory);
  }


  return (
    <>
      <View style={CategoryTabsStyles.container}>

        <View style={[CategoryTabsStyles.buttonContainer, category === 'medicine' && CategoryTabsStyles.buttonSelected]}>
          <Pressable
            style={CategoryTabsStyles.button}
            onPress={medicineButtonSelected('medicine')}
            android_ripple={{ color: GlobalTheme.colors.primary300, }}
          >
            <View style={CategoryTabsStyles.button}>
              <Text style={CategoryTabsStyles.buttonText}>약</Text>
            </View>
          </Pressable>
        </View>


        <View style={[CategoryTabsStyles.buttonContainer, category === 'drink' && CategoryTabsStyles.buttonSelected]}>
          <Pressable
            style={CategoryTabsStyles.button}
            onPress={medicineButtonSelected('drink')}
            android_ripple={{ color: GlobalTheme.colors.primary300, }}
          >
            <View style={CategoryTabsStyles.button}>
              <Text style={CategoryTabsStyles.buttonText}>물, 음료</Text>
            </View>
          </Pressable>
        </View>


        <View style={[CategoryTabsStyles.buttonContainer, category === 'etc' && CategoryTabsStyles.buttonSelected]}>
          <Pressable
            style={CategoryTabsStyles.button}
            onPress={medicineButtonSelected('etc')}
            android_ripple={{ color: GlobalTheme.colors.primary300, }}
          >
            <View style={CategoryTabsStyles.button}>
              <Text style={CategoryTabsStyles.buttonText}>기타</Text>
            </View>
          </Pressable>
        </View>

      </View >
    </>
  )
}

export default CategoryTabs
