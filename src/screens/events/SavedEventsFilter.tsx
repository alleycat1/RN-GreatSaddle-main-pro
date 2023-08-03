import { View, FlatList, Modal, StyleSheet, Platform, TouchableOpacity, Dimensions, Text } from 'react-native'
import React, { useState } from 'react'
import { hp, Typography, wp } from '../../global'
import { Colors, Fonts } from '../../res';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SavedEventsFilter = (props: any) => {
    const [statusList, setStatusList] = useState([
        {
            name: 'Open',
            checked: true
        },
        {
            name: 'On sale',
            checked: false
        },
        {
            name: 'Cancelled',
            checked: true
        },
        {
            name: 'Sold out',
            checked: true
        },
        {
            name: 'Live Now',
            checked: false
        },
        {
            name: 'Ended',
            checked: true
        }
    ])
    const [timeList, setTimeList] = useState([
        {
            name: 'Today',
            checked: false
        },
        {
            name: 'Tomorrow',
            checked: false
        },
        {
            name: 'This Week',
            checked: true
        },
        {
            name: 'This month',
            checked: false
        }
    ])

    const [priceList, setPriceList] = useState([
        {
            name: 'Free',
            checked: true
        },
        {
            name: 'Paid',
            checked: true
        }
    ])

    const {
        visible = false,
        onClose = () => null
    } = props

    const renderList = ({ item }: any) => {
        return (
            <View style={Styles.itemContainer}>
                <MaterialCommunityIcons name={item.checked ? 'checkbox-marked'
                    : 'checkbox-blank-outline'}
                    color={Colors.color7} size={wp(5)} />
                <Text style={Styles.itemName}>
                    {item.name}
                </Text>
            </View>
        )
    }

    const renderListHeader = (headerTxt: any) => {
        return (
            <View style={Styles.listHeader}>
                <Text style={Styles.listHeaderTxt}>
                    {headerTxt}
                </Text>
            </View>
        )
    }

    const RenderList = ({ data, headerTxt }: any) => {
        return (
            <FlatList
                data={data}
                renderItem={renderList}
                contentContainerStyle={Styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={renderListHeader.bind(null, headerTxt)}
            />
        )
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
        >
            <TouchableOpacity style={Styles.container}
                activeOpacity={1}
                onPress={onClose}
            >
                <View style={[Styles.innerContainer, Styles.shadow]}>
                    <RenderList
                        data={statusList}
                        headerTxt={"Status"}
                    />
                    <RenderList
                        data={timeList}
                        headerTxt={"Time"}
                    />
                    <RenderList
                        data={priceList}
                        headerTxt={"Price"}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default SavedEventsFilter

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    innerContainer: {
        width: wp(55),
        marginHorizontal: wp(5),
        paddingVertical: hp(2),
        alignSelf: 'flex-end',
        marginTop: Platform.OS === 'ios' ? hp(13.5) : hp(8),
        backgroundColor: Colors.color2,
    },
    shadow: {
        shadowColor: Colors.color1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    listContainer: {
        paddingHorizontal: wp(2)
    },
    itemContainer: {
        marginBottom: hp(2),
        paddingHorizontal: wp(5),
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemName: {
        color: Colors.color17,
        fontFamily: Fonts.APPFONT_M,
        fontSize: Typography.medium,
        marginLeft: wp(3)
    },
    listHeader: {
        paddingTop: hp(0.5),
        paddingBottom: hp(1.5),
        paddingHorizontal: wp(1)
    },
    listHeaderTxt: {
        fontSize: Typography.medium,
        fontFamily: Fonts.APPFONT_M,
        color: Colors.color7
    }
})