import {View, Text} from 'react-native';
import codePush from 'react-native-code-push';
export default function Index(props: any) {
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
							// setShowModal.current.showModal(true);
							break;
						case codePush.SyncStatus.CHECKING_FOR_UPDATE:
							break;

						case codePush.SyncStatus.UPDATE_INSTALLED:
							console.log('update thanfh cong ');
							break;
					}
				},
				({ receivedBytes, totalBytes }) => {
					/* Update download modal progress */
					// setPercent(Math.round((receivedBytes / totalBytes) * 100));
				},
			)
			.then();
	};
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>a</Text>
    </View>
  );
}
