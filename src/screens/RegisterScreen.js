import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { useDeviceContext } from "twrnc";
import Icon from "react-native-vector-icons/AntDesign";

import tw from "../utils/tw";
import {
  Button,
  Picker,
  RegisterHeader,
  Screen,
  TextField,
  DatePicker,
} from "../components";
import routeNames from "../utils/routeNames";

export default function RegisterScreen({ navigation }) {
  const memberShipData = [
    { value: "guest", label: "Guest/Diner", fee: "Free" },
    { value: "staff", label: "Staff", fee: "Free" },
    { value: "vip", label: "VIP Member", fee: "Free" },
    { value: "executive", label: "Executive", fee: "Free" },
  ];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [memberShipType, setMemberShipType] = useState(memberShipData[0]);

  useDeviceContext(tw);

  return (
    <Screen scrollView>
      <RegisterHeader navigation={navigation} />
      <View style={tw`py-12 pt-20 px-8 flex flex-1`}>
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
          <TextField
            containerStyle={tw`px-0`}
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            onChange={(text) => setEmail(text)}
          />
          <TextField
            containerStyle={tw`px-0`}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChange={(text) => setPassword(text)}
          />
          <DatePicker
            title="Date of Birth"
            value={dateOfBirth}
            setValue={setDateOfBirth}
          />
          <Picker
            placeholder="Choose a Membership Type"
            data={memberShipData}
            value={memberShipType}
            setValue={(text) => setMemberShipType(text)}
          />
        </View>
        <View style={tw`mb-4`}>
          <Text
            style={tw`font-lato-bold text-lg text-gray-500 dark:text-slate-300 mb-12`}
          >
            Monthly Membership Fee:{" "}
            <Text style={tw`text-secondary dark:text-secondary-light`}>
              Free
            </Text>
          </Text>
          <Text style={tw`font-lato-bold text-gray-500 dark:text-slate-300`}>
            See{" "}
            <Text style={tw`text-secondary dark:text-secondary-light`}>
              what's included
            </Text>{" "}
            for the selected membership option.
          </Text>
        </View>
        <View style={tw`w-full`}>
          <Button
            text="Continue"
            style={tw`mt-6 mb-3 py-3 px-8`}
            textStyle={tw`text-base`}
            Icon={({ color, size }) => (
              <Icon name="arrowright" size={30} color={color} />
            )}
            onPress={() => navigation.navigate(routeNames.paymentScreen)}
          />
        </View>
      </View>
    </Screen>
  );
}
