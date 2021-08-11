import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './redux/state';
import {Header} from './components';
import {AddScreen, ListScreen} from './screens';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

export default function App() {
   return (
      <Provider store={store}>
         <StatusBar backgroundColor={'orange'} />

         <Header text={'vacabluary'} />
         <NavigationContainer>
            <Tab.Navigator
               screenOptions={{
                  headerShown: false,
                  tabBarLabelStyle: {fontSize: 14},
                  tabBarHideOnKeyboard: true,
                  tabBarActiveTintColor: 'orange',
                  tabBarInactiveTintColor: '#444',
               }}>
               <Tab.Screen
                  name="AddScreen"
                  component={AddScreen}
                  options={{
                     tabBarIcon: ({color}) => <Icon name="add-to-list" size={30} color={color} />,
                  }}
               />
               <Tab.Screen
                  name="ListScreen"
                  component={ListScreen}
                  options={{
                     tabBarIcon: ({color}) => <Icon name="list" size={30} color={color} />,
                  }}
               />
            </Tab.Navigator>
         </NavigationContainer>
      </Provider>
   );
}
