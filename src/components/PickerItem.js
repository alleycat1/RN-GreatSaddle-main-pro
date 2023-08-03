import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors } from "../config/theme";
import tw from "../utils/tw";

function PickerItem({ label, onPress, selected }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <Text
          style={
            !selected
              ? styles.label
              : [styles.label, tw`text-secondary dark:text-secondary-light`]
          }
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 18,
    alignItems: "center",
  },
  label: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Lato-Regular",
  },
  selectedLabel: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Lato-Bold",
  },
});

export default PickerItem;
