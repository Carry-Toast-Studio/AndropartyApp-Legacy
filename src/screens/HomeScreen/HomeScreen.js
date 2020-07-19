import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {translate, setI18nConfig} from '../../translations/i18-helper';
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirstTab from './FirstTab'
import SecondTab from './SecondTab'


// Initial layout for tab views
const initialLayout = { width: Dimensions.get('window').width };

// Full app view (sans top appbar/navigation bar)
function HomeScreen() {
  const [tabs, setTabs] = useState([]);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: translate('tabnames.tab1') },
    { key: 'second', title: translate('tabnames.tab2') },
  ]);

  // renderScene matches each tab with each component (i.e. tab views)
  const renderScene = SceneMap({
    first: FirstTab,
    second: SecondTab,
  });

  // Internationalization
  useEffect(() => {
    // Set up internationalization
    setI18nConfig();
    // Set up tabnames
    setTabs(Object.values(translate('tabnames')));
  }, []);

  // Render the tabbar with custom props to hide it on iOS (without hiding the tabview)
  const renderTabBar = props => (
    Platform.select({
      ios: () => <TabBar
                  {...props}
                  style={{ height: 0 }}
                />,
      android: () =>  <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: 'white' }}
                        style={{ backgroundColor: 'orange'}}
                      />,
    })()
  );

  return (
    <React.Fragment>
      <StatusBar
        barStyle="light-content"
        backgroundColor = "darkorange"/>

      <SafeAreaView>

        <View style={{height: Dimensions.get('window').height, backgroundColor: Colors.lighter}}>

          { 
            // Disable segmented control on Android
            Platform.OS === 'ios' ?
              <SegmentedControl
                values={tabs}
                style={styles.segmentedControl}
                selectedIndex={tabIndex}
                onChange={(event) => {
                  setTabIndex(event.nativeEvent.selectedSegmentIndex);
                }}
              /> :
              null
          }

          <TabView
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColouinr: 'pink' }}
            navigationState={{ index: tabIndex, routes: routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setTabIndex}
            initialLayout={initialLayout}
          />

        </View>

      </SafeAreaView>
    </React.Fragment>
  );
}

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
  },

});


export default HomeScreen;
