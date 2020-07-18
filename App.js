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
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const MainSwitch = Platform.select({
  ios: () => SegmentedControl,
  android: () => SegmentedControl,
})();

const App: () => React$Node = () => {
  const [tabs, setTabs] = useState([]);
  useEffect(() => {
    // Set up internationalization
    setI18nConfig();
    // Set up tabnames
    setTabs(Object.values(translate('tabnames')));
  }, []);

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
            selectedIndex={0}
            onChange={(event) => {
              this.setState({
                selectedIndex: event.nativeEvent.selectedSegmentIndex,
              });
            }}
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
    margin: 40,
  },
});

export default App;
