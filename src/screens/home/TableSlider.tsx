//@ts-nocheck
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { hp, Typography, wp } from '../../global'
import { Colors, Fonts, Images } from '../../res'
import Carousel from 'react-native-snap-carousel';

export class TableSlider extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            activeIndex: 0,
            carouselItems: [
                {
                    image: Images.directions,
                    text: 'Direcitons',
                    id: "1",
                },
                {
                    image: Images.gridView,
                    text: 'Grid view',
                    id: "2",
                },
                {
                    image: Images.frontView,
                    text: 'Front view',
                    id: "3",
                },
                {
                    image: Images.backView,
                    text: 'Back view',
                    id: "4",
                }
            ]
        }
    }

    _renderItem = ({ item, index }: any) => {
        return (
            <View style={[Styles.itemContainer, Styles.shadow]}>
                <Image
                    source={item.image}
                    resizeMode='contain'
                    style={Styles.itemImage}
                />
                <Text style={Styles.itemTxt}>
                    {item.text}
                </Text>
            </View>
        );
    }


    render() {
        return (
            <View style={Styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Carousel
                        firstItem={0}
                        ref={(c) => this._carousel = c}
                        data={this.state.carouselItems}
                        renderItem={this._renderItem}
                        sliderWidth={wp(100)}
                        itemWidth={wp(80)}
                        inactiveSlideOpacity={1}
                        containerCustomStyle={Styles.container}
                    />
                    <View style={[Styles.tableDetailContainer, Styles.shadow]}>
                        <View style={Styles.dotsContainer}>

                        </View>
                        <Text style={Styles.tableNumber}>#16</Text>
                        <View style={Styles.rowColContainer}>
                            <Text style={Styles.rowHeading}>
                                Row from front
                            </Text>
                            <Text style={Styles.rowDes}>4</Text>
                        </View>
                        <View style={Styles.rowColContainer}>
                            <Text style={Styles.rowHeading}>
                                Column
                            </Text>
                            <Text style={Styles.rowDes}>4</Text>
                        </View>
                    </View>
                </ScrollView>

            </View>

        )
    }
}

export default TableSlider

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: hp(1)
    },
    container: {},
    itemContainer: {
        height: hp(50),
        backgroundColor: Colors.color2,
        marginVertical: hp(1),
        paddingTop: hp(3),
        paddingBottom: hp(1.5),
        justifyContent: 'space-between'
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
    itemImage: {
        height: hp(40),
        width: wp(90),
        alignSelf: 'center',
    },
    itemTxt: {
        color: Colors.theme,
        fontSize: Typography.small3,
        fontFamily: Fonts.APPFONT_B,
        alignSelf: 'center',
        textAlign: 'center',
    },
    tableDetailContainer: {
        alignSelf: 'center',
        width: wp(80),
        paddingBottom: hp(1),
        marginBottom: hp(1),
        backgroundColor: Colors.color2,
    },
    dotsContainer: {
        borderWidth: 0,
        paddingVertical: hp(2)
    },
    tableNumber: {
        color: Colors.color5,
        fontSize: wp(6),
        fontFamily: Fonts.APPFONT_B,
        marginHorizontal: wp(4)
    },
    rowColContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
    },
    rowHeading: {
        color: Colors.color4,
        fontSize: Typography.medium,
        fontFamily: Fonts.APPFONT_B
    },
    rowDes: {
        color: Colors.theme,
        fontSize: Typography.medium,
        fontFamily: Fonts.APPFONT_B
    }
})