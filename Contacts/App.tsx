import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import Profile from './components/Profile';
import Search from './components/Search';
import Favorite from './components/Favorite';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function Home() {
  return(
  <Stack.Navigator screenOptions={
    {
      headerStyle: { backgroundColor: 'purple' },
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontSize: 30 }
    }}>
    <Stack.Screen name='ContactList' component={ContactList} />
    <Stack.Screen name='Add Contact' component={AddContact} />
    <Stack.Screen name='Update Contact' component={Profile} />
    <Stack.Screen
      component={Search}
      name={'Search'}
      options={{ title: 'Search contact' }}
    />
  </Stack.Navigator>
  )
}
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{tabBarStyle:{backgroundColor:'purple'}}}>
        <Tab.Screen name="Contacts"
          component={Home}
          options={{ headerShown: false   }} />
        <Tab.Screen name='Favorites' component={Favorite} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}



export default App;
