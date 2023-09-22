import { useEffect, useState, useMemo, useRef } from 'react';
import {
  View,
  AppState,
  Platform,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import codePush from 'react-native-code-push';
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from './data/local/AsyncStorage';
import { rem } from '@utils/index';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Colors from './config/Color';
import ModalProgressComponent from './components/ModalProgressComponent';
import { PreferencesContext } from '@context/PreferencesContext';
import PaperProvider from './config/PaperProvider';
let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };
const Index = (props: any) => {
  const [newColor, setNewColor] = useState('#c4465f'); //  33ccc7
  const [newTheme, setNewTheme] = useState(undefined);
  const [newHeader, setNewHeader] = useState(undefined);
  const [percent, setPercent] = useState<number>(0);

  const [Ischange, setChange] = useState(false);
  const [receivedBytes, setReceivedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const setShowModal = useRef<any>();

  useEffect(() => {
    checkUpdateVersion();
  }, []);
  useEffect(() => {
    (async () => {
      // @ts-ignore
      if (Text?.defaultProps == null) Text.defaultProps = {};
      // @ts-ignore
      if (TextInput?.defaultProps == null) TextInput.defaultProps = {};

      // @ts-ignore
      Text.defaultProps.allowFontScaling = false;
      // @ts-ignore
      TextInput.defaultProps.allowFontScaling = false;
      const main = await AsyncStorage.getColor();
      if (main) {
        toggleTheme(main);
      }
    })();
  }, []);
  const toggleTheme = item => {
    Colors.main = item?.color;
    setChange(true);
    // changeColor(item.Color);
    setNewColor(item?.color);
    setNewTheme(item?.theme);
    setNewHeader(item?.header);
    EStyleSheet.clearCache();
    EStyleSheet.build({
      $primaryColor: item?.color, // EBA2A9
      $lightBlue: '#47bdcc',
      $primaryBlue: '#3E88C7',
      $grayE5: '#e5e5e5',
      $borderColor: '#ccc',
      $gray: '#696969',
      $white: '#FFFFFF',
      $green: '#a9db70',
      $black: '#48484a',
      $red: '#C72F31',
      $yellow: '#c7942e',
      $yellow1: '#d6d465',
      $pink: '#ED7581',
      $black70: 'rgba(52, 52, 52, 0.4)',
      $label: '#B1B1B1',
      $rem: rem,
      $smallText: 8 * rem,
      $normalText: 10 * rem,
      $largeText: 10.5 * rem,
    });
  };
  const preferences = useMemo(
    () => ({
      toggleTheme,
      newColor,
      newTheme,
      newHeader,
      isTheme: false,
    }),
    [toggleTheme, newColor, newTheme, newHeader],
  );
  const checkUpdateVersion = () => {
    codePush
      .sync(
        {
          updateDialog: {
            appendReleaseDescription: true,
          },
          installMode: codePush.InstallMode.IMMEDIATE,
        },
        status => {
          switch (status) {
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
              setShowModal.current.showModal(true);
              break;
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
              break;

            case codePush.SyncStatus.UPDATE_INSTALLED:
              console.log('update thanh cong ');
              break;
          }
        },
        ({ receivedBytes = 0, totalBytes = 0 }) => {
          /* Update download modal progress */
          setReceivedBytes(receivedBytes)
          setTotalBytes(totalBytes)
          setPercent(Math.round((receivedBytes / totalBytes) * 100));
        },
      )
      .then();
  };

  return (
    <PreferencesContext.Provider value={preferences}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <PaperProvider>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hi be Pun, ung dung chua co gi hen tron </Text>
            <TouchableOpacity
              onPress={() => {
                
              }}>
              <Text>Hi</Text>
              
            </TouchableOpacity>
          </View>
          <ModalProgressComponent
            ref={ref => {
              setShowModal.current = ref;
            }}
            // isVisible={isShowModal}
            percent={percent}
            backdropColor={'rgba(0,0,0,0.5)'}
            backgroundColorModal={'rgba(0,0,0,0.5)'}
            title={`Pun đang tải ... ${percent}% `}
            subTitle={`Đừng tắt app trong lúc cập nhật !!!`}
            styleTitle={{
              alignSelf: 'flex-start',
              fontSize: 15,
              color: 'white',
            }}
          />
        </PaperProvider>
      </SafeAreaProvider>
    </PreferencesContext.Provider>
  );
};
export default codePush(codePushOptions)(Index);
