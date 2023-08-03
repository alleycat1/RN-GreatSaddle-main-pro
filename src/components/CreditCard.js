import { View, Text, Image } from "react-native";
import React from "react";
import tw from "../utils/tw";
import Icon from "react-native-vector-icons/Feather";

export default function CreditCard({
  cardNumber,
  cardExpiry,
  cvvCode,
  dimensions,
  selected = false,
}) {
  return (
    <View
      style={tw`w-full py-10 p-6 shadow-md bg-slate-200 dark:bg-slate-700 rounded-lg mb-4 ${
        selected ? "border-2 border-secondary dark:border-secondary-light" : ""
      }`}
    >
      <View style={tw`flex flex-row justify-between items-center`}>
        <Image
          source={require("../assets/images/mastercard.png")}
          style={[
            tw`mb-4`,
            {
              height: dimensions.height * 0.034,
              width: dimensions.width * 0.1,
            },
          ]}
          resizeMode="cover"
        />
        {selected && (
          <Icon
            name="check-circle"
            size={25}
            style={tw`text-primary dark:text-primary-light`}
          />
        )}
      </View>
      <Text
        style={tw`text-2xl font-lato-bold mb-6 ${
          selected
            ? "text-secondary dark:text-secondary-light"
            : "text-slate-700 dark:text-slate-200"
        }`}
      >
        {cardNumber.length === 0 ? "XXXX XXXX XXXX XXXX" : cardNumber}
      </Text>
      <View style={tw`flex flex-row items-center justify-between`}>
        <View style={tw`w-1/2`}>
          <Text
            style={tw`text-sm font-lato-bold text-slate-500 dark:text-slate-400 mb-2`}
          >
            EXPIRATION DATE
          </Text>
          <Text
            style={tw`text-sm font-lato-bold ${
              selected
                ? "text-secondary dark:text-secondary-light"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {cardExpiry.length === 0 ? "XX/XX" : cardExpiry}
          </Text>
        </View>
        <View style={tw`w-1/2`}>
          <Text
            style={tw`text-sm font-lato text-slate-500 dark:text-slate-400 mb-2 text-right`}
          >
            CVV
          </Text>
          <Text
            style={tw`text-sm font-lato-bold ${
              selected
                ? "text-secondary dark:text-secondary-light"
                : "text-slate-500 dark:text-slate-400"
            } text-right`}
          >
            {cvvCode.length === 0 ? "XXX" : cvvCode}
          </Text>
        </View>
      </View>
    </View>
  );
}
