import { StyleSheet, StatusBar, View, SafeAreaView } from 'react-native'
import React from 'react'
import { Colors } from '../res'
import { Animation } from '../animations'

const Container = (props: any) => {
    const {
        style = null,
        barStyle = 'dark-content',
        barBg = Colors.color2,
        animation = ''
    } = props

    const MyStatusBar = ({ backgroundColor, ...props }: any) => (
        <View style={[Styles.statusBar, { backgroundColor }]}>
            <SafeAreaView>
                <StatusBar translucent backgroundColor={backgroundColor} {...props} />
            </SafeAreaView>
        </View>
    );


    return (
        <Animation
            animation={animation}
            style={{ flex: 1 }}
        >
            <View style={[Styles.container, style]}>
                <MyStatusBar backgroundColor={barBg} barStyle={barStyle}  {...props} />
                {props.children}
            </View>
        </Animation>
    )
}

export default Container

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color2,
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
})