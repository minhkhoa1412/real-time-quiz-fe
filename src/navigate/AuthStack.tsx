import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen/LoginScreen";

const Auth = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
    </Auth.Navigator>
  )
}