import { Dimensions, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import { Header } from '../../components'
import { Colors, Fonts, Images } from '../../res'
import { hp, Typography, wp } from '../../global'

const TurnstileEntry = (props: any) => {
    return (
        <Container>
            <Header
                centetText="Verify GS Entry"
                navigation={props.navigation}
            />
            <Text style={Styles.description}>
                Point your phone at the Turnstile to
                Gain access.
            </Text>
            <Text style={{ ...Styles.description, marginTop: hp(3) }}>
                Tap to <Text style={{ ...Styles.description, color: Colors.color4 }}>
                    see</Text> how.
            </Text>
            <Image
                source={Images.barCode}
                resizeMode='contain'
                style={Styles.barCode}
            />
            <Text style={Styles.verifying}>
                Verifying
            </Text>
        </Container>
    )
}

export default TurnstileEntry

const { width } = Dimensions.get('window')
const Styles = StyleSheet.create({
    description: {
        color: Colors.color5,
        fontFamily: Fonts.APPFONT_R,
        fontSize: Typography.medium,
        marginHorizontal: wp(8),
        marginTop: hp(5)
    },
    barCode: {
        width: width * 0.45,
        height: width * 0.45 * 1,
        alignSelf: 'center',
        marginVertical: hp(5)
    },
    verifying: {
        alignSelf: 'center',
        fontFamily: Fonts.APPFONT_B,
        color: Colors.color4,
        fontSize: Typography.medium
    }
})