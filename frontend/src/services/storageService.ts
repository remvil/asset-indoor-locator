import {Preferences} from "@capacitor/preferences";
import {UserObject} from "../models/apiData";

export const setStoredUser = async (usrObj: UserObject) => {
	await Preferences.set({
		key: "user",
		value: JSON.stringify({
			id: 1,
			name: usrObj.name,
			token: usrObj.token,
		}),
	});
};

const getStoredUser = async (): Promise<UserObject | null> => {
	try {
		const ret = await Preferences.get({key: "user"});
		return ret.value ? (JSON.parse(ret.value) as UserObject) : null;
	} catch (error) {
		console.error("Failed to retrieve user:", error);
		return {token: ""};
	}
};

export const removeStoredUser = async () => {
	await Preferences.remove({key: "user"});
};

export const getToken = async (): Promise<string> => {
	const user = await getStoredUser();

	if (user) {
		return user.token;
	} else {
		return "";
	}
};
