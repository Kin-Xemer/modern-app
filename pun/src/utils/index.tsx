import {Dimensions, Platform} from 'react-native';

const valueRem = Dimensions.get('window').width / 414;
export const rem = valueRem > 1.5 ? 1.5 : valueRem;