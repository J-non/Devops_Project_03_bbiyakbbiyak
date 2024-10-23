import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import Modal from 'react-native-modal';
import { GlobalTheme } from '../../constants/theme';

// npm i npm install react-native-modal

const ContentModal = ({ closeModal, visible, modalConfirm }: any) => {
  const [inputValue, setInputValue] = useState('');

  function inputHandler(value: string) {
    setInputValue(value)
  }

  const addHandler = () => {
    if (inputValue.trim().length === 0) {
      Alert.alert('입력 오류', '항목을 입력해주세요!')
      return
    }
    modalConfirm(inputValue);
    setInputValue('')
  }

  return (
    <Modal isVisible={visible} onBackdropPress={closeModal} style={styles.modal} avoidKeyboard={true}>
      {/* <View style={styles.inputContainer}> */}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='항목을 적어주세요.'
          onChangeText={inputHandler}
          value={inputValue} />
        <View style={styles.buttonContainer}>
          <Pressable onPress={closeModal} style={[styles.pressable, styles.pressableCancel]}>
            {/* <View style={styles.btnStyle}> */}
            <Text style={styles.textStyle}>취소</Text>
            {/* </View> */}
          </Pressable >
          <Pressable onPress={addHandler} style={styles.pressable}>
            {/* <View style={styles.btnStyle}> */}
            <Text style={styles.textStyle}>추가하기</Text>
            {/* </View> */}
          </Pressable>
        </View>
      </View>
      {/* </View> */}
    </Modal>
  )
}

export default ContentModal

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
    padding: 32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    gap: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16
  },
  pressable: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: GlobalTheme.colors.primary300,
    borderRadius: 30,
    alignItems: 'center',
  },
  pressableCancel: {
    backgroundColor: GlobalTheme.colors.accent500
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'pretendard',
  },
})