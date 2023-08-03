import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Home, EventDetails, FoodDetails, CardsDetails,
    FingerprintVerification, TurnstileEntry, SavedEvents,
    EventBooking, EventBookingCard,
    Events
} from '../screens'
// import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={({ navigation }) => ({
                    presentation: 'card',
                    animation: 'slide_from_right',
                    headerShown: false,
                    gestureEnabled: true,
                })}
                initialRouteName={"Home"}
            >
                {/* <Stack.Screen name="AuthNavigator" component={AuthNavigator} /> */}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="EventDetails" component={EventDetails} />
                <Stack.Screen name="FoodDetails" component={FoodDetails} />
                <Stack.Screen name="CardsDetails" component={CardsDetails} />
                <Stack.Screen name="FingerprintVerification" component={FingerprintVerification} />
                <Stack.Screen name="TurnstileEntry" component={TurnstileEntry} />
                <Stack.Screen name="SavedEvents" component={SavedEvents} />
                <Stack.Screen name="EventBooking" component={EventBooking} />
                <Stack.Screen name="EventBookingCard" component={EventBookingCard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
