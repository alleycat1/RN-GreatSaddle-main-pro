import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { eventsData } from '../home/Data'
import Container from '../../components/Container'
import { Header } from '../../components'
import { Colors } from '../../res'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { wp } from '../../global'
import Events from './Events'
import SavedEventsFilter from './SavedEventsFilter'
import { SAVE_EVENT, FAST_REFETCH } from '../../config'

const SavedEvents = (props: any) => {
    const [events, setEvents] = useState([])
    const [refetch, setRefetch] = useState(true);
    const [filterPressed, setFilterPressed] = useState(false)

    const onFilterPress = () => setFilterPressed(true)
    const onCloseFilter = () => setFilterPressed(false)

    useEffect(() => {
        const timerID = setInterval(() => {
            setRefetch((prevRefetch) => {
                return !prevRefetch;
            });
        }, FAST_REFETCH * 3);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    useEffect(() => {
        const fetchAsyncStorage = async () => {
            // console.log("[=====SavedEvents======]")
            try {
                const getSavedData = await AsyncStorage.getItem(SAVE_EVENT);
                if (getSavedData) {
                    // console.log("[=====SavedEvents getSavedData JSON======]", JSON.parse(getSavedData))
                    setEvents(JSON.parse(getSavedData))
                }
            } catch (error) {
                console.log("SavedEvents AsyncStorage: ", error)
            }
        }

        fetchAsyncStorage()
    }, [refetch])

    return (
        <Container>
            <Header
                centetText="Saved Events"
                navigation={props.navigation}
                Right={() => <Ionicons name='filter'
                    color={Colors.color4} size={wp(6)}
                    style={Styles.headerRight}
                    onPress={onFilterPress}
                />}
            />
            <Events
                data={events}
                navigation={props.navigation}
            />
            <SavedEventsFilter
                visible={filterPressed}
                onClose={onCloseFilter}
            />
        </Container>
    )
}

export default SavedEvents

const Styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: Colors.color2
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
    headerRight: {
        marginLeft: wp(10)
    }
})