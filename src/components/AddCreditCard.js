import { View, Text, Image } from "react-native";
import React from "react";
import tw from "../utils/tw";
import Icon from "react-native-vector-icons/Feather";

export default function AddCreditCardButton() {
  return (
    <View
      style={tw`w-full h-[180px] p-6 shadow-md bg-slate-200 dark:bg-slate-700 rounded-lg mb-4 items-center justify-center`}
    >
      <Icon
        name="plus-circle"
        size={60}
        style={tw`text-primary dark:text-primary-light`}
      />
    </View>
  );
}
