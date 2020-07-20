import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  Text
} from 'react-native';
import {LoginForm, RegisterForm} from '../../components/LoginScreen/LoginForm';
import {translate} from '../../translations/i18-helper';
import Wallpaper from '../../components/Wallpaper';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Logo from '../../assets/images/logo.png';
import ErrorImage from '../../assets/images/cross.png'


// Login app view
const LoginScreen = ({setUser}) => {

  const [error, setError] = React.useState(''); // error in the form
  const [isLogin, setIsLogin] = React.useState(true); // true == login screen, false == register


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
          <Text style={styles.title}>{translate("app")}</Text>
        </View>
        {
          // Change opacity so that it is always rendered and does not move other components when appearing
            <View style={{...styles.errorContainer, opacity: error ? 100 : 0}}>
              <Image style={styles.errorImage} source={ErrorImage}/>
              <Text style={styles.errorText}>{error}</Text>
            </View>
        }

        {/*Form*/}
        <View>
          {
            isLogin ?
              <LoginForm setUser={setUser} setError={setError} setIsLogin={setIsLogin} /> :
              <RegisterForm setUser={setUser} setError={setError} setIsLogin={setIsLogin} />
          }
        </View>

      </View>


    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  logo: {
    width: 300,
    height: 300,
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
