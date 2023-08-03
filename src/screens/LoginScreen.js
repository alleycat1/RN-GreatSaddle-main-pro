import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useDimensions } from "@react-native-community/hooks";
import CheckBox from "@react-native-community/checkbox";
import Icon from "react-native-vector-icons/AntDesign";
import { useDeviceContext } from "twrnc";

import tw from "../utils/tw";
import { Logo, TextField, Button, Screen } from "../components";
import routeNames from "../utils/routeNames";

export default function App({ navigation }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  useDeviceContext(tw);

  const dimensions = useDimensions().window;

  const navigateToRegisterScreen = () => {
    navigation.navigate(routeNames.addPhoneNumber);
  }

  const onSignInPress = (tabId, author) => {

    if (checked == true)
      navigation.navigate('Home', { tabId: tabId, author: author })
  }

  return (
    <Screen>
      <View
        style={tw`flex-1 flex-col items-center bg-slate-100 dark:bg-slate-800`}
      >
        <View
          style={[
            tw`flex flex-row`,
            {
              paddingTop: dimensions.height * 0.16,
              paddingBottom: dimensions.height * 0.08,
            },
          ]}
        >
          <Logo />
        </View>
        <Text
          style={tw`text-xl font-lato-bold text-gray-500 dark:text-slate-100 pb-8`}
        >
          Let's sign you in!
        </Text>
        <View style={tw`w-full flex flex-col`}>
          <TextField
            placeholder="Email"
            value={userName}
            onChange={(text) => setUserName(text)}
          />
          <TextField
            placeholder="Password"
            value={password}
            onChange={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <View style={tw`w-full flex flex-row items-center justify-center`}>
          <CheckBox
            disabled={false}
            value={checked}
            onValueChange={(newValue) => setChecked(newValue)}
          />
          <Text>Accept terms & conditions</Text>
        </View>
        <View style={tw`w-full px-5`}>
          <Button
            text="Sign-in"
            style={tw`mb-6`}
            Icon={({ color, size }) => (
              <Icon name="arrowright" size={size} color={color} />
            )}
            onPress={onSignInPress.bind(null, 0, -1)}
          />
          <TouchableOpacity onPress={navigateToRegisterScreen}>
            <Text
              style={tw`text-base font-lato text-gray-500 dark:text-slate-100 pb-8 text-center`}
            >
              Or{" "}
              <Text style={tw`text-secondary dark:text-secondary-light`}>
                Register
              </Text>{" "}
              Here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}
