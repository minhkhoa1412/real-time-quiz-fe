import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { JoinQuizScreen } from "../screens/JoinQuizScreen/JoinQuizScreen";

const Main = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Main.Navigator>
      <Main.Screen name="JoinQuizScreen" component={JoinQuizScreen} />
    </Main.Navigator>
  )
}