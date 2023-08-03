import { Appearance } from 'react-native'
const colorScheme = Appearance.getColorScheme();

const DarkColors: any = {
    theme: '#53140B',
    color1: '#000',
    color2: '#fff',
    color3: '#FFF2E6',
    color4: '#BD8F6B',
    color5: '#313841',
    color6: '#281604',
    color7: '#818181',
    color8: '#00A300',
    color9: '#FF0000',
    color10: '#D1D1D1',
    color11: '#E4EEBC',
    color12: '#1967D2',
    color13: '#C4C4C4',
    color14: '#405064',
    color15: '#F4F4F4',
    color16: '#EFEFEF',
    color17: '#959595',
    color18: '#DEDEDE',
    color19: '#DCB28C',
    color20: '#707070',

    color1RGBA100: 'rgba(0,0,0,1)',
    color1RGBA0: 'rgba(0,0,0,0)',
    color1RGBA40: 'rgba(0,0,0,0.4)'
}

const LightColors: any = {
    theme: '#53140B',
    color1: '#000',
    color2: '#fff',
    color3: '#FFF2E6',
    color4: '#BD8F6B',
    color5: '#313841',
    color6: '#281604',
    color7: '#818181',
    color8: '#00A300',
    color9: '#FF0000',
    color10: '#D1D1D1',
    color11: '#E4EEBC',
    color12: '#1967D2',
    color13: '#C4C4C4',
    color14: '#405064',
    color15: '#F4F4F4',
    color16: '#EFEFEF',
    color17: '#959595',
    color18: '#DEDEDE',
    color19: '#DCB28C',
    color20: '#707070',
    colorBrown: '#C04936',
    colorGrey: '#808080',

    color1RGBA100: 'rgba(0,0,0,1)',
    color1RGBA0: 'rgba(0,0,0,0)',
    color1RGBA40: 'rgba(0,0,0,0.4)'
}

export default colorScheme === 'dark' ? DarkColors : LightColors