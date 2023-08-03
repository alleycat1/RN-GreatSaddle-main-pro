import {
    View, Text, StyleSheet, Modal, TouchableOpacity,
    Platform, StatusBar, Image, Dimensions, ScrollView
} from 'react-native'
import React from 'react'
import { Colors, Fonts, Images } from '../../res'
import { hp, Typography, wp, Constants } from '../../global'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button, SimpleButton } from '../../components';

const ReservationNowModal = (props: any) => {
    const {
        visible = false,
        onClose = () => null,
        reservationNowPress = () => null
    } = props
    return (
        <Modal
            transparent={true}
            visible={visible}
        >
            <StatusBar backgroundColor={Colors.color1RGBA40} barStyle='light-content' />
            <View style={Styles.container}>
                <View style={Styles.innerContainer}>
                    <View style={Styles.headerCon}>
                        <Text style={Styles.headerTxt}>
                            Reservations
                        </Text>
                        <TouchableOpacity
                            activeOpacity={Constants.btnActiveOpacity}
                            style={Styles.closeBtn}
                            onPress={onClose}
                        >
                            <AntDesign name='closecircle'
                                size={wp(5)}
                                color={Colors.color10} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Image
                            source={Images.trueCircle}
                            resizeMode='contain'
                            style={Styles.trueCircle}
                        />
                        <Text style={Styles.description}>
                            Your payment has been received!
                        </Text>
                        <Text style={{ ...Styles.description, fontFamily: Fonts.APPFONT_B, width: wp(50) }}>
                            Would you like to reserve your seat now?
                        </Text>
                        <SimpleButton
                            text="Yes, Make Reservation Now"
                            buttonStyle={Styles.makeResBtn}
                            onPress={reservationNowPress}
                        />
                        <SimpleButton
                            text="Do this Later"
                            buttonStyle={Styles.doThisLaterBtn}
                            buttonTextStyle={Styles.doThisLaterTxt}
                            onPress={onClose}
                        />

                    </ScrollView>

                </View>
            </View>
        </Modal>
    )
}

export default ReservationNowModal

const { width } = Dimensions.get('window')

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color1RGBA40,
        justifyContent: 'flex-end'
    },
    innerContainer: {
        backgroundColor: Colors.color2,
        height: hp(85),
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingHorizontal: wp(4)
    },
    headerCon: {
        paddingVertical: hp(1.8),
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.color10
    },
    headerTxt: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: Typography.medium,
        fontFamily: Fonts.APPFONT_B,
        color: Colors.theme
    },
    closeBtn: {
        position: 'absolute',
        top: '50%',
        padding: Platform.OS === 'ios' ? wp(1.5) : 0,
        right: 0
    },
    trueCircle: {
        width: width * 0.2,
        height: width * 1 * 0.2,
        alignSelf: 'center',
        marginTop: hp(15)
    },
    description: {
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.color5,
        fontFamily: Fonts.APPFONT_M,
        fontSize: Typography.medium,
        marginHorizontal: wp(6),
        marginTop: hp(5)
    },
    makeResBtn: {
        marginTop: hp(7),
        width: wp(65)
    },
    doThisLaterBtn: {
        width: wp(50),
        backgroundColor: Colors.color3,
        borderWidth: 1,
        marginVertical: hp(3),
        borderColor: Colors.theme
    },
    doThisLaterTxt: {
        color: Colors.theme
    }
})