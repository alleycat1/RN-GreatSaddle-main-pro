import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Colors, Fonts, Images } from '../../res'
import { hp, Typography, wp } from '../../global'
import { Constants } from '../../global'
import Entypo from 'react-native-vector-icons/Entypo'
import { getDistance } from '../../utils'
import { AppStateContext } from '../../App'
import { API_PATH, REFETCH } from '../../config'
// import { mealsData } from '../home/Data'

enum POSITION {
    TODAY = "Today",
    TOMORROW = "Tomorrow",
    WEEK = "This Week",
    MONTH = "This Month",
    MONTH3 = "3 Months",
    MONTH6 = "6 Months",
    MONTH6PLUS = "6 Months +"
}

const MealCard = (props: any) => {
    const {
        item = null,
        index = null,
        navigation = {}
    } = props

    // const [isAvailable, setIsAvailable] = useState(false)

    // const onAvailablePress = (eventbookingId: any) => {
    //     console.log("[=====onAvailablePress======]", isAvailable)
    //     setIsAvailable(prev => !prev)
    //     // TODO+
    // }

    // useEffect(() => {
    //     console.log("[===MealCard===]", item.id)
    // }, []);

    const onFoodItemPress = (foodId: any) => {
        console.log("[=====onFoodItemPress======]", foodId)
        navigation.navigate('FoodDetails', { foodId: foodId })
    }

    return (
        <TouchableOpacity style={{
            ...Styles.itemOuterContainer,
            backgroundColor: index % 2 === 0 ? Colors.color11 : Colors.color3
        }}
            activeOpacity={Constants.btnActiveOpacity}
            onPress={onFoodItemPress.bind(null, item.id)}
        >
            {
                item.image ? (
                    <Image
                        source={{ uri: item.image }}
                        resizeMode='cover'
                        style={Styles.itemImage}
                    />
                ) : (
                    <Image
                        source={Images.unknownImages}
                        resizeMode='cover'
                        style={Styles.itemImage}
                    />
                )
            }
            <View style={Styles.itemContentCon}>
                <Text style={Styles.itemName}
                    numberOfLines={1}
                >
                    {item.name}
                </Text>
                <Text style={Styles.itemPrice} numberOfLines={1}>
                    ₦{item.price}
                </Text>
                {/* <TouchableOpacity
                    style={isAvailable ? Styles.bookBtn : Styles.bookBtnWhite}
                    activeOpacity={Constants.btnActiveOpacity}
                    onPress={onAvailablePress.bind(null, item.id)}
                >
                    <Text style={isAvailable ? Styles.bookTxt : Styles.bookTxtWhite}>Available</Text>
                </TouchableOpacity> */}
                <View style={Styles.itemLocationCon}>
                    <Entypo name='location-pin' color={Colors.color4} size={wp(4)} />
                    <Text
                        style={Styles.itemLocation}
                        numberOfLines={1}
                    >
                        {item.location}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const Meals = (props: any) => {
    const {
        navigation = {}
    } = props

    const [refetch, setRefetch] = useState(true);
    const [meals, setMeals] = useState<any[]>([])
    const [mealsJsonData, setMealsJsonData] = useState<any[]>([])

    const geo = useContext(AppStateContext)

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

    const compareMeals = (meal1: any, meal2: any) => {
        const date1 = new Date(meal1.event_start_date).toDateString()
        const date2 = new Date(meal2.event_start_date).toDateString()

        if (date1 > date2) return 1;
        if (date1 < date2) return -1;

        const diff1 = getDistance(meal1.lat, meal2.lng, geo.coords.latitude, geo.coords.longitude)
        const diff2 = getDistance(meal1.lat, meal2.lng, geo.coords.latitude, geo.coords.longitude)

        if (isNaN(diff1) && isNaN(diff2)) return 0
        if (isNaN(diff1)) return 1
        if (isNaN(diff2)) return -1
        if (diff1 === diff2) return 0
        if (diff1 < diff2) return -1
        if (diff1 > diff2) return 1
        return 0
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mealsResponse = await fetch(`${API_PATH}?meals=-1`, {
                    method: 'GET',
                });
                const mealsJson = await mealsResponse.json();
                setMealsJsonData(mealsJson)
                // console.log("[=====mealsJson Json======]", JSON.stringify(mealsJson))
                const mealsSortedByDateAndLocation = mealsJson.sort(compareMeals)
                // console.log("[=====mealsSortedByDateAndLocation Json======]", JSON.stringify(mealsSortedByDate))

                // ====================Today=================
                const today = Date.parse(new Date().toString());
                const _todaySortedMeals = mealsSortedByDateAndLocation.filter((item: any) => {
                    return new Date(item.event_start_date).toDateString() === new Date().toDateString()
                })
                // console.log("[===_todaySortedMeals===]", _todaySortedMeals.length)

                const _todayMealsByRestaurant = _todaySortedMeals.reduce((group: any, _todaySortedMeal: any) => {
                    const { restaurant } = _todaySortedMeal;
                    group[restaurant] = group[restaurant] ?? [];
                    group[restaurant].push(_todaySortedMeal);
                    return group;
                }, {});
                // console.log("[=====_todayMealsByRestaurant Json======]", JSON.stringify(_todayMealsByRestaurant))
                var todayMealsByRestaurant: any[] = [];
                Object.keys(_todayMealsByRestaurant).map((value, index) => {
                    todayMealsByRestaurant.push({ [value]: _todayMealsByRestaurant[value] })
                })
                // console.log("[=====todayMealsByRestaurant Json======]", JSON.stringify(todayMealsByRestaurant))

                // ====================Tomorrow=================
                const tmr = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1).toDateString();
                // console.log("[===tmr===]", tmr)
                const _tmrSortedMeals = mealsSortedByDateAndLocation.filter((item: any) => {
                    return new Date(item.event_start_date).toDateString() === tmr
                })
                // console.log("[===_tmrSortedMeals===]", _tmrSortedMeals.length)

                const _tmrMealsByRestaurant = _tmrSortedMeals.reduce((group: any, _tmrSortedMeal: any) => {
                    const { restaurant } = _tmrSortedMeal;
                    group[restaurant] = group[restaurant] ?? [];
                    group[restaurant].push(_tmrSortedMeal);
                    return group;
                }, {});
                // console.log("[=====_tmrMealsByRestaurant Json======]", JSON.stringify(_tmrMealsByRestaurant))
                var tmrMealsByRestaurant: any[] = [];
                Object.keys(_tmrMealsByRestaurant).map((value, index) => {
                    tmrMealsByRestaurant.push({ [value]: _tmrMealsByRestaurant[value] })
                })
                // console.log("[=====tmrMealsByRestaurant Json======]", JSON.stringify(tmrMealsByRestaurant))

                // ====================Week=================
                const thisWeektimestamp = today + (6 - new Date().getDay()) * 24 * 3600 * 1000;
                const tmrtimestamp = today + 24 * 3600 * 1000;
                const _weekSortedMeals = mealsSortedByDateAndLocation.filter((item: any) => {
                    return (Date.parse(item.event_start_date) > tmrtimestamp) && (Date.parse(item.event_start_date) <= thisWeektimestamp)
                })
                // console.log("[===_weekSortedMeals===]", _weekSortedMeals.length)

                const _weekMealsByRestaurant = _weekSortedMeals.reduce((group: any, _weekSortedMeal: any) => {
                    const { restaurant } = _weekSortedMeal;
                    group[restaurant] = group[restaurant] ?? [];
                    group[restaurant].push(_weekSortedMeal);
                    return group;
                }, {});
                // console.log("[=====_weekMealsByRestaurant Json======]", JSON.stringify(_weekMealsByRestaurant))
                var weekMealsByRestaurant: any[] = [];
                Object.keys(_weekMealsByRestaurant).map((value, index) => {
                    weekMealsByRestaurant.push({ [value]: _weekMealsByRestaurant[value] })
                })
                // console.log("[=====weekMealsByRestaurant Json======]", JSON.stringify(weekMealsByRestaurant))

                // ====================Month=================
                const thisMonthTimestamp = Date.parse(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toString());
                const _monthSortedMeals = mealsSortedByDateAndLocation.filter((item: any) => {
                    return (thisWeektimestamp < Date.parse(item.event_start_date)) && (Date.parse(item.event_start_date) <= thisMonthTimestamp)
                })
                // console.log("[===_monthSortedMeals===]", _monthSortedMeals.length)

                const _monthMealsByRestaurant = _monthSortedMeals.reduce((group: any, _monthSortedMeal: any) => {
                    const { restaurant } = _monthSortedMeal;
                    group[restaurant] = group[restaurant] ?? [];
                    group[restaurant].push(_monthSortedMeal);
                    return group;
                }, {});
                // console.log("[=====_monthMealsByRestaurant Json======]", JSON.stringify(_monthMealsByRestaurant))
                var monthMealsByRestaurant: any[] = [];
                Object.keys(_monthMealsByRestaurant).map((value, index) => {
                    monthMealsByRestaurant.push({ [value]: _monthMealsByRestaurant[value] })
                })
                // console.log("[=====monthMealsByRestaurant Json======]", JSON.stringify(monthMealsByRestaurant))

                // ====================threeMonth=================
                const threeMonthTimestamp = Date.parse(new Date(new Date().getFullYear(), new Date().getMonth() + 3, 0).toString());
                const _threeMSortedMeals = mealsSortedByDateAndLocation.filter((item: any) => {
                    return (thisMonthTimestamp < Date.parse(item.event_start_date)) && (Date.parse(item.event_start_date) <= threeMonthTimestamp)
                })
                // console.log("[===_threeMSortedMeals===]", _threeMSortedMeals.length)

                const _threeMMealsByRestaurant = _threeMSortedMeals.reduce((group: any, _threeMSortedMeal: any) => {
                    const { restaurant } = _threeMSortedMeal;
                    group[restaurant] = group[restaurant] ?? [];
                    group[restaurant].push(_threeMSortedMeal);
                    return group;
                }, {});
                // console.log("[=====_threeMMealsByRestaurant Json======]", JSON.stringify(_threeMMealsByRestaurant))
                var threeMMealsByRestaurant: any[] = [];
                Object.keys(_threeMMealsByRestaurant).map((value, index) => {
                    threeMMealsByRestaurant.push({ [value]: _threeMMealsByRestaurant[value] })
                })
                // console.log("[=====threeMMealsByRestaurant Json======]", JSON.stringify(threeMMealsByRestaurant))

                // ====================sixMonth=================
                const sixMonthTimestamp = Date.parse(new Date(new Date().getFullYear(), new Date().getMonth() + 6, 0).toString());
                const _sixMSortedMeals = mealsSortedByDateAndLocation.filter((item: any) => {
                    return (threeMonthTimestamp < Date.parse(item.event_start_date)) && (Date.parse(item.event_start_date) <= sixMonthTimestamp)
                })
                // console.log("[===_sixMSortedMeals===]", _sixMSortedMeals.length)

                const _sixMMealsByRestaurant = _sixMSortedMeals.reduce((group: any, _sixMSortedMeal: any) => {
                    const { restaurant } = _sixMSortedMeal;
                    group[restaurant] = group[restaurant] ?? [];
                    group[restaurant].push(_sixMSortedMeal);
                    return group;
                }, {});
                // console.log("[=====_sixMMealsByRestaurant Json======]", JSON.stringify(_sixMMealsByRestaurant))
                var sixMMealsByRestaurant: any[] = [];
                Object.keys(_sixMMealsByRestaurant).map((value, index) => {
                    sixMMealsByRestaurant.push({ [value]: _sixMMealsByRestaurant[value] })
                })
                // console.log("[=====sixMMealsByRestaurant Json======]", JSON.stringify(sixMMealsByRestaurant))

                // ====================sixPlusMonth=================
                const _sixPlusMSortedMeals = mealsSortedByDateAndLocation.filter((item: any) => {
                    return Date.parse(item.event_start_date) > sixMonthTimestamp
                })
                // console.log("[===_sixPlusMSortedMeals===]", _sixPlusMSortedMeals.length)

                const _sixPlusMMealsByRestaurant = _sixPlusMSortedMeals.reduce((group: any, _sixPlusMSortedMeal: any) => {
                    const { restaurant } = _sixPlusMSortedMeal;
                    group[restaurant] = group[restaurant] ?? [];
                    group[restaurant].push(_sixPlusMSortedMeal);
                    return group;
                }, {});
                // console.log("[=====_sixPlusMMealsByRestaurant Json======]", JSON.stringify(_sixPlusMMealsByRestaurant))
                var sixPlusMMealsByRestaurant: any[] = [];
                Object.keys(_sixPlusMMealsByRestaurant).map((value, index) => {
                    sixPlusMMealsByRestaurant.push({ [value]: _sixPlusMMealsByRestaurant[value] })
                })
                // console.log("[=====sixPlusMMealsByRestaurant Json======]", JSON.stringify(sixPlusMMealsByRestaurant))

                const _listMeals = [
                    { [POSITION.TODAY]: todayMealsByRestaurant },
                    { [POSITION.TOMORROW]: tmrMealsByRestaurant },
                    { [POSITION.WEEK]: weekMealsByRestaurant },
                    { [POSITION.MONTH]: monthMealsByRestaurant },
                    { [POSITION.MONTH3]: threeMMealsByRestaurant },
                    { [POSITION.MONTH6]: sixMMealsByRestaurant },
                    { [POSITION.MONTH6PLUS]: sixPlusMMealsByRestaurant }
                ]
                // console.log("[=====_listMeals Json======]", JSON.stringify(_listMeals))
                setMeals(_listMeals)
            } catch (error) {
                console.log("[=====Fetch Meals ERR======]", error)
            }
        };
        fetchData();
    }, [refetch])

    const onEventsPress = (author: any) => {
        console.log("[===onEventsPress===]", author)
        navigation.navigate('Home', { tabId: 0, author: author })
    }

    const renderCategoryItems = ({ item, index }: any) => {
        return (
            <MealCard
                item={item}
                index={index}
                navigation={navigation}
            />
        )
    }

    const renderCategory = ({ item }: any) => {
        return (
            <View style={[Styles.categoryContainer, Styles.shadow]}>
                <View style={Styles.categoryHeaderCon}>
                    <Text style={Styles.categoryHeader}>
                        {Object.keys(item)[0]}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={Constants.btnActiveOpacity}
                        onPress={onEventsPress.bind(null, item[Object.keys(item)[0]][0].author)}
                    >
                        <Text style={Styles.viewAllTxt}>View Event</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={Styles.itemListContainer}
                >
                    <FlatList
                        data={item[Object.keys(item)[0]]}
                        numColumns={Math.ceil(item[Object.keys(item)[0]].length / 2)}
                        renderItem={renderCategoryItems}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </ScrollView>
            </View>
        )
    }

    const renderBox = ({ item }: any) => {
        return (
            <View style={[Styles.boxContainer, Styles.shadow]}>
                {
                    (Object.keys(item)[0] && Object.keys(item)[0] === POSITION.TODAY) ?
                        <View style={Styles.outerDateCon}>
                            <View style={Styles.innerTodayConLine} />
                            <View style={Styles.outerDateCon}>
                                <Text style={Styles.itemDateDay}>{Object.keys(item)[0]}</Text>
                                <Text style={Styles.itemDate}>|</Text>
                                <Text style={Styles.itemDate}>{new Date().toDateString()}</Text>
                            </View>
                            <View style={Styles.innerTodayConLine} />
                        </View> :
                        <View style={Styles.outerDateCon}>
                            <View style={Styles.innerConLine} />
                            <View style={Styles.outerDateCon}>
                                <Text style={Styles.itemDateDay}>{Object.keys(item)[0]}</Text>
                            </View>
                            <View style={Styles.innerConLine} />
                        </View>
                }

                <View style={[Styles.containerBox, Styles.shadowBox]}>
                    <FlatList
                        data={item[Object.keys(item)[0]]}
                        renderItem={renderCategory}
                        contentContainerStyle={Styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={[Styles.container, Styles.shadow]}>
        {
            Object.keys(mealsJsonData).length > 0 ? 
            <FlatList
                data={meals}
                renderItem={renderBox}
                contentContainerStyle={Styles.listContainer}
                showsVerticalScrollIndicator={false}
            /> : <Text>Not Found Meals Data</Text>
        }
        </View>
    )
}

export default Meals

const Styles = StyleSheet.create({
    container: {
        flex: 1,
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
    containerBox: {
        flex: 1,
        backgroundColor: Colors.color2,
    },
    shadowBox: {
        shadowColor: Colors.color1,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    listContainer: {
        paddingVertical: hp(2),
        paddingHorizontal: wp(2)
    },
    categoryContainer: {
        paddingVertical: hp(2),
        backgroundColor: Colors.color2,
    },
    boxContainer: {
        marginVertical: hp(1),
        marginHorizontal: wp(1),
        borderRadius: 8,
        paddingVertical: hp(2),
        backgroundColor: Colors.color2,
    },
    categoryHeaderCon: {
        flexDirection: 'row',
        paddingHorizontal: wp(3),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    categoryHeader: {
        color: Colors.color7,
        fontSize: Typography.medium,
        fontFamily: Fonts.APPFONT_R
    },
    viewAllTxt: {
        color: Colors.color4,
        fontFamily: Fonts.APPFONT_R,
        fontSize: Typography.medium
    },
    itemListContainer: {
        marginLeft: wp(3),
        marginTop: hp(1.5),
    },
    itemOuterContainer: {
        marginRight: wp(1),
        width: wp(35),
        height: hp(26),
        marginTop: hp(0.6)
    },
    itemImage: {
        width: wp(35),
        height: hp(15)
    },
    itemContentCon: {
        paddingVertical: hp(1),
        paddingHorizontal: wp(2)
    },
    itemName: {
        color: Colors.color5,
        fontSize: Typography.small3,
        fontFamily: Fonts.APPFONT_R,
        maxWidth: wp(30)
    },
    itemPrice: {
        color: Colors.color4,
        fontSize: Typography.small3,
        fontFamily: Fonts.APPFONT_BL,
        maxWidth: wp(30),
        marginTop: hp(0.5)
    },
    itemLocation: {
        color: Colors.color5,
        fontFamily: Fonts.APPFONT_R,
        fontSize: Typography.small,
        maxWidth: wp(25)
    },
    itemLocationCon: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: hp(1),
        marginLeft: wp(-0.5)
    },
    innerTodayConLine: {
        borderTopWidth: 0.4,
        width: wp(20)
    },
    outerDateCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    innerConLine: {
        borderTopWidth: 0.4,
        width: wp(32)
    },
    itemDateDay: {
        fontFamily: Fonts.APPFONT_B,
        color: Colors.color5,
        fontSize: Typography.small2
    },
    itemDate: {
        fontFamily: Fonts.APPFONT_R,
        color: Colors.color5,
        marginLeft: wp(1),
        fontSize: Typography.small2
    }
    // bookBtn: {
    //     borderWidth: 1,
    //     width: wp(21),
    //     height: hp(3.2),
    //     marginRight: wp(1),
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     paddingHorizontal: wp(1),
    //     backgroundColor: Colors.color2,
    //     borderRadius: 4
    // },
    // bookTxt: {
    //     color: Colors.theme,
    //     fontFamily: Fonts.APPFONT_B
    // },
    // bookBtnWhite: {
    //     borderWidth: 1,
    //     width: wp(21),
    //     height: hp(3.2),
    //     marginRight: wp(1),
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     paddingHorizontal: wp(1),
    //     backgroundColor: Colors.theme,
    //     borderRadius: 4
    // },
    // bookTxtWhite: {
    //     color: Colors.color2,
    //     fontFamily: Fonts.APPFONT_B
    // }
})