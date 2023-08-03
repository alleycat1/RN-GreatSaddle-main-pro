import React from 'react'
import { Platform } from 'react-native';
import * as Progress from 'react-native-progress';
import { hp, wp } from '../global';
import { Colors } from '../res';

const ProgressCirlce = (props: any) => {
    return (
        <Progress.Circle
            size={wp(4)}
            thickness={2}
            strokeCap='round'
            color={Colors.theme}
            borderWidth={0}
            indeterminate={false}
            progress={0.7}
            {...props}
            style={{ marginVertical: Platform.OS === 'ios' ? 0.12 : 1, }}
        />
    )
}

export default ProgressCirlce