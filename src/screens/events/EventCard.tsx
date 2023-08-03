import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, Platform } from 'react-native'
import FastImage from 'react-native-fast-image'
import React, { useEffect, useState, memo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Animation } from '../../animations'
import { Constants, hp, Typography, wp } from '../../global'
import { Fonts, Colors, Images } from '../../res'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SAVE_EVENT, FAST_REFETCH } from '../../config';

const EventCardNM = (props: any) => {
    const {
        onSavedEvents,
        onEventPress,
        onBookNowPress,
        isSaved,
        item = {},
        index = null,
        navigation
    } = props

    // useEffect(() => {
    //     console.log("[===EventCard===]", item.id)
    // }, []);

    return (
        <View style={Styles.itemContainer}>
            <TouchableOpacity style={[Styles.contentOuterCon, Styles.shadow]}
                activeOpacity={Constants.btnActiveOpacity}
                onPress={onEventPress.bind(null, item.id)}
            >
                <View style={Styles.contentInnerCon}>
                    <View style={Styles.contentInnerConOne}>
                        <Text style={Styles.itemHeading}>
                            {item.title}
                        </Text>
                        <Text
                            style={Styles.itemDesc}
                            numberOfLines={2}
                        >
                            {item.description}
                        </Text>
                        <View style={Styles.contentInnerConOneInnerCon}>
                            <View style={Styles.contentInnerConOneInnerConInner}>
                                <FastImage
                                    source={Images.multimediaMic}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={Styles.micIcon}
                                />
                                <Text style={Styles.itemName}>
                                    {item.name}
                                </Text>
                            </View>
                            <View style={Styles.contentInnerConOneInnerConInner}>
                                <FastImage
                                    source={Images.priceTag}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={Styles.micIcon}
                                />
                                <Text style={Styles.itemTicket}>
                                    ₦ {item.ticket > 0 ? item.ticket : "free"}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {
                        item.images ?
                            (
                                <FastImage
                                    source={{ uri: item.images }}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={Styles.itemImage}
                                />
                            ) : (
                                <FastImage
                                    source={Images.unknownImages}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={Styles.itemImage}
                                />
                            )
                    }
                </View>
                <View style={Styles.contentInnerCon}>
                    <View style={{ ...Styles.contentInnerConOneInnerCon, width: wp(64), paddingHorizontal: wp(2.5) }}>
                        
                        <View style={Styles.liveCon}>
                            <FastImage
                                source={Images.users}
                                resizeMode={FastImage.resizeMode.contain}
                                style={Styles.userIcon}
                            />
                            <Text style={{ ...Styles.liveNowTxt, color: Colors.color5 }}>
                                {item.peopleAttending ? item.peopleAttending : 0}
                            </Text>
                        </View>
                        <View style={Styles.liveCon}>
                            <Ionicons
                                name='time-outline'
                                color={Colors.color5}
                                size={wp(4)}
                            />
                            <Text style={{ ...Styles.liveNowTxt, color: Colors.color5 }}>
                                {item.time}
                            </Text>
                        </View>
                    </View>
                    <View style={Styles.bookHeartCon}>
                        {/* <TouchableOpacity style={isSaved ? Styles.heartBtnBrown : Styles.heartBtn}
                            activeOpacity={Constants.btnActiveOpacity}
                            onPress={onSavedEvents.bind(null, item)}
                        >
                            <AntDesign name='hearto' color={isSaved ? Colors.color2 : Colors.theme} size={wp(4)} />
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            style={Styles.bookBtn}
                            activeOpacity={Constants.btnActiveOpacity}
                            onPress={onBookNowPress.bind(null, item.id)}
                        >
                            <Text style={Styles.bookTxt}>Book</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            activeOpacity={Constants.btnActiveOpacity}
                            style={Styles.bookBtn}
                        >
                            <Text style={Styles.bookTxt}>Book</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const EventCard = memo(EventCardNM)

export default EventCard

const { width } = Dimensions.get('window')
const Styles = StyleSheet.create({
    itemContainer: {
        marginTop: hp(0.5),
        marginBottom: hp(0.5),
        marginRight: wp(0.2),
        marginLeft: wp(0.2)
    },
    contentOuterCon: {
        backgroundColor: Colors.color2,
        marginTop: hp(1)
    },
    shadow: {
        shadowColor: Colors.color1,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    contentInnerCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contentInnerConOne: {
        width: wp(69),
        paddingTop: hp(1),
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.color7,
        paddingHorizontal: wp(2.5),
    },
    itemImage: {
        width: wp(23),
        height: wp(25),
    },
    itemHeading: {
        color: Colors.color6,
        fontFamily: Fonts.APPFONT_B,
        fontSize: Typography.small3,
        maxWidth: wp(64),
    },
    itemDesc: {
        color: Colors.color7,
        fontFamily: Fonts.APPFONT_R,
        fontSize: Typography.small2,
        maxWidth: wp(64),
    },
    contentInnerConOneInnerCon: {
        marginTop: hp(0.5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentInnerConOneInnerConInner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    micIcon: {
        width: wp(4),
        height: hp(3),
    },
    itemName: {
        fontSize: Typography.small1,
        fontFamily: Fonts.APPFONT_R,
        color: Colors.color5,
        marginLeft: wp(2),
        maxWidth: wp(30)
    },
    itemTicket: {
        color: Colors.color5,
        fontFamily: Fonts.APPFONT_B,
        fontSize: Typography.small1,
        marginLeft: wp(2)
    },
    liveCon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(0.8),
    },
    endCon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(0.8),
    },
    liveIcon: {
        width: width * 0.025,
        height: width * 1 * 0.025,
        borderRadius: width * 1 * 0.025 / 2,
        backgroundColor: Colors.colorGrey,
        marginTop: hp(0.2)
    },
    liveNowTxt: {
        color: Colors.colorBrown,
        fontFamily: Fonts.APPFONT_R,
        marginLeft: wp(2),
        fontSize: Typography.small1
    },
    endIcon: {
        width: width * 0.025,
        height: width * 1 * 0.025,
        borderRadius: width * 1 * 0.025 / 2,
        backgroundColor: Colors.color8,
        marginTop: hp(0.2)
    },
    endNowTxt: {
        color: Colors.color9,
        fontFamily: Fonts.APPFONT_R,
        marginLeft: wp(2),
        fontSize: Typography.small1
    },
    userIcon: {
        width: wp(4.5),
        height: hp(3),
    },
    bookHeartCon: {
        width: wp(23),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    heartBtn: {
        borderWidth: 1,
        height: hp(3.2),
        width: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: Colors.theme
    },
    heartBtnBrown: {
        borderWidth: 1,
        height: hp(3.2),
        width: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: Colors.color1,
        backgroundColor: Colors.theme,
    },
    bookBtn: {
        borderWidth: 1,
        width: wp(16),
        height: hp(3.2),
        marginRight: wp(1.5),
        marginLeft: wp(1.5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(1),
        backgroundColor: Colors.theme,
        borderRadius: 4
    },
    bookTxt: {
        color: Colors.color3,
        fontFamily: Fonts.APPFONT_B

    }
})