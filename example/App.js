import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View, Text} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.safeWrapper}>
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <Text style={styles.title}>React Native Background Downloader</Text>

        <View style={styles.wrapper} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeWrapper: {
    flex: 1,
  },
  scrollWrapper: {
    flex: 1,
    flexGrow: 1,
  },
  wrapper: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default App;
