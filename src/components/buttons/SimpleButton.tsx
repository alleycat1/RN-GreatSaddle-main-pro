import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Constants, hp, Typography, wp } from '../../global';
import { Colors, Fonts } from '../../res';

const Button = (props: any) => {
    const {
        text = "",
        buttonStyle = {},
        buttonTextStyle = {},
        onPress = () => null
    } = props
    return (
        <TouchableOpacity style={[Styles.container, buttonStyle]}
            activeOpacity={Constants.btnActiveOpacity}
            onPress={onPress}
        >
            <Text style={[Styles.btnTxt, buttonTextStyle]}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default Button
const Styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: wp(80),
        backgroundColor: Colors.theme,
        borderRadius: 4,
        paddingVertical: wp(4),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTxt: {
        color: Colors.color2,
        fontSize: Typography.small3,
        fontFamily: Fonts.APPFONT_B
    }
})