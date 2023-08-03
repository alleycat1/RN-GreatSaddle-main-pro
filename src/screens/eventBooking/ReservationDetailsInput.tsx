import {
    View, Text, StyleSheet, Modal, TouchableOpacity,
    Platform, StatusBar, Image, Dimensions, ScrollView
} from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Images } from '../../res'
import { hp, Typography, wp, Constants } from '../../global'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import { ButtonWithRightIcon } from '../../components';

const ReservationDetailsInput = (props: any) => {
    const [dropDownItems, setDropDownItems] = useState([
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' }
    ])
    const [openDropDown, setOpenDropDown] = useState(false);
    const [selectedDropDownValue, setSelectedDropDownValue] = useState(null);

    const {
        visible = false,
        onClose = () => null
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
                            source={Images.reservationInputVector}
                            resizeMode='contain'
                            style={Styles.reservationInputVector}
                        />
                        <Text style={Styles.description}>
                            Make a Reservation for
                        </Text>
                        <ScrollView horizontal contentContainerStyle={{ height: openDropDown ? hp(30) : hp(10), width: wp(92), marginTop: hp(5), justifyContent: 'center' }}>
                            <DropDownPicker
                                open={openDropDown}
                                value={selectedDropDownValue}
                                items={dropDownItems}
                                setOpen={setOpenDropDown}
                                setValue={setSelectedDropDownValue}
                                setItems={setDropDownItems}
                                placeholder="0"
                                containerStyle={{ width: wp(17), borderColor: Colors.color20 }}
                                textStyle={{
                                    fontSize: Typography.medium2,
                                    fontFamily: Fonts.APPFONT_B,
                                    color: Colors.color7
                                }}
                                style={{ borderWidth: 1, borderColor: Colors.color20 }}
                                maxHeight={hp(17)}
                            />
                        </ScrollView>
                        <View style={Styles.acceptPayCon}>
                            <MaterialCommunityIcons name={'checkbox-marked'}
                                color={Colors.color7} size={wp(7)} />
                            <Text style={Styles.acceptPayDes}>
                                I accept to pay a charge of
                                <Text style={{ ...Styles.acceptPayCon, color: Colors.color4 }}> N500 per hour </Text> after
                                the first hour if the reservation is not used.
                            </Text>
                        </View>
                        <ButtonWithRightIcon
                            text="Find Table"
                        />
                    </ScrollView>

                </View>
            </View>
        </Modal>
    )
}

export default ReservationDetailsInput

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
    reservationInputVector: {
        width: width * 0.4,
        height: width * 1 * 0.4,
        alignSelf: 'center',
        marginTop: hp(5)
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
    acceptPayCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(5)
    },
    acceptPayDes: {
        color: Colors.color5,
        fontFamily: Fonts.APPFONT_M,
        fontSize: Typography.small2,
        width: wp(82)
    }
})