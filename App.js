import React, {useEffect, useState} from 'react';
import {translate, setI18nConfig} from './src/translations/i18-helper';

import {
  SafeAreaView,
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';


const MainSwitch = Platform.select({
  ios: () => SegmentedControl,
  android: () => SegmentedControl,
})();

// First view controlled by the tab bar / segmented control
const FirstRoute = () => (
  <React.Fragment>
    <View style={[styles.scene, { backgroundColor: '#orange' }]} />
    <Text>This is tab 1</Text>
  </React.Fragment>
);

// First view controlled by the tab bar / segmented control
const SecondRoute = () => (
  <React.Fragment>
    <View style={[styles.scene, { backgroundColor: '#orange' }]} />
    <Text>This is tab 2</Text>
  </React.Fragment>
);


// Initial layout for tab views
const initialLayout = { width: Dimensions.get('window').width };

// Main app
const App: () => React$Node = () => {

  const [tabs, setTabs] = useState([]);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  useEffect(() => {
    // Set up internationalization
    setI18nConfig();
    // Set up tabnames
    setTabs(Object.values(translate('tabnames')));
  }, []);

  // Render the tabbar with custom props to hide it on iOS

  const renderTabBar = props => (
    Platform.select({
      ios: () => <TabBar
                  {...props}
                  style={{ height: 0 }}
                />,
      android: () =>  <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: 'white' }}
                        style={{ backgroundColor: 'orange' }}
                      />,
    })()
  );

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <MainSwitch
            values={tabs}
            style={styles.segmentedControl}
            selectedIndex={tabIndex}
            onChange={(event) => {
              setTabIndex(event.nativeEvent.selectedSegmentIndex);
            }}
          />

          <TabView
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColouinr: 'pink' }}
            navigationState={{ index: tabIndex, routes: routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setTabIndex}
            initialLayout={initialLayout}
          />

        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
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
