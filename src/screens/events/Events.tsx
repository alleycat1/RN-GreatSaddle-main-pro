import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext, useCallback, memo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { FlashList } from '@shopify/flash-list'
import { Fonts, Colors, Images } from '../../res'
import { wp, hp, Typography } from '../../global'
import EventCard from './EventCard'
import { SAVE_EVENT, FAST_REFETCH, REFETCH, API_PATH } from '../../config'
import { AppStateContext } from '../../App'
import { getDistance } from '../../utils'
import { ITEM_HEIGHT } from '../../config'
// import { eventsData } from '../home/Data'

enum POSITION {
  TODAY = "Today",
  TOMORROW = "Tomorrow",
  WEEK = "This Week",
  MONTH = "This Month",
  MONTH3 = "3 Months",
  MONTH6 = "6 Months",
  MONTH6PLUS = "6 Months +"
}

const Events = (props: any) => {
  const {
    author = -1,
    navigation = {}
  } = props

  const [refetch, setRefetch] = useState(true)
  const [fastRefetch, setFastRefetch] = useState(true)
  const [savedEvents, setSavedEvents] = useState([])
  const [listEvents, setListEvents] = useState<any[]>([])
  const [eventsJsonData, setEventsJsonData] = useState<any[]>([])

  const geo = useContext(AppStateContext)

  const compareEvents = (event1: any, event2: any) => {
    const diff1 = getDistance(event1.location_latitude, event1.location_longitude, geo.coords.latitude, geo.coords.longitude)
    const diff2 = getDistance(event2.location_latitude, event2.location_longitude, geo.coords.latitude, geo.coords.longitude)

    if (isNaN(diff1) && isNaN(diff2)) return 0
    if (isNaN(diff1)) return 1
    if (isNaN(diff2)) return -1
    if (diff1 === diff2) return 0
    if (diff1 < diff2) return -1
    if (diff1 > diff2) return 1
    return 0
  }

  // useEffect(() => {
  //     console.log("[===useContext geo===]", geo)
  // }, [geo])

  useEffect(() => {
    // console.log("[===Events data===]", data)
    const timerID = setInterval(() => {
      setRefetch((prevRefetch) => {
        return !prevRefetch;
      });
    }, REFETCH);
    const fastTimerID = setInterval(() => {
      setFastRefetch((prevRefetch) => {
        return !prevRefetch;
      });
    }, FAST_REFETCH);

    return () => {
      clearInterval(fastTimerID);
      clearInterval(timerID);
    };

  }, []);

  useEffect(() => {
    const fetchAsyncStorage = async () => {
      try {
        const getSavedData = await AsyncStorage.getItem(SAVE_EVENT);
        if (getSavedData) {
          const _jsonSavedData = JSON.parse(getSavedData)
          setSavedEvents(_jsonSavedData)
        }
      } catch (error) {
        console.log("SavedEvents AsyncStorage: ", error)
      }
    }

    fetchAsyncStorage()
  }, [fastRefetch])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await fetch(`${API_PATH}?events=-1&author=${author}`, {
          method: 'GET',
        });
        const eventsJson = await eventsResponse.json();
        setEventsJsonData(eventsJson);
        // console.log("[=====Events Json======]", eventsJson)
        console.log("[=====Events Json length======]", eventsJson.length)
        // console.log("[=====Events Json Stringify======]", JSON.stringify(eventsJson))

        const _sortedEvents = eventsJson.sort(compareEvents)
        console.log("[===_sortedEvents===]", _sortedEvents.length)
        const today = Date.parse(new Date().toString());
        const _todaySortedEvents = _sortedEvents.filter((item: any) => {
          // return (Date.parse(item.event_start_date) <= today) && (today <= Date.parse(item.event_end_date))
          return new Date(item.event_start_date).toDateString() === new Date().toDateString()
        })
        console.log("[===_todaySortedEvents===]", _todaySortedEvents.length)

        // const tmr = today + 24 * 3600 * 1000;
        const tmr = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1).toDateString();
        console.log("[===tmr===]", tmr)
        const _tmrSortedEvents = _sortedEvents.filter((item: any) => {
          // return (Date.parse(item.event_start_date) <= tmr) && (tmr <= Date.parse(item.event_end_date))
          return new Date(item.event_start_date).toDateString() === tmr
        })
        console.log("[===_tmrSortedEvents===]", _tmrSortedEvents.length)

        // const thisWeek = today + (6 - new Date().getDay()) * 24 * 3600 * 1000;
        const thisWeektimestamp = today + (6 - new Date().getDay()) * 24 * 3600 * 1000;
        const tmrtimestamp = today + 24 * 3600 * 1000;
        const _weekSortedEvents = _sortedEvents.filter((item: any) => {
          // return (Date.parse(item.event_start_date) <= tmr) && (thisWeek <= Date.parse(item.event_end_date))
          return (tmrtimestamp < Date.parse(item.event_start_date)) && (Date.parse(item.event_start_date) <= thisWeektimestamp)
        })
        console.log("[===_weekSortedEvents===]", _weekSortedEvents.length)

        // const thisMonth = Date.parse(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toString());
        const thisMonthTimestamp = Date.parse(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toString());
        const _monthSortedEvents = _sortedEvents.filter((item: any) => {
          // return (Date.parse(item.event_start_date) <= thisWeek) && (thisMonth <= Date.parse(item.event_end_date))
          return (thisWeektimestamp < Date.parse(item.event_start_date)) && (Date.parse(item.event_start_date) <= thisMonthTimestamp)
        })
        console.log("[===_monthSortedEvents===]", _monthSortedEvents.length)

        // const threeMonth = Date.parse(new Date(new Date().getFullYear(), new Date().getMonth() + 3, 0).toString());
        const threeMonthTimestamp = Date.parse(new Date(new Date().getFullYear(), new Date().getMonth() + 3, 0).toString());
        const _threeMSortedEvents = _sortedEvents.filter((item: any) => {
          // return (Date.parse(item.event_start_date) <= thisMonth) && (threeMonth <= Date.parse(item.event_end_date))
          return (thisMonthTimestamp < Date.parse(item.event_start_date)) && (Date.parse(item.event_start_date) <= threeMonthTimestamp)
        })
        console.log("[===_threeMSortedEvents===]", _threeMSortedEvents.length)

        // const sixMonth = Date.parse(new Date(new Date().getFullYear(), new Date().getMonth() + 6, 0).toString());
        const sixMonthTimestamp = Date.parse(new Date(new Date().getFullYear(), new Date().getMonth() + 6, 0).toString());
        const _sixMSortedEvents = _sortedEvents.filter((item: any) => {
          // return (Date.parse(item.event_start_date) <= threeMonth) && (sixMonth <= Date.parse(item.event_end_date))
          return (threeMonthTimestamp < Date.parse(item.event_start_date)) && (Date.parse(item.event_start_date) <= sixMonthTimestamp)
        })
        console.log("[===_sixMSortedEvents===]", _sixMSortedEvents.length)

        const _sixPlusMSortedEvents = _sortedEvents.filter((item: any) => {
          // return Date.parse(item.event_start_date) > sixMonth
          return sixMonthTimestamp < Date.parse(item.event_start_date)
        })
        console.log("[===_sixPlusMSortedEvents===]", _sixPlusMSortedEvents.length)

        const _listEvents = [
          { [POSITION.TODAY]: _todaySortedEvents },
          { [POSITION.TOMORROW]: _tmrSortedEvents },
          { [POSITION.WEEK]: _weekSortedEvents },
          { [POSITION.MONTH]: _monthSortedEvents },
          { [POSITION.MONTH3]: _threeMSortedEvents },
          { [POSITION.MONTH6]: _sixMSortedEvents },
          { [POSITION.MONTH6PLUS]: _sixPlusMSortedEvents }
        ]
        setListEvents(_listEvents)
        // console.log("[===list===]", JSON.stringify(_listEvents))
      } catch (error) {
        console.log("[=====Fetch Events ERR======]", error)
      }
    };
    fetchData();
  }, [refetch, geo])

  const onSavedEvents = async (event: any) => {
    // const onSavedEvents = async (event: any) => {
    console.log("[===onSavedEvents event===]", event.id)
    try {
      const getSavedData = await AsyncStorage.getItem(SAVE_EVENT);
      if (!getSavedData) {
        await AsyncStorage.setItem(SAVE_EVENT, JSON.stringify([event]))
      } else {
        const jsonData = JSON.parse(getSavedData)
        const findData = jsonData.filter((item: any) => {
          return item.id === event.id
        })
        if (findData.length === 0) {
          jsonData.push(event)
          await AsyncStorage.setItem(SAVE_EVENT, JSON.stringify(jsonData))
        } else {
          const remainItems = jsonData.filter((item: any) => { return item.id !== event.id })
          await AsyncStorage.setItem(SAVE_EVENT, JSON.stringify(remainItems))
        }
      }
    } catch (error) {
      console.log("onSaveForLaterPress AsyncStorage: ", error)
      console.log("remove SAVE_EVENT")
      await AsyncStorage.removeItem(SAVE_EVENT);
    }
  }

  const onBookNowPress = (eventbookingId: any) => {
    console.log("[===onBookNowPress===]", eventbookingId)
    props.navigation.navigate('EventBooking', { eventbookingId: eventbookingId })
  }

  const onEventPress = (eventId: any) => {
    console.log("[==EventDetails start==]", eventId)
    navigation.navigate('EventDetails', { eventId, isSaved: savedEvents.filter((event: any) => { return event.id === eventId }).length > 0, savedAmounts: savedEvents.length })
  }

  const renderCategoryItems = useCallback(({ item, index }: any) => {
    return (
      <>
        <EventCard
          item={item}
          index={index}
          onEventPress={onEventPress}
          onBookNowPress={onBookNowPress}
          onSavedEvents={onSavedEvents}
          navigation={navigation}
          isSaved={savedEvents.filter((event: any) => { return event.id === item.id }).length > 0}
        />
      </>
    )
  }, []);

  const keyExtractor = (item: any) => item.id;
  const getItemLayout = (data: any, index: number) => (
    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
  )

  const CategoryItemNM = ({ item }: any) => {
    return (
      <View style={[Styles.categoryContainer, Styles.shadow]}>
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
        {/* 
                // TODO
                <SafeAreaView>
                <FlashList>

                </FlashList>
                </SafeAreaView>  
                */}
        <FlatList
          data={item[Object.keys(item)[0]]}
          renderItem={renderCategoryItems}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Styles.itemContainer}
          maxToRenderPerBatch={6}
          initialNumToRender={6}
          windowSize={5}
          getItemLayout={getItemLayout}
        />
      </View>
    )
  };

  const CategoryItem = memo(CategoryItemNM)

  const renderCategory = useCallback(({ item }: any) => {
    return (
      <CategoryItem item={item} />
    )
  }, []);

  return (
    <View style={[Styles.container, Styles.shadow]}>
      {
        Object.keys(eventsJsonData).length > 0 ?
          <FlatList
            data={listEvents}
            renderItem={renderCategory}
            contentContainerStyle={Styles.listContainer}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={5}
            initialNumToRender={5}
            windowSize={7}
          /> : <Text>Not Found Events Data</Text>
      }
    </View>
  )
}

export default Events

const Styles = StyleSheet.create({
  outerDateCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  innerTodayConLine: {
    borderTopWidth: 0.4,
    width: wp(20)
  },
  innerConLine: {
    borderTopWidth: 0.4,
    width: wp(32)
  },
  itemDateDay: {
    fontFamily: Fonts.APPFONT_B,
    color: Colors.color5,
    fontSize: Typography.medium2
  },
  itemDate: {
    fontFamily: Fonts.APPFONT_B,
    color: Colors.color5,
    marginLeft: wp(1),
    fontSize: Typography.medium2
  },
  container: {
    flex: 1,
    backgroundColor: Colors.color2,
  },
  itemContainer: {
    paddingHorizontal: wp(0.5),
  },
  listContainer: {
    paddingHorizontal: wp(0.5),
    paddingVertical: hp(2),
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
  categoryContainer: {
    marginVertical: hp(1),
    marginHorizontal: wp(0.5),
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: Colors.color1,
    paddingVertical: hp(1),
    backgroundColor: Colors.color2,
  },
  itemListContainer: {
    marginLeft: wp(1),
    marginTop: hp(1),
  },
})