import React from "react";
import { Alert, Image, Modal, StyleSheet, Text, View } from "react-native";
import tw from "../utils/tw";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button } from "../components";

export default function SuccessScreen({ modalVisible, setModalVisible, navigation }) {

  const onGoToHomePress = (tabId, author) => {
    setModalVisible(false);
    navigation.navigate('Home', { tabId: tabId, author: author })
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, tw`px-8 py-4 bg-light dark:bg-dark`]}>
            <View
              style={[
                tw`flex-row justify-between border-gray-300 dark:border-gray-500 pb-4`,
                { borderBottomWidth: 1 },
              ]}
            >
              <Text
                style={tw`text-primary dark:text-primary-light font-lato-bold text-base`}
              >
                Registration Complete
              </Text>
              <AntDesign
                name="close"
                size={20}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <View style={tw`items-center justify-center`}>
              <Image
                source={require("../assets/images/user.png")}
                style={tw`w-30 h-30 rounded-full mb-3`}
              />
              <Text
                style={tw`text-slate-500 dark:text-slate-400 font-lato-bold text-lg`}
              >
                Congratulations James!
              </Text>
              <Text
                style={tw`text-slate-400 dark:text-slate-500 font-lato text-base`}
              >
                You are all set.
              </Text>
            </View>
            <View>
              <Button
                text="Go to Homescreen"
                style={tw`mt-6 mb-3 py-3 px-8 justify-center bg-secondary-light`}
                textStyle={tw`text-base text-center text-primary`}
                onPress={onGoToHomePress.bind(null, 0, -1)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: "16%",
  },
  modalView: {
    flex: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    justifyContent: "space-between",
  },
});
