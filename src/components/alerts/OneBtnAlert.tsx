import {
    View, Text, StyleSheet, Modal,
    Image, TouchableOpacity, Dimensions,
    StatusBar
} from 'react-native'
import React from 'react'
import { Colors, Fonts, Images } from '../../res'
import { hp, Typography, wp } from '../../global'

const OneBtnAlert = (props: any) => {
    const {
        visible = false,
        icon = Images.trueCircle,
        btnTxt = "",
        title = "",
        onPress = () => null,
        onClose = () => null
    } = props
    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <StatusBar backgroundColor={Colors.color1RGBA40} barStyle='light-content' />
            <View style={Styles.container}>
                <View style={Styles.innerContainer}>
                    <View style={Styles.titleContainer}>
                        <Text style={Styles.title}>
                            {title}
                        </Text>
                    </View>
                    <Image
                        source={icon}
                        resizeMode='contain'
                        style={Styles.icon}
                    />
                    <TouchableOpacity style={Styles.btn}
                        onPress={onPress}
                    >
                        <Text style={Styles.btnTxt}>
                            {btnTxt}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    )
}

export default OneBtnAlert

const { width } = Dimensions.get('window')
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.color1RGBA40
    },
    innerContainer: {
        alignSelf: 'center',
        width: wp(70),
        borderRadius: 8,
        backgroundColor: Colors.color2,
    },
    titleContainer: {
        paddingVertical: hp(1.4),
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        marginHorizontal: wp(3),
        borderBottomWidth: 1,
        borderBottomColor: Colors.color15
    },
    title: {
        fontFamily: Fonts.APPFONT_B,
        color: Colors.color7,
        fontSize: Typography.medium
    },
    icon: {
        width: width * 0.25,
        height: width * 1 * 0.25,
        marginVertical: hp(2),
        alignSelf: 'center'
    },
    btn: {
        paddingVertical: hp(1.4),
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: Colors.color16,
        alignItems: 'center'
    },
    btnTxt: {
        fontSize: Typography.medium,
        fontFamily: Fonts.APPFONT_B,
        color: Colors.color7
    }
})