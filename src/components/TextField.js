import React from "react";
import { View, useColorScheme, TextInput, Text } from "react-native";
import { TextInput as MDTextInput } from "@react-native-material/core";
import tw from "../utils/tw";

export default function TextField({
  containerStyle,
  variant = "standard",
  title,
  placeholder,
  onChange,
  value,
  keyboardType = "default",
  secureTextEntry = false,
  md = true,
  ...otherProps
}) {
  const theme = useColorScheme();

  return (
    <>
      {md ? (
        <View
          style={[
            tw`w-full px-8 flex flex-col justify-between items-start text-left mb-8`,
            containerStyle,
          ]}
        >
          <MDTextInput
            variant="standard"
            onChangeText={onChange}
            value={value}
            color={theme === "dark" ? "#F1F5F9" : "#475569"}
            label={placeholder}
            style={tw`w-full font-lato`}
            inputContainerStyle={tw`w-full font-lato border-slate-100`}
            inputStyle={tw`text-slate-800 dark:text-white py-0 font-lato`}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            {...otherProps}
          />
        </View>
      ) : (
        <View style={tw`w-full`}>
          <Text
            style={tw`text-sm mb-3 font-lato-bold text-dark dark:text-light`}
          >
            {title}
          </Text>
          <TextInput
            style={[
              tw`w-full border-dark dark:border-light rounded-lg px-4 font-lato text-dark dark:text-light mb-6`,
              { borderWidth: 1 },
            ]}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#64748B"
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            {...otherProps}
          />
        </View>
      )}
    </>
  );
}
