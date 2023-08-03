import { View } from "react-native";
import React, { useState } from "react";
import { useDeviceContext } from "twrnc";

import tw from "../../utils/tw";
import { Button, Screen, TextField } from "../../components";

export default function NameEditScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useDeviceContext(tw);

  return (
    <Screen>
      <View style={tw`py-20 pb-8 px-8 flex flex-1 justify-between`}>
        <View style={tw`mb-4`}>
          <TextField
            containerStyle={tw`px-0`}
            placeholder="First name"
            value={firstName}
            onChange={(text) => setFirstName(text)}
          />
          <TextField
            containerStyle={tw`px-0`}
            placeholder="Last name"
            value={lastName}
            onChange={(text) => setLastName(text)}
          />
        </View>
        <View style={tw`w-full`}>
          <Button
            text="Save"
            style={tw`mt-6 mb-3 py-3 px-8 justify-center`}
            textStyle={tw`text-base`}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </Screen>
  );
}
