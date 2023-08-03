import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useDeviceContext } from "twrnc";
import { AccountScreen } from "../screens";
import {
  BirthdayEditScreen,
  EmailEditScreen,
  MembershipEditScreen,
  NameEditScreen,
  ProfileScreen,
  PhoneEditScreen,
  PasswordsEditScreen,
} from "../screens/Profile";
import routeNames from "../utils/routeNames";
import tw from "../utils/tw";
import Header from "./Header";

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  useDeviceContext(tw);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: tw`bg-slate-100 dark:bg-slate-700`,
        headerTitleStyle: tw`text-secondary dark:text-secondary-light font-lato-bold text-center`,
      }}
    >
      <Stack.Screen
        name={routeNames.accountScreen}
        component={AccountScreen}
        options={{ title: "Account" }}
      />
      <Stack.Screen
        name={routeNames.profileScreen}
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name={routeNames.nameEditScreen}
        component={NameEditScreen}
        options={{ title: "Name" }}
      />
      <Stack.Screen
        name={routeNames.emailEditScreen}
        component={EmailEditScreen}
        options={{ title: "Email" }}
      />
      <Stack.Screen
        name={routeNames.membershipEditScreen}
        component={MembershipEditScreen}
        options={{ title: "Membership Type" }}
      />
      <Stack.Screen
        name={routeNames.birthdayEditScreen}
        component={BirthdayEditScreen}
        options={{ title: "Birthday" }}
      />
      <Stack.Screen
        name={routeNames.phoneEditScreen}
        component={PhoneEditScreen}
        options={{ title: "Phone" }}
      />
      <Stack.Screen
        name={routeNames.passwordsEditScreen}
        component={PasswordsEditScreen}
        options={{ title: "Passwords" }}
      />
    </Stack.Navigator>
  );
}
