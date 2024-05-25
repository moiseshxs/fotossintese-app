import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Tabs from './tabs';
import Home from '../pages/home';
import Perfil from '../pages/perfil';
import Camera from '../pages/camera';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
export default function StackRoutes() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: true }}>

      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          title: 'Inicio',
          headerStyle: { backgroundColor: 'white', borderBottomWidth: 0 },
          headerTintColor: 'black',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='Perfil'
        component={Perfil}
        options={{
          title: 'Perfil',
          headerStyle: { backgroundColor: 'white', borderBottomWidth: 0 },
          headerTintColor: 'black',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name='Camera'
        component={Camera}
        options={{
          title: 'Camera',
          headerStyle: { backgroundColor: 'white', borderBottomWidth: 0 },
          headerTintColor: 'black',
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}
