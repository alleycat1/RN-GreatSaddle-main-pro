import { View, Text, TextInput } from "react-native";
import React from "react";
import { useDeviceContext } from "twrnc";
import { useDimensions } from "@react-native-community/hooks";
import Icon from "react-native-vector-icons/AntDesign";

import tw from "../utils/tw";
import { Button, CountryCodePicker, Screen } from "../components";
import { colors } from "../config/theme";
import routeNames from "../utils/routeNames";

export default function AddPhoneNumberScreen({ navigation }) {
  useDeviceContext(tw);
  const dimensions = useDimensions().window;

  return (
    <Screen scrollView>
      <View style={tw`py-12 px-2 flex flex-1 items-center`}>
        <View>
          <Text
            style={tw`text-center text-lg font-lato-bold text-base pb-12 text-dark dark:text-light`}
          >
            Please enter your phone number.
          </Text>
          <View
            style={[
              tw`flex flex-row w-full border-secondary dark:border-secondary-light rounded-xl`,
              { borderWidth: 1 },
            ]}
          >
            <CountryCodePicker />
            <TextInput
              style={tw`w-8/12 h-full text-sm px-2 font-lato text-dark dark:text-light`}
              keyboardType="phone-pad"
              placeholder="Phone number"
              placeholderTextColor={colors["medium"]}
            />
          </View>
        </View>
        <View style={{ marginTop: dimensions.height * 0.24 }}>
          <Text
            style={tw`font-lato-bold text-center text-sm text-dark dark:text-light`}
          >
            By creating an account, you agree to our
          </Text>
          <Text
            style={tw`font-lato-bold text-center text-secondary dark:text-secondary-light text-sm`}
          >
            Terms and Agreement
          </Text>
        </View>
        <View style={tw`w-full px-5`}>
          <Button
            text="Next"
            style={tw`mt-6 mb-3 py-3 px-8`}
            textStyle={tw`text-base`}
            Icon={({ color, size }) => (
              <Icon name="arrowright" size={30} color={color} />
            )}
            onPress={() => navigation.navigate(routeNames.registerScreen)}
          />
        </View>
      </View>
    </Screen>
  );
}
