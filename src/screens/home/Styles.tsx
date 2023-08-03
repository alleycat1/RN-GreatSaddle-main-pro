import { StyleSheet, StatusBar } from "react-native";
import { hp } from "../../global";
import { Colors } from '../../res'

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export default StyleSheet.create({
    container: {
        backgroundColor: Colors.color3,
        justifyContent: 'space-between',
        flex: 1,
    },
    containerInnerOne: {
        flex: 1
    },
    bottomBar: {
        justifyContent: 'flex-end',
        paddingTop: hp(1),
        paddingBottom: STATUSBAR_HEIGHT ? hp(1) : hp(2.5),
        backgroundColor: Colors.color2,
    },
    shadow: {
        shadowColor: Colors.color1,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
})