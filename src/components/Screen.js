import { SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import tw from "../utils/tw";

export default function Screen({ children, scrollView = false }) {
  return (
    <SafeAreaView style={tw`flex-1 bg-light dark:bg-dark flex-1`}>
      {scrollView ? (
        <ScrollView style={tw`w-full h-full`}>{children}</ScrollView>
      ) : (
        <>{children}</>
      )}
    </SafeAreaView>
  );
}
