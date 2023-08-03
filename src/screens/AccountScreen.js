import { View, Text } from "react-native";
import React from "react";
import { useDeviceContext } from "twrnc";
import Icon from "react-native-vector-icons/AntDesign";
import FaIcon from "react-native-vector-icons/FontAwesome";

import tw from "../utils/tw";
import { Button, Screen } from "../components";
import routeNames from "../utils/routeNames";

export default function AccountScreen({ navigation }) {
  useDeviceContext(tw);

  return (
    <Screen>
      <View style={tw`py-12 pb-8 px-8 flex flex-1 justify-between`}>
        <View style={tw`mb-4`}>
          <Button
            text="Profile"
            style={tw`my-2 py-4 px-6 bg-slate-200 dark:bg-slate-700`}
            textStyle={tw`text-sm text-slate-700 dark:text-slate-200`}
            PrefixIcon={({ style }) => (
              <FaIcon
                name="user"
                size={30}
                style={[style, tw`text-slate-700 dark:text-slate-200`]}
              />
            )}
            Icon={({ color, size }) => (
              <Icon
                name="right"
                size={20}
                style={tw`text-slate-700 dark:text-slate-200`}
              />
            )}
            onPress={() => navigation.navigate(routeNames.profileScreen)}
          />
          <Button
            text="Payment Options"
            style={tw`my-2 py-5 px-6 bg-slate-200 dark:bg-slate-700`}
            textStyle={tw`text-sm text-slate-700 dark:text-slate-200`}
            PrefixIcon={({ style }) => (
              <FaIcon
                name="credit-card"
                size={20}
                style={[style, tw`text-slate-700 dark:text-slate-200`]}
              />
            )}
            Icon={({ color, size }) => (
              <Icon
                name="right"
                size={20}
                style={tw`text-slate-700 dark:text-slate-200`}
              />
            )}
          />
          <Button
            text="Password"
            style={tw`my-2 py-4 px-6 bg-slate-200 dark:bg-slate-700`}
            textStyle={tw`text-sm text-slate-700 dark:text-slate-200`}
            PrefixIcon={({ style }) => (
              <FaIcon
                name="lock"
                size={35}
                style={[style, tw`text-slate-700 dark:text-slate-200`]}
              />
            )}
            Icon={({ color, size }) => (
              <Icon
                name="right"
                size={20}
                style={tw`text-slate-700 dark:text-slate-200`}
              />
            )}
            onPress={() => navigation.navigate(routeNames.passwordsEditScreen)}
          />
        </View>
      </View>
    </Screen>
  );
}
