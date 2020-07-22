import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from 'react-native';
import Validator from '../../utils/Validator';
import {translate} from '../../translations/i18-helper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import UserImage from '../../assets/images/user.png'
import PasswordImage from '../../assets/images/password.png'
import EyeImage from '../../assets/images/eye.png'
import EyeCrossedImage from '../../assets/images/eye-crossed.png'


// Login app view
export const LoginForm = ({setError, setIsLogin}) => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [connecting, setConnecting] = useState(false);

  const placeholderTextColor = 'rgba(255,255,255,0.7)'
  let passwordInput;

  useEffect( () => {
    // Remove error messages on component unmount
    return () => {
      setError(null)
      setConnecting(false)
    }
  }, [])

  function onSubmit () {
    if (!connecting && validateForm()) login()
  }

  function validateForm(){
    const validationResults = {
      emailValidation: Validator.validateMail(mail),
      passwordValidation: Validator.validatePassword(password)
    }

    for (const result in validationResults){
      if (validationResults[result] !== true){
        setError(validationResults[result])
        return false
      }
    }

    setError(null)
    return true
  }

  function login() {
    setConnecting(true) // disable login btn
    auth()
      .signInWithEmailAndPassword(mail, password)
      .then(() => {
        /* Do nothing:
        *   - Auth listener in App.js will set the User
        *   - Component will unmount
        * */
      })
      // Error codes: https://firebase.google.com/docs/auth/admin/errors
      .catch(error => {
        setConnecting(false)
        switch(error.code) {
          // Wrong credentials
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setError(translate("errors.loginFailed"))
            break;
          // Wrong email format (should not happen, form is validated)
          case 'auth/invalid-email':
            setError(translate("errors.emailWrong"))
            break;
          // Any other error
          default:
            setError(translate("errors.loginFailedUnknown"))
        }
      })
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}>

      {/*Dummy view to equal the height of the login and the register forms*/}
      <View style={styles.hidden}/>

      {/*Mail input*/}
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
          onChangeText={ text => setMail(text) }
          onSubmitEditing={ () => passwordInput.focus() }
        />
        <Image
          style={{...styles.inputImageContainer, ...styles.inputImage, left: 10}}
          source={UserImage}/>
      </View>

      {/*Password input*/}
      <View>
        <TextInput
          placeholder={translate("login.password")}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={hiddenPassword}
          textContentType="password"
          returnKeyType="go"
          style={styles.input}
          blurOnSubmit={false}
          onChangeText={ text => setPassword(text) }
          ref={ref => passwordInput = ref}
          onSubmitEditing={ onSubmit }
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

      {/*Submit btn*/}
      <TouchableHighlight
        style={{...styles.submit, backgroundColor: connecting ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.4)'}}
        underlayColor="rgba(255,255,255,0.55)"
        disabled={connecting}
        onPress={() => auth().signOut()}
      >
        <Text style={styles.submitText}>{translate("login.submit").toUpperCase()}</Text>
      </TouchableHighlight>

      {/*Link to sign up form*/}
      <View style={styles.signUp}>
        <Text style={styles.text}>Or </Text>
        <TouchableHighlight
          underlayColor="rgba(255,255,255,0.4)"
          disabled={connecting}
          onPress={() => setIsLogin(false)}
        >
          <Text style={{...styles.text, textDecorationLine: 'underline'}}>{translate("login.createAccount")}</Text>
        </TouchableHighlight>
      </View>
    </KeyboardAvoidingView>
  );
}

// Register app view
export const RegisterForm = ({setError, setIsLogin}) => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [connecting, setConnecting] = useState(false);

  const placeholderTextColor = 'rgba(255,255,255,0.7)'
  let passwordInput;
  let repeatPasswordInput;

  useEffect( () => {
    // Remove error messages on component unmount
    return () => {
      setError(null)
      setConnecting(false)
    }
  }, [])


  function onSubmit () {
    if (!connecting && validateForm()) register()
  }

  function validateForm(){
    const validationResults = {
      emailValidation: Validator.validateMail(mail),
      passwordValidation: Validator.validatePassword(password),
      equalPasswords: Validator.validateEquals(password, repeatPassword)
    }

    for (const result in validationResults){
      if (validationResults[result] !== true){
        setError(validationResults[result])
        return false
      }
    }

    setError(null)
    return true
  }

  function register() {
    setConnecting(true) // disable login btn
    auth()
      .createUserWithEmailAndPassword(mail, password)
      .then(() => {
        /* Do nothing:
        *   - Auth listener in App.js will set the User
        *   - Component will unmount
        * */
      })
      // Error codes: https://firebase.google.com/docs/auth/admin/errors
      .catch(error => {
        setConnecting(false)
        switch(error.code) {
          // Email in use
          case 'auth/email-already-exists':
          case 'auth/email-already-in-use':
            setError(translate("errors.registerFailedExists"))
            break;
          // Wrong email format (should not happen, form is validated)
          case 'auth/invalid-email':
            setError(translate("errors.emailWrong"))
            break;
          // Any other error
          default:
            setError(translate("errors.registerFailedUnknown"))
        }
      })
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}>

      {/*Mail input*/}
      <View>
        <TextInput
          placeholder={translate("register.email")}
          placeholderTextColor={placeholderTextColor}
          returnKeyType="next"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          blurOnSubmit={false}
          onChangeText={ text => setMail(text) }
          onSubmitEditing={ () => passwordInput.focus()}
        />
        <Image
          style={{...styles.inputImageContainer, ...styles.inputImage, left: 10}}
          source={UserImage}/>
      </View>

      {/*Password input*/}
      <View>
        <TextInput
          placeholder={translate("register.password")}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={hiddenPassword}
          textContentType="password"
          returnKeyType="next"
          style={styles.input}
          blurOnSubmit={false}
          ref={ref => passwordInput = ref}
          onChangeText={ text => setPassword(text) }
          onSubmitEditing={ () => repeatPasswordInput.focus()}
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

      {/*Repeat password input*/}
      <View>
        <TextInput
          placeholder={translate("register.repeat")}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={hiddenPassword}
          textContentType="password"
          returnKeyType="go"
          style={styles.input}
          blurOnSubmit={false}
          ref={ref => repeatPasswordInput = ref}
          onChangeText={ text => setRepeatPassword(text) }
          onSubmitEditing={ onSubmit }
        />
        <Image
          style={{...styles.inputImageContainer, ...styles.inputImage, left: 10}}
          source={PasswordImage}/>
      </View>

      {/*Submit btn*/}
      <TouchableHighlight
        style={{...styles.submit, backgroundColor: connecting ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.4)'}}
        underlayColor="rgba(255,255,255,0.5)"
        disabled={connecting}
        onPress={onSubmit}
      >
        <Text style={styles.submitText}>{translate("register.submit").toUpperCase()}</Text>
      </TouchableHighlight>

      {/*Link to login form*/}
      <View style={styles.signUp}>
        <Text style={styles.text}>Or </Text>
        <TouchableHighlight
          underlayColor="rgba(255,255,255,0.4)"
          disabled={connecting}
          onPress={() => setIsLogin(true)}
        >
          <Text style={{...styles.text, textDecorationLine: 'underline'}}>{translate("register.login")}</Text>
        </TouchableHighlight>
      </View>

    </KeyboardAvoidingView>
  );
}

const inputHeight = 40;
const inputGap = 10;
const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  hidden: {
    height: inputHeight,
    marginBottom: inputGap,
    paddingHorizontal: 10,
    opacity: 0,
  },
  input: {
    height: inputHeight,
    marginBottom: inputGap,
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
