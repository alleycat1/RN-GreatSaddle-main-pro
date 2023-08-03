import React from 'react'
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native'

const Animation = (props: any) => {
    const {
        animation = 'fadeInUp',
        duration = 300,
        style = null
    } = props
    return (
        <Animatable.View
            animation={animation}
            useNativeDriver={true}
            duration={duration}
            style={{ ...Style.container, ...style }}
        >
            {props.children}
        </Animatable.View>
    )
}

export default Animation

const Style = StyleSheet.create({
    container: {

    }
})


