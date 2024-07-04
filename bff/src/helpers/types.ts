export type ErrorPayload = {
	status: number;
	error: {message: string; code: string};
};

export type ErrorType = any;

export type HospitalAsset = {
	id: number;
	tagId: string;
	batteryLevel: number;
	name: string;
	description: string;
	floor: number;
	lat: number;
	lon: number;
};
