import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Constants, hp, Typography, wp } from '../../global'
import { Colors, Images } from '../../res'

const BottomBar = () => {
    return (
        <View style={{ ...Styles.container, display: "none"}}>
            <TouchableOpacity style={Styles.btnCon}
                activeOpacity={Constants.btnActiveOpacity}
            >
                <View style={{ ...Styles.btnInnerCon, borderRightWidth: 1, borderRightColor: Colors.color3 }}>
                    <Image
                        source={Images.bell}
                        resizeMode='contain'
                        style={Styles.bellIcon}
                    />
                    <Text style={Styles.btnTxt}>Call attendant</Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity style={Styles.btnCon}
                activeOpacity={Constants.btnActiveOpacity}
            >
                <View style={Styles.btnInnerCon}>
                    <Image
                        source={Images.dinner}
                        resizeMode='contain'
                        style={Styles.bellIcon}
                    />
                    <Text style={Styles.btnTxt}>Serve my food</Text>
                </View>

            </TouchableOpacity>
        </View>
    )
}

export default BottomBar

const Styles = StyleSheet.create({
    logout:{
        display: 'none'
    },
    container: {
        width: wp(100),
        backgroundColor: Colors.color2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bellIcon: {
        width: wp(7),
        height: hp(3)
    },
    btnCon: {
        width: wp(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnInnerCon: {
        width: wp(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxt: {
        fontSize: Typography.small2,
        color: Colors.color5,
        marginTop: hp(1)
    },
})