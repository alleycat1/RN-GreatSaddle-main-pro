import React, { useState } from "react";
import {
  View,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Text,
} from "react-native";
import tw from "../utils/tw";
import PickerItem from "./PickerItem";

export default function Picker({ placeholder, data, value, setValue }) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Text style={tw`text-base mb-4 font-lato text-dark dark:text-light`}>
        {placeholder}
      </Text>
      <>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <TextInput
            style={[
              tw`w-full border-dark dark:border-light rounded-lg px-4 font-lato text-dark dark:text-light mb-6`,
              { borderWidth: 1 },
            ]}
            value={value.label}
            editable={false}
          />
        </TouchableOpacity>
        <Modal
          visible={visible}
          animationType="slide"
          style={tw`bg-light dark:bg-dark`}
        >
          <View style={tw`bg-primary dark:bg-primary-light p-2 py-4`}>
            <Text
              style={tw`text-light dark:text-primary font-lato text-center text-base`}
            >
              {placeholder}
            </Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <PickerItem
                  label={item.label}
                  onPress={() => {
                    setVisible(false);
                    setValue(item);
                  }}
                  selected={item.label === value.label}
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
