import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./screens/main";
import Plan from "./screens/plan";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="main">
        <Stack.Screen
          name="plan"
          component={Plan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="main"
          component={Main}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
