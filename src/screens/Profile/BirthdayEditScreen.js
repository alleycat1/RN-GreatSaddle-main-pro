import { Text, View } from "react-native";
import React, { useState } from "react";
import { useDeviceContext } from "twrnc";

import tw from "../../utils/tw";
import { Button, DatePicker, Screen } from "../../components";

export default function BirthdayEditScreen({ navigation }) {
  const [dateOfBirth, setDateOfBirth] = useState("");

  useDeviceContext(tw);

  return (
    <Screen>
      <View style={tw`py-20 pb-8 px-8 flex flex-1 justify-between`}>
        <View style={tw`mb-4`}>
          <DatePicker
            title="Choose your birthday"
            value={dateOfBirth}
            setValue={setDateOfBirth}
            containerStyle={tw`flex-col items-start w-full`}
            titleStyle={tw`mb-4`}
            buttonStyle={tw`w-full py-3 bg-slate-200 dark:bg-slate-700`}
            buttonTextStyle={tw`text-slate-700 dark:text-slate-200`}
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
