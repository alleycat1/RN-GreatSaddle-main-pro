//@ts-noCheck
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import { Colors, Fonts, Images } from '../../res'
import { ButtonWithRightIcon, Header } from '../../components'
import Carousel from 'react-native-snap-carousel';
import { hp, Typography, wp } from '../../global'

const CardsDetails = (props: any) => {
    const [cards, setCards] = useState([
        {
            image: Images.card1,
            id: '1'
        },
        {
            image: Images.card2,
            id: '2'
        },
        {
            image: Images.card3,
            id: '3'
        }
    ])
    const [cardDetails, setCardDetails] = useState([
        {
            icon: Images.logout,
            title: 'Gate',
            description: '02'
        },
        {
            icon: Images.table,
            title: 'Table',
            description: '#16'
        },
        {
            icon: Images.calender,
            title: 'Date',
            description: 'Thu, May 5, 2021'
        },
        {
            icon: Images.questionMark,
            title: 'Start Time',
            description: '09:15AM'
        },
        {
            icon: Images.calendarSelected,
            title: 'Event Name',
            description: 'The Speed of Now (Live Performance)'
        },
        {
            icon: Images.description,
            title: 'Description',
            description: ''
        }
    ])

    const renderCards = ({ item }: any) => {
        return (
            <View style={Styles.cardItemCon}
            >
                <Image
                    source={item.image}
                    resizeMode='contain'
                    style={Styles.cardImage}
                />
            </View>
        )
    }


    const renderList = ({ item }: any) => {
        return (
            <View style={Styles.listItemCon}>
                <Image
                    source={item.icon}
                    resizeMode='contain'
                    style={Styles.listIcon}
                />
                <View style={Styles.listContentCon}>
                    <Text style={Styles.itemHeading}
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>
                    <Text style={Styles.itemDescription}
                        numberOfLines={2}
                    >
                        {item.description}
                    </Text>
                </View>
            </View>
        )
    }

    const onEnterGSPress = () => props.navigation.navigate('FingerprintVerification')
    const renderButton = () => (
        <ButtonWithRightIcon
            text="Enter GS"
            buttonStyle={Styles.enterGSBtn}
            onPress={onEnterGSPress}
        />
    )

    return (
        <Container
            barBg={Colors.color3}
        >
            <View style={Styles.headerOuterCon}>
                <View style={Styles.headerInnerCon}>
                    <Header
                        centetText="GS Card details"
                        navigation={props.navigation}
                        containerStyle={{ backgroundColor: Colors.color3 }}
                        shadow={false}
                    />
                    <Carousel
                        firstItem={1}
                        data={cards}
                        renderItem={renderCards}
                        sliderWidth={wp(100)}
                        itemWidth={wp(70)}
                        inactiveSlideOpacity={1}
                    />
                </View>
            </View>
            <FlatList
                data={cardDetails}
                renderItem={renderList}
                contentContainerStyle={Styles.listContainer}
                ListFooterComponent={renderButton}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    )
}

export default CardsDetails

const Styles = StyleSheet.create({
    headerOuterCon: {
        height: 280,
        width: '100%',
        transform: [{ scaleX: 2 }],
        borderBottomStartRadius: 200,
        borderBottomEndRadius: 200,
        overflow: 'hidden',
    },
    headerInnerCon: {
        flex: 1,
        transform: [{ scaleX: 0.5 }],
        backgroundColor: Colors.color3,
    },
    cardItemCon: {
        height: 200,
    },
    cardImage: {
        width: wp(70),
        height: 200,
    },
    listContainer: {
        paddingVertical: hp(4)
    },
    listItemCon: {
        marginBottom: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(10)
    },
    listIcon: {
        width: wp(15),
        height: hp(4),
    },
    listContentCon: {
        width: wp(62)
    },
    itemHeading: {
        fontFamily: Fonts.APPFONT_R,
        color: Colors.theme,
        fontSize: Typography.small3
    },
    itemDescription: {
        fontFamily: Fonts.APPFONT_R,
        color: Colors.color5,
        fontSize: Typography.small1
    },
    enterGSBtn: {
        marginVertical: hp(4)
    }
})