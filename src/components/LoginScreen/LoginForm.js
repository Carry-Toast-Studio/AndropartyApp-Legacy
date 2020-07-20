import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Platform,
} from 'react-native';
import {translate} from '../../translations/i18-helper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Eye from '../../assets/images/eye.png'
import EyeCrossed from '../../assets/images/eye-crossed.png'


// Login app view
const LoginForm = ({setUser}) => {
  const [hiddenPassword, setHiddenPassword] = React.useState(true);
  const placeholderTextColor = 'rgba(255,255,255,0.7)'
  let passwordInput;

  function loginSubmit () {
    setUser("user");
  }

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
        blurOnSubmit={false}
        onSubmitEditing={ () => passwordInput.focus()}
      />
      <View>
        <TextInput
          placeholder={translate("login.password")}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={hiddenPassword}
          returnKeyType="go"
          style={styles.input}
          blurOnSubmit={false}
          ref={ref => passwordInput = ref}
        />
        <TouchableOpacity
          style={styles.passwordImageContainer}
          onPress={ () => setHiddenPassword(!hiddenPassword)}>
          <Image
            style={styles.passwordImage}
            source={hiddenPassword ? Eye : EyeCrossed}/>
        </TouchableOpacity>
      </View>

      <TouchableHighlight
        style={styles.submit}
        underlayColor="rgba(255,255,255,0.5)"
        onPress={loginSubmit}
      >
        <Text style={styles.submitText}>{translate("login.submit").toUpperCase()}</Text>
      </TouchableHighlight>

      <View style={styles.signUp}>
        <Text style={styles.text}>Or </Text>
        <TouchableHighlight
          underlayColor="rgba(255,255,255,0.4)"
          onPress={() => console.log("PRESSED")}
        >
          <Text style={{...styles.text, textDecorationLine: 'underline'}}>create an account</Text>
          {/*<Text style={styles.text}>Forgot Password?</Text>*/}
        </TouchableHighlight>
      </View>

    </KeyboardAvoidingView>
  );
}

const inputHeight = 40;
const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: inputHeight,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    borderRadius: 12
  },
  submit: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingVertical: 15,
    marginBottom: Platform.OS == 'ios' ? 25 : 15,
    borderRadius: 12
  },
  submitText: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  passwordImageContainer: {
    position: 'absolute',
    right: 15,
    top: inputHeight/4
  },
  passwordImage: {
      width: inputHeight/2,
      height: inputHeight/2
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Platform.OS == 'ios' ? 25 : 15
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
});


export default LoginForm;
