import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLanguages } from 'react-native-i18n';


export const KEY_DATA_USER_SYSTEM = '@userDataSystem';
export const KEY_DATA_USER_RC = '@userDataRC';
export const USER_TOKEN_RC = '@userTokenRC';
export const DEVICE_TOKEN_RC = '@deviceTokenRC';
export const ROOM_ID_VIDEO_CALL = '@roomIDVideoCall';
export const KEY_IS_FIRST_TIME_USING = '@firstTimeUsing';
export const KEY_LAST_TIME_LOGON = '@lastTimeLogin';
export const KEY_LANGUAGE = '@language';
export const SORT_ROOM = '@sortRoom';
export const KEY_COLOR = "@color";
export const KEY_THEME = '@theme';
export const KEY_HEADERTHEME = '@headerTheme';
export const KEY_FA = '@fixedAssets';
export const KEY_FA_FILTER = '@fixedAssetsFilter';

export default class LocalDB {
	public static async setDataUserSystem(dataUser: any) {
		await AsyncStorage.setItem(KEY_DATA_USER_SYSTEM, JSON.stringify(dataUser));
	}

	public static async getDataUserSystem() {
		return AsyncStorage.getItem(KEY_DATA_USER_SYSTEM).then(json =>
			JSON.parse(json as string),
		);
	}

	public static async setUserTokenRC(sessionToken: string) {
		await AsyncStorage.setItem(USER_TOKEN_RC, sessionToken);
	}

	public static async getUserTokenRC() {
		return AsyncStorage.getItem(USER_TOKEN_RC).then(json => json);
	}

	public static async setDeviceTokenRC(deviceToken: string) {
		await AsyncStorage.setItem(DEVICE_TOKEN_RC, deviceToken);
	}

	public static async getDeviceTokenRC() {
		return AsyncStorage.getItem(DEVICE_TOKEN_RC).then(json => json);
	}

	public static async setRoomIDVideoCall(roomID: string) {
		await AsyncStorage.setItem(ROOM_ID_VIDEO_CALL, roomID);
	}

	public static async getRoomIDVideoCall() {
		return AsyncStorage.getItem(ROOM_ID_VIDEO_CALL).then(json => json);
	}

	public static async setIsFirstTimeUsing(isFirstTime: boolean) {
		await AsyncStorage.setItem(
			KEY_IS_FIRST_TIME_USING,
			JSON.stringify(isFirstTime),
		);
	}

	public static async getIsFirstTimeUsing() {
		return AsyncStorage.getItem(KEY_IS_FIRST_TIME_USING).then(json => {
			if (json == null) {
				return true;
			}
			return JSON.parse(json as string);
		});
	}

	public static async setLanguage(language: string) {
		await AsyncStorage.setItem(KEY_LANGUAGE, language);
	}

	public static async getLanguage() {
		return AsyncStorage.getItem(KEY_LANGUAGE).then(async language => {
			const languageDefault = await getLanguages();

			if (language == null) {
				return languageDefault[0].substring(0, languageDefault[0].indexOf('-'));
			}
			return language;
		});
	}

	// public static async setColor(color: string) {
	//   await AsyncStorage.setItem(KEY_COLOR, color);
	// }

	// public static async getColor() {
	//   return AsyncStorage.getItem(KEY_COLOR).then(color => {
	//     if (color == null) {
	//       return "#9b59b6";
	//     }
	//     return color;
	//   });
	// }

	public static async setColor(settingTheme: {
		color: string;
		theme: string;
		header: string;
	}) {
		await AsyncStorage.setItem(KEY_THEME, JSON.stringify(settingTheme));
	}

	public static async getColor() {
		return AsyncStorage.getItem(KEY_THEME).then(settingTheme => {
			if (settingTheme == null) {
				return;
			}
			const data = JSON.parse(settingTheme);
			return data;
		});
	}

	public static async setLastTimeLogin(time: string) {
		await AsyncStorage.setItem(KEY_LAST_TIME_LOGON, time);
	}

	public static async getLastTimeLogin() {
		return AsyncStorage.getItem(KEY_LAST_TIME_LOGON).then(async time => {
			return time;
		});
	}

	public static async setListScanFA(fixedAssets: any) {
		await AsyncStorage.setItem(KEY_FA, JSON.stringify(fixedAssets));
	}

	public static async getListScanFA() {
		return AsyncStorage.getItem(KEY_FA).then(async fixedAssets => {
			if (fixedAssets == null) {
				return [];
			}
			const data = JSON.parse(fixedAssets);
			return data;
		});
	}

	public static async setFAFilter(filter: any) {
		await AsyncStorage.setItem(KEY_FA_FILTER, JSON.stringify(filter));
	}

	public static async getFAFilter() {
		return AsyncStorage.getItem(KEY_FA_FILTER).then(async filter => {
			if (filter == null) {
				return {};
			}
			const data = JSON.parse(filter);
			return data;
		});
	}


	public static async getSortRoom() {
		return AsyncStorage.getItem(SORT_ROOM).then(async sortRoom => {
			if (sortRoom === null) {
				return {
					sortOptionSelected: 'activity',
					groupOptionSelected: {
						isUnreadOnTop: false,
						isGroupByType: false,
						isGroupByFavorites: false,
					},
				};
			}
			return JSON.parse(sortRoom);
		});
	}

	public static async clear(KEY: string) {
		await AsyncStorage.removeItem(KEY);
	}

	public static async logOut() {
		await AsyncStorage.multiRemove([
			KEY_DATA_USER_SYSTEM,
			KEY_DATA_USER_RC,
			USER_TOKEN_RC,
			ROOM_ID_VIDEO_CALL,
			DEVICE_TOKEN_RC,
		]);
	}

	public static async clearAllDataUser() {
		await AsyncStorage.multiRemove([
			KEY_DATA_USER_SYSTEM,
			KEY_DATA_USER_RC,
			USER_TOKEN_RC,
			ROOM_ID_VIDEO_CALL,
			DEVICE_TOKEN_RC,
		]);
	}
}
