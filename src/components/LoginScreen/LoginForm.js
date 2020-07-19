import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {translate} from '../../translations/i18-helper';
import {Colors} from 'react-native/Libraries/NewAppScreen';


// Login app view
function LoginForm() {

  const placeholderTextColor = 'rgba(255,255,255,0.7)'
  let passwordInput;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}>
      <TextInput
        placeholder={translate("login.email")}
        placeholderTextColor={placeholderTextColor}
        returnKeyType="next"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        onSubmitEditing={ () => this.passwordInput.focus()}
      />
      <TextInput
        placeholder={translate("login.password")}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry
        returnKeyType="go"
        style={styles.input}
        ref={ (input) => passwordInput = input}
      />

      <TouchableOpacity style={styles.submit}>
        <Text style={styles.submitText}>{translate("login.submit").toUpperCase()}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
  },
  submit: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingVertical: 15,
    marginBottom: 15
  },
  submitText: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});


export default LoginForm;
