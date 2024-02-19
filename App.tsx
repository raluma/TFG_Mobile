import { Alert, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { getHeaderTitle } from '@react-navigation/elements';
import Header from './src/components/Header';
import Home from './src/screens/Home';
import Account from './src/screens/Account';
import { useSessionStore } from './src/services/sessionStore';
import { useModalStore } from './src/services/modalStore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faAdd, faGear } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-native-elements';
import Auth from './src/screens/Auth';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();

const App = () => {
  const actions: number = useSessionStore((state: any) => state.actions);
  const id: string = useSessionStore((state: any) => state.id);
  const email: string = useSessionStore((state: any) => state.email);
  const password: string = useSessionStore((state: any) => state.password);
  const response: string = useSessionStore((state: any) => state.response);
  const session = { id, email, password };
  const setItem = useModalStore((state: any) => state.setItem);
  const setVisible = useModalStore((state: any) => state.setVisible);

  useEffect(() => {
    setTimeout(() => {
      if (response !== undefined) Alert.alert("", response);
    }, 1000);
  }, [actions]);

  const addEvent = async () => {
    setItem(undefined);
    setVisible(true);
  }

  return (
    <>
    { 
      email !== undefined ?
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => {
                return <FontAwesomeIcon  icon={ 
                  route.name === 'Home' ? faHome 
                  : route.name === 'Add' ? faAdd 
                  : faGear
                } 
                color={
                  focused && route.name === 'Home' ? 'blue' 
                  : focused && route.name === 'Add' ? 'red'
                  : focused && route.name === 'Account' ? 'orange'
                  : 'black'
                }  size={30} />
              },
              tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: 'black',
              header: ({ route, options, navigation }) => {
                const title = getHeaderTitle(options, route.name);
              
                return <Header title={title} session={session} />;
              }
            })}
          >
            <Tab.Screen 
              name='Home' 
              children={()=> <Home session={session} />}
            />

            <Tab.Screen 
              name='Add' 
              children={()=> <Home session={session} />}
              options={{
                tabBarButton: () => {
                  return (
                    <Button icon={
                      <FontAwesomeIcon icon={faAdd} size={20} />
                    } buttonStyle={styles.addIcon} 
                    onPress={addEvent} />
                  );
                }
              }}
            />

            <Tab.Screen 
              name='Account' 
              children={()=> <Account session={session} />}
            />

          </Tab.Navigator>
        </NavigationContainer>
      :
        <Auth />
      }
    </>
  )
}

const styles = StyleSheet.create({
  addIcon: {
    padding: 6,
    borderWidth: 2,
    borderRadius: 40,
    borderColor: "black",
    backgroundColor: "white"
  }
})

export default App;