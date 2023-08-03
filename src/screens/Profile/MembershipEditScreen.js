import { Text, View } from "react-native";
import React, { useState } from "react";
import { useDeviceContext } from "twrnc";
import CheckBox from "@react-native-community/checkbox";

import tw from "../../utils/tw";
import { Button, Picker, Screen } from "../../components";

export default function MembershipEditScreen({ navigation }) {
  const memberShipData = [
    { value: "guest", label: "Guest/Diner", fee: "Free" },
    { value: "staff", label: "Staff", fee: "Free" },
    { value: "vip", label: "VIP Member", fee: "Free" },
    { value: "executive", label: "Executive", fee: "Free" },
  ];
  const [memberShipType, setMemberShipType] = useState(memberShipData[0]);
  const [checked, setChecked] = useState(false);

  useDeviceContext(tw);

  return (
    <Screen>
      <View style={tw`py-20 pb-8 px-8 flex flex-1 justify-between`}>
        <View style={tw`mb-4`}>
          <Picker
            placeholder="Choose a Membership Type"
            data={memberShipData}
            value={memberShipType}
            setValue={(text) => setMemberShipType(text)}
          />
          <Text
            style={tw`font-lato-bold text-lg text-gray-500 dark:text-slate-300 mb-4`}
          >
            Monthly Membership Fee:{" "}
            <Text style={tw`text-secondary dark:text-secondary-light`}>
              Free
            </Text>
          </Text>
          <View style={tw`flex-row items-center mx-0 px-0`}>
            <CheckBox value={checked} onChange={() => setChecked(!checked)} />
            <Text
              style={tw`text-sm font-lato text-gray-500 dark:text-slate-300`}
            >
              I accept to pay the monthly subscription fee above.
            </Text>
          </View>
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
