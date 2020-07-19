import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  Text
} from 'react-native';
import LoginForm from '../../components/LoginScreen/LoginForm';
import {translate} from '../../translations/i18-helper';
import Wallpaper from '../../components/Wallpaper';
import Logo from '../../assets/images/logo.png';
import {Colors} from 'react-native/Libraries/NewAppScreen';


// Login app view
function LoginScreen() {

  return (
    <React.Fragment>
      <StatusBar
        barStyle="light-content"
        backgroundColor = "darkorange"/>

      <Wallpaper />
      <View style={styles.container}>

        {/*Logo*/}
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={Logo} />
          <Text style={styles.title}>{translate("login.login").toUpperCase()}</Text>
        </View>

        {/*Form*/}
        <View style={styles.formContainer}>
          <LoginForm />
        </View>

      </View>


    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: Colors.white,
    marginTop: 10,
    textAlign: 'center'
  },
  formContainer: {

  }
});


export default LoginScreen;
