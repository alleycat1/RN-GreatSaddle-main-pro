import React, { useState } from "react";
import {
  View,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import allCountryCodes from "../utils/countryCodes";
import tw from "../utils/tw";
import PickerItem from "./PickerItem";

export default function CountryCodePicker() {
  const [visible, setVisible] = useState(false);
  const [countryCodes, setCountryCodes] = useState(allCountryCodes);
  const [countryCode, setCountryCode] = useState(`+${allCountryCodes[0]}`);
  const [searchvalue, setSearchValue] = useState("");

  const handleChange = (text) => {
    const newData = allCountryCodes.filter((item) => {
      const itemData = `+${item}`;

      const textData = text[0] === "+" ? text.substring(1) : text;

      return itemData.indexOf(textData) > -1;
    });
    setSearchValue(text);
    setCountryCodes(newData);
  };

  return (
    <View style={[tw`border-gray-400`, { borderRightWidth: 1 }]}>
      <>
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          activeOpacity={0.7}
        >
          <TextInput
            style={tw`w-full text-dark dark:text-light px-4 font-lato text-dark dark:text-light`}
            value={countryCode}
            editable={false}
          />
        </TouchableOpacity>
        <Modal
          visible={visible}
          animationType="slide"
          style={tw`bg-light dark:bg-dark`}
        >
          <TextInput
            style={tw`w-full text-dark dark:text-light px-8 py-4 font-lato bg-light dark:bg-dark`}
            value={searchvalue}
            onChangeText={handleChange}
            placeholder="Search Country Code..."
            keyboardType="phone-pad"
          />
          <FlatList
            data={countryCodes}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => {
              return (
                <PickerItem
                  label={`+${item}`}
                  onPress={() => {
                    setVisible(false);
                    setCountryCode(`+${item}`);
                  }}
                  selected={`+${item}` === countryCode}
                />
              );
            }}
            style={tw`bg-light dark:bg-dark`}
          />
          <Button
            title="Close"
            onPress={() => setVisible(false)}
            color="#F43F5E"
          />
        </Modal>
      </>
    </View>
  );
}
