import { View, Text, StyleSheet, Image, ScrollView, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import Container from '../../components/Container'
import { ButtonWithRightIcon, Header } from '../../components'
import { Colors, Fonts, Images } from '../../res'
import { hp, Typography, wp } from '../../global'
import { SliderBox } from "react-native-image-slider-box";
import { API_PATH, REFETCH } from '../../config'

const EventBooking = (props: any) => {
    const [eventBooking, setEventBooking] = useState({
        id: "",
        images: [],
        name: ' ',
        description: ' ',
        stormzy: ' ',
        attendees: 0,
        date: ' ',
        time: ' ',
        fee: 0,
        book_url: ""
    })

    const [refetch, setRefetch] = useState(true);

    useEffect(() => {
        const timerID = setInterval(() => {
            setRefetch((prevRefetch) => {
                return !prevRefetch;
            });
        }, REFETCH);

        return () => {
            clearInterval(timerID);
        };

    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_PATH}?eventbooking=${props.route.params.eventbookingId}`, {
                    method: 'GET',
                });
                const json = await response.json();
                // console.log("[=====EventBooking Json======]", json)
                // console.log("[=====EventBooking Stringify======]", JSON.stringify(json))
                setEventBooking(json)
            } catch (error) {
                console.log("[=====EventBooking ERR======]", error)
            }
        };
        fetchData();
        // console.log("[=====EventBooking=====]", props)
        // console.log("[=====EventBooking props.route.params stringify======]", JSON.stringify(props.route.params))
        // console.log("[=====EventBooking props.route.params foodId======]", props.route.params.eventbookingId)
    }, [refetch])

    const RenderField = ({ icon, name }: any) => {
        return (
            <View style={Styles.renderFieldInnerCon}>
                <Image
                    source={icon}
                    resizeMode='contain'
                    style={Styles.fieldIcon}
                />
                <Text style={Styles.fieldName}>
                    {name}
                </Text>
            </View>
        )
    }

    const onProceedPress = () => {
        Linking.openURL(Object.keys(eventBooking).length > 0 ? eventBooking.book_url : "");
        // props.navigation.navigate('EventBookingCard', { eventbookingId: props.route.params.eventbookingId })
    }

    return (
        <Container>
            <Header
                centetText="Book Event"
                navigation={props.navigation}
            />
            {
                Object.keys(eventBooking).length > 0 ? <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(20)}}>
                    <Text style={Styles.description}>
                        You are about to pay for
                    </Text>
                    <View style={[Styles.eventBoxContainer, Styles.shadow]}>
                        <SliderBox
                            images={eventBooking.images}
                            disableOnPress
                            sliderBoxHeight={hp(25)}
                            parentWidth={wp(90)}
                            imageLoadingColor={Colors.theme}
                            dotColor={Colors.color3}
                        />
                        <Text style={Styles.eventName}>
                            {eventBooking.name}
                        </Text>
                        <Text style={Styles.eventDescription}>
                            {eventBooking.description}
                        </Text>
                        <View style={Styles.renderFieldCon}>
                            <RenderField
                                icon={Images.micTheme}
                                name={eventBooking.stormzy}
                            />
                            <RenderField
                                icon={Images.users}
                                name={`${eventBooking.attendees} attendees`}
                            />
                        </View>
                        <View style={Styles.renderFieldCon}>
                            <RenderField
                                icon={Images.calender}
                                name={eventBooking.date}
                            />
                            <RenderField
                                icon={Images.time}
                                name={eventBooking.time}
                            />
                        </View>
                    </View>
                </ScrollView> : <Text>Not Found Event Booking Data</Text>
            }
            <View style={Styles.buttonOuterContainer}>
                <View style={Styles.eventFeeCon}>
                    <Text style={Styles.eventFeeTxt}>
                        Event Fee
                    </Text>
                    <Text style={Styles.eventFeeTxt}>
                        <Text style={{ ...Styles.eventFeeTxt, color: Colors.color19 }}>
                            ₦ </Text>
                        {eventBooking.fee}
                    </Text>
                </View>
                <ButtonWithRightIcon
                    text="Proceed"
                    onPress={onProceedPress}
                />
            </View>
        </Container>
    )
}

export default EventBooking

const Styles = StyleSheet.create({
    description: {
        color: Colors.color5,
        fontFamily: Fonts.APPFONT_R,
        fontSize: Typography.medium,
        marginHorizontal: wp(6),
        marginTop: hp(3)
    },
    eventBoxContainer: {
        marginHorizontal: wp(5),
        marginVertical: hp(3),
        backgroundColor: Colors.color2,
        paddingBottom: hp(4),
    },
    shadow: {
        shadowColor: Colors.color1,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 7,
    },
    eventName: {
        color: Colors.theme,
        fontFamily: Fonts.APPFONT_B,
        fontSize: Typography.small3,
        marginHorizontal: wp(5),
        marginTop: hp(2.5)
    },
    eventDescription: {
        color: Colors.color7,
        fontFamily: Fonts.APPFONT_R,
        fontSize: Typography.small3,
        marginHorizontal: wp(5),
        marginTop: hp(1)
    },
    renderFieldCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(7),
        marginTop: hp(3)
    },
    renderFieldInnerCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: wp(30),
    },
    fieldName: {
        fontFamily: Fonts.APPFONT_M,
        fontSize: Typography.small2,
        marginLeft: wp(3),
        color: Colors.theme
    },
    fieldIcon: {
        width: hp(3),
        height: hp(3.2),
    },
    buttonOuterContainer: {
        position: 'absolute',
        width: wp(100),
        bottom: 0,
        backgroundColor: Colors.color2,
        paddingVertical: hp(2)
    },
    eventFeeCon: {
        borderWidth: 1,
        borderColor: Colors.color18,
        backgroundColor: Colors.color2,
        alignSelf: 'center',
        width: wp(80),
        marginBottom: hp(2),
        borderRadius: 4,
        paddingVertical: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(4)
    },
    eventFeeTxt: {
        color: Colors.color5,
        fontFamily: Fonts.APPFONT_B,
        fontSize: Typography.small3
    }
})