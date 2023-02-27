import React from 'react';
import {SafeAreaView, Button, Text, StyleSheet} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.title}>React Native Background Downloader</Text>

      <Button
        title={'1- Basic Example'}
        onPress={() => navigation.navigate('root.basic_example')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 16,
  },
});

export default WelcomeScreen;
