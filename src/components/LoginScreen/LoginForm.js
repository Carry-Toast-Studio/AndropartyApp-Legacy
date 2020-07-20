import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Platform,
} from 'react-native';
import {translate} from '../../translations/i18-helper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import UserImage from '../../assets/images/user.png'
import PasswordImage from '../../assets/images/password.png'
import EyeImage from '../../assets/images/eye.png'
import EyeCrossedImage from '../../assets/images/eye-crossed.png'


// Login app view
const LoginForm = ({setUser, setError}) => {
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

      <View>
        <TextInput
          placeholder={translate("login.email")}
          placeholderTextColor={placeholderTextColor}
          returnKeyType="next"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          blurOnSubmit={false}
          onSubmitEditing={ () => passwordInput.focus()}
        />
        <Image
          style={{...styles.inputImageContainer, ...styles.inputImage, left: 10}}
          source={UserImage}/>
      </View>
      <View>
        <TextInput
          placeholder={translate("login.password")}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={hiddenPassword}
          textContentType="password"
          returnKeyType="go"
          style={styles.input}
          blurOnSubmit={false}
          ref={ref => passwordInput = ref}
        />
        <Image
          style={{...styles.inputImageContainer, ...styles.inputImage, left: 10}}
          source={PasswordImage}/>
        <TouchableOpacity
          style={{...styles.inputImageContainer, right: 15}}
          onPress={ () => setHiddenPassword(!hiddenPassword)}>
          <Image
            style={styles.inputImage}
            source={hiddenPassword ? EyeImage : EyeCrossedImage}/>
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
          <Text style={{...styles.text, textDecorationLine: 'underline'}}>{translate("login.createAccount")}</Text>
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
    paddingLeft: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    borderRadius: 12
  },
  submit: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingVertical: 15,
    marginBottom: 30,
    borderRadius: 12
  },
  submitText: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputImageContainer: {
    position: 'absolute',
    top: inputHeight/4
  },
  inputImage: {
      width: inputHeight/2,
      height: inputHeight/2
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 45,

  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
});


export default LoginForm;
