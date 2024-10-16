import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import CustomInputWithButton from "../../UI/Input/CustomInputWithButton";
import AlertComponent from "../../UI/Alert/Alert";
import { Valuetype, valueType } from "../../../constants/models";

interface EmailVerificationProps {
  formValues: any;
  setFormValues: any;
  styles: customStyle;
}

interface customStyle {
  alert: ViewStyle | TextStyle;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  formValues,
  setFormValues,
  styles,
}) => {
  const email = formValues.email;
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  function setValueState(inputType: Valuetype, value: string | any) {
    setFormValues((prev: any) => ({ ...prev, [inputType]: value }));
  }

  console.log(email);

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <CustomInputWithButton
        placeholder="이메일 @직접입력"
        inputValue={setFormValues}
        inputType={valueType.email}
        value={formValues.email}
        onChangeText={(text: any) => {
          setValueState(valueType.email, text);
        }}
      >
        이메일 인증
      </CustomInputWithButton>
      {email && !regEmail.test(email) && (
        <AlertComponent style={styles.alert}>
          유효하지 않은 이메일 형식입니다.
        </AlertComponent>
      )}
    </View>
  );
};

export default EmailVerification;
