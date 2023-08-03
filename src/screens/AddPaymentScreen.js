import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { useDeviceContext } from "twrnc";
import Icon from "react-native-vector-icons/AntDesign";
import FaIcon from "react-native-vector-icons/FontAwesome";

import tw from "../utils/tw";
import {
  AddCreditCard,
  Button,
  CreditCard,
  Screen,
  TextField,
} from "../components";
import { useDimensions } from "@react-native-community/hooks";
import SuccessScreen from "./SuccessScreen";

export default function AddPaymentScreen({ navigation }) {
  useDeviceContext(tw);
  const [success, setSuccess] = useState(false);

  const dimensions = useDimensions().window;

  return (
    <Screen>
      <PaymentCards
        dimensions={dimensions}
        setSuccess={() => setSuccess(true)}
      />
      <SuccessScreen modalVisible={success} setModalVisible={setSuccess} navigation={navigation} />
    </Screen>
  );
}

function PaymentCards({ dimensions, setSuccess }) {
  return (
    <View style={tw`pt-4 pb-8 px-8 flex flex-1 justify-between`}>
      <ScrollView style={tw`mb-4`}>
        <CreditCard
          cardNumber="4242 4242 4242 4242"
          cardExpiry="02/25"
          cvvCode="256"
          dimensions={dimensions}
          selected
        />
        <AddCreditCard />
        <Text
          style={tw`font-lato-bold text-sm text-center text-dark dark:text-light`}
        >
          By adding more cards, you make it easy for us to try another card if
          the{" "}
          <Text style={tw`text-secondary dark:text-secondary-light`}>
            default
          </Text>{" "}
          one fails.
        </Text>
      </ScrollView>
      <View style={tw`w-full`}>
        <Button
          text="Continue Registration"
          style={tw`mt-6 mb-3 py-3 px-8`}
          textStyle={tw`text-base`}
          Icon={({ color, size }) => (
            <Icon name="arrowright" size={30} color={color} />
          )}
          onPress={setSuccess}
        />
      </View>
    </View>
  );
}

function PaymentForm({ dimensions }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cvvCode, setCvvCode] = useState("");

  const formatCardNumber = (text) =>
    setCardNumber(
      text
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
    );

  const formatExpiryDate = (text) => {
    let updateText = text;
    if(text.indexOf(".") >= 0 || text.length > 5) {
      return;
    }

    if(text.length === 2 && cardExpiry.length === 1) {
      updateText += "/";
    }

    if(parseInt(text.substring(0, 2)) > 12) {
      updateText = `12/${text.substring(3)}`;
    }

    setCardExpiry(updateText);
  };

  const formatCVVCode = (text) => {
    setCvvCode(text.substring(0, 3));
  };
  return (
    <View style={tw`py-12 pb-8 px-8 flex flex-1 justify-between`}>
      <View style={tw`mb-4`}>
        {/* <TextField
            title="Card Holder"
            placeholder="Enter Cardholder Name"
            value={cardNumber}
            onChange={formatCardNumber}
            md={false}
          /> */}
        <TextField
          title="Card Number"
          placeholder="Enter Card Number"
          value={cardNumber}
          onChange={formatCardNumber}
          keyboardType="numeric"
          md={false}
        />
        <View style={tw`flex flex-row`}>
          <View style={tw`w-1/2 pr-2`}>
            <TextField
              title="Expiration Date"
              placeholder="02/22"
              value={cardExpiry}
              onChange={formatExpiryDate}
              keyboardType="numeric"
              md={false}
            />
          </View>
          <View style={tw`w-1/2 pl-2`}>
            <TextField
              title="Security Code"
              placeholder="Enter CVV"
              value={cvvCode}
              onChange={formatCVVCode}
              keyboardType="numeric"
              md={false}
            />
          </View>
        </View>
        <CreditCard
          cardNumber={cardNumber}
          cardExpiry={cardExpiry}
          cvvCode={cvvCode}
          dimensions={dimensions}
        />
      </View>
      <View style={tw`w-full`}>
        <Button
          text="Add Card"
          style={tw`mt-6 mb-3 py-3 px-8`}
          textStyle={tw`text-base`}
          Icon={({ color, size }) => (
            <Icon name="arrowright" size={30} color={color} />
          )}
        />
      </View>
    </View>
  );
}

function PaymentOptionsScreen() {
  return (
    <View style={tw`py-12 pb-8 px-8 flex flex-1 justify-between`}>
      <View style={tw`mb-4`}>
        <Text
          style={tw`font-lato text-base text-slate-600 dark:text-slate-200 mb-2`}
        >
          Tap on your card's service provider
        </Text>
        <Button
          text="Master Card/Credit Card"
          style={tw`my-1 py-3 px-6 bg-slate-200 dark:bg-slate-700`}
          textStyle={tw`text-sm text-slate-700 dark:text-slate-200`}
          PrefixIcon={({ style }) => (
            <FaIcon
              name="credit-card"
              size={25}
              style={[style, tw`text-slate-700 dark:text-slate-200`]}
            />
          )}
          Icon={({ color, size }) => (
            <Icon
              name="right"
              size={20}
              style={tw`text-slate-700 dark:text-slate-200`}
            />
          )}
        />
        <Button
          text="Visa Card"
          style={tw`my-1 py-3 px-6 bg-slate-200 dark:bg-slate-700`}
          textStyle={tw`text-sm text-slate-700 dark:text-slate-200`}
          PrefixIcon={({ style }) => (
            <FaIcon
              name="credit-card"
              size={25}
              style={[style, tw`text-slate-700 dark:text-slate-200`]}
            />
          )}
          Icon={({ color, size }) => (
            <Icon
              name="right"
              size={20}
              style={tw`text-slate-700 dark:text-slate-200`}
            />
          )}
        />
        <Button
          text="Paypal"
          style={tw`my-1 py-3 px-6 bg-slate-200 dark:bg-slate-700`}
          textStyle={tw`text-sm text-slate-700 dark:text-slate-200`}
          PrefixIcon={({ style }) => (
            <FaIcon
              name="credit-card"
              size={25}
              style={[style, tw`text-slate-700 dark:text-slate-200`]}
            />
          )}
          Icon={({ color, size }) => (
            <Icon
              name="right"
              size={20}
              style={tw`text-slate-700 dark:text-slate-200`}
            />
          )}
        />
        <Button
          text="Stripe"
          style={tw`my-1 py-3 px-6 bg-slate-200 dark:bg-slate-700`}
          textStyle={tw`text-sm text-slate-700 dark:text-slate-200`}
          PrefixIcon={({ style }) => (
            <FaIcon
              name="credit-card"
              size={25}
              style={[style, tw`text-slate-700 dark:text-slate-200`]}
            />
          )}
          Icon={({ color, size }) => (
            <Icon
              name="right"
              size={20}
              style={tw`text-slate-700 dark:text-slate-200`}
            />
          )}
        />
      </View>
      <View style={tw`w-full`}>
        <Button
          text="Continue"
          style={tw`mt-6 mb-3 py-3 px-8`}
          textStyle={tw`text-base`}
          Icon={({ color, size }) => (
            <Icon name="arrowright" size={30} color={color} />
          )}
        />
      </View>
    </View>
  );
}
