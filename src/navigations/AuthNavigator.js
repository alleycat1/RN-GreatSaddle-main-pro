import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  AddPaymentScreen,
  AddPhoneNumberScreen,
  LoginScreen,
  RegisterScreen,
} from "../screens";
import routeNames from "../utils/routeNames";
import Header from "./Header";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const header = (props) => <Header {...props} />;
  const largeHeader = (props) => <Header bg {...props} />;

  return (
    <Stack.Navigator screenOptions={{ header: largeHeader }}>
      <Stack.Screen
        name={routeNames.login}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={routeNames.addPhoneNumber}
        component={AddPhoneNumberScreen}
        options={{ title: "Phone Number" }}
      />
      <Stack.Screen
        name={routeNames.registerScreen}
        component={RegisterScreen}
        options={{ title: "Personal Info", headerShown: false }}
      />
      <Stack.Screen
        name={routeNames.paymentScreen}
        component={AddPaymentScreen}
        options={{ title: "Add Payment Options", header }}
      />
    </Stack.Navigator>
  );
}
