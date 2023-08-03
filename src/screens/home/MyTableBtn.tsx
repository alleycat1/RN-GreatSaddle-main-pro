import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../res'
import { Constants, hp, Typography, wp } from '../../global'
import AntDesign from 'react-native-vector-icons/AntDesign'

const MyTableBtn = (props: any) => {
    const {
        onPress = () => null,
        positionBottom = false
    } = props

    return (
        <TouchableOpacity style={{ ...Styles.container, display: "none" }}
            activeOpacity={Constants.btnActiveOpacity}
            onPress={onPress}
        >
            <Text style={Styles.btnTxt}>My Table (#16)</Text>
            {
                positionBottom ?
                    <AntDesign name='up' color={Colors.color2} size={wp(4)} />
                    :
                    <AntDesign name='down' color={Colors.color2} size={wp(4)} />
            }
        </TouchableOpacity>
    )
}

export default MyTableBtn

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.theme,
        marginTop: hp(0.5),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: wp(13),
        width: wp(100),
    },
    btnTxt: {
        color: Colors.color3,
        fontFamily: Fonts.APPFONT_B,
        fontSize: Typography.medium,
        marginHorizontal: wp(2)
    }
})