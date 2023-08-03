//@ts-noCheck
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../res'
import { Constants, hp, wp } from '../../global'
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';

const Cards = (props: any) => {
    const {
        onPress = () => null,
        visible = false,
        data = [],
        navigation = {}
    } = props

    const onCardPress = () => navigation.navigate('CardsDetails')

    const RenderArrowBtn = () => (
        <TouchableOpacity style={visible ? { ...Styles.arrowBtnVisible } : { ...Styles.arrowBtn }}
            activeOpacity={Constants.btnActiveOpacity}
            onPress={onPress}
        >
            <AntDesign name={'down'} color={Colors.color2} size={wp(4)} />
        </TouchableOpacity>
    )

    const renderCards = ({ item }: any) => {
        return (
            <TouchableOpacity style={Styles.cardItemCon}
                onPress={onCardPress}
            >
                <Image
                    source={item.image}
                    resizeMode='contain'
                    style={Styles.cardImage}
                />
            </TouchableOpacity>
        )
    }

    return (
        visible ?
            <View style={Styles.visibleContainer}>
                <LinearGradient colors={[Colors.color1RGBA100, Colors.color1RGBA0]}
                    style={Styles.visibleInnerCon}>
                    <Carousel
                        firstItem={1}
                        data={data}
                        renderItem={renderCards}
                        sliderWidth={wp(100)}
                        itemWidth={wp(38)}
                        inactiveSlideOpacity={1}
                    />
                </LinearGradient>
                <RenderArrowBtn />
            </View>
            :
            <View style={Styles.container}>
                <RenderArrowBtn />
            </View>
    )
}

export default Cards

const { width } = Dimensions.get('window')
const Styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: wp(-3),
        alignSelf: 'center'
    },
    arrowBtn: {
        width: width * 0.07,
        height: width * 1 * 0.07,
        borderRadius: width * 1 * 0.07 / 2,
        backgroundColor: Colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    arrowBtnVisible: {
        width: width * 0.07,
        height: width * 1 * 0.07,
        borderRadius: width * 1 * 0.07 / 2,
        backgroundColor: Colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top: wp(-3)
    },
    visibleContainer: {
        backgroundColor: Colors.color10
    },
    visibleInnerCon: {
        paddingTop: hp(3),
        paddingBottom: hp(2)
    },
    cardItemCon: {
        height: hp(12)
    },
    cardImage: {
        width: wp(38),
        height: hp(12)
    }
})