import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { JoinQuizScreen } from "../screens/JoinQuizScreen/JoinQuizScreen";
import { QuizScreen } from "~/screens/QuizScreen/QuizScreen";

const Main = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Main.Navigator>
      <Main.Screen name="JoinQuizScreen" component={JoinQuizScreen} />
      <Main.Screen name="QuizScreen" component={QuizScreen} />
    </Main.Navigator>
  )
}