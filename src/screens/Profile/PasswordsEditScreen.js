import { View } from "react-native";
import React, { useState } from "react";
import { useDeviceContext } from "twrnc";

import tw from "../../utils/tw";
import { Button, Screen, TextField } from "../../components";

export default function PasswordsEditScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");

  useDeviceContext(tw);

  return (
    <Screen>
      <View style={tw`py-20 pb-8 px-8 flex flex-1 justify-between`}>
        <View style={tw`mb-4`}>
          <TextField
            containerStyle={tw`px-0 mb-8`}
            placeholder="Current Password"
            value={currentPassword}
            secureTextEntry
            onChange={(text) => setCurrentPassword(text)}
          />
          <TextField
            containerStyle={tw`px-0 mb-8`}
            placeholder="New Password"
            value={newPassword}
            secureTextEntry
            onChange={(text) => setNewPassword(text)}
          />
          <TextField
            containerStyle={tw`px-0 mb-8`}
            placeholder="New Password Again"
            value={newPasswordAgain}
            secureTextEntry
            onChange={(text) => setNewPasswordAgain(text)}
          />
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
