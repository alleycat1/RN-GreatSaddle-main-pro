import React from "react";
import { View, Text, Platform } from "react-native";
import { useDimensions } from "@react-native-community/hooks";
import { getHeaderTitle } from "@react-navigation/elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import tw from "../utils/tw";

export default function Header({ navigation, route, options, back, bg }) {
  const dimensions = useDimensions().window;
  const title = getHeaderTitle(options, route.name);
  const BackButtonIcon =
    Platform.OS === "android" ? "arrow-back" : "arrow-back-ios";
  const goBack = () => navigation.goBack();

  return (
    <View
      style={[
        tw`bg-primary dark:bg-primary-light flex flex-row py-6`,
        { height: bg && dimensions.height * 0.28 },
      ]}
    >
      <View style={tw`w-full flex flex-row px-4`}>
        {back && (
          <Icon
            name={BackButtonIcon}
            size={25}
            onPress={goBack}
            style={tw`text-light dark:text-primary`}
          />
        )}
        <Text
          style={[
            tw`text-lg font-lato-bold text-light dark:text-primary mx-auto`,
          ]}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}
