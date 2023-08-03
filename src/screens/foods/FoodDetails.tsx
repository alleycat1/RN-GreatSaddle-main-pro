import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Dimensions, Image, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Fonts, Images } from '../../res'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Constants, hp, Typography, wp } from '../../global';
import { ProgressCirlce } from '../../components'
import Entypo from 'react-native-vector-icons/Entypo'
import { API_PATH, REFETCH } from '../../config';

const FoodDetails = (props: any) => {
    const [food, setFood] = useState<any>({
        id: "",
        image: " ",
        name: ' ',
        price: '0',
        discount: '0',
        available: false,
        ingredients: " ",
        possibleAllergen: ' ',
        mealNo: ' ',
        uploadedBy: ' ',
        location: ' ',
    })
    const [cartItems, setCartItems] = useState('')
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
                const response = await fetch(`${API_PATH}?meals=${props.route.params.foodId}`, {
                    method: 'GET',
                });
                const json = await response.json();
                // console.log("[=====FoodDetails Json======]", json)
                // console.log("[=====FoodDetailsf Stringify======]", JSON.stringify(json))
                setFood(json)
            } catch (error) {
                console.log("[=====FoodDetails ERR======]", error)
            }
        };
        fetchData();
        // console.log("[=====FoodDetails props.route.params stringify======]", JSON.stringify(props.route.params))
        // console.log("[=====FoodDetails props.route.params foodId======]", props.route.params.foodId)
    }, [refetch])

    const onBackPress = () => props.navigation.goBack()

    const RenderListItem = (props: any) => {
        const { heading, description } = props
        return (
            <View style={Styles.listCon}>
                <Text style={Styles.listHeading}>
                    {heading}:
                </Text>
                <Text style={Styles.listDescription}>
                    {description}
                </Text>
            </View>
        )
    }

    const onAddToCart = () => setCartItems(food)
    const closeCartAdd = () => setCartItems('')

    return (
        <View style={Styles.container}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle='dark-content' />
            {
            Object.keys(food).length > 0 ? 
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(15) }}>
                <View style={Styles.imageContainer}>
                    <Image
                        source={{ uri: food.image }}
                        resizeMode='cover'
                        style={Styles.foodImage}
                    />

                    <View style={Styles.headerContainer}>
                        <TouchableOpacity style={Styles.headerBtn}
                            activeOpacity={Constants.btnActiveOpacity}
                            onPress={onBackPress}
                        >
                            <AntDesign name='arrowleft' color={Colors.color3} size={wp(6)} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={{ ...Styles.headerBtn, backgroundColor: Colors.color3, }}
                            activeOpacity={Constants.btnActiveOpacity}
                        >
                            <Image
                                source={Images.addCart}
                                resizeMode='contain'
                                style={Styles.cartIcon}
                            />
                            <View style={Styles.headerBadgeView}>
                                <Text style={Styles.headerBadgeTxt}>4</Text>
                            </View>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={{ ...Styles.headerBtn, backgroundColor: Colors.color3, }}
                            activeOpacity={Constants.btnActiveOpacity}
                        >
                            <AntDesign name='hearto' color={Colors.theme} size={wp(5)} />
                            <View style={Styles.headerBadgeView}>
                                <Text style={Styles.headerBadgeTxt}>4</Text>
                            </View>
                        </TouchableOpacity>
                    </View >
                </View>
                <View style={Styles.innerContentCon}>
                    <Text style={Styles.name}>
                        {food.name}
                    </Text>
                    <View style={Styles.priceOuterCon}>
                        <View style={Styles.priceDisCon}>
                            <Text style={Styles.price}>₦{food.price}</Text>
                            <Text style={Styles.discount}>{food.discount}</Text>
                        </View>
                        <View style={Styles.priceDisCon}>
                            <ProgressCirlce />
                            {
                                food.available &&
                                <Text style={Styles.availableTxt}>Available</Text>
                            }
                        </View>
                    </View>
                    <RenderListItem
                        heading="Contains"
                        description={food.ingredients}
                    />
                    <RenderListItem
                        heading="Possible Allergen(s)"
                        description={food.possibleAllergen}
                    />
                </View>
                <View style={{ ...Styles.innerContentCon, borderBottomWidth: 0 }}>
                    <Text style={Styles.mealNo}>Meal # | {food.mealNo}</Text>
                    <Text style={Styles.mealNo}>Uploaded by:  {food.uploadedBy}</Text>
                    <View style={Styles.locationCon}>
                        <Entypo name='location-pin' color={Colors.color13} size={wp(4.5)} />
                        <Text style={{ ...Styles.mealNo, marginTop: 0 }}>{food.location}</Text>
                    </View>
                </View>
            </ScrollView> : <Text>Not Found Food Detail Data</Text>
            }
            {
                cartItems.length === 0 &&
                <View style={{ ...Styles.btnsOuterCon, ...Styles.shadow }}>
                    <TouchableOpacity style={{ ...Styles.buyNowBtn, borderWidth: 1, borderColor: Colors.theme, backgroundColor: Colors.color2, }}
                        activeOpacity={Constants.btnActiveOpacity}
                        onPress={onAddToCart}
                    >
                        <AntDesign name='plus' color={Colors.theme} size={wp(4)} />
                        <Text style={{ ...Styles.buyNow, color: Colors.theme }}>
                            Add To Event
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.buyNowBtn}
                        activeOpacity={Constants.btnActiveOpacity}
                    >
                        <Text style={Styles.buyNow}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            }
            {
                cartItems.length !== 0 &&
                <View style={{ ...Styles.cartItemBtnCon, ...Styles.shadow }}>
                    <View style={Styles.cartItemBtnInner}>
                        <Text style={Styles.selectQuantity}>Select quantity to add</Text>
                        <TouchableOpacity
                            activeOpacity={Constants.btnActiveOpacity}
                            onPress={closeCartAdd}
                        >
                            <AntDesign name='close' color={Colors.color1} size={wp(6)} style={Styles.cartClose} />
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.cartItemBtnInnerTwo}>
                        <View style={Styles.cartPlusMinusCon}>
                            <TouchableOpacity style={Styles.minusPlusBtn}
                                activeOpacity={Constants.btnActiveOpacity}
                            >
                                <AntDesign name='minus' size={wp(4)} color={Colors.theme} />
                            </TouchableOpacity>
                            <Text style={Styles.numOfCartItem}>4</Text>
                            <TouchableOpacity style={Styles.minusPlusBtn}
                                activeOpacity={Constants.btnActiveOpacity}
                            >
                                <AntDesign name='plus' size={wp(4)} color={Colors.theme} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={Styles.acceptBtn}
                            activeOpacity={Constants.btnActiveOpacity}
                        >
                            <Text style={Styles.buyNow}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}

export default FoodDetails

const { width } = Dimensions.get('window')
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color2
    },
    imageContainer: {
        height: hp(35)
    },
    foodImage: {
        height: hp(35),
        width: wp(100)
    },
    headerContainer: {
        top: 0,
        position: 'absolute',
        width: wp(100),
        paddingTop: hp(6),
        paddingHorizontal: wp(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerBtn: {
        width: width * 0.09,
        height: width * 1 * 0.09,
        borderRadius: width * 1 * 0.09 / 2,
        backgroundColor: Colors.color5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerBadgeView: {
        width: width * 0.025,
        height: width * 1 * 0.025,
        borderRadius: width * 1 * 0.025 / 2,
        backgroundColor: Colors.color9,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: hp(0.5),
        right: wp(1)
    },
    headerBadgeTxt: {
        fontSize: wp(2),
        color: Colors.color2,
        fontFamily: Fonts.APPFONT_B
    },
    cartIcon: {
        width: wp(5.5),
        height: hp(3.5)
    },
    innerContentCon: {
        borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 1,
        borderBottomColor: Colors.color10,
        paddingHorizontal: wp(5),
        paddingVertical: hp(2)
    },
    name: {
        color: Colors.theme,
        fontFamily: Fonts.APPFONT_B,
        fontSize: Typography.medium2,
    },
    priceOuterCon: {
        marginTop: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    priceDisCon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        color: Colors.color5,
        fontSize: Typography.medium2,
        fontFamily: Fonts.APPFONT_B,
    },
    discount: {
        color: Colors.color4,
        fontSize: Typography.medium2,
        fontFamily: Fonts.APPFONT_R,
        textDecorationLine: 'line-through',
        marginHorizontal: wp(2)
    },
    availableTxt: {
        color: Colors.color5,
        fontSize: Typography.small2,
        fontFamily: Fonts.APPFONT_R,
        marginLeft: wp(2)
    },
    listCon: {

    },
    listHeading: {
        color: Colors.color7,
        fontSize: Typography.medium,
        fontFamily: Fonts.APPFONT_R,
        marginTop: hp(3)
    },
    listDescription: {
        color: Colors.color5,
        fontFamily: Fonts.APPFONT_R,
        fontSize: Typography.small3,
        marginTop: hp(1)
    },
    mealNo: {
        color: Colors.color13,
        fontSize: Typography.small3,
        fontFamily: Fonts.APPFONT_R,
        marginTop: hp(0.5),
    },
    locationCon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(0.5),
        marginLeft: wp(-0.5)
    },
    btnsOuterCon: {
        width: wp(100),
        position: 'absolute',
        bottom: 0,
        borderWidth: Platform.OS === 'ios' ? 0 : 0.5,
        borderColor: Colors.color10,
        backgroundColor: Colors.color3,
        paddingVertical: hp(3),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(8)
    },
    shadow: {
        shadowColor: Colors.color1,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 30,
    },
    buyNowBtn: {
        backgroundColor: Colors.theme,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45.47,
        width: wp(40)
    },
    buyNow: {
        color: Colors.color2,
        marginLeft: wp(3),
        fontFamily: Fonts.APPFONT_B,
        fontSize: Typography.small3
    },
    cartItemBtnCon: {
        width: wp(100),
        position: 'absolute',
        bottom: 0,
        borderWidth: Platform.OS === 'ios' ? 0 : 0.5,
        borderColor: Colors.color10,
        backgroundColor: Colors.color2,
        paddingVertical: hp(3),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: wp(8)
    },
    cartItemBtnInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectQuantity: {
        color: Colors.color7,
        fontSize: Typography.small3,
        fontFamily: Fonts.APPFONT_R
    },
    cartClose: {
        marginRight: wp(-4)
    },
    cartItemBtnInnerTwo: {
        paddingVertical: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cartPlusMinusCon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    minusPlusBtn: {
        borderWidth: 1,
        borderColor: Colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(5),
        height: wp(5)
    },
    numOfCartItem: {
        fontSize: Typography.medium,
        fontFamily: Fonts.APPFONT_R,
        color: Colors.color4,
        marginHorizontal: wp(3)
    },
    acceptBtn: {
        backgroundColor: Colors.theme,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45.47,
        width: wp(30)
    }
})