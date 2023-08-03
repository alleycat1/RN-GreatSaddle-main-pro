import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import { Header, OneBtnAlert } from '../../components'
import { Colors, Fonts, Images } from '../../res'
import { hp, Typography, wp, Constants } from '../../global'

const FingerprintVerification = (props: any) => {
    const [verificationAlert, setVerificationAlert] = useState(false)

    const onFingerprintPress = () => {
        setVerificationAlert(true)
    }

    const onVerificationOkPress = () => {
        setVerificationAlert(false)
        props.navigation.navigate('TurnstileEntry')
    }


    return (
        <Container>
            <Header
                centetText="Verify GS Entry"
                navigation={props.navigation}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={Styles.innerContainer}>
                    <Text style={Styles.description}>
                        Your entry point is gate:
                    </Text>
                    <View style={Styles.gateNumberView}>
                        <Text style={Styles.gateNumber}>02</Text>
                    </View>
                    <Text style={Styles.description}>
                        Kindly Place your finger on the scanner to verify your ID
                    </Text>
                    <TouchableOpacity
                        activeOpacity={Constants.btnActiveOpacity}
                        onPress={onFingerprintPress}
                    >
                        <Image
                            source={Images.fingerprint}
                            resizeMode='contain'
                            style={Styles.fingerprint}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <OneBtnAlert
                visible={verificationAlert}
                onPress={onVerificationOkPress}
                icon={Images.trueCircle}
                btnTxt='OK'
                title="Verification Successful"
            />
        </Container>
    )
}

export default FingerprintVerification

const Styles = StyleSheet.create({
    innerContainer: {
        paddingVertical: hp(4),
        paddingHorizontal: wp(5)
    },
    description: {
        color: Colors.color5,
        fontFamily: Fonts.APPFONT_R,
        fontSize: Typography.medium
    },
    gateNumberView: {
        borderWidth: 1,
        borderColor: Colors.color4,
        backgroundColor: Colors.color3,
        marginVertical: hp(3),
        alignSelf: 'center',
        width: wp(40),
        height: wp(40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    gateNumber: {
        fontSize: wp(18),
        fontFamily: Fonts.APPFONT_B,
        color: Colors.theme
    },
    fingerprint: {
        width: wp(70),
        height: hp(30),
        marginTop: hp(3),
        alignSelf: 'center',
    }
})