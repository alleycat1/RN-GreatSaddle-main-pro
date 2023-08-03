import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import tw from "../utils/tw";
import { colors } from "../config/theme";

export default function Button({
  style,
  text,
  Icon,
  textStyle,
  onPress,
  PrefixIcon,
}) {
  const theme = useColorScheme();
  const AppTouchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <AppTouchable onPress={onPress}>
      <View
        style={[
          tw`w-full flex-row justify-between items-center p-4 bg-primary dark:bg-primary-light flex px-12 rounded-lg`,
          style,
        ]}
      >
        <View style={tw`flex flex-row items-center`}>
          {PrefixIcon && (
            <PrefixIcon
              color={theme === "dark" ? colors.primary : "#F1F5F9"}
              size={40}
              style={tw`mr-4`}
            />
          )}
          <Text
            style={[
              tw`font-lato-bold text-lg text-slate-100 dark:text-primary`,
              textStyle,
            ]}
          >
            {text}
          </Text>
        </View>
        {Icon && (
          <Icon
            color={theme === "dark" ? colors.primary : "#F1F5F9"}
            size={40}
          />
        )}
      </View>
    </AppTouchable>
  );
}
