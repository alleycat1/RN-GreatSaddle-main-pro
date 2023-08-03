import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { hp, Typography, wp } from '../global'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors, Fonts } from '../res';

const Header = (props: any) => {
    const {
        centetText = "",
        back = true,
        navigation = {},
        containerStyle = {},
        Right = () => null,
        shadow = true
    } = props

    const onBackPress = () => navigation.goBack()
    return (
        <View style={[Styles.container, shadow && Styles.shadow, containerStyle]}>
            <View style={Styles.leftView}>
                {
                    back &&
                    <AntDesign
                        name='arrowleft'
                        size={wp(6)}
                        color={Colors.color14}
                        onPress={onBackPress}
                    />
                }
            </View>
            <View style={Styles.centerView}>
                <Text style={Styles.centerTitle}>
                    {centetText}
                </Text>
            </View>
            <View style={Styles.rightView}>
                {Right &&
                    <Right />
                }
            </View>
        </View>
    )
}

export default Header

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.color2,
        paddingVertical: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    shadow: {
        shadowColor: Colors.color1,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 7,
    },
    leftView: {
        width: wp(25),
        paddingLeft: wp(3)
    },
    centerView: {
        width: wp(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightView: {
        width: wp(25),
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerTitle: {
        fontFamily: Fonts.APPFONT_B,
        color: Colors.theme,
        fontSize: Typography.medium1
    }
})