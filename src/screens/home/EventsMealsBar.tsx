import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { Typography, wp } from '../../global'
import { Colors, Fonts } from '../../res'
import { Constants } from '../../global'
import { Events } from '../events'
import { Meals } from '../foods'

enum TABID {
    EVENTS,
    MEALS
}

const EventsMealsBar = (props: any) => {
    const {
        dataVisible = false,
        navigation = {},
        tabId = 0,
        author = -1
    } = props
    const [activeBtn, setActiveBtn] = useState(tabId)

    const onBarBtnPress = (active: any) => {
        console.log("[===onBarBtnPress===]", active)
        setActiveBtn(active)
        props.onBarBtnPress(active)
    }

    return (
        <View style={dataVisible ? Styles.container : {}}>
            <View style={[Styles.barContainer, Styles.shadow]}>
                <TouchableOpacity
                    activeOpacity={Constants.btnActiveOpacity}
                    style={{ ...Styles.dotsBtn, borderBottomWidth: activeBtn === TABID.EVENTS && dataVisible ? 2 : 0 }}
                >
                    <Entypo name='dots-three-vertical' size={wp(5)} color={Colors.theme} />
                </TouchableOpacity>

                <View style={Styles.btnsCon}>
                    <TouchableOpacity
                        activeOpacity={Constants.btnActiveOpacity}
                        style={{
                            ...Styles.btnView, width: wp(38.5),
                            borderBottomWidth: activeBtn === TABID.EVENTS && dataVisible ? 2 : 0
                        }}
                        onPress={onBarBtnPress.bind(null, TABID.EVENTS)}
                    >
                        <Text style={Styles.btnTxt}>Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={Constants.btnActiveOpacity}
                        style={{ ...Styles.btnView, borderBottomWidth: activeBtn !== TABID.EVENTS && dataVisible ? 2 : 0 }}
                        onPress={onBarBtnPress.bind(null, TABID.MEALS)}
                    >
                        <Text style={Styles.btnTxt}>Meals</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                dataVisible &&
                    activeBtn === TABID.EVENTS ?
                    <Events
                        author={author}
                        navigation={navigation}
                    />
                    :
                    <Meals
                        navigation={navigation}
                    />
            }
        </View>
    )
}

export default EventsMealsBar
const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.color2,

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
    btnsCon: {
        width: wp(85),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dotsBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: wp(13),
        width: wp(12),
        borderBottomColor: Colors.color4
    },
    btnView: {
        paddingLeft: wp(13),
        width: wp(50),
        height: wp(13),
        justifyContent: 'center',
        borderBottomColor: Colors.color4
    },
    btnTxt: {
        fontSize: Typography.medium,
        fontFamily: Fonts.APPFONT_R,
        color: Colors.theme
    }
})