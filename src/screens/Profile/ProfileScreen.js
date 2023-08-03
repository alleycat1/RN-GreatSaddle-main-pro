import { View, Text, Image } from "react-native";
import React from "react";
import { useDeviceContext } from "twrnc";
import Icon from "react-native-vector-icons/AntDesign";

import tw from "../../utils/tw";
import { Button, Screen } from "../../components";
import routeNames from "../../utils/routeNames";

export default function ProfileScreen({ navigation }) {
  useDeviceContext(tw);

  return (
    <Screen>
      <View style={tw`py-6 pb-8 px-4 flex flex-1 justify-between`}>
        <View style={tw`mb-4`}>
          <View style={tw`mb-6 flex-row items-center px-4`}>
            <Image
              source={require("../../assets/images/user.png")}
              style={tw`w-20 h-20 rounded-full mb-3 mr-6`}
            />
            <View>
              <Text style={tw`text-slate-500 font-lato`}>Howdy,</Text>
              <Text
                style={tw`text-primary dark:text-primary-light text-lg font-lato-bold`}
              >
                James
              </Text>
            </View>
          </View>
          <Button
            text="Name"
            style={tw`my-1 py-3 px-6 bg-transparent`}
            textStyle={tw`text-sm text-slate-500 dark:text-slate-400`}
            Icon={({ color, size }) => (
              <Icon
                name="right"
                size={20}
                style={tw`text-slate-700 dark:text-slate-200`}
              />
            )}
            onPress={() => navigation.navigate(routeNames.nameEditScreen)}
          />
          <Button
            text="Email"
            style={tw`my-1 py-3 px-6 bg-transparent`}
            textStyle={tw`text-sm text-slate-500 dark:text-slate-400`}
            Icon={({ color, size }) => (
              <Icon
                name="right"
                size={20}
                style={tw`text-slate-700 dark:text-slate-200`}
              />
            )}
            onPress={() => navigation.navigate(routeNames.emailEditScreen)}
          />
          <Button
            text="Membership Type"
            style={tw`my-1 py-3 px-6 bg-transparent`}
            textStyle={tw`text-sm text-slate-500 dark:text-slate-400`}
            Icon={({ color, size }) => (
              <Icon
                name="right"
                size={20}
                style={tw`text-slate-700 dark:text-slate-200`}
              />
            )}
            onPress={() => navigation.navigate(routeNames.membershipEditScreen)}
          />
          <Button
            text="Birthday"
            style={tw`my-1 py-3 px-6 bg-transparent`}
            textStyle={tw`text-sm text-slate-500 dark:text-slate-400`}
            Icon={({ color, size }) => (
              <Icon
                name="right"
                size={20}
                style={tw`text-slate-700 dark:text-slate-200`}
              />
            )}
            onPress={() => navigation.navigate(routeNames.birthdayEditScreen)}
          />
          <Button
            text="Phone"
            style={tw`my-1 py-3 px-6 bg-transparent`}
            textStyle={tw`text-sm text-slate-500 dark:text-slate-400`}
            Icon={({ color, size }) => (
              <Icon
                name="right"
                size={20}
                style={tw`text-slate-700 dark:text-slate-200`}
              />
            )}
            onPress={() => navigation.navigate(routeNames.phoneEditScreen)}
          />
        </View>
      </View>
    </Screen>
  );
}
