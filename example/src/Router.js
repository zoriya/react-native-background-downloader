import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './Welcome';
import BasicExampleScreen from './BasicExample';

const RootStack = createStackNavigator();

const Router = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={'root.welcome'}
        options={{headerTitle: 'Welcome'}}
        component={WelcomeScreen}
      />

      <RootStack.Screen
        name={'root.basic_example'}
        options={{headerTitle: 'Basic Example'}}
        component={BasicExampleScreen}
      />
    </RootStack.Navigator>
  );
};

export default Router;
