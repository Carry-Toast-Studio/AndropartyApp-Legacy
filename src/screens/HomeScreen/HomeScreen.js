import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {translate} from '../../translations/i18-helper';
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  PlatformColor,
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import FirstTab from './FirstTabAlt'
import SecondTab from './SecondTab'


// Initial layout for tab views
const initialLayout = { width: Dimensions.get('window').width};

// Full app view (sans top appbar/navigation bar)
function HomeScreen() {

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

  // Render the tabbar with custom props to hide it on iOS
  const renderTabBar = props => (
    Platform.select({
      ios: () => <TabBar
                  {...props}
                  style={{ height: 0 }}
                />,
      android: () =>
        <View>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: 'orange'}}
          />
        </View>
    })()
  );

  return (
    <React.Fragment>
      <StatusBar
        barStyle="light-content"
        backgroundColor = "darkorange"/>

      <SafeAreaView>

        <View style={{...styles.container, height: Dimensions.get('window').height}}>

          {
            // Enable segmented control only on iOS
            Platform.OS === 'ios' ?
              <SegmentedControl
                values={[translate("tabnames.tab1"), translate("tabnames.tab2")]}
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
    ...Platform.select({
      ios: {
        backgroundColor: PlatformColor('systemBackground')
      },
      android: {
        backgroundColor: Colors.lighter,
      },
      default: {
        backgroundColor: Colors.lighter,
      }
    })
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


export default HomeScreen;
