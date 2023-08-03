import React from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import { useDimensions } from "@react-native-community/hooks";
import FeIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialIcons";
import tw from "../utils/tw";

export default function RegisterHeader({ navigation }) {
  const dimensions = useDimensions().window;
  const title = "Personal Info";
  const BackButtonIcon =
    Platform.OS === "android" ? "arrow-back" : "arrow-back-ios";
  const goBack = () => navigation.goBack();

  return (
    <View
      style={[
        tw`bg-primary dark:bg-primary-light flex pt-6 justify-between items-center`,
        { height: dimensions.height * 0.28 },
      ]}
    >
      <View style={tw`w-full flex flex-row px-4`}>
        <Icon
          name={BackButtonIcon}
          size={25}
          onPress={goBack}
          style={tw`text-light dark:text-primary`}
        />
        <Text
          style={[
            tw`text-lg font-lato-bold text-light dark:text-primary mx-auto`,
          ]}
        >
          {title}
        </Text>
      </View>
      <TouchableOpacity onPress={() => alert("Hello")} activeOpacity={0.7}>
        <View
          style={tw`w-[120px] h-[120px] rounded-full bg-gray-300 dark:bg-slate-700 -m-[60px] p-4 flex items-center justify-center`}
        >
          <FeIcon
            name="camera"
            size={40}
            style={tw`text-dark dark:text-light`}
          />
          <Text style={tw`font-lato mt-2 text-xs text-dark dark:text-light`}>
            Upload Photo
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
