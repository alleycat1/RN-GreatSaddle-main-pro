import { Text, View } from "react-native";
import React, { useState } from "react";
import { useDeviceContext } from "twrnc";

import tw from "../../utils/tw";
import { Button, Screen, TextField } from "../../components";

export default function EmailEditScreen({ navigation }) {
  const [email, setEmail] = useState("");

  useDeviceContext(tw);

  return (
    <Screen>
      <View style={tw`py-20 pb-8 px-8 flex flex-1 justify-between`}>
        <View style={tw`mb-4`}>
          <TextField
            containerStyle={tw`px-0 mb-2`}
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            onChange={(text) => setEmail(text)}
          />
          <Text
            style={tw`text-sm font-lato-bold text-secondary dark:text-secondary-light`}
          >
            We’ll send an email to you for verification.
          </Text>
        </View>
        <View style={tw`w-full`}>
          <Button
            text="Change"
            style={tw`mt-6 mb-3 py-3 px-8 justify-center`}
            textStyle={tw`text-base`}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </Screen>
  );
}
