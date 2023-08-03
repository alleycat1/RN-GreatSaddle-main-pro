import React, { useState } from "react";
import { View, Button, Platform, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/Feather";
import tw from "../utils/tw";

export default function DatePicker({
  title = "Date",
  buttonTitle = "Select Date",
  value,
  setValue,
  containerStyle,
  titleStyle,
  buttonStyle,
  buttonTextStyle,
}) {
  const [show, setShow] = useState(false);

  const addPrefixNum = (number) => {
    if (number.toString().length === 1) {
      return `0${number}`;
    } else {
      return `${number}`;
    }
  };

  const onConfirm = (selectedDate) => {
    const currentDate = new Date(selectedDate);
    const date = addPrefixNum(currentDate.getDate()),
      month = addPrefixNum(parseInt(currentDate.getMonth()) + 1),
      year = addPrefixNum(currentDate.getFullYear());

    setShow(false);

    setValue(`${date}/${month}/${year}`);
  };

  const openDatepicker = () => {
    setShow(true);
  };

  const closeDatepicker = () => {
    setShow(false);
  };

  return (
    <View
      style={[
        tw`w-full flex flex-col justify-between items-start text-left mb-8`,
      ]}
    >
      <View style={[tw`flex flex-row items-center`, containerStyle]}>
        <Text
          style={[
            tw`text-base text-slate-500 dark:text-slate-200 font-lato mr-6`,
            titleStyle,
          ]}
        >
          {title}
        </Text>
        <TouchableOpacity
          onPress={openDatepicker}
          activeOpacity={0.7}
          style={tw`w-full`}
        >
          <View
            style={[
              tw`flex flex-row items-center justify-between bg-primary dark:bg-primary-light p-2 px-4 rounded`,
              buttonStyle,
            ]}
          >
            <Text
              style={[
                tw`text-sm font-lato-bold text-slate-100 dark:text-primary mr-2`,
                buttonTextStyle,
              ]}
            >
              {value ? value : buttonTitle}
            </Text>
            <Icon
              name="chevron-down"
              size={20}
              style={[
                tw`text-slate-100 dark:text-primary mt-1`,
                buttonTextStyle,
              ]}
            />
          </View>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        onConfirm={onConfirm}
        onCancel={closeDatepicker}
      />
    </View>
  );
}
