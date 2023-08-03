import React from "react";
import { Text } from "react-native";
import tw from "../utils/tw";

export default function Logo() {
  return (
    <>
      <Text
        style={tw`text-4xl font-lato-bold mr-2 text-primary dark:text-primary-light`}
      >
        Great
      </Text>
      <Text
        style={tw`text-4xl font-lato-bold text-secondary dark:text-secondary-light`}
      >
        Saddle
      </Text>
    </>
  );
}
