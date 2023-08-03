import { Text, ScrollView, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import { ButtonWithRightIcon, Header } from '../../components'
import { Colors, Fonts, Images } from '../../res'
import { Constants, hp, Typography, wp } from '../../global'
import ReservationNowModal from './ReservationNowModal'
import ReservationDetailsInput from './ReservationDetailsInput'

const EventBookingCard = (props: any) => {
    const [showReservationNow, setShowReservationNow] = useState(false)
    const [showReservationDetailsInput, setShowReservationDetailsInput] = useState(false)

    const onAddCardPress = () => null

    const onConfirmPayment = () => setShowReservationNow(true)
    const onCloseReservationNow = () => setShowReservationNow(false)
    const onReservationNowPress = () => {
        setShowReservationNow(false)
        setShowReservationDetailsInput(true)
    }
    const onCloseReservationDetailsInput = () => {
        setShowReservationDetailsInput(false)
    }

    return (
        <Container>
            <Header
                centetText="Book Event"
                navigation={props.navigation}
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <Text style={Styles.description}>
                    Select a card
                </Text>
                <Image
                    source={Images.eventCardSample}
                    resizeMode='contain'
                    style={Styles.eventCard}
                />
                <TouchableOpacity style={Styles.addCardBtn}
                    activeOpacity={Constants.btnActiveOpacity}
                    onPress={onAddCardPress}
                >
                    <Image
                        source={Images.plusCirlce}
                        resizeMode='contain'
                        style={Styles.plusCircle}
                    />
                </TouchableOpacity>
                <Text style={Styles.descriptionTwo}>
                    By adding more cards, you make it easy for us
                    to try another card if the
                    <Text style={{ ...Styles.descriptionTwo, color: Colors.color4 }}> default </Text>one fails.
                </Text>
            </ScrollView>
            <View style={Styles.buttonOuterContainer}>
                <ButtonWithRightIcon
                    text="Confirm Payment"
                    onPress={onConfirmPayment}
                />
            </View>
            <ReservationNowModal
                visible={showReservationNow}
                onClose={onCloseReservationNow}
                reservationNowPress={onReservationNowPress}
            />
            <ReservationDetailsInput
                visible={showReservationDetailsInput}
                onClose={onCloseReservationDetailsInput}
            />
        </Container>
    )
}

export default EventBookingCard

const { width } = Dimensions.get('window')
const Styles = StyleSheet.create({
    description: {
        color: Colors.color5,
        fontFamily: Fonts.APPFONT_R,
        fontSize: Typography.medium,
        marginHorizontal: wp(6),
        marginTop: hp(3)
    },
    eventCard: {
        alignSelf: 'center',
        width: width * 0.95,
        height: width * 1 * 0.65,
    },

    addCardBtn: {
        backgroundColor: Colors.color15,
        width: width * 0.9,
        height: width * 1 * 0.5,
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusCircle: {
        width: width * 0.2,
        height: width * 1 * 0.2,
    },
    descriptionTwo: {
        color: Colors.color7,
        fontFamily: Fonts.APPFONT_B,
        fontSize: Typography.medium,
        marginHorizontal: wp(6),
        marginTop: hp(3),
        textAlign: 'center',
        marginBottom: hp(15)
    },
    buttonOuterContainer: {
        position: 'absolute',
        width: wp(100),
        bottom: 0,
        paddingVertical: hp(4)
    },
})