import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { SignInScreen } from '@Noble/screens/auth/SignInScreen';
import { SignUpScreen } from '@Noble/screens/auth/SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function LoggedOutRouteHandler() {
  const { design } = useContext(GlobalContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: design.primary,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
