import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {setI18nConfig, translate} from './src/translations/i18-helper';
import {
  Platform,
  StyleSheet,
  Button, Alert,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen'
import auth from '@react-native-firebase/auth';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';


// Stack navigation (for navigation)
const Stack = createStackNavigator();

// Main app
const App: () => React$Node = () => {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.info("AUTH CHANGED: ", user)
    // Prevent deleted accounts from signing in
    if (user != null) checkAccountExists(user)
    setUser(user)
    setInitializing(false)
  }

  function checkAccountExists(user){
    auth()
      .fetchSignInMethodsForEmail(user.email)
      // Everything went fine, sign in automatically
      .then( res => {
        // No auth methods were returned, sign out user
        if (res.length === 0) logout(true)
      })
      .catch( error => {
        // Ignore network errors and let the user browse the app
        if (error.code !== 'auth/network-request-failed') {
          logout(true)
        }
      })
  }

  function logout (notify) {
    auth().signOut().then( () => {
        // If notify is absent or false, do a silent logout
        if (notify) {
          alert(translate('logout.logout'), translate('logout.message'));
        }
      })
      .catch( error => {
        if (error.code !== 'auth/no-current-user') {
          alert(translate('errors.error'), translate('logout.message'));
        }
      })
  }

  function alert(title, message){
    Alert.alert(
      title,
      message,
      [
        {
          text: "Ok",
          style: "default"
        }
      ],
      {cancelable: false}
    );
  }

  useEffect(() => {
  	// Launch Screen is not enabled on iOS
  	if (Platform.OS != "ios"){
  		SplashScreen.hide()
  	}
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  // Set up internationalization
  useEffect(() => {
    setI18nConfig();
    }, []);

  return (
    initializing ? null :
    !user ? <LoginScreen /> :
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Androparty App"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: 'orange',
              elevation: 0
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              Platform.OS === 'ios' ?
                <Button
                  styles = {{padding: 200}}
                  onPress={() => alert('Not yet implemented!')}
                  title="Add"
                  color="#fff"
                />
              : null
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  segmentedControl: {
    ...Platform.select({
      ios: {
        margin: 20,
      },
      android: {
        height: 0
      },
      default: {
        height: 0
      }
    })
  }

});

export default App;
