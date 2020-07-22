import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Text
} from 'react-native';
import {LoginForm, RegisterForm} from '../../components/LoginScreen/LoginForm';
import {translate} from '../../translations/i18-helper';
import Wallpaper from '../../components/Wallpaper';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Logo from '../../assets/images/logo.png';
import ErrorImage from '../../assets/images/cross.png'

// Login app view
const LoginScreen = () => {

  const [error, setError] = React.useState(null); // error in the form
  const [isLogin, setIsLogin] = React.useState(true); // true == login screen, false == register


  return (
    <React.Fragment>
      <StatusBar
        barStyle="light-content"
        backgroundColor = "darkorange"/>

      <Wallpaper />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView 
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}>

          {/*Logo*/}
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={Logo} />
            {/*<Text style={styles.title}>{translate("app")}</Text>*/}
          </View>

          {/*Change opacity so that error it is always rendered and does not move other components when appearing*/}
          <View style={{...styles.errorContainer, backgroundColor: 'pink', opacity: error ? 100 : 0}}>
              <Image style={styles.errorImage} source={ErrorImage}/>
              <Text style={styles.errorText}>{error}</Text>
          </View>

          {/*Form*/}
          <View>
            {
              isLogin ?
                <LoginForm setError={setError} setIsLogin={setIsLogin} /> :
                <RegisterForm setError={setError} setIsLogin={setIsLogin} />
            }
          </View>

        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>


    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'flex-end', //To make  work properly
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  logo: {
    width: Dimensions.get('window').width*0.9,
    height: Dimensions.get('window').width*0.9
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center'
  },
  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 70,
    marginTop: 10
  },
  errorImage: {
    width: 18,
    height: 18,
  },
  errorText: {
    color: Colors.black,
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: 5,
  }

});


export default LoginScreen;
